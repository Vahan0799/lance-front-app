import $ from 'jquery';

export default class DepositWithdrawal {
    constructor() {
        this.toggleTabs();
    }
    // Toggle the tabs
    toggleTabs() {
        $('.deposit__navtab').click(function (e) {
            $('.deposit__navtab--content').hide();
            $($(this).attr('data-id')).show();
            $(this).addClass('deposit__navtab--active');
            $(this).siblings().removeClass('deposit__navtab--active');
            e.preventDefault();
        })
    }
}