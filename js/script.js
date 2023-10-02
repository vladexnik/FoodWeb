require('es6-promise').polyfill(); //  npm i es6-promise

import 'nodelist-foreach-polyfill'; // с устан-ым npm в node_modules
import 'slick-slider';

import calc from './modules/calc.js';
import tabs from './modules/tabs';
import modall from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
    const modalTimerId = setTimeout(() => openModal(modalTimerId), 45000);

    tabs();
    modall(modalTimerId); //'[data-modal]', '.modal'
    timer('.timer', '2024-01-11');
    cards();
    calc();
    forms('form', modalTimerId);
    slider(
        {
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    }
    );

});
 