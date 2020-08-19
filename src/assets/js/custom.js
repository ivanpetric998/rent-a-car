jQuery(function($) {

    /* ----------------------------------------------------------- */
    /*  1. FIXED NAVBAR 
    /* ----------------------------------------------------------- */


    jQuery(window).bind('scroll', function() {
        if (jQuery(window).scrollTop() > 200) {
            jQuery('.main-navbar').addClass('navbar-fixed-top');

        } else {
            jQuery('.main-navbar').removeClass('navbar-fixed-top');
        }
    });


    /* ----------------------------------------------------------- */
    /*  11. SCROLL TOP BUTTON
    /* ----------------------------------------------------------- */

    //Check to see if the window is top if not then display button

    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 300) {
            jQuery('.scrollToTop').fadeIn();
        } else {
            jQuery('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top

    jQuery('.scrollToTop').click(function() {
        jQuery('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    /* ----------------------------------------------------------- */
    /*  12. PRELOADER
    /* ----------------------------------------------------------- */

    jQuery(window).load(function() { // makes sure the whole site is loaded      
        jQuery('#aa-preloader-area').delay(300).fadeOut('slow'); // will fade out      
    })

});