$(document).ready(function() {
    // Skip link focus management
    $('.skip-link').on('focus', function() {
        $(this).removeClass('visually-hidden');
    }).on('blur', function() {
        $(this).addClass('visually-hidden');
    });

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

    // Initialize Swiper for events
    if (window.matchMedia('(max-width: 767.98px)').matches) {
        const eventsSwiper = new Swiper('.events-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // Mobile in landscape or small tablet
                480: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                }
            },
            a11y: {
                prevSlideMessage: 'Previous event',
                nextSlideMessage: 'Next event',
                slideLabelMessage: 'Event {{index}} of {{slidesLength}}'
            }
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

    // Mobile menu toggle with keyboard support and focus management
    $mobileMenuBtn.on('click keydown', function(e) {
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        
        const isOpening = !$(this).hasClass('active');
        $(this).toggleClass('active')
               .attr('aria-expanded', isOpening);
        $mobileMenu.toggleClass('active');
        
        // Prevent body scroll when menu is open
        $('body').css('overflow', isOpening ? 'hidden' : '');
        
        if (isOpening) {
            // Focus first interactive element when menu opens
            $mobileMenu.find('a:first').focus();
        }
    });

    // Mobile submenu toggle with keyboard support
    $submenuTrigger.on('click keydown', function(e) {
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        $mobileSubmenu.addClass('active');
        // Focus first element in submenu
        $mobileSubmenu.find('a:first').focus();
    });

    // Back button functionality with keyboard support
    $backButton.on('click keydown', function(e) {
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        $mobileSubmenu.removeClass('active');
        // Return focus to submenu trigger
        $submenuTrigger.find('a').focus();
    });

    // Handle keyboard navigation in mobile menu
    $mobileMenu.on('keydown', 'a', function(e) {
        const $items = $mobileMenu.find('a:visible');
        const $current = $(this);
        const index = $items.index($current);
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (index > 0) $items.eq(index - 1).focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (index < $items.length - 1) $items.eq(index + 1).focus();
                break;
            case 'Escape':
                e.preventDefault();
                closeMobileMenu();
                $mobileMenuBtn.focus();
                break;
        }
    });

    // Desktop dropdown functionality with keyboard support
    $dropdown.hide();

    $parrotsLink.on('click keydown', function(e) {
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        if ($(window).width() >= 992) { // Only for desktop
            const isOpening = $dropdown.is(':hidden');
            if (isOpening) {
                $dropdown.css('display', 'flex');
                $parrotsDropdown.addClass('show');
                // Focus first dropdown item when menu opens
                $dropdown.find('a:first').focus();
            } else {
                $dropdown.hide();
                $parrotsDropdown.removeClass('show');
            }
            $(this).attr('aria-expanded', isOpening);
        }
    });

    // Handle keyboard navigation in desktop dropdown
    $dropdown.on('keydown', 'a', function(e) {
        const $items = $dropdown.find('a');
        const $current = $(this);
        const index = $items.index($current);
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                if (index > 0) $items.eq(index - 1).focus();
                else $items.eq($items.length - 1).focus();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                if (index < $items.length - 1) $items.eq(index + 1).focus();
                else $items.eq(0).focus();
                break;
            case 'Escape':
                e.preventDefault();
                $dropdown.hide();
                $parrotsDropdown.removeClass('show');
                $parrotsLink.attr('aria-expanded', false).focus();
                break;
            case 'Tab':
                $dropdown.hide();
                $parrotsDropdown.removeClass('show');
                $parrotsLink.attr('aria-expanded', false);
                break;
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
