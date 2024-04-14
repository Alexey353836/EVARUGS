"use strict"

function popups() {
    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');/*Для фиксированыйх*/ 
    const timeout = 200;
    const applicationFormContainer = document.querySelectorAll('.application-form__container');
    // const  form = document.querySelectorAll('.form');
    const closeForm = document.querySelectorAll('.close-form');

    let curentPopup;
    let unlock = true;

    // Открыть попап
    if (popupLinks.length > 0){
        for (let index = 0; index < popupLinks.length; index++){
            const popupLink = popupLinks[index];
            popupLink.addEventListener('click', function(e) {
                const popupName = popupLink.getAttribute('href').replace('#','');
                curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    }
    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.application-form.open');
            if (popupActive){
                // popupClose(popupActive, false);
                popupClose(popupActive, false);
            }else{
                bodyLock();  
            }
            curentPopup.classList.add('open');
        }
    }

    //Закрыть попап
    function popupClosesss(e) {
        const popupActive = document.querySelector('.application-form.open');
        if (popupActive){
            popupClose(popupActive, false);
            bodyUnlock();
        }
    }
    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnlock();
            }
        }
    }
    function closeForms (e) {
        const targets = e.target;
        applicationFormContainer.forEach(element => {
            if (targets === element) {
                popupClosesss();
            }
        });
        // form.forEach(element => {
        //     if (targets === element) {
        //         popupClosesss();
        //     }
        // }); 
    }
    closeForm.forEach(element => {
        element.addEventListener('click', popupClosesss);
    });
    applicationFormContainer.forEach(element => {
        element.addEventListener('click', closeForms)
    });

    // Блокировать попап
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
    }

    // Функция разблокировать попап
    function bodyUnlock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for ( let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout)
    }

}
popups();

//  Offer-slider
function offerSlider() {
    const offerSlide = document.querySelectorAll('.offer__slide'),
      offerSliderPrev = document.querySelector('.offer__slider-prev'),
      offerSliderNext = document.querySelector('.offer__slider-next'),
      current = document.querySelector('#current'),
      total = document.querySelector('#total');
let slideIndex = 1;

showSlides(slideIndex);

function fTotal () {
    if (offerSlide.length < 10) {
        total.textContent = `0${offerSlide.length}`;
    }if (slideIndex < 10) {
        current.textContent = `0${slideIndex} /`;
       
    }if (offerSlide.length >= 10) {
        total.textContent = `${offerSlide.length}`;
    }if (slideIndex >= 10){
        current.textContent = `s{slideIndex} /`;
    }
}fTotal ();

function showSlides (n) {
    if (n > offerSlide.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = offerSlide.length;
    }

    if (slideIndex < 10) {
        current.textContent = `0${slideIndex} /`;
    }else {
        current.textContent = `${slideIndex} /`;
    }

    offerSlide.forEach(item => item.style.opacity = '0');
    offerSlide.forEach(item => item.style.visibility = 'hidden');
    offerSlide.forEach(item => item.style.scale = 0.6);

    offerSlide[slideIndex -1].style.opacity = '1';
    offerSlide[slideIndex -1].style.visibility = 'visible';
    offerSlide[slideIndex -1].style.scale = 1;   
}

function plusSlide (n) {
    showSlides(slideIndex += n);
}

offerSliderPrev.addEventListener('click', () =>{plusSlide(-1)});
offerSliderNext.addEventListener('click', () =>{plusSlide(+1)});
}
offerSlider();
