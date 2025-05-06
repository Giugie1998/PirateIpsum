document.addEventListener('DOMContentLoaded', function() {
    // Events carousel navigation
    const eventsWrapper = document.querySelector('.events-wrapper');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');

    if (eventsWrapper && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const scrollAmount = eventsWrapper.offsetWidth * 0.85; // 85% of container width
            eventsWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            const scrollAmount = eventsWrapper.offsetWidth * 0.85; // 85% of container width
            eventsWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Hide/show arrows based on scroll position
        eventsWrapper.addEventListener('scroll', () => {
            const maxScroll = eventsWrapper.scrollWidth - eventsWrapper.offsetWidth;
            prevBtn.style.opacity = eventsWrapper.scrollLeft === 0 ? '0.5' : '1';
            nextBtn.style.opacity = eventsWrapper.scrollLeft >= maxScroll - 1 ? '0.5' : '1';
        });
    }

    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const submenuTrigger = document.querySelector('.mobile-submenu-trigger');
    const mobileSubmenu = document.querySelector('.mobile-submenu');
    const backButton = document.querySelector('.back-button');
    
    // Desktop dropdown
    const parrotsLink = document.getElementById('parrotsDropdown');
    const dropdown = document.querySelector('.horizontal-dropdown');
    const parrotsDropdown = parrotsLink ? parrotsLink.closest('.nav-item.dropdown') : null;

    // Handle scroll events
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
            // Update mobile menu button color when navbar is scrolled
            if (mobileMenuBtn) {
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.backgroundColor = '#e2b500';
                });
            }
        } else {
            navbar.classList.remove('scrolled');
            // Reset mobile menu button color
            if (mobileMenuBtn) {
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.backgroundColor = '#e2b500';
                });
            }
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Mobile submenu toggle
    if (submenuTrigger) {
        submenuTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            mobileSubmenu.classList.add('active');
        });
    }

    // Back button functionality
    if (backButton) {
        backButton.addEventListener('click', function() {
            mobileSubmenu.classList.remove('active');
        });
    }

    // Desktop dropdown functionality
    if (dropdown) {
        dropdown.style.display = 'none';
    }

    if (parrotsLink) {
        parrotsLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.innerWidth >= 992) { // Only for desktop
                if (dropdown) {
                    if (dropdown.style.display === 'none') {
                        dropdown.style.display = 'flex';
                        parrotsDropdown.classList.add('show');
                    } else {
                        dropdown.style.display = 'none';
                        parrotsDropdown.classList.remove('show');
                    }
                }
            }
        });

        // Hide desktop dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth >= 992) { // Only for desktop
                if (!parrotsLink.contains(e.target) && dropdown && !dropdown.contains(e.target)) {
                    dropdown.style.display = 'none';
                    parrotsDropdown.classList.remove('show');
                }
            }
        });
    }
});
