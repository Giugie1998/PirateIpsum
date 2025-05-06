$(document).ready(function() {
    // Handle color links (page reload)
    $('.dropdown-item, .mobile-submenu a').each(function() {
        const text = $(this).text().trim().toLowerCase();
        if(['red', 'violet', 'yellow', 'green'].includes(text)) {
            $(this).on('click', function(e) {
                e.preventDefault();
                if (!$(this).hasClass('dropdown-item')) { // Only for mobile menu links
                    closeMobileMenu();
                }
                window.location.reload();
            });
        }
    });

    // Handle navigation scrolling
    $('.nav-link, .mobile-btn').on('click', function(e) {
        const text = $(this).text().trim().toLowerCase();
        
        // Skip closing menu for Parrots menu trigger
        if ($(this).closest('.mobile-submenu-trigger').length) {
            return;
        }

        if(text === 'pirate') {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 'smooth');
            closeMobileMenu();
        } else if(text === 'ships') {
            e.preventDefault();
            const shipsSection = $('.ships-section');
            if(shipsSection.length) {
                $('html, body').animate({
                    scrollTop: shipsSection.offset().top
                }, 'smooth');
            }
            closeMobileMenu();
        } else if(text === 'events') {
            e.preventDefault();
            const eventsSection = $('.events-section');
            if(eventsSection.length) {
                $('html, body').animate({
                    scrollTop: eventsSection.offset().top
                }, 'smooth');
            }
            closeMobileMenu();
        } else if(text === 'contacts') {
            closeMobileMenu();
        }
    });

    // Events carousel navigation
    const $eventsWrapper = $('.events-wrapper');
    const $prevBtn = $('.nav-prev');
    const $nextBtn = $('.nav-next');

    if ($eventsWrapper.length && $prevBtn.length && $nextBtn.length) {
        $prevBtn.on('click', function() {
            const scrollAmount = $eventsWrapper.width() * 0.85; // 85% of container width
            $eventsWrapper.animate({
                scrollLeft: '-=' + scrollAmount
            }, 'smooth');
        });

        $nextBtn.on('click', function() {
            const scrollAmount = $eventsWrapper.width() * 0.85; // 85% of container width
            $eventsWrapper.animate({
                scrollLeft: '+=' + scrollAmount
            }, 'smooth');
        });

        // Hide/show arrows based on scroll position
        $eventsWrapper.on('scroll', function() {
            const maxScroll = $eventsWrapper[0].scrollWidth - $eventsWrapper.width();
            $prevBtn.css('opacity', $eventsWrapper.scrollLeft() === 0 ? '0.5' : '1');
            $nextBtn.css('opacity', $eventsWrapper.scrollLeft() >= maxScroll - 1 ? '0.5' : '1');
        });
    }

    const $navbar = $('.navbar');
    const $mobileMenuBtn = $('.mobile-menu-btn');
    const $mobileMenu = $('.mobile-menu');
    const $submenuTrigger = $('.mobile-submenu-trigger');
    const $mobileSubmenu = $('.mobile-submenu');
    const $backButton = $('.back-button');
    
    // Desktop dropdown
    const $parrotsLink = $('#parrotsDropdown');
    const $dropdown = $('.horizontal-dropdown');
    const $parrotsDropdown = $parrotsLink.closest('.nav-item.dropdown');

    // Handle scroll events
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 0) {
            $navbar.addClass('scrolled');
            // Update mobile menu button color when navbar is scrolled
            $mobileMenuBtn.find('span').css('backgroundColor', '#e2b500');
        } else {
            $navbar.removeClass('scrolled');
            // Reset mobile menu button color
            $mobileMenuBtn.find('span').css('backgroundColor', '#e2b500');
        }
    });

    // Function to close mobile menu
    function closeMobileMenu() {
        if ($mobileMenuBtn.length && $mobileMenu.length) {
            $mobileMenuBtn.removeClass('active');
            $mobileMenu.removeClass('active');
            $('body').css('overflow', '');
        }
    }

    // Mobile menu toggle
    $mobileMenuBtn.on('click', function() {
        $(this).toggleClass('active');
        $mobileMenu.toggleClass('active');
        // Prevent body scroll when menu is open
        $('body').css('overflow', $(this).hasClass('active') ? 'hidden' : '');
    });

    // Mobile submenu toggle
    $submenuTrigger.on('click', function(e) {
        e.preventDefault();
        $mobileSubmenu.addClass('active');
    });

    // Back button functionality
    $backButton.on('click', function() {
        $mobileSubmenu.removeClass('active');
    });

    // Desktop dropdown functionality
    $dropdown.hide();

    $parrotsLink.on('click', function(e) {
        e.preventDefault();
        if ($(window).width() >= 992) { // Only for desktop
            if ($dropdown.is(':hidden')) {
                $dropdown.css('display', 'flex');
                $parrotsDropdown.addClass('show');
            } else {
                $dropdown.hide();
                $parrotsDropdown.removeClass('show');
            }
        }
    });

    // Hide desktop dropdown when clicking outside
    $(document).on('click', function(e) {
        if ($(window).width() >= 992) { // Only for desktop
            if (!$parrotsLink.is(e.target) && !$dropdown.has(e.target).length) {
                $dropdown.hide();
                $parrotsDropdown.removeClass('show');
            }
        }
    });
});
