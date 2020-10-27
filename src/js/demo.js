$(function(){
    //trigger
    let controller = new ScrollMagic.Controller();
    let triggerT = TweenMax.fromTo('.js-trigger', 1, {
        backgroundColor: "#000",
        scale: 1,
      },{
		backgroundColor: "#000",
		scale: 2.5,
		rotation: 360,
        x: 130,
        repeat: -1,
        yoyo: true
    });
    let triggerS = new ScrollMagic.Scene({
		// 트리거 지정
        triggerElement: "#js-trigger",
        // 시작 지점
        offset: 0,
        // 재생시간, 뷰포트 높이에 따라 유동정 100%
        duration: 300,

    })
    // 애니메이션
	.setTween(triggerT)
	// 컨트롤러
    .addTo(controller)
    // 인디케이터
	.addIndicators({
		name: "trigger"
    })

    //stagger
    // 타겟, 지속시간, 애니메이션, 트위 간격
    let staggerT = TweenMax.staggerFromTo('.js-stagger', 1, {
        opacity: 1
      },{
        opacity: 0,
        y:'-100%'
    },4);
    let staggerS = new ScrollMagic.Scene({
		// 트리거 지정
        triggerElement: "#js-stagger",
        // 시작 지점
        offset: 0,
        // 재생시간, 뷰포트 높이에 따라 유동정 100%
        duration: '100%',

    })
    // 애니메이션
	.setTween(staggerT)
	// 컨트롤러
    .addTo(controller)
    // 인디케이터
	.addIndicators({
		name: "stagger"
    })

    //toggle
    let toggle = $('.js-toggle');
    let toggleWrap = $('.js-toggleWrap');
    let nav = $('#nav li');
    
    for(var i=0; i < toggle.length; i++){
        let toggleT = TweenMax.to(toggle[i], 1,{
            scale: 4,
            y: 10,
            rotation: 360
        });
        let toggleS = new ScrollMagic.Scene({
            // 트리거 지정
            triggerElement: toggleWrap[i],
            duration:115

        })
        // 애니메이션
        .setTween(toggleT)
        // 컨트롤러
        .addTo(controller)
        // 인디케이터
        .addIndicators({
            name: i
        })
        .setClassToggle(nav[i], 'active')
        .setPin("#pin1")

    }

    
    var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger1",
        duration: 120,
        offset: 100
      })
        .setTween(".img-wrap", 0.5, { width: "100vw", height: "100vh" }) // trigger a TweenMax.to tween
        .addIndicators({ name: "sizePicture" })
        .addTo(controller);
      
    var wipeAnimation = new TimelineMax().fromTo(
            ".slide",1,
            { x: "120%" },
            { x: "0%", ease: Linear.easeNone });
        
    // create scene to pin and link animation
    new ScrollMagic.Scene({
            triggerElement: ".main",
            triggerHook: "onLeave",
            duration: "100%"
        })
        .setPin(".main")
        .setTween(wipeAnimation)
        .addIndicators({ name: "swipe" })
        .addTo(controller);
        
    new ScrollMagic.Scene({ 
            triggerElement: "#trigger1", // hide 10% before exiting view (80% + 10% from bottom)
            offset: 220, 
        })
        .setClassToggle(".text-wrap", "visible") // add class to reveal
        .addIndicators({name: "fadeText"}) // add indicators (requires plugin)
        .addTo(controller);

        
    var processT = gsap.timeline()
        .to(".js-carousel01",1,
            { z: -1},'0')  
        .to(".js-carousel02",1,
            { z: -1},'4')   

        .fromTo(".js-carousel01 .img",1,
            {opacity: "1"},
            {opacity: "0",ease: Linear.easeNone },'2')  
        .fromTo(".js-carousel02 .img",1,
            {opacity: "1"},
            {opacity: "0",ease: Linear.easeNone },'4')  

        .to(".js-carousel01 .text",1,
            {opacity: "0",y:'-100%',ease: Linear.easeNone },'2')                
        .fromTo(".js-carousel02 .text",1,
            { opacity: "0",y:'100%'},
            { opacity: "1",y:'0%',ease: Linear.easeNone },'2')    
        .fromTo(".js-carousel03 .text",1,
            { opacity: "0",y:'200%'},
            { opacity: "1",y:'100%',ease: Linear.easeNone },'2')  
        .fromTo(".js-carousel02 .text",1,
            { opacity: "1",y:'0%'},
            { opacity: "0",y:'-100%',ease: Linear.easeNone },'4')   
        .fromTo(".js-carousel03 .text",1,
            { opacity: "0",y:'100%'},
            { opacity: "1",y:'0%',ease: Linear.easeNone },'4')  

        .to(".js-carousel03",1,
            { z: -1},'7')              
    // carusel
    new ScrollMagic.Scene({
        triggerElement: "#js-carousel",
        triggerHook: "onLeave",
        duration: "100%"
    })
    .setPin("#js-carousel")
    .setTween(processT)
    .addIndicators({ name: "carusel" })
    .addTo(controller);
    



    // toggle
    let carouselNav = $('.js-carousel-nav');
    let carouselNavWrap = $('.js-carousel .text');
    let carouselLink = $('.js-carousel-nav .nav-link');
   
    for(let i=0; i < carouselLink.length; i++){
       console.log('length',carouselLink.length)
        let carouselNavT = TweenMax.to('.nav-bg', 1,{
            transform: 'translateY(0%)'
        });
        carouselNavS = new ScrollMagic.Scene({
            // 트리거 지정
            triggerElement: carouselNavWrap[i],
            duration:76
        })
        // 애니메이션
        .setTween(carouselNavT)
        // 컨트롤러
        .addTo(controller)
        // 인디케이터
        .addIndicators({
            name: i
        })
        
        .setClassToggle(carouselLink[i], 'active')
        // .setPin(".nav-bg")
        // .setPin(carouselNavWrap[i])
        console.log(carouselNavWrap[i])
        console.log(i)
        console.log(carouselLink[i])
    }

})