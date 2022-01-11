import $ from 'jquery';
import LazyLoad from 'vanilla-lazyload';
import 'jquery.cookie';
import { clickOutSide } from './_utils';


export default class Global {

    constructor() {
        this.init();
    }

    init() {
        this.initLazyLoad();
        this.cookieBanner();
        this.toggleNav();
    }

    initLazyLoad() {
        new LazyLoad();
    }

    cookieBanner() {
        if (!$.cookie('cookie-banner')) {
            if (!$('.cookie-banner').is(':visible')) {
                $('.cookie-banner').removeClass('d-none');
                this.initLazyLoad();
            } else {
                $('.newsletter-banner').addClass('d-none');
            }
        }

        $('.cookie-banner__close').each(function() {
            $(this).click(function() {
                $(this).parents('.cookie-banner').fadeOut(200);
                $.cookie('cookie-banner', true, { path: '/', expires: 7 });
            });
        });
    }

    toggleNav() {
        this.navbarNav = $('.navbar__nav');
        this.navTogglerBtn = $('.navbar__toggler');
        this.search = $('.search');

        // click out-side dropdown
        clickOutSide((dropdown) => $(dropdown).removeClass('dropdown--open'), '.dropdown', '.navbar__nav-link');

        $(this.navTogglerBtn).on('click', () => {
            if ($(window).width() <= 991.98) {
                $(this.navbarNav).fadeToggle(200);
                $(this.navTogglerBtn).toggleClass('navbar__toggler--open');
                $(this.search).fadeToggle(200);
                $('body').toggleClass('nav-visible');
            }
        });
    }
}