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
    this.$scroll = this.$selector.find('.js-scroll');
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
    
}
Common.prototype._iniEvent = function() {
    const objThis = this;
    let windowScrollTop = $(window).scrollTop();     
    let htmlScrollTop = $('html').scrollTop();
    let winScroll = windowScrollTop || htmlScrollTop;  
    $(document).ready(function(){
        $(document).on({
            ready:function(){
                
                // career 스크롤
                objThis._partScroll(winScroll,windowScrollTop);
                // 네비 스크롤
                objThis._navScroll(windowScrollTop);

            }
                    
        })


        $(window).on({
            scroll:function(e){    
                windowScrollTop = $(window).scrollTop();     
                htmlScrollTop = $('html').scrollTop();
                winScroll = windowScrollTop || htmlScrollTop;  
                // 배경바꾸기           
                if((objThis.$bgChange.offset().top + (objThis.$bgChange.height()/1.5)) <= (windowScrollTop)){
                    $('html').addClass('bg-change')
                }else{
                    $('html').removeClass('bg-change')
                }
                // 프로세스
                const scrollHeight = $('html').prop("scrollHeight");
                const clientHeight = $('html').prop("clientHeight");
                const scrolled = winScroll/(scrollHeight - clientHeight) * 100;
                // console.log(windowScrollTop, htmlScrollTop, scrollHeight ,  clientHeight, scrolled)
                $(objThis.$progressBar.find('.bar')).css({
                    'width':scrolled+"%"
                })
                // career 스크롤
                objThis._partScroll(winScroll,windowScrollTop);

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
                objThis._navScroll(windowScrollTop);

            }
        })

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
}
Common.prototype._navScroll = function (windowScrollTop) {
    const objThis = this;
    // $('.section').each(function(idx) {
    //     thisTop = this.offset().top; 
    //     if( <= windowScrollTop) 
    //         && this.offset().top > 
    // });

    if(objThis.$designIs.offset().top <= windowScrollTop && objThis.$designIs.offset().top + objThis.$designIs.height() > windowScrollTop){
        objThis._navActive(objThis.$navLink, objThis.$navLink[0]);
    }else if(objThis.$process.offset().top <= windowScrollTop && objThis.$process.offset().top + objThis.$process.height() > windowScrollTop){
        objThis._navActive(objThis.$navLink, objThis.$navLink[1]);
    }else if(objThis.$career.offset().top <= windowScrollTop && objThis.$career.offset().top + objThis.$career.height() > windowScrollTop){
        objThis._navActive(objThis.$navLink, objThis.$navLink[2]);
    }else if(objThis.$portfolio.offset().top <= windowScrollTop && objThis.$portfolio.offset().top + objThis.$portfolio.height() > windowScrollTop){
        objThis._navActive(objThis.$navLink, objThis.$navLink[3]);
    }     
}
Common.prototype._navActive = function (obj,tar) {
    obj.removeClass('active');
    $(tar).addClass('active');
}
Common.prototype._partScroll = function(winScroll,windowScrollTop){
    const objThis = this;
    if($(objThis.$career).offset().top < windowScrollTop && $(objThis.$careerScrollE).offset().top-240 > windowScrollTop){
        let careerScroll = $(objThis.$careerScrollS).offset().top - $(objThis.$careerScrollE).offset().top;
        careerScroll = Math.abs(careerScroll)

        const scrolled = (winScroll - $(objThis.$career).offset().top) / careerScroll * 100
        $(objThis.$careerScrollBar).animate({
            'height': scrolled+"%"
        }, 5)
    } 
}
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