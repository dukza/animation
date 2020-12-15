$(function(){
    // init controller
    let processC = new ScrollMagic.Controller();
    let process = $('.js-process');
    // define movement 
    // let processT = gsap.timeline()
    // .to('.js-process01', .1, {y:"-100%",opacity: 0},'0')
    // .from('.js-process02', 1, {y:"100%",opacity: 1},'0')
    // .to('.js-process02', 1, {y:"-100%",opacity: 0},'2')
    // .from('.js-process03', 1, {y:"100%",opacity: 1},'2')
    // .to('.js-process03', 1, {y:"-100%",opacity: 0},'4')
    // .from('.js-process04', 1, {y:"100%",opacity: 1},'4')
    // .to('.js-process04', 1, {y:"-100%",opacity: 0},'6')
    // .from('.js-process05', 1, {y:"100%",opacity: 1},'6')
    // .to('.js-process05', 1, {y:"-100%",opacity: 0},'8')
    // .from('.js-process06', 1, {y:"100%",opacity: 1},'8')
    // .to('.js-process06', 1, {y:"-100%",opacity: 0},'10')
    // create scene
    for(let i=0; i<process.length; i++){
        // define movement 
        let processM = TweenMax
        .staggerTo(process[i],0.1,{opacity:0.4},2)
        let processS = new ScrollMagic.Scene({
            triggerElement: process[i],
            offset: 50,
			triggerHook: 0.9
        })  
        .setClassToggle(process[i], 'visible')
        .addTo(processC)  
        .addIndicators({
            name: "wrap"
        });            
    }


    // create scene
    // let processS1 = new ScrollMagic.Scene({
    //     triggerElement: ".js-process01",
    //     duration: "100%"
    // })
    // .setPin('#process')
    // .addTo(processC)
    // .setClassToggle('.process-badge01', 'active')
    // .addIndicators({
    //     name: "process01"
    // });    

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
