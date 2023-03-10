/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){

    let result=document.querySelector('.calculating__result span');
  
    let sex,height,weight,age,ratio;
    if (localStorage.getItem('sex')){
        sex=localStorage.getItem('sex');
    } else {
        sex='female';
        localStorage.setItem('sex','female');
    }

    if (localStorage.getItem('ratio')){
        ratio=localStorage.getItem('ratio');
    } else {
        ratio=1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal(){
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent='____';
            return;
        }
        if(sex=='female'){
            result.textContent=Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*ratio);
        } else {
            result.textContent=Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) *ratio);
        }
        console.log(result)
    }   

    function initLocalSettings(selector,activeClass){
        let elements=document.querySelectorAll(selector); // ('#gender div')

        elements.forEach(elem=>{ 
            elem.classList.remove(activeClass); // удаляем все авктивные классы, например у gender
            if(elem.getAttribute('id')===localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio')=== localStorage.getItem('ratio')){
                elem.classList.add(activeClass)
            }
        })
    }
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big .calculating__choose-item','calculating__choose-item_active');
    calcTotal();

    function getSaticInfo(selector, activeClass){  // gender,activity
        let elements=document.querySelectorAll(selector);
        elements.forEach(elem=>{
            elem.addEventListener('click', (e)=>{
                if(e.target.getAttribute('data-ratio')){
                    ratio= +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex=e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }
                console.log(ratio,sex);
    
                elements.forEach(elem=>{
                    elem.classList.remove(activeClass);
                })
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        })
    }


    getSaticInfo('#gender .calculating__choose-item','calculating__choose-item_active');
    getSaticInfo('.calculating__choose_big .calculating__choose-item','calculating__choose-item_active');



    function getDynamicInfo(selector){
        let input=document.querySelector(selector);

        input.addEventListener('input',()=>{

            if(input.value.match(/\D/g)){
                input.style.border='1px solid red';
                input.textContent='wrong num';
            }
            else{
                input.style.border='none';
            }


            switch(input.getAttribute('id')){
                case 'height':
                    height= +input.value;
                    break;

                case 'weight':
                    weight= +input.value;
                    break;

                case 'age':
                    age= +input.value;
                    break;
            }
            calcTotal();
        });
        
    }
  
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    
    // axios.get('http://localhost:3000/menu') // библиотека, отличие от фетча - возвр более подробный ответ и все данные в св-ве data
    //     .then(datta=>{
    //     datta.data.forEach(({img, altimg, title, descr, price}) => {
    //     new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //     });
    // });

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
    
      // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }   
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector, modalTimerId){
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });


    let modal = document.querySelector('.modal');
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(modalTimerId) {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        
        console.log(modalTimerId)
        if(modalTimerId) {
        clearInterval(modalTimerId); }
    }

    function modall(modalTimerId){
        const modalTrigger = document.querySelectorAll('[data-modal]');
                     

        modalTrigger.forEach(btn => {
            btn.addEventListener('click',()=> openModal(modalTimerId));
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == "") {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains('show')) { 
                closeModal();
            }
        });

        
        // Изменили значение, чтобы не отвлекало

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal(modalTimerId);
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
        window.addEventListener('scroll', showModalByScroll);

    }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modall);





/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container,slide,nextArrow, prevArrow,totalCounter, currentCounter,wrapper,field}){

    let offset=0;
    let slideIndex=1;

    let slides=document.querySelectorAll(slide),
    prev=document.querySelector(prevArrow),
    next=document.querySelector(nextArrow),
    current=document.querySelector(currentCounter),
    total=document.querySelector(totalCounter);
    
    let slidesWrapper=document.querySelector(wrapper),
    slidesField=document.querySelector(field),
    width=window.getComputedStyle(slidesWrapper).width;
    //console.log(width)
    
    // showSlides(slideIndex);
    // if(slides.length<10){ // нолик в общем кол-ве слайдов
    //     total.textContent=`0${slides.length}`;
    // } else {
    //     total.textContent=slides.length;
    // }

    // function showSlides(n) {
    //     if(n>slides.length){
    //         slideIndex=1;
    //     }
    //     if(n<1){
    //         slideIndex=slides.length;
    //     }

    //     slides.forEach(item=>item.style.display='none');
    //     slides[slideIndex-1].style.display='';
        
    //     if(slides.length<10){  // нолик тек слайда перед цифрой: 01 02 03 04
    //         current.textContent=`0${slideIndex}`;
    //     } else {
    //         current.textContent=slideIndex;
    //     }
    // }

    // prev.addEventListener('click', ()=>{
    //     showSlides(--slideIndex);
    // })
    // next.addEventListener('click', ()=>{
    //     showSlides(++slideIndex)
    // });


    if(slides.length<10){ // нолик в общем кол-ве слайдов
        total.textContent=`0${slides.length}`;
        current.textContent=`0${slideIndex}`;
    } else {
        total.textContent=slides.length;
        current.textContent=slideIndex;
    }


    slidesField.style.width=100* slides.length+'%'; //400%
    slidesField.style.display='flex';
    slidesField.style.transition='0.3s all';
    slidesWrapper.style.overflow='hidden'; // скрываем то, что не входит в страницу(картинки справа)
    slides.forEach(slide=> { 
        slide.style.width=width;
    })
    console.log(width) // width = '650px'

    next.addEventListener('click',()=>{ // стрелочка след
        if(offset == parseInt(width)*(slides.length-1)){ // width = '650px'
            offset=0;
        } else {
        offset+= parseInt(width); }

        slidesField.style.transform=`translateX(-${offset}px)`;

        if(slideIndex==slides.length){
            slideIndex=1;
        } else {
            slideIndex++;
        }

        if(slides.length<10){
            current.textContent=`0${slideIndex}`;
        } else {
            current.textContent=slideIndex;
        }
        dots.forEach(dotik=> dotik.style.opacity='.5');
        dots[slideIndex-1].style.opacity=1;
    })

    prev.addEventListener('click',()=>{
        if(offset==0) {  // width = '500px'
            offset= +width.slice(0,width.length-2)*(slides.length-1)
        } else {
            offset-= +width.slice(0,width.length-2); 
        }
        slidesField.style.transform=`translateX(-${offset}px)`; // смещение

        if(slideIndex==1){
            slideIndex=slides.length;
        } else {
            slideIndex--;
        }

        if(slides.length<10){
            current.textContent=`0${slideIndex}`;
        } else {
            current.textContent=slideIndex;
        }
        dots.forEach(dotik=> dotik.style.opacity='.5');
        dots[slideIndex-1].style.opacity=1;
    })


    let slider=document.querySelector(container);
    let dots=[];
    slider.style.position='relative';
    let indicators=document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText=`
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);
    for(let i=0; i<slides.length; i++){
        let dot=document.createElement('li');
        dot.setAttribute('data-slide-to',i+1);
        dot.style.cssText=` 
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i==0){
            dot.style.opacity=1;
        }
    indicators.append(dot);
    dots.push(dot);
    } 

    dots.forEach(dotik=>{
        dotik.addEventListener('click',(e)=>{
            let slideTo=e.target.getAttribute('data-slide-to');
            
            slideIndex=slideTo;
            offset= parseInt(width)*(slideTo-1);

            slidesField.style.transform=`translateX(-${offset}px)`;

            if(slides.length<10){
                current.textContent=`0${slideIndex}`;
            } else {
                current.textContent=slideIndex;
            }

            dots.forEach(dotik=> dotik.style.opacity='.5');
            dots[slideIndex-1].style.opacity=1;
        });
    });


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){
     
        let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline){
    
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};




    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', function() {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(modalTimerId), 3000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])(modalTimerId); //'[data-modal]', '.modal'
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2023-06-11');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});
 
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map