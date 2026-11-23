// ── THEME TOGGLE: Light/Dark Mode ──

function updateThemeToggleIcons(theme) {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    if (theme === 'light') {
        sunIcons.forEach(icon => icon.style.display = 'none');
        moonIcons.forEach(icon => icon.style.display = 'block');
    } else {
        sunIcons.forEach(icon => icon.style.display = 'block');
        moonIcons.forEach(icon => icon.style.display = 'none');
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeToggleIcons('light');
} else {
    document.body.classList.remove('light-mode');
    updateThemeToggleIcons('dark');
}

function toggleTheme() {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeToggleIcons('dark');
    } else {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeToggleIcons('light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
    document.getElementById('dashboardThemeToggleBtn').addEventListener('click', toggleTheme);
    
    // Ticking Live Console Clock
    function updateClock() {
        const clockEl = document.getElementById('console-clock');
        if (clockEl) {
            const now = new Date();
            const timeString = now.toTimeString().split(' ')[0];
            clockEl.textContent = timeString;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Wire up tab switching clicks
    document.querySelectorAll('.sidebar-nav-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
            // Close mobile menu if open
            document.querySelector('.dashboard-sidebar').classList.remove('active');
            document.getElementById('sidebar-overlay').classList.remove('active');
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (mobileMenuBtn && sidebar && overlay) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
});

// ── PAGE LOADER: hide cleanly on page load ──
function removePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader && !loader.classList.contains('hide')) {
        loader.classList.add('hide');
        setTimeout(() => { try { loader.remove(); } catch(e){} }, 700);
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(removePageLoader, 1000);
} else {
    window.addEventListener('load', () => setTimeout(removePageLoader, 1000));
}
// Absolute safety fallback timer (max 2 seconds)
setTimeout(removePageLoader, 2000);

function showNotification(msg, type='info') {
    const bar = document.getElementById('notification-bar');
    bar.textContent = msg;
    bar.className = 'notification ' + type;
    bar.style.display = 'block';
    setTimeout(() => { bar.style.display = 'none'; }, 3000);
}

// Track current logged-in user
let currentUserRole = '';
let currentUsername = '';
// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    const fd = new URLSearchParams();
    fd.append('username', u);
    fd.append('password', p);

    const res = await fetch('/api/login', { method: 'POST', body: fd });
    const data = await res.json();

    if(res.ok) {
        currentUserRole = data.role;
        currentUsername = u;
        document.getElementById('header-username').textContent = u;
        document.getElementById('user-role').textContent = data.role;
        // Hide login, show dashboard
        const loginView = document.getElementById('login-view');
        const dashView  = document.getElementById('dashboard-view');
        loginView.style.display = 'none';
        loginView.classList.add('hidden');
        loginView.classList.remove('active');
        dashView.classList.remove('hidden');
        dashView.classList.add('active');
        dashView.style.display = 'grid';
        switchTab('tab-dashboard');
        configureSidebarNavigation(data.role);

        // Show role-based stats bar
        if (data.role === 'Admin') {
            const statsBar = document.getElementById('stats-bar-admin');
            statsBar.classList.remove('hidden');
            statsBar.style.display = 'grid';
        } else {
            const statsBar = document.getElementById('stats-bar-user');
            statsBar.classList.remove('hidden');
            statsBar.style.display = 'grid';
        }

        // Guest restriction: hide upload form
        if (data.role === 'Guest') {
            document.getElementById('guest-upload-notice').classList.remove('hidden');
            document.getElementById('upload-form-wrapper').style.display = 'none';
        } else {
            document.getElementById('guest-upload-notice').classList.add('hidden');
            document.getElementById('upload-form-wrapper').style.display = '';
        }

        if(data.role === 'Admin') {
            document.getElementById('admin-panel').classList.remove('hidden');
            startBadgePolling();
        } else {
            document.getElementById('admin-panel').classList.add('hidden');
        }

        loadFiles();
        loadUserDirectory();
        loadStats();
        startSessionTimeout();
        showNotification("Authentication Successful. Welcome to AegisGuard.", "success");
    } else {
        document.getElementById('login-msg').style.color = "#EF4444";
        if(data.status === 'locked' || data.status === 'admin_locked') {
            document.getElementById('login-msg').textContent = "";
            const modal = document.getElementById('locked-modal');
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            document.getElementById('locked-username').textContent = "@" + u;
            document.getElementById('locked-time').textContent = new Date().toLocaleString();
            
            const reasonTextarea = document.getElementById('unlock-reason');
            const submitBtn = document.getElementById('submitUnlockBtn');
            const modalTitle = modal.querySelector('h2');
            
            if (data.status === 'admin_locked' || data.status === 'locked') {
                modalTitle.textContent = data.status === 'admin_locked' ? "ADMIN LOCKOUT (30 MIN)" : "SECURITY LOCKOUT";
                document.getElementById('locked-username').textContent = "@" + u;
                document.getElementById('locked-time').textContent = new Date().toLocaleString();
                
                let noticeEl = document.getElementById('admin-lock-notice');
                if (!noticeEl) {
                    noticeEl = document.createElement('div');
                    noticeEl.id = 'admin-lock-notice';
                    noticeEl.style.cssText = 'color:#7DD3FC; font-size:0.9em; margin-bottom:15px; text-align:left; background:rgba(14, 165, 233, 0.08); border:1px solid rgba(14, 165, 233, 0.3); padding:12px; border-radius:6px;';
                    reasonTextarea.parentNode.insertBefore(noticeEl, reasonTextarea);
                }
                
                noticeEl.style.display = 'block';
                noticeEl.innerHTML = `
                    <div style="font-weight:600; color:#E2E8F0; margin-bottom:6px;">🛡️ Account Security Recovery:</div>
                    <div style="font-size:0.85em; color:#8B9BB4; margin-bottom:10px;">Recover access instantly by answering your Admin Security Questions.</div>
                    <button type="button" id="openSecQFromLockoutBtn" class="btn-primary btn-sm" style="background:#0EA5E9; color:#fff; border:none; width:100%; font-weight:bold; cursor:pointer; padding:8px;">🔑 Unlock with Security Questions</button>
                `;
                
                setTimeout(() => {
                    const secBtn = document.getElementById('openSecQFromLockoutBtn');
                    if (secBtn) {
                        secBtn.onclick = () => {
                            modal.classList.add('hidden');
                            modal.style.display = 'none';
                            document.getElementById('forgotPasswordLink').click();
                            document.getElementById('fp-username').value = u;
                            document.getElementById('fp-next').click();
                        };
                    }
                }, 50);

                if (data.status === 'admin_locked') {
                    reasonTextarea.style.display = 'none';
                    reasonTextarea.value = "";
                    submitBtn.textContent = "Close";
                    submitBtn.onclick = () => {
                        modal.classList.add('hidden');
                        modal.style.display = 'none';
                    };
                } else {
                    reasonTextarea.style.display = 'block';
                    submitBtn.textContent = "Submit Request";
                    submitBtn.onclick = async () => {
                        const reason = reasonTextarea.value;
                        if(!reason) return showNotification("Please provide a reason.", "error");
                        const fdr = new URLSearchParams();
                        fdr.append('username', u);
                        fdr.append('reason', reason);
                        await fetch('/api/unlock_request', { method: 'POST', body: fdr });
                        modal.classList.add('hidden');
                        modal.style.display = 'none';
                        showNotification("Unlock request submitted to Admin.", "info");
                    };
                }
            }

        } else if (data.status === 'last_chance') {
            document.getElementById('login-msg').style.color = "var(--amber)";
            document.getElementById('login-msg').textContent = "⚠️ WARNING: Last attempt remaining! Next failure will lock your account.";
            showNotification("Warning: Last attempt remaining!", "warning");
        } else {
            document.getElementById('login-msg').style.color = "#EF4444";
            document.getElementById('login-msg').textContent = "ACCESS DENIED. Invalid Credentials.";
        }
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Clear client-side session (mock backend)
    if (typeof clearSession === 'function') clearSession();
    currentUserRole = '';
    currentUsername = '';
    clearSessionTimeout();
    stopBadgePolling();
    // Hide both stats bars
    ['stats-bar-admin', 'stats-bar-user'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.add('hidden');
        el.style.display = 'none';
    });
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('active');
    document.getElementById('login-view').style.display = '';
    document.getElementById('login-view').classList.remove('hidden');
    document.getElementById('login-view').classList.add('active');
    document.getElementById('loginForm').reset();
    document.getElementById('login-msg').textContent = "";
});

// ────── SESSION TIMEOUT (30 minutes) ──────
let sessionTimer = null;
function startSessionTimeout() {
    clearSessionTimeout();
    sessionTimer = setTimeout(() => {
        showNotification('Session expired due to inactivity. Logging out...', 'error');
        setTimeout(() => document.getElementById('logoutBtn').click(), 2000);
    }, 30 * 60 * 1000);
}
function clearSessionTimeout() { if (sessionTimer) clearTimeout(sessionTimer); }
// Reset timer on any user activity
['click','keydown','mousemove'].forEach(e =>
    document.addEventListener(e, () => { if (currentUsername) startSessionTimeout(); }, { passive: true })
);

// ────── STATS BAR ──────
async function loadStats() {
    const res = await fetch('/api/stats');
    if (!res.ok) return;
    const d = await res.json();

    if (currentUserRole === 'Admin') {
        // Admin sees all stats
        document.getElementById('stat-users').textContent  = d.totalUsers;
        document.getElementById('stat-locked').textContent = d.lockedUsers;
        document.getElementById('stat-files').textContent  = d.totalFiles;
        document.getElementById('stat-reqs').textContent   = d.pendingRequests;
        // Update badge
        const badge = document.getElementById('req-badge');
        if (d.pendingRequests > 0) {
            badge.textContent = d.pendingRequests;
            badge.style.display = 'inline';
        } else {
            badge.style.display = 'none';
        }
    } else {
        // Non-admin only sees file count
        document.getElementById('stat-files-user').textContent = d.totalFiles;
    }
}

// ────── BADGE POLLING (Admin only, every 30s) ──────
let badgeInterval = null;
function startBadgePolling() {
    stopBadgePolling();
    badgeInterval = setInterval(loadStats, 30000);
}
function stopBadgePolling() { if (badgeInterval) clearInterval(badgeInterval); }

// ────── PASSWORD STRENGTH ──────
document.getElementById('cp-new').addEventListener('input', function() {
    const val = this.value;
    let bar = document.getElementById('pass-strength-bar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'pass-strength-bar';
        bar.style.cssText = 'height:4px; border-radius:4px; margin:-8px 0 10px; transition:all 0.3s;';
        this.parentNode.insertBefore(bar, this.nextSibling);
    }
    let strength = 0;
    if (val.length >= 4) strength++;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;
    const colors = ['', '#EF4444', '#FBBF24', '#FBBF24', '#10B981', '#2DD4BF'];
    const widths = ['0%', '20%', '40%', '60%', '80%', '100%'];
    bar.style.width  = widths[strength];
    bar.style.background = colors[strength] || 'transparent';
});

// Change Password
document.getElementById('changePassBtn').addEventListener('click', () => {
    const modal = document.getElementById('change-pass-modal');
    document.getElementById('cp-username').textContent = currentUsername;
    document.getElementById('cp-old').value = '';
    document.getElementById('cp-new').value = '';
    document.getElementById('cp-confirm').value = '';
    document.getElementById('cp-msg').textContent = '';
    document.getElementById('cp-old-group').style.display = 'block';
    document.getElementById('cp-cancel').style.display = 'inline-block';
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
});

document.getElementById('cp-cancel').addEventListener('click', () => {
    const modal = document.getElementById('change-pass-modal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
});

document.getElementById('cp-submit').addEventListener('click', async () => {
    const oldPass = document.getElementById('cp-old').value;
    const newPass = document.getElementById('cp-new').value;
    const confirm = document.getElementById('cp-confirm').value;
    const msg = document.getElementById('cp-msg');

    if (!oldPass || !newPass || !confirm) { msg.textContent = 'All fields are required.'; return; }
    if (newPass !== confirm) { msg.textContent = 'New passwords do not match.'; return; }
    if (newPass.length < 4) { msg.textContent = 'Password must be at least 4 characters.'; return; }

    const fd = new URLSearchParams();
    fd.append('old_password', oldPass);
    fd.append('new_password', newPass);

    const res = await fetch('/api/change_password', { method: 'POST', body: fd });
    const data = await res.json();

    if (res.ok) {
        document.getElementById('change-pass-modal').classList.add('hidden');
        document.getElementById('change-pass-modal').style.display = 'none';
        showNotification('Password updated successfully!', 'success');
    } else if (data.status === 'wrong_password') {
        msg.textContent = 'Current password is incorrect.';
    } else if (data.status === 'weak_password') {
        msg.textContent = 'New password is too short (min 4 chars).';
    } else {
        msg.textContent = 'Failed to update password.';
    }
});

async function loadUserDirectory() {
    const res = await fetch('/api/directory');
    if(res.ok) {
        const users = await res.json();
        const list = document.getElementById('user-recipient-list');
        list.innerHTML = "";
        users.forEach(u => {
            list.innerHTML += `<option value="User:${u.username}">@${u.username} (${u.role})</option>`;
        });
    }
}

// File Management
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileSelector');
    if (!fileInput.files.length) {
        return showNotification("Please select a file to upload.", "error");
    }
    const file = fileInput.files[0];
    const reqRole = document.getElementById('reqRole').value;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
        const fd = new URLSearchParams();
        fd.append('filename', file.name);
        fd.append('content', event.target.result);
        fd.append('reqRole', reqRole);

        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if(res.ok) {
            showNotification("File encrypted and uploaded securely.", "success");
            document.getElementById('uploadForm').reset();
            loadFiles();
            loadStats();
        } else {
            showNotification("Upload failed. Server returned error.", "error");
        }
    };
    reader.onerror = () => showNotification("Error reading file.", "error");
    reader.readAsDataURL(file);
});

document.getElementById('searchBox').addEventListener('input', (e) => {
    loadFiles(e.target.value);
});

async function loadFiles(query = "") {
    const res = await fetch('/api/files?q=' + encodeURIComponent(query));
    if(res.ok) {
        const files = await res.json();
        const list = document.getElementById('fileList');
        list.innerHTML = "";
        files.forEach(f => {
            let recipientStr = f.role.startsWith("Role:") ? f.role.substring(5) + "s" : "@" + f.role.substring(5);
            if(f.role === "Role:All") recipientStr = "Everyone (Global)";
            list.innerHTML += `
                <div class="file-item">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <p style="color:#fff; font-size:1.1em;"><strong>📄 ${f.name}</strong></p>
                        <div>
                            <button onclick="openFile('${f.id}', '${f.name}')" class="btn-primary btn-sm" style="background:transparent; border:1px solid #2DD4BF; color:#2DD4BF; margin-right:5px; display:inline-block;">Open</button>
                            ${currentUserRole === 'Admin' ? `<button onclick="deleteFile('${f.id}')" class="btn-danger btn-sm" style="display:inline-block;">Delete</button>` : ''}
                        </div>
                    </div>
                    <div style="font-size: 0.85em; margin-top: 8px; background: rgba(0,0,0,0.2); padding: 6px; border-radius: 4px;">
                        <span style="color: #10B981;">Sent By: @${f.owner}</span> 
                        <span style="color:#8B9BB4;"> ➔ </span>
                        <span style="color: #2DD4BF;">Delivered To: ${recipientStr}</span>
                    </div>
                </div>
            `;
        });
    }
}

async function openFile(id, name) {
    const res = await fetch('/api/file/content?id=' + id);
    if(res.ok) {
        const text = await res.text();
        document.getElementById('viewer-title').textContent = "📄 " + name;
        const viewerContent = document.getElementById('viewer-content');
        
        // Reset styles
        viewerContent.style.padding = '15px';
        viewerContent.style.background = '#030B14';
        
        if (text.startsWith('data:image/')) {
            viewerContent.innerHTML = `<img src="${text}" style="max-width:100%; height:auto; border-radius:4px; display:block; margin:0 auto;" />`;
        } else if (text.startsWith('data:application/pdf')) {
            viewerContent.style.padding = '0';
            viewerContent.innerHTML = `<iframe src="${text}" style="width:100%; height:60vh; border:none; border-radius:4px;"></iframe>`;
        } else if (text.startsWith('data:text/') || text.startsWith('data:application/json')) {
            try {
                const base64str = text.split(',')[1];
                const decoded = decodeURIComponent(escape(window.atob(base64str)));
                viewerContent.textContent = decoded;
            } catch (e) {
                viewerContent.textContent = "Error decoding file text.";
            }
        } else if (text.startsWith('data:')) {
            viewerContent.innerHTML = `
                <div style="text-align:center; padding: 30px;">
                    <p style="margin-bottom:15px; color:#E2E8F0; font-size:1.1em;">This file type cannot be previewed inline.</p>
                    <a href="${text}" download="${name}" class="btn-primary" style="display:inline-block; text-decoration:none;">📥 Download File</a>
                </div>
            `;
        } else {
            viewerContent.textContent = text;
        }
        
        const modal = document.getElementById('file-viewer-modal');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    } else {
        showNotification("Failed to open file.", "error");
    }
}

async function deleteFile(id) {
    const fd = new URLSearchParams();
    fd.append('fileId', id);
    const res = await fetch('/api/delete', { method: 'POST', body: fd });
    if(res.ok) {
        showNotification("File deleted securely.", "success");
        loadFiles(document.getElementById('searchBox').value);
        loadStats();
    } else {
        showNotification("Unauthorized: Admins only.", "error");
    }
}

// Admin Features
document.getElementById('backupBtn').addEventListener('click', async () => {
    const res = await fetch('/api/admin/backup', { method: 'POST' });
    if(res.ok) showNotification("System Backup & Reports Generated.", "success");
});

document.getElementById('adminRegisterBtn').addEventListener('click', async () => {
    const u = document.getElementById('new-username').value;
    const p = document.getElementById('new-password').value;
    if(!u || !p) return showNotification("Please enter username and password", "error");

    const fd = new URLSearchParams();
    fd.append('username', u);
    fd.append('password', p);

    const res = await fetch('/api/register', { method: 'POST', body: fd });
    if(res.ok) {
        const data = await res.json();
        showNotification("Account created! Role: " + data.role, "success");
        document.getElementById('new-username').value = "";
        document.getElementById('new-password').value = "";
        if(document.getElementById('admin-users-list').innerHTML !== "") {
            document.getElementById('viewUsersBtn').click();
        }
    } else {
        showNotification("Failed to create account.", "error");
    }
});

// Track which admin panel is currently open
let activeAdminView = null;

function renderAdminList(html, title = '', targetId = 'admin-users-list') {
    const div = document.getElementById(targetId);
    if (!div) return;
    const closeBtn = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid var(--border);">
        <span style="color:var(--primary); font-size:0.9em; font-weight:600;">${title}</span>
        <button onclick="closeAdminList('${targetId}')" style="background:transparent; border:1px solid var(--border-bright); color:var(--text-muted); padding:3px 10px; border-radius:6px; cursor:pointer; font-size:0.85em;">✕ Close</button>
    </div>`;
    div.innerHTML = closeBtn + html;
}

function closeAdminList(targetId = 'admin-users-list') {
    const div = document.getElementById(targetId);
    if (div) div.innerHTML = '';
    activeAdminView = null;
}

document.getElementById('viewUsersBtn').addEventListener('click', async () => {
    activeAdminView = 'users';
    document.getElementById('viewUsersBtn').classList.remove('outline-btn');
    document.getElementById('viewRequestsBtn').classList.add('outline-btn');
    const res = await fetch('/api/admin/users');
    if (!res.ok) return;
    const users = await res.json();

    const rows = users.map(u => {
        let uname = u.split('|')[0].trim();
        let isSelf = uname === currentUsername;
        let selfTag = isSelf ? ` <span style="font-size:0.75em; background:rgba(45,212,191,0.15); color:#2DD4BF; padding:2px 6px; border-radius:4px;">You</span>` : '';

        if (u.includes("LOCKED")) {
            return `<div style="margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; padding:8px; background:rgba(239,68,68,0.05); border-radius:6px;">
                        <span style="color:#FCA5A5;">🔒 ${u}${selfTag}</span>
                        <div>
                            <button onclick="unlockUser('${uname}')" class="btn-primary btn-sm" style="margin-left:10px;">Unlock</button>
                            ${!isSelf ? `<button onclick="deleteUserAccount('${uname}')" class="btn-danger btn-sm" style="margin-left:5px;">Delete</button>` : ''}
                        </div>
                    </div>`;
        } else if (u.includes("Status: Online")) {
            return `<div style="margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; padding:8px; background:rgba(16,185,129,0.05); border-left:3px solid #10B981; border-radius:6px;">
                        <span style="color:#E2E8F0;">🟢 ${u}${selfTag}</span>
                        <div>
                            ${!isSelf ? `
                                <button onclick="lockUser('${uname}')" class="btn-danger btn-sm" style="margin-left:10px; color:#FCA5A5; border-color:#FCA5A5;">Block</button>
                                <button onclick="deleteUserAccount('${uname}')" class="btn-danger btn-sm" style="margin-left:5px;">Delete</button>
                            ` : `<span style="font-size:0.8em; color:#8B9BB4; margin-left:10px;">Active Session</span>`}
                        </div>
                    </div>`;
        }
        return `<div style="margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; padding:8px; background:rgba(255,255,255,0.02); border-radius:6px;">
                    <span style="color:#8B9BB4;">⚪ ${u}${selfTag}</span>
                    <div>
                        ${!isSelf ? `
                            <button onclick="lockUser('${uname}')" class="btn-danger btn-sm" style="margin-left:10px; color:#FCA5A5; border-color:#FCA5A5;">Block</button>
                            <button onclick="deleteUserAccount('${uname}')" class="btn-danger btn-sm" style="margin-left:5px;">Delete</button>
                        ` : `<span style="font-size:0.8em; color:#8B9BB4; margin-left:10px;">Active Session</span>`}
                    </div>
                </div>`;
    }).join('');

    renderAdminList(rows || '<p style="color:#8B9BB4;">No users found.</p>', '👥 All Users');
});

document.getElementById('viewRequestsBtn').addEventListener('click', async () => {
    activeAdminView = 'requests';
    document.getElementById('viewRequestsBtn').classList.remove('outline-btn');
    document.getElementById('viewUsersBtn').classList.add('outline-btn');
    const res = await fetch('/api/admin/unlock_requests');
    if (!res.ok) { showNotification("Failed to load requests.", "error"); return; }

    let reqs;
    try { reqs = await res.json(); }
    catch(e) { showNotification("Invalid response from server.", "error"); return; }

    if (reqs.length === 0) {
        renderAdminList('<p style="color:#10B981;">✅ No pending unlock requests.</p>', '📨 Unlock Requests');
        return;
    }

    const rows = reqs.map(r => `
        <div style="margin-bottom:12px; background:rgba(239,68,68,0.05); padding:12px; border-left:3px solid #EF4444; border-radius:4px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <strong style="color:#FCA5A5;">🔒 @${r.username}</strong>
                <span style="font-size:0.8em; color:#8B9BB4;">📅 ${r.timestamp}</span>
            </div>
            <p style="font-size:0.9em; margin-bottom:10px; color:#E2E8F0; padding:6px; background:rgba(0,0,0,0.2); border-radius:4px;">"${r.reason}"</p>
            <div style="display:flex; gap:8px;">
                <button onclick="approveUnlock('${r.username}')" class="btn-primary btn-sm" style="background:#10B981; color:#fff; border:none;">✓ Approve Unlock</button>
                <button onclick="rejectUnlockReq('${r.username}')" class="btn-sm" style="background:transparent; border:1px solid #EF4444; color:#FCA5A5; border-radius:6px; cursor:pointer; padding:6px 12px;">✗ Reject</button>
            </div>
        </div>
    `).join('');

    renderAdminList(rows, '📨 Unlock Requests (' + reqs.length + ' pending)');
});

let selectedTimerMins = 0; // 0 means infinity / permanent by default
let timerTargetUser = '';

async function approveUnlock(username) {
    timerTargetUser = username;
    document.getElementById('timer-target-user').textContent = username;
    
    // Reset timer modal state
    selectedTimerMins = 0;
    document.getElementById('timer-custom-minutes').value = '';
    document.getElementById('timer-new-password').value = '';
    
    // Reset preset buttons highlight ( Infinity selected by default )
    document.querySelectorAll('.btn-timer-preset').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.mins === "0") btn.classList.add('selected');
    });
    
    // Show modal
    const modal = document.getElementById('timer-modal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

async function rejectUnlockReq(username) {
    if (!confirm("Reject unlock request for " + username + "? Their account stays blocked.")) return;
    const fd = new URLSearchParams();
    fd.append('username', username);
    const res = await fetch('/api/admin/reject_request', { method: 'POST', body: fd });
    if (res.ok) {
        showNotification("Request rejected: " + username + " remains blocked.", "info");
        document.getElementById('viewRequestsBtn').click(); // refresh
    } else {
        showNotification("Failed to reject request.", "error");
    }
}

async function unlockUser(username) {
    // Open the unlock & reset password modal for this user
    approveUnlock(username);
}

async function lockUser(username) {
    if (username === currentUsername) {
        return showNotification("Security Guard: You cannot block your own account!", "error");
    }
    if(!confirm("Are you sure you want to BLOCK " + username + "? They won't be able to log in.")) return;
    const fd = new URLSearchParams();
    fd.append('username', username);
    const res = await fetch('/api/admin/lock', { method: 'POST', body: fd });
    if(res.ok) {
        showNotification("Account blocked: " + username, "success");
        document.getElementById('viewUsersBtn').click(); // refresh list
    } else {
        const data = await res.json().catch(()=>({}));
        if (data.status === 'cannot_lock_self') {
            showNotification("Security Guard: You cannot block your own account!", "error");
        } else {
            showNotification("Failed to block user.", "error");
        }
    }
}

async function deleteUserAccount(username) {
    if (username === currentUsername) {
        return showNotification("Security Guard: You cannot delete your own account!", "error");
    }
    if(!confirm("WARNING! Are you sure you want to PERMANENTLY DELETE " + username + "?")) return;
    const fd = new URLSearchParams();
    fd.append('username', username);
    const res = await fetch('/api/admin/deleteUser', { method: 'POST', body: fd });
    if(res.ok) {
        showNotification("Account deleted: " + username, "success");
        document.getElementById('viewUsersBtn').click(); // refresh list
    } else {
        const data = await res.json().catch(()=>({}));
        if (data.status === 'cannot_delete_self') {
            showNotification("Security Guard: You cannot delete your own account!", "error");
        } else if (data.status === 'last_admin') {
            showNotification("Security Guard: Cannot delete the last remaining Admin!", "error");
        } else {
            showNotification("Failed to delete user account.", "error");
        }
    }
}

// ────── TIMER MODAL EVENT WIRING ──────
document.querySelectorAll('.btn-timer-preset').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-timer-preset').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedTimerMins = parseInt(btn.dataset.mins) || 0;
        document.getElementById('timer-custom-minutes').value = ''; // clear custom
    });
});

document.getElementById('timer-custom-minutes').addEventListener('input', (e) => {
    document.querySelectorAll('.btn-timer-preset').forEach(b => b.classList.remove('selected'));
    selectedTimerMins = parseInt(e.target.value) || 0;
});

document.getElementById('timer-cancel').addEventListener('click', () => {
    const modal = document.getElementById('timer-modal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
});

document.getElementById('timer-submit').addEventListener('click', async () => {
    const modal = document.getElementById('timer-modal');
    modal.classList.add('hidden');
    modal.style.display = 'none';

    const newPassInput = document.getElementById('timer-new-password');
    const newPass = newPassInput ? newPassInput.value.trim() : '';

    const fd = new URLSearchParams();
    fd.append('username', timerTargetUser);
    if (selectedTimerMins > 0) {
        fd.append('duration', selectedTimerMins);
    }
    if (newPass) {
        fd.append('newPassword', newPass);
    }

    const res = await fetch('/api/admin/unlock', { method: 'POST', body: fd });
    if (res.ok) {
        let passNote = newPass ? ` & password reset to '${newPass}'` : '';
        if (selectedTimerMins > 0) {
            showNotification(`✅ Unlocked: ${timerTargetUser} for ${selectedTimerMins} mins${passNote}`, "success");
        } else {
            showNotification(`✅ Unlocked: ${timerTargetUser}${passNote}`, "success");
        }
        loadStats();
        if (activeAdminView === 'requests') {
            document.getElementById('viewRequestsBtn').click();
        } else {
            document.getElementById('viewUsersBtn').click();
        }
    } else {
        showNotification("Failed to unlock account.", "error");
    }
});

// ────── AUDIT LOGS FETCH & RENDER ──────
document.getElementById('viewLogsBtn').addEventListener('click', async () => {
    activeAdminView = 'logs';
    const res = await fetch('/api/admin/logs');
    if (!res.ok) { showNotification("Failed to load audit logs.", "error"); return; }

    const logs = await res.json();
    if (logs.length === 0) {
        renderAdminList('<p style="color:#10B981; font-family:var(--font-mono); padding:10px;">✅ No audit logs recorded yet.</p>', '📜 Audit Logs', 'admin-logs-list');
        return;
    }

    const getBadgeClass = (action) => {
        const act = action.toLowerCase();
        if (act.includes("success") || act.includes("unlocked") || act.includes("registered")) return "badge-success";
        if (act.includes("alert") || act.includes("lock") || act.includes("block") || act.includes("failed")) return "badge-danger";
        if (act.includes("expired") || act.includes("timeout")) return "badge-warning";
        return "badge-info";
    };

    let logHTML = `
        <div style="margin-bottom:15px; display:flex; gap:10px;">
            <input type="text" id="logSearchBox" placeholder="Filter logs by user or action..." style="padding:8px 12px; background:var(--bg-input); border:1px solid var(--border); color:var(--text-bright); border-radius:6px; flex:1; font-family:var(--font-mono); font-size:0.85em;">
        </div>
        <div class="logs-table-wrapper">
            <table class="logs-table">
                <thead>
                    <tr>
                        <th style="width: 25%">Timestamp</th>
                        <th style="width: 25%">User</th>
                        <th style="width: 50%">Action / Event</th>
                    </tr>
                </thead>
                <tbody id="logsTableBody">
                    ${logs.map(log => `
                        <tr class="log-row">
                            <td style="color:var(--text-muted); font-size:0.9em; white-space:nowrap;">${log.timestamp}</td>
                            <td style="color:var(--primary); font-weight:600;">@${log.username}</td>
                            <td>
                                <span class="badge-action ${getBadgeClass(log.action)}">${log.action}</span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    renderAdminList(logHTML, '📜 Live Audit Logs & Activity Tracker', 'admin-logs-list');

    document.getElementById('logSearchBox').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.log-row').forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// ────── ADMIN SECURITY QUESTIONS & FORGOT PASSWORD ──────
const _openSecModal = () => {
    document.getElementById('setup-security-modal').classList.remove('hidden');
    document.getElementById('setup-security-modal').style.display = 'flex';
};
document.getElementById('setupSecurityBtn').addEventListener('click', _openSecModal);
// Also bind the settings tab button (it has a different id to avoid duplicates)
const setupBtn2 = document.getElementById('setupSecurityBtn2');
if (setupBtn2) setupBtn2.addEventListener('click', _openSecModal);
document.getElementById('ss-cancel').addEventListener('click', () => {
    document.getElementById('setup-security-modal').classList.add('hidden');
    document.getElementById('setup-security-modal').style.display = 'none';
});
document.getElementById('ss-submit').addEventListener('click', async () => {
    const q1 = document.getElementById('ss-q1').value;
    const a1 = document.getElementById('ss-a1').value;
    const q2 = document.getElementById('ss-q2').value;
    const a2 = document.getElementById('ss-a2').value;
    const q3 = document.getElementById('ss-q3').value;
    const a3 = document.getElementById('ss-a3').value;
    
    if(!q1 || !a1 || !q2 || !a2 || !q3 || !a3) {
        document.getElementById('ss-msg').textContent = "All fields are required.";
        document.getElementById('ss-msg').style.color = "#EF4444";
        return;
    }
    
    const fd = new URLSearchParams();
    fd.append('q1', q1); fd.append('a1', a1);
    fd.append('q2', q2); fd.append('a2', a2);
    fd.append('q3', q3); fd.append('a3', a3);
    
    const res = await fetch('/api/admin/set_security', { method: 'POST', body: fd });
    if(res.ok) {
        showNotification("Security questions saved successfully.", "success");
        document.getElementById('ss-cancel').click();
    } else {
        document.getElementById('ss-msg').textContent = "Failed to save questions.";
        document.getElementById('ss-msg').style.color = "#EF4444";
    }
});

let fpUsername = "";
document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('forgot-password-modal').classList.remove('hidden');
    document.getElementById('forgot-password-modal').style.display = 'flex';
    document.getElementById('fp-step1').style.display = 'block';
    document.getElementById('fp-step2').style.display = 'none';
    document.getElementById('fp-username').value = '';
    document.getElementById('fp-msg').textContent = '';
});
document.getElementById('fp-cancel1').addEventListener('click', () => {
    document.getElementById('forgot-password-modal').classList.add('hidden');
    document.getElementById('forgot-password-modal').style.display = 'none';
});
document.getElementById('fp-cancel2').addEventListener('click', () => {
    document.getElementById('forgot-password-modal').classList.add('hidden');
    document.getElementById('forgot-password-modal').style.display = 'none';
});

document.getElementById('fp-next').addEventListener('click', async () => {
    fpUsername = document.getElementById('fp-username').value;
    if(!fpUsername) return;
    
    const res = await fetch('/api/admin/get_security_questions?username=' + encodeURIComponent(fpUsername));
    const data = await res.json();
    if(res.ok && data.status === 'success') {
        document.getElementById('fp-lbl-q1').textContent = data.q1;
        document.getElementById('fp-lbl-q2').textContent = data.q2;
        document.getElementById('fp-lbl-q3').textContent = data.q3;
        document.getElementById('fp-a1').value = '';
        document.getElementById('fp-a2').value = '';
        document.getElementById('fp-a3').value = '';
        
        document.getElementById('fp-step1').style.display = 'none';
        document.getElementById('fp-step2').style.display = 'block';
        document.getElementById('fp-msg').textContent = '';
    } else {
        document.getElementById('fp-msg').textContent = "User not found or questions not set.";
    }
});

document.getElementById('fp-verify').addEventListener('click', async () => {
    const a1 = document.getElementById('fp-a1').value;
    const a2 = document.getElementById('fp-a2').value;
    const a3 = document.getElementById('fp-a3').value;
    
    if(!a1 || !a2 || !a3) {
        document.getElementById('fp-msg').textContent = "Please answer all questions.";
        return;
    }
    
    const fd = new URLSearchParams();
    fd.append('username', fpUsername);
    fd.append('a1', a1);
    fd.append('a2', a2);
    fd.append('a3', a3);
    
    const res = await fetch('/api/admin/verify_security', { method: 'POST', body: fd });
    const data = await res.json();
    if(res.ok && data.status === 'success') {
        document.getElementById('forgot-password-modal').classList.add('hidden');
        document.getElementById('forgot-password-modal').style.display = 'none';
        
        // Login success flow
        currentUserRole = data.role;
        currentUsername = fpUsername;
        document.getElementById('header-username').textContent = fpUsername;
        document.getElementById('user-role').textContent = data.role;
        const _lv = document.getElementById('login-view');
        const _dv = document.getElementById('dashboard-view');
        _lv.style.display = 'none'; _lv.classList.add('hidden'); _lv.classList.remove('active');
        _dv.classList.remove('hidden'); _dv.classList.add('active'); _dv.style.display = 'grid';
        switchTab('tab-dashboard');
        configureSidebarNavigation(data.role);
        
        const statsBar = document.getElementById('stats-bar-admin');
        statsBar.classList.remove('hidden');
        statsBar.style.display = 'grid';
        
        document.getElementById('guest-upload-notice').classList.add('hidden');
        document.getElementById('upload-form-wrapper').style.display = '';
        document.getElementById('admin-panel').classList.remove('hidden');
        
        startBadgePolling();
        loadFiles();
        loadUserDirectory();
        loadStats();
        startSessionTimeout();
        
        showNotification("Security verification successful. Please update your password.", "success");
        if(data.forcePasswordChange) {
            document.getElementById('changePassBtn').click();
            document.getElementById('cp-old-group').style.display = 'none';
            document.getElementById('cp-old').value = 'bypass';
            document.getElementById('cp-cancel').style.display = 'none'; // Force change
        }
    } else {
        document.getElementById('fp-msg').textContent = "Incorrect answers. Verification failed.";
    }
});

// ────── SHOW PASSWORD TOGGLE ──────
document.querySelectorAll('input[type="password"]').forEach(input => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    if(input.style.flex) {
        wrapper.style.flex = input.style.flex;
    } else {
        wrapper.style.width = '100%';
        wrapper.style.marginBottom = input.style.marginBottom;
    }
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    input.style.width = '100%';

    const toggleBtn = document.createElement('span');
    toggleBtn.innerHTML = '👁️';
    toggleBtn.style.position = 'absolute';
    toggleBtn.style.right = '12px';
    toggleBtn.style.top = '50%';
    toggleBtn.style.transform = 'translateY(-50%)';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.color = '#8B9BB4';
    toggleBtn.style.fontSize = '1.1em';
    toggleBtn.style.zIndex = '10';
    wrapper.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', () => {
        if(input.type === 'password') {
            input.type = 'text';
            toggleBtn.style.opacity = '0.5';
        } else {
            input.type = 'password';
            toggleBtn.style.opacity = '1';
        }
    });
});

// ── TAB SWITCHING HELPERS ──
function switchTab(tabId) {
    // Remove active class from all nav buttons
    document.querySelectorAll('.sidebar-nav-btn[data-tab]').forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-tab') === tabId) {
            b.classList.add('active');
        }
    });

    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.classList.add('active');
        
        // Auto-load contents based on tab selection
        if (tabId === 'tab-admin') {
            document.getElementById('viewUsersBtn').click();
        } else if (tabId === 'tab-logs') {
            document.getElementById('viewLogsBtn').click();
        }
    }
}

function configureSidebarNavigation(role) {
    const uploadBtn = document.getElementById('nav-upload-btn');
    const adminBtn = document.getElementById('nav-admin-btn');
    const logsBtn = document.getElementById('nav-logs-btn');
    const adminOnlySettings = document.getElementById('settings-admin-only');

    if (role === 'Admin') {
        if (uploadBtn) uploadBtn.style.display = '';
        if (adminBtn) adminBtn.style.display = '';
        if (logsBtn) logsBtn.style.display = '';
        if (adminOnlySettings) adminOnlySettings.style.display = 'block';
    } else if (role === 'User') {
        if (uploadBtn) uploadBtn.style.display = '';
        if (adminBtn) adminBtn.style.display = 'none';
        if (logsBtn) logsBtn.style.display = 'none';
        if (adminOnlySettings) adminOnlySettings.style.display = 'none';
    } else { // Guest
        if (uploadBtn) uploadBtn.style.display = 'none';
        if (adminBtn) adminBtn.style.display = 'none';
        if (logsBtn) logsBtn.style.display = 'none';
        if (adminOnlySettings) adminOnlySettings.style.display = 'none';
    }
}
