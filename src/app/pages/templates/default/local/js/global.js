!(function () {

    /*-------------------------------------------------------------------------------
      animsition
    -------------------------------------------------------------------------------*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1000,
        outDuration: 700,
        linkElement: '.menu-list a',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading:true,
        loadingParentElement: 'body', //animsition wrapper element
        // loadingClass: 'spinner',
        // loadingInner: '<div class="double-bounce1"></div><div class="double-bounce2"></div>', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown:5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){ window.location.href = url; }
    });



    /*-------------------------------------------------------------------------------
	  Menu
	-------------------------------------------------------------------------------*/

    // $('.navbar-toggle').on('click',function(){
    //     $('body').removeClass('menu-is-closed').addClass('menu-is-opened');
    // });
    //
    // $('.close-menu, .click-capture').on('click', function(){
    //     $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
    //     $('.menu-list ul').slideUp(300);
    // });
    //
    // var dropToggle = $('.menu-list > li').has('ul').children('a');
    //
    //
    // dropToggle.on('click',function(){
    //     dropToggle.not(this).closest('li').find('ul').slideUp(200);
    //     $(this).closest('li').children('ul').slideToggle(200);
    //     return false;
    // });


    /*-------------------------------------------------------------------------------
      navbar动效
    -------------------------------------------------------------------------------*/
    // $(window).scroll(function() {
    //     let e = $(this).scrollTop(),
    //         t = $("#navbar");
    //     50 <= e ? t.addClass("navbar-scrolled") : t.removeClass("navbar-scrolled")
    // });
    // var t, n = 0,
    //     i = $("#navbar"),
    //     o = i.outerHeight();
    // $(window).scroll(function(e) {
    //     t = !0
    // }), setInterval(function() {
    //     t && (! function() {
    //         var e = $(this).scrollTop();
    //         if (Math.abs(n - e) <= 1) return;
    //         n < e && o < e ? i.removeClass("navbar-down").addClass("navbar-up") : e + $(window).height() < $(document).height() && i.removeClass("navbar-up").addClass("navbar-down");
    //         n = e
    //     }(), t = !1)
    // }, 50)

}());
