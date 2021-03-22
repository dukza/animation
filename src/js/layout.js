(function($){
    $.fn.common = function(){
        this.each(function(index){
            let common = new Common(this);
        })
        return this;
    }
})(jQuery)

function commonInit(selector){

    $(selector).common();
}

function Common(selector){
	this.$selector = null;
	this._init(selector);
    this._iniEvent();
}
Common.prototype._init = function(selector) {
    this.$selector = $(selector);
    this.$bgChange = this.$selector.find('.js-bgChange');
    this.$slider = this.$selector.find('.js-slider');
    this.$select = this.$selector.find('.jSelect');
    this.$layer = this.$selector.find('.js-layer');
    this.$progressBar = this.$selector.find('.js-progressBar');
    this.$career = this.$selector.find('#career');
    this.$careerScrollS = this.$selector.find('.career-scroll1');
    this.$careerScrollE = this.$selector.find('.career-scroll3');
    this.$careerScrollBar = this.$selector.find('.career-scrollBar');
    this.$btnTop = this.$selector.find('.js-btn-top');
    this.$designIs = this.$selector.find('#designIs');
    this.$process = this.$selector.find('#pinContainer');
    this.$career = this.$selector.find('#career');
    this.$portfolio = this.$selector.find('#portfolio');
    this.$navLink = this.$selector.find('.js-link');
    this.$jSection = this.$selector.find('.jSection');
    

    // 슬라이드 slider
    this.$selectMenu = this.$selector.find('[data-wrap="sider"] .menu');

    this.$listWrap = this.$selector.find('.js-listWrap');
    this.$listIcon = this.$selector.find('.js-listWrap .icon');
    this.$question = this.$selector.find('.js-question');
    this.$answer = this.$selector.find('.js-answer');
    this.$search = this.$selector.find('.js-search');
    this.$searchText = this.$selector.find('.js-search input');

    
    
    
}
Common.prototype._iniEvent = function() {
    const objThis = this;
    let windowScrollTop = $(window).scrollTop();     
    let htmlScrollTop = $('html').scrollTop();
    let winScroll = windowScrollTop || htmlScrollTop;   
    // $(document).on({
    //     ready:function(){
            
    //         // career 스크롤
    //         objThis._partScroll(winScroll,windowScrollTop);
    //         // 네비 스크롤
    //         objThis._navScroll(windowScrollTop);

    //     }
                
    // })
    $(document).ready(function(){
        $(window).on({
            scroll:function(e){    
                windowScrollTop = $(window).scrollTop();     
                htmlScrollTop = $('html').scrollTop();
                winScroll = windowScrollTop || htmlScrollTop;  
                // 배경바꾸기           
                // if((objThis.$bgChange.offset().top + (objThis.$bgChange.height()/1.5)) <= (windowScrollTop)){
                //     $('html').addClass('bg-change')
                // }else{
                //     $('html').removeClass('bg-change')
                // }
                // 프로세스
                const scrollHeight = $('html').prop("scrollHeight");
                const clientHeight = $('html').prop("clientHeight");
                const scrolled = winScroll/(scrollHeight - clientHeight) * 100;
                // console.log(windowScrollTop, htmlScrollTop, scrollHeight ,  clientHeight, scrolled)
                $(objThis.$progressBar.find('.bg-indigo-500')).css({
                    'width':scrolled+"%"
                })
                // career 스크롤
                // objThis._partScroll(winScroll,windowScrollTop);

                // btnTop
                if(objThis.$designIs.height()<htmlScrollTop){
                    objThis.$btnTop.css({
                        'opacity':'1'
                    })
                }else{
                    objThis.$btnTop.css({
                        'opacity':'0'
                    })
                }
                // 네비 스크롤
                // objThis._navScroll(windowScrollTop);

            },
            resize:function(){
                if($(window).width()>768){
                    $('[data-wrap="sider"]').css({
                        top:'auto'
                    })
                    $('[data-wrap="sider"]').removeClass("active");
                }

            }

        })
        
    })


    this.$selectMenu.on({
        click:function(){
            objThis._navActive(objThis.$selectMenu,$(this));
        }
    })
    
    this.$navLink.on({
        click:function(e){
           // 네비 활성화 
            objThis._navActive(objThis.$navLink, $(this));
            e.preventDefault();
            const link = $(this).data('link');
            let scrollTopTO = $("[data-name='"+link+"']").offset().top;
            if(link === 'process'){
                scrollTopTO = $("[data-name='designIs']").height();
            } 
            $('html, body').animate({
                scrollTop: scrollTopTO
            }, 500);
        },
        mouseover:function(){
            objThis.$navLink.css({
                'opacity':'.6'
            })            
            $(this).css({
                'opacity':'1'
            })
        },
        mouseout:function(){
            objThis.$navLink.css({
                'opacity':'1'
            })            
        }

    })
    this.$btnTop.on({ 
        click:function(e){
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        }
    }) 
    this.$select.on({
        click:function(e){
            e.preventDefault();
            let target = $(this).data('target');
            let location = $('[data-location="'+ target +'"]')
            let wrap = $('[data-wrap="'+ target +'"]')
            let name = $('[data-name="'+ target +'"]')
            // wrap.css({
            //    top:location.offset().top + location.height() 
            // })
            // name.css({
            //   height: $(window).height() - (location.offset().top + location.height()),
              
            // })
            if($(window).width()<768){
                $(this).toggleClass("active");
                wrap.toggleClass("active");
                $('window,body').toggleClass("overflow-hidden");
                let moveTo = $(objThis.$select).outerHeight();
                console.log('moveTo',moveTo);
                if(wrap.hasClass('active')) {
                    wrap.slideUp("fast");
                    wrap.fadeIn()
                    .css({top:1000})
                    .animate({top:moveTo}, 300, function() {
                        //callback
                        console.log('slide up view');
                    });

                }else{
                    //wrap.slideDown("fast");
                    wrap.fadeIn()
                    .css({top:moveTo})
                    .animate({top: 1000},300, function() {
                        //callback
                        console.log('slide down hidden ');
                    });
                    
                }
            }

              

            
            // name.slideDown({
            //     height:'toggle'       
            // }) 

        }
    })

    this.$listWrap.on({
        click:function(e){
            e.preventDefault();
            if($(this).hasClass('active')){
                objThis.$listWrap.removeClass('active');
                $(this).find(objThis.$answer).slideUp("fast");
            }else{
                objThis.$listWrap.removeClass('active');
                $(this).addClass('active');
                $(objThis.$listWrap).find(objThis.$answer).slideUp("fast");
                $(this).find(objThis.$answer).slideDown("fast");
            }
        }
    })
    this.$searchText.on({
        focusin:function(){
            objThis.$search.addClass('active');        
        },
        focusout:function(){
            objThis.$search.removeClass('active');        
        }     
    })

}

// Common.prototype._navScroll = function (windowScrollTop) {
//     const objThis = this;
//     if(objThis.$designIs.offset().top <= windowScrollTop && objThis.$designIs.offset().top + objThis.$designIs.height() > windowScrollTop){
//         objThis._navActive(objThis.$navLink, objThis.$navLink[0]);
//     }else if(objThis.$process.offset().top <= windowScrollTop && objThis.$process.offset().top + objThis.$process.height() > windowScrollTop){
//         objThis._navActive(objThis.$navLink, objThis.$navLink[1]);
//     }else if(objThis.$career.offset().top <= windowScrollTop && objThis.$career.offset().top + objThis.$career.height() > windowScrollTop){
//         objThis._navActive(objThis.$navLink, objThis.$navLink[2]);
//     }else if(objThis.$portfolio.offset().top <= windowScrollTop && objThis.$portfolio.offset().top + objThis.$portfolio.height() > windowScrollTop){
//         objThis._navActive(objThis.$navLink, objThis.$navLink[3]);
//     }     
// }

Common.prototype._toggleList = function () {
    for(let i = 0; i < obj.length; i++){
        obj[i].onClicj = function(){
            if($(this).hasClass('active')){
                wrap.removeClass('active')
            }else{
                for(let i = 0; i < obj.length; i++){
                    wrap.removeClass('active')
                }
                obj.addClass('active')
            }
        }

    }
}
// 스크롤
// Layout.prototype._toFixed = function(fixedH){
// 	var objThis = this;	
// 	var wScroll = $(window).scrollTop();
// 	// console.log(wScroll)
// 	if((objThis._faqFixed.offset().top + objThis._faqFixed.height()) > wScroll){
// 		// console.log('yes')
// 		$(objThis._faqInput).addClass('default')
// 		$(objThis._faqInput).removeClass('fixed')
// 		$(objThis._faqInput).stop().animate({
// 			'top':'auto',
// 			'opacity':'1'
// 		})
// 	}else if((objThis._faqFixed.offset().top + objThis._faqFixed.height()) < wScroll && $('#faq .searchWrap').height() > wScroll ){
// 		// console.log('아래')
// 		$(objThis._faqInput).removeClass('default')
// 		$(objThis._faqInput).addClass('fixed')
// 		$(objThis._faqInput).css({
// 			'top':-fixedH,
// 			'opacity':'.6'
// 		})
// 	}else if($('#faq .searchWrap').height() < wScroll ){
// 		// console.log('fixed')
// 		$(objThis._faqInput).stop().animate({
// 			'top':0,
// 			'opacity':'1'
// 		})
// 	}		
// }

Common.prototype._navActive = function (obj,tar) {
    
    if(tar.hasClass('active')) {
        tar.removeClass('active');
    }else{
        obj.removeClass('active');
        tar.addClass('active');
    }
    
}
// Common.prototype._partScroll = function(winScroll,windowScrollTop){
//     const objThis = this;
//     if($(objThis.$career).offset().top < windowScrollTop && $(objThis.$careerScrollE).offset().top-240 > windowScrollTop){
//         let careerScroll = $(objThis.$careerScrollS).offset().top - $(objThis.$careerScrollE).offset().top;
//         careerScroll = Math.abs(careerScroll)

//         const scrolled = (winScroll - $(objThis.$career).offset().top) / careerScroll * 100
//         $(objThis.$careerScrollBar).animate({
//             'height': scrolled+"%"
//         }, 5)
//     } 
// }
Common.prototype._slideOpen = function(tar) {
    const target = tar.data('target');
    const obj = $('[data-name='+target+']').find('.bg-light');
    $('[data-name='+target+']').stop().animate({
        opacity:1
    },'slow')
    $(obj).stop().animate({
        right:0+'px'
    },'slow')
    $('[data-name='+target+']').css({
        'display':'block'
    })
    $('body').css({
        'overflow':'hidden'
    })
}
