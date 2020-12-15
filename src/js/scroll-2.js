$(function(){
    let scrollCarousel= new ScrollMagic.Controller();
    let scrollCarouselWrap = $('.work-section'),
        con1 = scrollCarouselWrap.find('.work-con1'),
        con2 = scrollCarouselWrap.find('.work-con2'),
        con3 = scrollCarouselWrap.find('.work-con3'),
        img1 = scrollCarouselWrap.find('.work-img1'),
        img2 = scrollCarouselWrap.find('.work-img2'),
        img3 = scrollCarouselWrap.find('.work-img3');
        title = scrollCarouselWrap.find('.work-title');
    let scrollCarouselT = gsap.timeline()
        .to([con1, img1],1,{y:"-100%", opacity:'0'})
        .from([con2, img2],1,{y:"100%", opacity:'0'},'0')
        .to([con2, img2],1,{y:"-100%", opacity:'0'},'2')
        .from([con3,img3],1,{y:"100%", opacity:'0'},'2')
        .to([con3,img3, title],1,{y:"-100%", opacity:'0'},'4')

    let scrollCarouselScene = new ScrollMagic.Scene({
        triggerElement: '.work-section',
        duration: '100%',
        triggerHook: 0,
        offset: '300'
    })
    .setTween(scrollCarouselT)
    .addTo(scrollCarousel)
    .setPin('.work-section');


    // init controller
    let processC = new ScrollMagic.Controller();
    // define movement 
    let processT = gsap.timeline()
    .to('.js-process01', 1, {y:"-100%",opacity: 0},'0')
    .from('.js-process02', 1, {y:"100%",opacity: 1},'2')
    .to('.js-process02', 1, {y:"-100%",opacity: 0},'4')
    .from('.js-process03', 1, {y:"100%",opacity: 1},'4')
    .to('.js-process03', 1, {y:"-100%",opacity: 0},'6')
    // create scene
    let processS = new ScrollMagic.Scene({
        triggerElement: "#process",
        duration: "100%"
    })
    .setTween(processT)
    .addTo(processC)
    .setClassToggle('.js-processWrap','fixed')
    .addIndicators({
        name: "wrap"
    });

    // create scene
    let processS1 = new ScrollMagic.Scene({
        triggerElement: ".js-process01",
        duration: "100%"
    })
    .addTo(processC)
    .setClassToggle('.process-badge01', 'active')
    .addIndicators({
        name: "process01"
    });  
    // create scene
    let processS11 = new ScrollMagic.Scene({
        triggerElement: ".js-process01",
        duration: "100%"
    })
    .addTo(processC)
    .setClassToggle('.js-process01', 'active')
    .addIndicators({
        name: "process01"
    });  
    

    // create scene
    // let processS2 = new ScrollMagic.Scene({
    //     triggerElement: ".js-process02",
    //     duration: "100%"
    // })
    // .setPin('#process')
    // .addTo(processC)
    // .setClassToggle('.process-badge02', 'active')
    // .addIndicators({
    //     name: "process02"
    // });  
    
    // create scene
    // let processS3 = new ScrollMagic.Scene({
    //     triggerElement: ".js-process03",
    //     duration: "100%"
    // })
    // .setPin('#process')
    // .addTo(processC)
    // .setClassToggle('.process-badge03', 'active')
    // .addIndicators({
    //     name: "process02"
    // });   

    // create scene
    // let processS4 = new ScrollMagic.Scene({
    //     triggerElement: ".js-process04",
    //     duration: "100%"
    // })
    // .setPin('#process')
    // .addTo(processC)
    // .setClassToggle('.process-badge04', 'active')
    // .addIndicators({
    //     name: "process02"
    // });   

    // create scene
    // let processS5 = new ScrollMagic.Scene({
    //     triggerElement: ".js-process05",
    //     duration: "100%"
    // })
    // .setPin('#process')
    // .addTo(processC)
    // .setClassToggle('.process-badge05', 'active')
    // .addIndicators({
    //     name: "process02"
    // });   

    // create scene
    // let processS6 = new ScrollMagic.Scene({
    //     triggerElement: ".js-process06",
    //     duration: "100%"
    // })
    // .setPin('#process')
    // .addTo(processC)
    // .setClassToggle('.process-badge06', 'active')
    // .addIndicators({
    //     name: "process02"
    // });  


    // init controller
    // let processWrapC = new ScrollMagic.Controller();

    // create scene
    // let processS1 = new ScrollMagic.Scene({
    //     triggerElement: "#process"
    // })
    // .setTween(processC)
    // .addTo(processWrapC)
    // .setClassToggle('.js-processWrap', 'fixed')
    // .addIndicators({
    //     name: "wrap"
    // });

    // create scene
    // let processS2 = new ScrollMagic.Scene({
    //     triggerElement: ".js-process"
    // })
    // .setTween(processC)
    // .addTo(processWrapC)
    // .setClassToggle('.js-process', 'zIndex')
    // .addIndicators({
    //     name: "1"
    // });

      
    // init controller
    let careerC = new ScrollMagic.Controller();

    // define movement 
    let careerT1 = TweenMax
        .to(['.career-con1','.career-text1'],0.1,{opacity:0.4})
    // create scene
    let careerS1 = new ScrollMagic.Scene({
        triggerElement: ".js-process01",
        offset:300
    })
    .setTween(careerT1)
    .addTo(careerC)
    .setClassToggle('.fixed', 'position-sticky')
    //   .addIndicators({
    //     name: "text1"
    //   });

    // define movement 
    let careerT2 = TweenMax
        .to(['.career-con2','.career-text2'],.1,{opacity:0.4})
    // create scene
    let careerS2 = new ScrollMagic.Scene({
        triggerElement: ".career-con2",
        offset:300
    })
    .setTween(careerT2)
    .addTo(careerC)
    //   .addIndicators({
    //     name: "text2"
    //   }); 
    // define movement 
    let careerT2Img = TweenMax
        .to('.career-img2',.1,{opacity:1})
    // create scene
    let careerS2Img = new ScrollMagic.Scene({
        triggerElement: ".career-con2",
        offset:-100
    })
    .setTween(careerT2Img)
    .addTo(careerC)
    //   .addIndicators({
    //     name: "img2"
    //   });      
    // define movement 
    let careerT3Img = TweenMax
        .to('.career-img3',.1,{opacity:1})
    // create scene
    let careerS3Img = new ScrollMagic.Scene({
        triggerElement: ".career-con3",
        offset:-100,
    })
    .setTween(careerT3Img)

    .addTo(careerC)
    //   .addIndicators({
    //     name: "img3"
    //   });   
})
