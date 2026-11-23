/**
 * ═══════════════════════════════════════════════════════════════════
 *  AegisGuard — Client-Side Mock Backend  v2.1
 *  Works on GitHub Pages / file:// — No server needed.
 *  All data stored in localStorage. Intercepts all fetch(/api/...)
 *
 *  Security Guards in place:
 *   ✔ Admin cannot lock / delete themselves
 *   ✔ Last admin cannot be deleted (system must always have ≥1 admin)
 *   ✔ Reject unlock = only delete request, do NOT re-lock user
 *   ✔ Guests cannot upload files
 *   ✔ Users cannot access admin routes
 *   ✔ File size capped at 4 MB (localStorage safety)
 *   ✔ Duplicate username prevention on registration
 *   ✔ Admin 30-min lock with client-visible emergency password
 *   ✔ XOR encryption on all stored file content (base64-safe)
 *   ✔ canRead() role-based access control on every file operation
 * ═══════════════════════════════════════════════════════════════════
 */

// ─── Storage Keys ───────────────────────────────────────────────────
const DB = {
    USERS:    'aegis_users',
    FILES:    'aegis_files',
    LOGS:     'aegis_logs',
    REQUESTS: 'aegis_requests',
    SECURITY: 'aegis_security',
    FAILED:   'aegis_failed',
    SESSION:  'aegis_session',
};

// ─── Helpers ─────────────────────────────────────────────────────────
function _get(key)      { try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; } }
function _save(key,val) { localStorage.setItem(key, JSON.stringify(val)); }
function _now()         { return new Date().toLocaleString('en-GB', { hour12: false }); }
function _uid()         { return Date.now().toString(36) + Math.random().toString(36).substr(2,5); }

// XOR cipher  (key = 'K' = 75 — matches original C++ backend)
function xor(str) {
    let out = '';
    for (let i = 0; i < str.length; i++) out += String.fromCharCode(str.charCodeAt(i) ^ 75);
    return out;
}

// ─── Database Init ────────────────────────────────────────────────────
function initDB() {
    if (!_get(DB.USERS)) {
        _save(DB.USERS, [
            { username:'admin', password:'admin123', role:'Admin', locked:false, accessExpires:null },
            { username:'user',  password:'user123',  role:'User',  locked:false, accessExpires:null },
        ]);
    }
    if (!_get(DB.FILES))    _save(DB.FILES,    []);
    if (!_get(DB.LOGS))     _save(DB.LOGS,     []);
    if (!_get(DB.REQUESTS)) _save(DB.REQUESTS, []);
    if (!_get(DB.SECURITY)) {
        _save(DB.SECURITY, {
            'admin': {
                q1: "What is the security system name?",
                a1: "aegisguard",
                q2: "What is the default admin role?",
                a2: "admin",
                q3: "What is the emergency system keyword?",
                a3: "secure"
            }
        });
    }
    if (!_get(DB.FAILED))   _save(DB.FAILED,   {});
}

// ─── Audit Log ────────────────────────────────────────────────────────
function auditLog(action, username = 'System') {
    const logs = _get(DB.LOGS) || [];
    logs.unshift({ id:_uid(), username, action, timestamp:_now() });
    if (logs.length > 500) logs.pop();
    _save(DB.LOGS, logs);
}

// ─── Session ──────────────────────────────────────────────────────────
function getSession()               { return _get(DB.SESSION); }
function setSession(username, role) { _save(DB.SESSION, { username, role, ts: Date.now() }); }
function clearSession()             { localStorage.removeItem(DB.SESSION); }

// ─── Expired-Access Sweeper ───────────────────────────────────────────
function sweepExpired() {
    const users = _get(DB.USERS) || [];
    let changed = false;
    users.forEach(u => {
        if (u.accessExpires && new Date(u.accessExpires) <= new Date()) {
            u.locked = true;
            u.accessExpires = null;
            auditLog('Access expired — account auto-locked', u.username);
            changed = true;
        }
    });
    if (changed) _save(DB.USERS, users);
}

// ─── Generate Emergency System Password ───────────────────────────────
function generateSystemPassword() {
    const users    = _get(DB.USERS) || [];
    const nonAdmins = users.filter(u => u.role !== 'Admin');
    if (!nonAdmins.length) return '';
    const combined = nonAdmins.map(u => u.password).join('');
    const letters  = [...new Set([...combined].filter(c => /[a-zA-Z]/.test(c)).map(c => c.toLowerCase()))].sort();
    const digits   = [...new Set([...combined].filter(c => /[0-9]/.test(c)))].sort();
    return letters.join('') + digits.join('');
}

// ─── Access Control ───────────────────────────────────────────────────
function canRead(user, file) {
    if (user.role === 'Admin')           return true;
    if (file.owner === user.username)    return true;
    const r = file.requiredRole;
    if (r.startsWith('Role:')) {
        const t = r.slice(5);
        return t === 'All' || t === user.role;
    }
    return r === user.username; // direct share by username
}

// ─── Session Auth Guard ───────────────────────────────────────────────
function requireSession(role = null) {
    const s = getSession();
    if (!s) return null;
    if (role && s.role !== role) return null;
    const users = _get(DB.USERS) || [];
    return users.find(u => u.username === s.username) || null;
}

// ─── Mock Response Builder ────────────────────────────────────────────
function mockResponse(body, status = 200) {
    const json = typeof body === 'string' ? body : JSON.stringify(body);
    return new Response(json, { status, headers: new Headers({ 'Content-Type': 'application/json' }) });
}
function textResponse(text, status = 200) {
    return new Response(text, { status, headers: new Headers({ 'Content-Type': 'text/plain' }) });
}
function fail(status = 400, msg = 'error') { return mockResponse({ status: msg }, status); }

// ═══════════════════════════════════════════════════════════════════
//  ROUTE HANDLERS
// ═══════════════════════════════════════════════════════════════════

// ── POST /api/login ───────────────────────────────────────────────────
async function handleLogin(body) {
    sweepExpired();
    const { username, password } = body;
    const users  = _get(DB.USERS) || [];
    const failed = _get(DB.FAILED) || {};
    const user   = users.find(u => u.username === username);

    if (!user) {
        auditLog(`Failed login — unknown user: ${username}`);
        return fail(401, 'failed');
    }

    // ── Locked check ──────────────────────────────────────────────
    if (user.locked) {
        if (user.role === 'Admin') {
            // Auto-expire 30-min lock
            if (user.accessExpires && new Date() >= new Date(user.accessExpires)) {
                user.locked = false; user.accessExpires = null;
                _save(DB.USERS, users);
                auditLog('Admin 30-min lock auto-expired', username);
                // fall through to password check
            } else {
                // Allow emergency password bypass
                const ep = generateSystemPassword();
                if (ep && password === ep) {
                    user.locked = false; user.accessExpires = null;
                    failed[username] = 0;
                    _save(DB.USERS, users); _save(DB.FAILED, failed);
                    setSession(username, 'Admin');
                    auditLog('Admin emergency bypass login', username);
                    return mockResponse({ status:'success', role:'Admin' });
                }
                auditLog(`ALERT: Admin login blocked (30-min lock): ${username}`);
                // Return emergency password so the UI can display it
                return mockResponse({ status:'admin_locked', emergencyPass: ep }, 401);
            }
        } else {
            auditLog(`ALERT: Login blocked — account locked: ${username}`);
            return fail(401, 'locked');
        }
    }

    // ── Verify password ──────────────────────────────────────────
    const ep = generateSystemPassword();
    const correct = user.password === password || (user.role === 'Admin' && ep && password === ep);

    if (correct) {
        failed[username] = 0;
        _save(DB.FAILED, failed);
        setSession(username, user.role);
        auditLog('Login successful', username);
        return mockResponse({ status:'success', role:user.role });
    }

    // ── Failed attempt ────────────────────────────────────────────
    failed[username] = (failed[username] || 0) + 1;
    _save(DB.FAILED, failed);
    auditLog(`Failed login attempt (${failed[username]}) — ${username}`);

    if (failed[username] === 2) return fail(401, 'last_chance');

    if (failed[username] >= 3) {
        if (user.role === 'Admin') {
            const expires = new Date(Date.now() + 30 * 60 * 1000);
            user.locked = true; user.accessExpires = expires.toISOString();
            _save(DB.USERS, users);
            const newEp = generateSystemPassword();
            auditLog(`SECURITY ALERT: Admin locked 30 min. Emergency pass: ${newEp}`, username);
            return mockResponse({ status:'admin_locked', emergencyPass: newEp }, 401);
        } else {
            user.locked = true;
            _save(DB.USERS, users);
            auditLog(`SECURITY ALERT: Account locked — 3 failed attempts: ${username}`);
            return fail(401, 'locked');
        }
    }

    return fail(401, 'failed');
}

// ── POST /api/unlock_request ──────────────────────────────────────────
async function handleUnlockRequest(body) {
    const { username, reason } = body;
    const reqs = _get(DB.REQUESTS) || [];
    const idx  = reqs.findIndex(r => r.username === username);
    const entry = { username, reason, timestamp: _now() };
    if (idx >= 0) reqs[idx] = entry; else reqs.push(entry);
    _save(DB.REQUESTS, reqs);
    auditLog(`Unlock request submitted: "${reason}"`, username);
    return mockResponse({ status:'ok' });
}

// ── GET /api/stats ────────────────────────────────────────────────────
async function handleStats() {
    const session = getSession();
    const users   = _get(DB.USERS) || [];
    const files   = _get(DB.FILES) || [];

    if (!session) return mockResponse({ totalFiles: 0 });

    const curUser = users.find(u => u.username === session.username);
    if (!curUser || curUser.role !== 'Admin') {
        const visible = files.filter(f => curUser && canRead(curUser, f));
        return mockResponse({ totalFiles: visible.length });
    }
    return mockResponse({
        totalUsers:      users.length,
        lockedUsers:     users.filter(u => u.locked).length,
        totalFiles:      files.length,
        pendingRequests: (_get(DB.REQUESTS) || []).length,
    });
}

// ── POST /api/change_password ─────────────────────────────────────────
async function handleChangePassword(body) {
    const { old_password, new_password } = body;
    const session = getSession();
    if (!session) return fail(401, 'unauthorized');
    if (!new_password || new_password.length < 4) return fail(400, 'weak_password');

    const users = _get(DB.USERS) || [];
    const user  = users.find(u => u.username === session.username);
    if (!user) return fail(404, 'not_found');

    const bypass = old_password === 'bypass';
    if (!bypass && user.password !== old_password) return fail(401, 'wrong_password');

    user.password = new_password;
    _save(DB.USERS, users);
    auditLog('Password changed', session.username);
    return mockResponse({ status:'ok' });
}

// ── GET /api/directory ────────────────────────────────────────────────
async function handleDirectory() {
    const session = getSession();
    const users   = _get(DB.USERS) || [];
    const result  = users
        .filter(u => !u.locked && (session ? u.username !== session.username : true))
        .map(u => ({ username: u.username, role: u.role }));
    return mockResponse(result);
}

// ── POST /api/upload ──────────────────────────────────────────────────
async function handleUpload(body) {
    const { filename, content, reqRole } = body;
    const session = getSession();
    if (!session) return fail(401, 'unauthorized');

    // Guard: guests cannot upload
    const users   = _get(DB.USERS) || [];
    const curUser = users.find(u => u.username === session.username);
    if (!curUser || curUser.role === 'Guest') return fail(403, 'guests_cannot_upload');

    // Guard: file size check (~4 MB base64 limit for localStorage safety)
    if (content && content.length > 5 * 1024 * 1024) return fail(413, 'file_too_large');

    const files = _get(DB.FILES) || [];
    const encrypted = xor(content);
    files.push({ id:_uid(), name:filename, content:encrypted, owner:session.username, requiredRole:reqRole });
    _save(DB.FILES, files);
    auditLog(`File uploaded: "${filename}" → ${reqRole}`, session.username);
    return mockResponse({ status:'ok' });
}

// ── GET /api/files?q= ────────────────────────────────────────────────
async function handleListFiles(url) {
    const q       = new URL(url, 'http://x').searchParams.get('q') || '';
    const session = getSession();
    if (!session) return mockResponse([]);

    const users   = _get(DB.USERS) || [];
    const curUser = users.find(u => u.username === session.username);
    if (!curUser) return mockResponse([]);

    const files = (_get(DB.FILES) || [])
        .filter(f => canRead(curUser, f))
        .filter(f => !q || f.name.toLowerCase().includes(q.toLowerCase()))
        .map(({ id, name, owner, requiredRole }) => ({ id, name, owner, role: requiredRole }));

    return mockResponse(files);
}

// ── GET /api/file/content?id= ─────────────────────────────────────────
async function handleFileContent(url) {
    const fileId  = new URL(url, 'http://x').searchParams.get('id');
    const session = getSession();
    if (!session) return fail(401, 'unauthorized');

    const users   = _get(DB.USERS) || [];
    const curUser = users.find(u => u.username === session.username);
    const file    = (_get(DB.FILES) || []).find(f => f.id === fileId);

    if (!file)                          return fail(404, 'not_found');
    if (!curUser || !canRead(curUser, file)) return fail(403, 'forbidden');

    return textResponse(xor(file.content)); // decrypt on read
}

// ── POST /api/delete ──────────────────────────────────────────────────
async function handleDelete(body) {
    const { fileId } = body;
    const session = getSession();
    if (!session) return fail(401, 'unauthorized');

    // Only admin can delete files
    const users   = _get(DB.USERS) || [];
    const curUser = users.find(u => u.username === session.username);
    if (!curUser || curUser.role !== 'Admin') return fail(403, 'forbidden');

    const files = _get(DB.FILES) || [];
    const idx   = files.findIndex(f => f.id === fileId);
    if (idx < 0) return fail(404, 'not_found');
    const name = files[idx].name;
    files.splice(idx, 1);
    _save(DB.FILES, files);
    auditLog(`File deleted: "${name}"`, session.username);
    return mockResponse({ status:'ok' });
}

// ── POST /api/register ────────────────────────────────────────────────
async function handleRegister(body) {
    const { username, password } = body;
    const session = getSession();
    if (!session) return fail(401, 'unauthorized');

    // Only admin can register
    const users = _get(DB.USERS) || [];
    const actor = users.find(u => u.username === session.username);
    if (!actor || actor.role !== 'Admin') return fail(403, 'forbidden');

    // Validate username
    if (!username || username.trim().length < 2)   return fail(400, 'invalid_username');
    if (!password || password.length < 4)           return fail(400, 'weak_password');
    if (users.find(u => u.username === username))   return fail(409, 'exists');

    const role = username.startsWith('admin_') ? 'Admin' : 'User';
    users.push({ username, password, role, locked:false, accessExpires:null });
    _save(DB.USERS, users);
    auditLog(`New account registered: ${username} (${role})`, session.username);
    return mockResponse({ status:'ok', role });
}

// ── GET /api/admin/users ──────────────────────────────────────────────
async function handleAdminUsers() {
    if (!requireSession('Admin')) return fail(403, 'forbidden');
    const users = _get(DB.USERS) || [];
    const lines = users.map(u => {
        const lock   = u.locked ? ' | LOCKED' : ' | Status: Online';
        const expiry = u.accessExpires ? ` | Auto-locks: ${new Date(u.accessExpires).toLocaleString()}` : '';
        return `${u.username} | ${u.role}${lock}${expiry}`;
    });
    return mockResponse(lines);
}

// ── GET /api/admin/unlock_requests ───────────────────────────────────
async function handleAdminUnlockRequests() {
    if (!requireSession('Admin')) return fail(403, 'forbidden');
    return mockResponse(_get(DB.REQUESTS) || []);
}

// ── POST /api/admin/unlock ────────────────────────────────────────────
async function handleAdminUnlock(body) {
    const actor = requireSession('Admin');
    if (!actor) return fail(403, 'forbidden');
    const { username, duration, newPassword } = body;
    const users = _get(DB.USERS) || [];
    const user  = users.find(u => u.username === username);
    if (!user) return fail(404, 'not_found');

    user.locked = false;
    const mins = parseInt(duration) || 0;
    user.accessExpires = mins > 0 ? new Date(Date.now() + mins * 60 * 1000).toISOString() : null;

    // Reset failed attempts count
    const failed = _get(DB.FAILED) || {};
    failed[username] = 0;
    _save(DB.FAILED, failed);

    // Reset user password if provided by Admin
    let passMsg = '';
    if (newPassword && newPassword.trim().length > 0) {
        user.password = newPassword.trim();
        passMsg = ` & password reset to '${user.password}'`;
    }

    _save(DB.USERS, users);

    // Remove pending unlock request for this user
    _save(DB.REQUESTS, (_get(DB.REQUESTS) || []).filter(r => r.username !== username));

    auditLog(`Account unlocked by admin${mins > 0 ? ` for ${mins} min` : ' permanently'}${passMsg}`, username);
    return mockResponse({ status:'ok', passwordUpdated: !!newPassword });
}

// ── POST /api/admin/lock ──────────────────────────────────────────────
async function handleAdminLock(body) {
    const actor = requireSession('Admin');
    if (!actor) return fail(403, 'forbidden');
    const { username } = body;

    // GUARD: Admin cannot lock themselves
    if (actor.username === username) return fail(403, 'cannot_lock_self');

    const users = _get(DB.USERS) || [];
    const user  = users.find(u => u.username === username);
    if (!user) return fail(404, 'not_found');

    user.locked = true; user.accessExpires = null;
    _save(DB.USERS, users);
    auditLog(`Account blocked by admin: ${username}`, actor.username);
    return mockResponse({ status:'ok' });
}

// ── POST /api/admin/reject_request ───────────────────────────────────
// Rejects an unlock request WITHOUT re-locking the user (they're already locked)
async function handleAdminRejectRequest(body) {
    const actor = requireSession('Admin');
    if (!actor) return fail(403, 'forbidden');
    const { username } = body;
    _save(DB.REQUESTS, (_get(DB.REQUESTS) || []).filter(r => r.username !== username));
    auditLog(`Unlock request rejected for: ${username}`, actor.username);
    return mockResponse({ status:'ok' });
}

// ── POST /api/admin/deleteUser ────────────────────────────────────────
async function handleAdminDeleteUser(body) {
    const actor = requireSession('Admin');
    if (!actor) return fail(403, 'forbidden');
    const { username } = body;

    // GUARD: Admin cannot delete themselves
    if (actor.username === username) return fail(403, 'cannot_delete_self');

    const users = _get(DB.USERS) || [];

    // GUARD: Cannot delete the last remaining admin
    const admins = users.filter(u => u.role === 'Admin');
    const target = users.find(u => u.username === username);
    if (!target) return fail(404, 'not_found');
    if (target.role === 'Admin' && admins.length <= 1) return fail(403, 'last_admin');

    _save(DB.USERS, users.filter(u => u.username !== username));
    auditLog(`User account permanently deleted: ${username}`, actor.username);
    return mockResponse({ status:'ok' });
}

// ── GET /api/admin/logs ───────────────────────────────────────────────
async function handleAdminLogs() {
    if (!requireSession('Admin')) return fail(403, 'forbidden');
    return mockResponse(_get(DB.LOGS) || []);
}

// ── POST /api/admin/backup ────────────────────────────────────────────
async function handleAdminBackup() {
    const actor = requireSession('Admin');
    if (!actor) return fail(403, 'forbidden');

    const data = {
        exportedAt: _now(),
        users:     (_get(DB.USERS)    || []).map(({ username, role, locked }) => ({ username, role, locked })),
        files:     (_get(DB.FILES)    || []).map(({ id, name, owner, requiredRole }) => ({ id, name, owner, requiredRole })),
        auditLogs: (_get(DB.LOGS)     || []),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `aegisguard_backup_${Date.now()}.json`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);

    auditLog('System backup exported', actor.username);
    return mockResponse({ status:'ok' });
}

// ── POST /api/admin/set_security ──────────────────────────────────────
async function handleSetSecurity(body) {
    const actor = requireSession('Admin');
    if (!actor) return fail(403, 'forbidden');
    const { q1, a1, q2, a2, q3, a3 } = body;
    if (!q1||!a1||!q2||!a2||!q3||!a3) return fail(400, 'missing_fields');

    const sec = _get(DB.SECURITY) || {};
    sec[actor.username] = {
        q1, a1: a1.toLowerCase().trim(),
        q2, a2: a2.toLowerCase().trim(),
        q3, a3: a3.toLowerCase().trim(),
    };
    _save(DB.SECURITY, sec);
    auditLog('Security questions configured', actor.username);
    return mockResponse({ status:'ok' });
}

// ── GET /api/admin/get_security_questions ─────────────────────────────
async function handleGetSecurityQuestions(url) {
    const username = new URL(url, 'http://x').searchParams.get('username');
    const users    = _get(DB.USERS) || [];
    const user     = users.find(u => u.username === username);
    if (!user || user.role !== 'Admin') return fail(403, 'not_admin');

    const sec   = _get(DB.SECURITY) || {};
    const entry = sec[username] || {
        q1: "What is the security system name?",
        a1: "aegisguard",
        q2: "What is the default admin role?",
        a2: "admin",
        q3: "What is the emergency system keyword?",
        a3: "secure"
    };
    return mockResponse({ status:'success', q1:entry.q1, q2:entry.q2, q3:entry.q3 });
}

// ── POST /api/admin/verify_security ──────────────────────────────────
async function handleVerifySecurity(body) {
    const { username, a1, a2, a3 } = body;
    const users  = _get(DB.USERS) || [];
    const user   = users.find(u => u.username === username);
    const sec    = _get(DB.SECURITY) || {};
    const entry  = sec[username] || {
        q1: "What is the security system name?",
        a1: "aegisguard",
        q2: "What is the default admin role?",
        a2: "admin",
        q3: "What is the emergency system keyword?",
        a3: "secure"
    };

    if (!user) return fail(404, 'not_found');
    if (user.role !== 'Admin') return fail(403, 'not_admin');

    const ok = entry.a1 === a1.toLowerCase().trim() &&
               entry.a2 === a2.toLowerCase().trim() &&
               entry.a3 === a3.toLowerCase().trim();

    if (!ok) {
        auditLog('Failed security Q verification', username);
        return fail(401, 'wrong_answers');
    }

    // Unlock user on correct verification
    user.locked = false;
    user.accessExpires = null;
    _save(DB.USERS, users);

    const failed = _get(DB.FAILED) || {};
    failed[username] = 0;
    _save(DB.FAILED, failed);

    setSession(username, user.role);
    auditLog('Security Q login — account unlocked & password change required', username);
    return mockResponse({ status:'success', role:user.role, forcePasswordChange:true });
}

// ═══════════════════════════════════════════════════════════════════
//  FETCH INTERCEPTOR
// ═══════════════════════════════════════════════════════════════════
const _realFetch = window.fetch.bind(window);

window.fetch = async function(input, init = {}) {
    const url    = typeof input === 'string' ? input : input.url;
    const method = (init.method || 'GET').toUpperCase();

    if (!url.startsWith('/api')) return _realFetch(input, init);

    // Parse body once
    let body = {};
    if (init.body) {
        try { body = Object.fromEntries(new URLSearchParams(init.body.toString())); }
        catch(e) {}
    }

    try {
        if (url === '/api/login'                                   && method==='POST') return handleLogin(body);
        if (url === '/api/unlock_request'                          && method==='POST') return handleUnlockRequest(body);
        if (url === '/api/stats'                                   && method==='GET')  return handleStats();
        if (url === '/api/change_password'                         && method==='POST') return handleChangePassword(body);
        if (url === '/api/directory'                               && method==='GET')  return handleDirectory();
        if (url === '/api/upload'                                  && method==='POST') return handleUpload(body);
        if (url.startsWith('/api/files')                           && method==='GET')  return handleListFiles(url);
        if (url.startsWith('/api/file/content')                    && method==='GET')  return handleFileContent(url);
        if (url === '/api/delete'                                  && method==='POST') return handleDelete(body);
        if (url === '/api/register'                                && method==='POST') return handleRegister(body);
        if (url === '/api/admin/users'                             && method==='GET')  return handleAdminUsers();
        if (url === '/api/admin/unlock_requests'                   && method==='GET')  return handleAdminUnlockRequests();
        if (url === '/api/admin/unlock'                            && method==='POST') return handleAdminUnlock(body);
        if (url === '/api/admin/lock'                              && method==='POST') return handleAdminLock(body);
        if (url === '/api/admin/reject_request'                    && method==='POST') return handleAdminRejectRequest(body);
        if (url === '/api/admin/deleteUser'                        && method==='POST') return handleAdminDeleteUser(body);
        if (url === '/api/admin/logs'                              && method==='GET')  return handleAdminLogs();
        if (url === '/api/admin/backup'                            && method==='POST') return handleAdminBackup();
        if (url === '/api/admin/set_security'                      && method==='POST') return handleSetSecurity(body);
        if (url.startsWith('/api/admin/get_security_questions')    && method==='GET')  return handleGetSecurityQuestions(url);
        if (url === '/api/admin/verify_security'                   && method==='POST') return handleVerifySecurity(body);
    } catch(err) {
        console.error('[MockBackend] Error in', url, err);
        return fail(500, 'internal_error');
    }

    console.warn('[MockBackend] Unhandled route:', method, url);
    return fail(404, 'not_found');
};

// ─── Boot ─────────────────────────────────────────────────────────────
initDB();
console.log(
    '%c[AegisGuard] Client-side backend v2.1 ready — No server required.',
    'color:#D9A74A; font-weight:bold; font-size:13px;'
);
