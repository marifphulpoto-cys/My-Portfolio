document.addEventListener('DOMContentLoaded', function () {
  console.log('✅ script.js loaded');

  // ==========================================
  // 1. THEME SWITCHER LOGIC
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Dark by default
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    } else {
      document.body.classList.remove('light-theme');
      if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
    }
  }
  initTheme();

  themeToggleBtn?.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      themeToggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      themeToggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    }
  });

  // ==========================================
  // 2. ACTIVE NAVIGATION MENU
  // ==========================================
  const navLinks = document.querySelectorAll(".side-nav a");
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" || currentPage === undefined) {
    currentPage = "index.html";
  }

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ==========================================
  // 3. MOBILE SIDEBAR TOGGLE
  // ==========================================
  const toggleBtn = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  toggleBtn?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('show');
  });

  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('show');
  });

  // ==========================================
  // 4. FLIGHT DROPDOWNS & FILTERING (INDEX PAGE)
  // ==========================================
  const tripButtons = document.querySelectorAll('.trip-btn');
  const fromInput = document.getElementById('from-input');
  const toInput = document.getElementById('to-input');
  const searchFlightsBtn = document.getElementById('search-flights-btn');

  const domesticCities = ["Lahore", "Islamabad", "Karachi", "Sukkur"];
  const internationalCities = ["Dubai", "Doha", "Jeddah", "London", "Sukkur"];

  function updateCityDropdowns(type) {
    const cities = type === 'domestic' ? domesticCities : internationalCities;
    if (!fromInput || !toInput) return;
    
    fromInput.innerHTML = '';
    toInput.innerHTML = '';

    cities.forEach(city => {
      const optionFrom = document.createElement('option');
      optionFrom.value = city;
      optionFrom.textContent = city;
      fromInput.appendChild(optionFrom);

      const optionTo = document.createElement('option');
      optionTo.value = city;
      optionTo.textContent = city;
      toInput.appendChild(optionTo);
    });

    // Default selection
    if (cities.length >= 2) {
      fromInput.value = cities[0];
      toInput.value = cities[1];
    }
  }

  // Handle active class change for homepage trip buttons
  tripButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      tripButtons.forEach(b => b.classList.remove('active-trip'));
      this.classList.add('active-trip');
      const selected = this.textContent.trim().toLowerCase();
      updateCityDropdowns(selected);
    });
  });

  // Initialize dropdowns on homepage load
  if (fromInput && toInput) {
    updateCityDropdowns('domestic');
  }

  // Swap From and To locations
  const swapIcon = document.getElementById('swap-icon');
  swapIcon?.addEventListener('click', () => {
    if (fromInput && toInput) {
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
    }
  });

  // Redirect homepage search to flight-info page with query parameters
  searchFlightsBtn?.addEventListener('click', () => {
    if (!fromInput || !toInput) return;
    const activeBtn = document.querySelector('.trip-btn.active-trip');
    const type = activeBtn ? activeBtn.textContent.trim().toLowerCase() : 'domestic';
    const fromCity = fromInput.value;
    const toCity = toInput.value;
    const travelDate = document.getElementById('flight-date')?.value || '';

    if (fromCity === toCity) {
      alert("❌ From and To cities cannot be the same!");
      return;
    }

    // Redirect to flight-info.html
    window.location.href = `flight-info.html?type=${type}&from=${fromCity}&to=${toCity}&date=${travelDate}`;
  });


  // ==========================================
  // 5. FLIGHT INFO PAGE FILTERING
  // ==========================================
  if (window.location.pathname.includes('flight-info.html')) {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    const fromParam = params.get('from');
    const toParam = params.get('to');
    const dateParam = params.get('date');

    const domesticSec = document.getElementById('domestic-schedule');
    const internationalSec = document.getElementById('international-schedule');
    const allFlightRows = document.querySelectorAll('.flight-row');

    if (typeParam && fromParam && toParam) {
      // Hide sections that don't match trip type
      if (typeParam === 'domestic') {
        if (internationalSec) internationalSec.style.display = 'none';
      } else if (typeParam === 'international') {
        if (domesticSec) domesticSec.style.display = 'none';
      }

      let matchCount = 0;
      allFlightRows.forEach(row => {
        const rowType = row.dataset.type;
        const rowFrom = row.dataset.from;
        const rowTo = row.dataset.to;

        const isMatch = rowType === typeParam && rowFrom === fromParam && rowTo === toParam;
        if (isMatch) {
          row.style.display = '';
          row.classList.add('highlighted-row');
          // Add border style for highlighting matching flight
          row.style.border = '2px solid var(--accent-color)';
          row.style.backgroundColor = 'var(--accent-glow)';
          matchCount++;
        } else {
          row.style.display = 'none';
        }
      });

      // Show filter alert box
      const infoSection = document.getElementById('flight-info-section');
      const filterAlert = document.createElement('div');
      filterAlert.className = 'support-text';
      filterAlert.style.marginBottom = '20px';
      filterAlert.style.display = 'flex';
      filterAlert.style.justifyContent = 'space-between';
      filterAlert.style.alignItems = 'center';

      if (matchCount > 0) {
        filterAlert.innerHTML = `
          <span>🔍 Showing flights from <strong>${fromParam}</strong> to <strong>${toParam}</strong> (${typeParam.toUpperCase()})${dateParam ? ` on <strong>${dateParam}</strong>` : ''}.</span>
          <button id="clear-filter" class="book-now" style="padding: 6px 12px; font-size:12px;">Show All</button>
        `;
      } else {
        filterAlert.innerHTML = `
          <span>❌ No direct flights found from <strong>${fromParam}</strong> to <strong>${toParam}</strong> (${typeParam.toUpperCase()})${dateParam ? ` on <strong>${dateParam}</strong>` : ''}.</span>
          <button id="clear-filter" class="book-now" style="padding: 6px 12px; font-size:12px;">Show All</button>
        `;
        // Show all so they can check other flights
        allFlightRows.forEach(row => {
          row.style.display = '';
          row.style.border = '';
          row.style.backgroundColor = '';
        });
        if (domesticSec) domesticSec.style.display = '';
        if (internationalSec) internationalSec.style.display = '';
      }
      infoSection?.insertBefore(filterAlert, infoSection.firstChild);

      document.getElementById('clear-filter')?.addEventListener('click', () => {
        window.location.href = 'flight-info.html';
      });
    }
  }


  // ==========================================
  // 6. BOOKING MODAL FILL & SUBMIT LOGIC
  // ==========================================
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.querySelector('.close-btn');
  const bookingForm = document.getElementById('booking-form');

  // Open booking modal and pre-fill data
  document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('book-now')) {
      const btn = e.target;
      const row = btn.closest('.flight-row');
      
      if (row) {
        const fromVal = row.dataset.from || '';
        const toVal = row.dataset.to || '';
        const flightNum = row.cells[0]?.textContent || '';
        const airline = row.cells[1]?.textContent || '';
        const priceVal = row.cells[8]?.textContent || '';

        // Extract date from table (e.g. "10:00 AM (12/11/2025)" -> "2025-11-12")
        const depCellText = row.cells[4]?.textContent || '';
        let dateVal = '';
        const dateMatch = depCellText.match(/\((\d{2})\/(\d{2})\/(\d{4})\)/);
        if (dateMatch) {
          dateVal = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`; // yyyy-mm-dd
        }

        // Set inputs in Booking Form (using newly added IDs)
        const inputFrom = document.getElementById('book-from');
        const inputTo = document.getElementById('book-to');
        const inputDate = document.getElementById('book-date');
        const inputFlightNum = document.getElementById('book-flight-num');
        const inputPrice = document.getElementById('book-price');

        if (inputFrom) inputFrom.value = fromVal;
        if (inputTo) inputTo.value = toVal;
        if (inputDate) inputDate.value = dateVal;
        if (inputFlightNum) inputFlightNum.value = flightNum;
        if (inputPrice) inputPrice.value = priceVal;
      }

      if (modal) modal.style.display = 'flex';
    }

    if (e.target === closeBtn || e.target === modal) {
      if (modal) modal.style.display = 'none';
    }
  });

  // Handle booking form submission
  bookingForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('book-name')?.value || '';
    const dob = document.getElementById('book-dob')?.value || '';
    const gender = document.getElementById('book-gender')?.value || '';
    const nationality = document.getElementById('book-nationality')?.value || '';
    const passport = document.getElementById('book-passport')?.value || '';
    const email = document.getElementById('book-email')?.value || '';
    const phone = document.getElementById('book-phone')?.value || '';
    const fromCity = document.getElementById('book-from')?.value || '';
    const toCity = document.getElementById('book-to')?.value || '';
    const travelDate = document.getElementById('book-date')?.value || '';
    const returnDate = document.getElementById('book-return')?.value || '';
    const flightClass = document.getElementById('book-class')?.value || '';
    const adults = parseInt(document.getElementById('book-adults')?.value || '1', 10);
    const children = parseInt(document.getElementById('book-children')?.value || '0', 10);
    const infants = parseInt(document.getElementById('book-infants')?.value || '0', 10);
    const checkedBags = parseInt(document.getElementById('book-bags-checked')?.value || '0', 10);
    const carryBags = parseInt(document.getElementById('book-bags-carry')?.value || '0', 10);
    const luggageWeight = parseInt(document.getElementById('book-bags-weight')?.value || '0', 10);
    const meal = document.getElementById('book-meal')?.value || '';
    const cardName = document.getElementById('book-card-name')?.value || '';
    const flightNum = document.getElementById('book-flight-num')?.value || 'PK302';
    const flightPriceText = document.getElementById('book-price')?.value || 'Rs. 8,500';

    // Generate unique booking reference
    const refCode = 'MSV-' + Math.floor(1000 + Math.random() * 9000) + '-' + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Calculate total price
    const basePriceNum = parseInt(flightPriceText.replace(/[^\d]/g, ''), 10) || 8500;
    const totalPassengers = adults + children + (infants * 0.2); // infants fly for 20% cost
    const totalPrice = basePriceNum * totalPassengers;

    // Create booking object
    const booking = {
      reference: refCode,
      fullName: fullName,
      dob: dob,
      gender: gender,
      nationality: nationality,
      passport: passport,
      email: email,
      phone: phone,
      from: fromCity,
      to: toCity,
      travelDate: travelDate,
      returnDate: returnDate,
      flightClass: flightClass,
      adults: adults,
      children: children,
      infants: infants,
      checkedBags: checkedBags,
      carryBags: carryBags,
      luggageWeight: luggageWeight,
      meal: meal,
      cardName: cardName,
      flightNum: flightNum,
      price: 'Rs. ' + totalPrice.toLocaleString(),
      bookingDate: new Date().toLocaleDateString(),
      status: 'Confirmed'
    };

    // Save to localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    savedBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(savedBookings));

    // Hide booking modal
    if (modal) modal.style.display = 'none';
    bookingForm.reset();

    // Show beautiful success receipt modal
    showBookingReceipt(booking);
  });

  // Render receipt in modal
  function showBookingReceipt(booking) {
    let receiptModal = document.getElementById('receipt-modal');
    if (!receiptModal) {
      receiptModal = document.createElement('div');
      receiptModal.id = 'receipt-modal';
      receiptModal.className = 'modal';
      document.body.appendChild(receiptModal);
    }

    receiptModal.innerHTML = `
      <div class="modal-content" style="max-width: 600px;">
        <span class="close-btn" id="close-receipt">&times;</span>
        <h2 style="color: var(--success-color); border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-bottom: 20px; text-align: center;">🎉 Booking Confirmed!</h2>
        
        <div class="ticket-container">
          <div class="ticket-header">
            <div class="ticket-title">BOARDING PASS</div>
            <div class="ticket-logo">✈️</div>
          </div>
          
          <div class="ticket-grid">
            <div class="ticket-item">
              <div class="ticket-label">PASSENGER NAME</div>
              <div class="ticket-value">${booking.fullName}</div>
            </div>
            <div class="ticket-item">
              <div class="ticket-label">BOOKING REF</div>
              <div class="ticket-value highlight">${booking.reference}</div>
            </div>
            <div class="ticket-item">
              <div class="ticket-label">FLIGHT</div>
              <div class="ticket-value">${booking.flightNum}</div>
            </div>
            
            <div class="ticket-item" style="grid-column: span 2;">
              <div class="ticket-label">FROM</div>
              <div class="ticket-value">${booking.from}</div>
            </div>
            <div class="ticket-item">
              <div class="ticket-label">TO</div>
              <div class="ticket-value">${booking.to}</div>
            </div>
            
            <div class="ticket-item">
              <div class="ticket-label">DEPARTURE DATE</div>
              <div class="ticket-value">${booking.travelDate}</div>
            </div>
            <div class="ticket-item">
              <div class="ticket-label">CLASS</div>
              <div class="ticket-value">${booking.flightClass}</div>
            </div>
            <div class="ticket-item">
              <div class="ticket-label">PASSENGERS</div>
              <div class="ticket-value">${booking.adults} Adt, ${booking.children} Chd</div>
            </div>

            <div class="ticket-item">
              <div class="ticket-label">BAGGAGE</div>
              <div class="ticket-value">${booking.checkedBags} Checked, ${booking.carryBags} Carry</div>
            </div>
            <div class="ticket-item">
              <div class="ticket-label">MEAL</div>
              <div class="ticket-value">${booking.meal}</div>
            </div>
            <div class="ticket-item">
              <div class="ticket-label">TOTAL PRICE</div>
              <div class="ticket-value highlight" style="color: var(--success-color);">${booking.price}</div>
            </div>
          </div>
          
          <div class="ticket-barcode-section">
            <div class="barcode-text">||| | |||| | || |||| | ||| ${booking.reference}</div>
            <div class="ticket-footer-msg">Thank you for flying with Musavi Airport!</div>
          </div>
        </div>

        <div class="print-btn-container">
          <button id="print-ticket-btn" class="book-now" style="background: var(--accent-gradient);">🖨️ Print Ticket</button>
          <button id="go-bookings-btn" class="book-now" style="background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border-color); box-shadow: none;">My Bookings</button>
        </div>
      </div>
    `;

    receiptModal.style.display = 'flex';

    // Click handlers for receipt modal
    document.getElementById('close-receipt')?.addEventListener('click', () => {
      receiptModal.style.display = 'none';
    });

    document.getElementById('print-ticket-btn')?.addEventListener('click', () => {
      window.print();
    });

    document.getElementById('go-bookings-btn')?.addEventListener('click', () => {
      window.location.href = 'booking.html';
    });
  }


  // ==========================================
  // 7. COMPLAINT FORM POPUP LOGIC
  // ==========================================
  const complaintForm = document.getElementById('complaint-form');
  const popup = document.getElementById('success-popup');
  const popupOverlay = document.getElementById('popup-overlay');
  const popupCloseBtn = document.getElementById('popup-ok');

  complaintForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    popupOverlay?.classList.add('show');
    popup?.classList.add('show');
  });

  popupCloseBtn?.addEventListener('click', function () {
    popup?.classList.remove('show');
    popupOverlay?.classList.remove('show');
    complaintForm?.reset();
  });


  // ==========================================
  // 8. FAQ ACCORDION LOGIC
  // ==========================================
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isActive = btn.classList.contains('active');

      // Close all answers
      faqButtons.forEach(b => {
        b.classList.remove('active');
        b.nextElementSibling?.classList.remove('open');
      });

      if (!isActive) {
        btn.classList.add('active');
        answer?.classList.add('open');
      }
    });
  });


  // ==========================================
  // 9. MY BOOKINGS DASHBOARD LOGIC
  // ==========================================
  if (window.location.pathname.includes('booking.html')) {
    renderBookingsDashboard();
  }

  function renderBookingsDashboard() {
    const noBookingsDiv = document.getElementById('no-bookings-view');
    const bookingsGrid = document.getElementById('bookings-grid');
    
    if (!bookingsGrid) return;
    
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    if (bookings.length === 0) {
      if (noBookingsDiv) noBookingsDiv.style.display = 'block';
      bookingsGrid.style.display = 'none';
      return;
    }

    if (noBookingsDiv) noBookingsDiv.style.display = 'none';
    bookingsGrid.style.display = 'grid';
    bookingsGrid.innerHTML = '';

    // Render bookings from newest to oldest
    bookings.slice().reverse().forEach((booking, index) => {
      const originalIndex = bookings.length - 1 - index; // track index in original array
      const card = document.createElement('div');
      card.className = `booking-card ${booking.status === 'Cancelled' ? 'cancelled' : ''}`;
      
      card.innerHTML = `
        <div class="booking-header">
          <span class="booking-ref">${booking.reference}</span>
          <span class="booking-status ${booking.status === 'Confirmed' ? 'status-confirmed' : 'status-cancelled'}">${booking.status}</span>
        </div>
        
        <div class="booking-details-grid">
          <div class="detail-item">
            <span class="detail-label">Passenger</span>
            <span class="detail-value">${booking.fullName}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Flight</span>
            <span class="detail-value">${booking.flightNum}</span>
          </div>
          <div class="detail-item" style="grid-column: span 2;">
            <span class="detail-label">Route</span>
            <span class="detail-value">${booking.from} ➔ ${booking.to}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Travel Date</span>
            <span class="detail-value">${booking.travelDate}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Price Paid</span>
            <span class="detail-value">${booking.price}</span>
          </div>
        </div>
        
        <div class="booking-card-actions">
          <button class="action-btn primary view-ticket-btn" data-index="${originalIndex}">View Ticket</button>
          ${booking.status === 'Confirmed' ? `<button class="action-btn danger cancel-booking-btn" data-index="${originalIndex}">Cancel Booking</button>` : ''}
        </div>
      `;
      bookingsGrid.appendChild(card);
    });

    // Add event listeners for booking actions
    document.querySelectorAll('.view-ticket-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.dataset.index;
        const b = bookings[idx];
        showBookingReceipt(b);
      });
    });

    document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.dataset.index;
        if (confirm("⚠️ Are you sure you want to cancel this booking?")) {
          bookings[idx].status = 'Cancelled';
          localStorage.setItem('bookings', JSON.stringify(bookings));
          renderBookingsDashboard();
        }
      });
    });
  }

});
