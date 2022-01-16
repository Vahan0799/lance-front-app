import $ from 'jquery';
import Global from './modules/_global';
import DepositWithdrawal from './modules/_deposit-withdrawal';

$(document).ready(() => {
    let global = new Global();
    let depositeTabs = new DepositWithdrawal();
});