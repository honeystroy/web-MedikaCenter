// Common JavaScript functions for MedikaCare
// Header and Footer management

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('is_logged_in') === 'true';
}

// Get user info
function getUserInfo() {
    return {
        user_id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role')
    };
}

// Generate header HTML
function generateHeader() {
    const loggedIn = isLoggedIn();
    const navLinks = loggedIn ? `
        <a href="home.html">Home</a>
        <a href="services.html">Layanan</a>
        <a href="appointment.html">Buat Janji</a>
        <a href="about.html">Tentang Kami</a>
        <a href="contact.html">Kontak</a>
        <a href="logout.html" class="nav-logout">Logout</a>
    ` : `
        <a href="home.html">Home</a>
        <a href="about.html">Tentang Kami</a>
        <a href="contact.html">Kontak</a>
        <a href="login.html">Login</a>
    `;

    return `
<nav>
    <div class="logo">
        <span class="logo-plus">+</span>
        <span class="logo-text">MedikaCare</span>
    </div>
    <button class="mobile-menu-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <div class="nav-links">
        ${navLinks}
    </div>
</nav>`;
}

// Generate footer HTML
function generateFooter() {
    return `
<footer>
    <div class="footer-content">
        <p>&copy; 2026 MedikaCare Indonesia. All rights reserved.</p>
        <p class="footer-subtitle">Layanan Kesehatan Digital Terpercaya</p>
    </div>
</footer>`;
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Initialize page (call this on each page load)
function initPage() {
    // Insert header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = generateHeader();
    }
    
    // Insert footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = generateFooter();
    }
    
    // Initialize mobile menu
    initMobileMenu();
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <span class="alert-icon">${type === 'success' ? '✓' : '⚠️'}</span>
        <span>${message}</span>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Handle login
function handleLogin(email, password) {
    // Hardcoded login credentials
    if (email === 'admin@medikacare.com' && password === 'admin123') {
        localStorage.setItem('is_logged_in', 'true');
        localStorage.setItem('user_id', '1');
        localStorage.setItem('username', 'Admin Offline');
        localStorage.setItem('role', 'admin');
        return true;
    }
    return false;
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
}

// Check if user needs to login (for protected pages)
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}
