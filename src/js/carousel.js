$(function(){
    //trigger
    let controller = new ScrollMagic.Controller();
    //carousel
    let carouselWrap = $('#js-carousel');
    let carousel = $('.js-carousel');
    
    for(var i=0; i < carousel.length; i++){
        let carouselT = gsap.timeline().fromTo(carousel[i], 1,{
            z:'-1',opacity: 1
        },{
            opacity: 0
        },'4');
        let carouselS = new ScrollMagic.Scene({
            // 트리거 지정
            triggerElement: carouselWrap[i],
            duration:'100%'

        })
        // 애니메이션
        .setTween(carouselT)
        // 컨트롤러
        .addTo(controller)
        // 인디케이터
        .addIndicators({
            name: "carousel"
        })
        // .setClassToggle(carousel[i], 'visible')
    }
    // let carouselT = gsap.timeline()
    // .to('.js-carousel01', .1, {x:"-1"},'0')
    // .to('.js-carousel01', .1, {y:"-100%",opacity: 0},'0')
    // .from('.js-carousel02', 1, {y:"100%",opacity: 1},'2')
    // .to('.js-carousel02', 1, {y:"-100%",opacity: 0},'2')
    // .from('.js-carousel03', 1, {y:"100%",opacity: 1},'4')
    // .to('.js-carousel03', 1, {y:"-100%",opacity: 0},'4')
    // let carouselS = new ScrollMagic.Scene({
	// 	// 트리거 지정
    //     triggerElement: "#js-carousel",
    //     duration: '100%'
    // })
    // // 애니메이션
	// .setTween(carouselT)
	// // 컨트롤러
    // .addTo(controller)
    // // 인디케이터
	// .addIndicators({
	// 	name: "carousel"
    // })

    // let carouselS01 = new ScrollMagic.Scene({
	// 	// 트리거 지정
    //     triggerElement: ".js-carousel01",
    //     duration: '100%'
    // })
    // // 애니메이션
	// .setTween(carouselT)
	// // 컨트롤러
    // .addTo(controller)
    // // 인디케이터
	// .addIndicators({
	// 	name: "carousel01"
    // })
    // .setClassToggle('.js-carousel01', 'invisible')

    // let carousel02 = new ScrollMagic.Scene({
	// 	// 트리거 지정
    //     triggerElement: ".js-carousel02",
    //     duration: '100%'
    // })
    // // 애니메이션
	// .setTween(carouselT)
	// // 컨트롤러
    // .addTo(controller)
    // // 인디케이터
	// .addIndicators({
	// 	name: "carousel02"
    // })
    // .setClassToggle('.js-carousel02', 'invisible') 
})