$(function() {

    'use strict';


    //------------------------------------------------------
    //Выпадающий список меню
    //------------------------------------------------------

    $('.top-nav__item_with_undernav').hover(
        function() {
            $(this).addClass('active');
        },
        function() {
            $(this).removeClass('active');
        }
    );

    //-------------------------------
    //Мобильное меню
    //-------------------------------

    $('.button-mobile-nav').on('click', function(e) {
        e.stopPropagation();
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.top-nav').slideDown(300);
            $('.aside').slideDown(300);
        } else {
            $(this).removeClass('active');
            $('.top-nav').slideUp(300);
            $('.aside').slideUp(300);
        }
    });

    //Выключение при клике по странице
    $(document).on('click', function(e) {
        e.stopPropagation();
        var w = $(window).width();
        if (w <= 992 && !$(e.target).closest(".top-nav").length &&
            !$(e.target).closest(".aside").length) {
            $('.button-mobile-nav').removeClass('active');
            $('.top-nav').slideUp(300);
            $('.aside').slideUp(300);
        }
    });

    //Выключение скрытого меню по ресайзу
    $(window).resize(function() {
        var w = $(window).width();
        if (w > 992 && $(".top-nav").is(':hidden') && $(".aside").is(':hidden')) {
            //$('.button-mobile-nav').removeClass('active');
            $('.top-nav').removeAttr('style');
            $('.aside').removeAttr('style');
        }
    });

    //------------------------------------------------------
    // Header слайдер
    //------------------------------------------------------

    $('.header__slider').addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        autoHeight: true,
        autoplayTimeout: 10000,
        autoplay: true,
        smartSpeed: 1200
    });

    //------------------------------------------------------
    // Cлайдер
    //------------------------------------------------------

    $('.slider, .catalog__box_slider').addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 3,
        nav: true,
        navText: '',
        autoplayTimeout: 6000,
        autoplay: true,
        smartSpeed: 1200,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            361: {
                items: 2
            },
            641: {
                items: 3
            }
        }
    });

    //---------------------------------------------------------------
    //Отключение автоплея по скроллу
    //---------------------------------------------------------------
    $(window).scroll(function() {
        var st = $(this).scrollTop();
        //Отключение автоплея в шапке
        if ($('.header__slider').length && st > $('.header__slider').offset().top - $(window).height() && st < ($('.header__slider').offset().top) + $('.header__slider').height()) {
            $(".header__slider").trigger('play.owl.autoplay', [100, 10000]);
        } else {
            $(".header__slider").trigger('stop.owl.autoplay', [100]);
        }

        if ($('.slider').length && st > $('.slider').offset().top - $(window).height() && st < ($('.slider').offset().top) + $('.slider').height()) {
            $(".slider").trigger('play.owl.autoplay', [100, 6000]);
        } else {
            $(".slider").trigger('stop.owl.autoplay', [100]);
        }

        if ($('.catalog__box_slider').length && st > $('.catalog__box_slider').offset().top - $(window).height() && st < ($('.catalog__box_slider').offset().top) + $('.catalog__box_slider').height()) {
            $(".catalog__box_slider").trigger('play.owl.autoplay', [100, 6000]);
        } else {
            $(".catalog__box_slider").trigger('stop.owl.autoplay', [100]);
        }
    });

    //------------------------------------
    //popup
    //------------------------------------

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    //------------------------------------
    //popup
    //------------------------------------
    $('.popup-zoom').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

    //------------------------------------
    //Выравнивание блоков по высоте
    //------------------------------------

    $(".catalog__item-title").equalHeight();
    $('.catalog__item-price').equalHeight();

    //------------------------------------------------
    // Плавный скролл
    //------------------------------------------------

    $(".scroll").click(function(e) {
        e.preventDefault();
        var thisSect = $($(this).attr('href')).offset().top;
        $('html, body').animate({scrollTop: thisSect }, ((Math.abs(thisSect - $(window).scrollTop()) * 0.1) * 5), 'linear');
    });


    //---------------------------------------------
    //Ввод в поле формы
    //---------------------------------------------

    $('.quantity').on('click', 'button', function() {
        var $this = $(this),
         value = Number($this.siblings('input').val().replace(/[^-0-9]/gim, "")),
            word = ' шт.';
        if($this.hasClass('plus')) {
            $this.siblings('input').val( value + 1 + word);
        } else {
            if (value > 1) {
                $this.siblings('input').val( value + (-1) + word);
            }
        }
    });


    //---------------------------------------------
    //Удаление товара из корзины
    //---------------------------------------------

    $('.basket__table-delete').on('click', 'button', function() {
        $(this).closest('.basket__table-row').remove('.basket__table-row');
    });

    //--------------------------------------
    //Яндекс карта
    //--------------------------------------
    var $map = $('#map');
    if ($map.length) {
        ymaps.ready(function() {
            var myMap = new ymaps.Map('map', {
                center: [55.772786, 37.687632],
                zoom: 17,
                controls: [],
                behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"]
            }, {
                searchControlProvider: 'yandex#search'
            });
            var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: '',
                balloonContent: ''
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/icon-map.png',
                // Размеры метки.
                iconImageSize: [41, 56],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-20, -56]
            });
            function disableDrag() {
                var w = $(window).width();
                if (w <= 768) {
                    myMap.behaviors.disable('drag');
                } else {
                    myMap.behaviors.enable('drag');
                }
                if (w <= 640 && w > 480) {
                    myMap.setZoom(16);
    				myMap.panTo([55.772848, 37.685171], {flying: false, duration: 400});
                } else if (w <= 480) {
                    myMap.setZoom(16);
                    myMap.panTo([55.774353, 37.687536], {flying: false, duration: 400});
                } else {
                    myMap.setZoom(17);
                    myMap.panTo([55.772786, 37.687632], {flying: false, duration: 400});
                }
            }
            disableDrag();
            $(window).resize(function() {
                disableDrag();
            });

            myMap.geoObjects.add(myPlacemark);
        });
    }

    //------------------------------------------------------
    //Chrome Smooth Scroll
    //------------------------------------------------------
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $("img, a").on("dragstart", function(event) {
        event.preventDefault();
    });

});
