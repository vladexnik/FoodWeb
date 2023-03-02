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

export default slider;