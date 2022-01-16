import $ from 'jquery';

export default class Global {
    constructor() {
        this.init();
    }

    init() {
        this.toggleSidebar();
        this.outSideClose();
        this.showPassword();
        this.toggleModalContent();
        this.mobNavPanel();
    }

    // Sidebar menu
    toggleSidebar() {
        let body = document.querySelector('body');
        $('.nav__list--open').on('click', () => {
            $('.nav__list').addClass('nav__list--active');
            body.style.overflow = 'hidden';
        })
        $('.nav__list--close').on('click', () => {
            $('.nav__list').removeClass('nav__list--active');
            body.style.overflow = '';
        })
    }

    // Close modal on outside click
    outSideClose() {
        const modal = $('.modal');
        const openModal = $('.web__login');
        const closeModal = $('.modal__close');
        const body = document.querySelector('body');

        openModal.on('click', showModal);
        closeModal.on('click', hideModal);

        $(window).on('click', event => {
            if (!modal.hasClass('modal--active')) return
            if (!event.target.closest('.modal__container')) hideModal()
        })

        function showModal(event) {
            event.stopPropagation();
            modal.addClass('modal--active');
            body.style.overflow = 'hidden';
        }

        function hideModal(event) {
            modal.removeClass('modal--active');
            $('.modal__container form').each(function () {
                $(this)[0].reset();
            })
            body.style.overflow = '';
            $('.register').hide();
            $('.login').show();
        }
    }

    // Change modal form content
    toggleModalContent() {
        $('.create-account').on('click', () => {
            $('.login').hide();
            $('.register').show();
        })
    }

    // Show password characters
    showPassword() {
        let show = document.querySelectorAll('.show-hide-password');

        show.forEach((e) => {
            e.addEventListener('click', () => {
                const modalInput = e.closest('.modal__input');
                const inputPass = modalInput.querySelector('.password');
                const showPassword = modalInput.querySelector('.show-password');
                const hidePassword = modalInput.querySelector('.hide-password');

                if (inputPass.type === 'password') {
                    inputPass.type = 'text';
                    showPassword.style.display = 'none';
                    hidePassword.style.display = 'block';
                } else {
                    inputPass.type = 'password';
                    showPassword.style.display = 'block';
                    hidePassword.style.display = 'none';
                }
            })
        })
    }

    // Navigation Panel for Mobile
    mobNavPanel() {
        if ($(window).width() <= 992) {
            $('.web__navbar--tab--wrapper').first().on('click', function (e) {
                e.preventDefault()
                $(this).toggleClass('tab--mob--active')
            })
        }
    }
}