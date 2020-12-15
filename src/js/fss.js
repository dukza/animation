// 플러그인만들기
(function($){
	$.fn.layout = function(){
		this.each(function(index){
			var layout = new Layout(this);
		})
		return this;
	}
})(jQuery)

var FMS_SITE_URL = "";
var isHashScrolled = false;

function layoutScrollToHash() {

	// URL에 해시가 있으면 해시로 이동
	if (isHashScrolled == false) {
		isHashScrolled = true;

		if (location.hash != '') {
			if (location.hash.startsWith("#navSide=")) {
				var navSideId = location.hash.replace("#navSide=", "");
				var navSideObj = $("[data-navSide='" + navSideId + "']");
				if (navSideObj.length > 0) {
					// 이미 화면에 그려져 있음
					var navTabTargetObj = navSideObj.closest("[data-navTab-target]");
					// 표시할 탭이 있을 때에만 동작
					if (navTabTargetObj.length > 0) {
						var navTabId = navTabTargetObj.attr("data-navTab-target");
						if (navTabId != undefined && navTabId != null && navTabId != "") {
							var navTabObj = $("[data-navTab='"+navTabId+"']");
							navTabObj.trigger("click");
							navSideObj.trigger("click");
						}
					}
				}
				else {
					// 아직 화면에 그려지지 않았음
					navSideObj.ready(function() {
						// 화면이 정리될 시간을 준다.
						setTimeout(function() {
							var newNavSideObj = $("[data-navSide='" + navSideId + "']");
							var navTabTargetObj = newNavSideObj.closest("[data-navTab-target]");
							// 표시할 탭이 있을 때에만 동작
							if (navTabTargetObj.length > 0) {
								var navTabId = navTabTargetObj.attr("data-navTab-target");
								if (navTabId != undefined && navTabId != null && navTabId != "") {
									var navTabObj = $("[data-navTab='"+navTabId+"']");
									navTabObj.trigger("click");
									newNavSideObj.trigger("click");
								}
							}
						}, 200);
					});
				}
			}
			else if (location.hash.startsWith("#navTab=")) {
				var navTabId = location.hash.replace("#navTab=", "");
				var navTabObj = $("[data-navTab='" + navTabId + "']");

				if (navTabObj.length > 0) {
					// 이미 화면에 그려져 있음
					$(navTabObj[0]).trigger("click");
				}
				else {
					// 아직 화면에 그려지지 않았음
					navTabObj.ready(function() {
						// 화면이 정리될 시간을 준다.
						setTimeout(function() {
							$($("[data-navTab='" + navTabId + "']")[0]).trigger("click");
						}, 200);
					});
				}
			}
			else {
				var hash = $(location.hash);
				//console.log(hash);
				var scrollToElm = function(elm) {
					var bodyPos = $('body').scrollTop();
					var pos = elm.offset().top;

					$('html, body').stop().animate({
						scrollTop: pos
					}, 500, 'easeOutQuint');
				}

				if (hash.length > 0) {
					// 이미 화면에 그려져 있음
					scrollToElm(hash);
				}
				else {
					// 아직 화면에 그려지지 않았음
					hash.ready(function() {
						// 화면이 정리될 시간을 준다.
						setTimeout(function() {
							scrollToElm($(location.hash));
						}, 200);
					});
				}
			}

		}
	}
}

//layoutInit('#hpIndex', "navSub", "join", null , 'more');
function layoutInit(selector, nav, menuId, scroll, more) {
	FMS_SITE_URL = $("[data-fms-site-url]").attr("data-fms-site-url");

	// 속성 넣기
	// 메뉴 스타일
	$(selector).attr("data-nav-main-sub", nav);
	// 메뉴 선택
	$(selector).attr("data-active-menu-id", menuId);
	// 스크롤 유무
	$(selector).attr("data-scroll", scroll);
	$(selector).attr("data-more", more);
	$(selector).layout();

	layoutScrollToHash();
}

function Layout(selector){
	this.$selector = null;
	// this._$open = null;
	this._init(selector);
	this._iniEvent();
	this._ctrNav();
	this._ctrClose();
	$selectItem = null;
	$menuItem = null;
	// 레이어 스크롤 상단 위치
	$('.layerConWrap').scrollTop(0)

}

// 초기값
Layout.prototype._init = function(selector) {
	this.$selector = $(selector);

	// 스크롤 탭
	// 서비스비용
	this.outerHeight = [];

	//페이지
	this._$btnLoad = this.$selector.find('.btnLoad');

	//오버시
	this._$btnHover = this.$selector.find('.btnHover');


	// 스크롤
	this._$navTop = this.$selector.find('#navTop');

	this._$btnTop = this.$selector.find('.btnTop');


	//	스타일
	if (this.$selector.attr("data-nav-main-sub") == "navSub") {
		this._$navTop.removeClass('navMain');
		this._$navTop.addClass('navSub');
		this._$navTop.removeClass('scrollType');
	}
	//	메뉴 선택
	this._setMenuById(this.$selector.attr("data-active-menu-id"));

	// 탭스크롤
	this._navTabScroll = this.$selector.find('.navTabScroll');

	// 탭
	this._navTabs = this.$selector.find('.navTabs');
	this._navTab = this.$selector.find('.navTab');
	this._pageCard = this.$selector.find('.pageCard');
	this._navSide = this.$selector.find('.navSide');
	// 토글
	// 약관
	this._showWrap = this.$selector.find('.showWrap');

	// 초기화
	// 스크롤 픽스
	$('.objFixed').removeClass('position-fixed');

	// 마이 레이어
	// this._navMyMenuLeft = this.$selector.find('.nav-myMenu').position().left;
	$('#myMenu').css({
		right:0
	})

	// 더보기
	this._btnMore = this.$selector.find('.btnMore');

	// 폴더
	this._btnFolder = this.$selector.find('.btnFolder');
	this._objFolder = this.$selector.find('.objFolder');

	// 모바일 폴더
	this._btnFolderM = this.$selector.find('.btnFolderM');
	this._objFolderM = this.$selector.find('.objFolderM');

	// 섹션 페이징
	this._btnSectionPaging = this.$selector.find('.btnSectionPaging');
	this._btnSectionPre = this.$selector.find('.btnSectionPre');
	this._btnSectionNext = this.$selector.find('.btnSectionNext');
	this._sectionWrap = this.$selector.find('.sectionWrap');
	this._sectionWrapActive = this.$selector.find('.sectionWrap.active');
	this._progress = this.$selector.find('.progress');
	this._progressBar = this.$selector.find('.progress-bar');
	this._processTab = this.$selector.find('.processTab');
	this._processTabWrap = this.$selector.find('.processTabWrap');
	this._btnNavClose = this.$selector.find('.btnNavClose');
	this._bgDim = this.$selector.find('.bg-dim');
	this._navInquiry = this.$selector.find('#nav-inquiry');
	this._navSubinquiry = this.$selector.find('#navSub-inquiry #navSub');
	this._$navTopHeight = this.$selector.find('#navTop').outerHeight();
	this._mainBannerWelcome = this.$selector.find('#main-banner-welcome').height();
	this._topHeight1 = this._mainBannerWelcome+this._$navTopHeight;

	var navInquiry = $('#nav-inquiry').position().left;

	this._navSubinquiry.css({
		left:navInquiry,
	});
	$(window).resize(function() {
		if($(window).width() > 768){
			$('#guide-navSideWrap').css({
				display:'block'
			});
		}
	});
};

Layout.prototype._iniEvent = function() {
	var objThis = this;
	$(window).resize(function() {
		navInquiry = $('#nav-inquiry').position().left;
		objThis._navSubinquiry.css({
			left:navInquiry,
		})
	});

	// 섹션 페이징
	this._btnSectionPaging.click(function(){
		// 항목
		objThis._sectionWrap.removeClass('active');
		if($(this).hasClass('btnSectionNext')){
			var curIdx = objThis._btnSectionNext.index(this);
			var itemIdx = curIdx + 1;

		}else{
			var curIdx = objThis._btnSectionPre.index(this);
			var itemIdx = curIdx - 1;
		}
		objThis._sectionWrap.eq(itemIdx).addClass('active');
		// 탭
		objThis._processTab.removeClass('active')
		var tabIdx = 0;
		if (itemIdx == 0) {
			tabIdx = 0;
		}else if(itemIdx == 1 || itemIdx < 4){
			tabIdx = 1;
		}else if(itemIdx == 4){
			tabIdx = 2;
		}else if(itemIdx == 5){
			objThis._progress.css({
				'display':'none'
			})
			objThis._processTabWrap.css({
				'display':'none'
			})
		}
		objThis._processTab.eq(tabIdx).addClass('active');
		// 프로그레스바
		var count = objThis._sectionWrap.length - 1;
		objThis._progressBar.css({
			'width':(100/count)*itemIdx + '%'
		})

	})

	// 내비 디자인
	if (objThis.$selector.attr("id") == "hpIndex") {
		$(window).scroll(function(){
			objThis._windowPos = $(window).scrollTop();
			if(objThis.$selector.hasClass('pageScroll') == true ){
				//스크롤
				objThis._ctrScroll();
			}
		})
		// 위로
		this._$btnTop.click(function(e){
			e.preventDefault();
			//메인 내비 초기화
			objThis._ctrNav();
		});
	}
	// 마이 레이어
	this._$btnHover.on('mouseenter',function(){
		// console.log('mouseenter')
		var url = $(this).data('url');
		if (url.startsWith("toggle:")) {
			var elmId = url.replace(/toggle:/i, "");
			$("#"+elmId).show();
			return;
		}
		// var navSuId = $(this).attr('data-fss-navSub-id');
		// if (navSuId != undefined && navSuId != null && navSuId != "") {
		// 	objThis._navSub(navSuId);
		// }

	})


	// 마이 레이어
	this._$btnHover.on('mouseleave',function(){
		var url = $(this).data('url');
		if (url.startsWith("toggle:")) {
			var elmId = url.replace(/toggle:/i, "");
			$("#"+elmId).hide();
			return;
		}
	})

	// 로딩
	this._$btnLoad.click(function() {
		var url = $(this).data('url');
		if (url === undefined || url === null && url == "") {
			return;
		}
		// javascript:로 시작하는 것을 URL을 이동하지 않고 자바스크립트 함수를 실행
		//로그인 관련
		if (url.startsWith("javascript:")) {
			var func = url.replace(/javascript:/i, "");
			window[func]();
			return;
		}
		//토글 레이어
		else if (url.startsWith("toggle:")) {
			var elmId = url.replace(/toggle:/i, "");
			$("#"+elmId).toggle();
			$('html').addClass('overflow-hidden');
			return;
		}

		var target = $(this).data('target');
		var target = "#"+target;
		// 내비 모바일
		// if ((target != "#NavMobile")) {
		// 	console.log(target);
		// 	console.log('타겟이 모바일 패널');
		// 	$('#NavMobile').hide();
		//
		// }
		if( target === "#guide-avi"){
			// $("#aviDialog").trigger("beforeShow");
			$('#guide-avi-iframe').prop('src',$(this).data('url'));
			$("#aviDialog").show();
			$('html').addClass('overflow-hidden');
			if($(window).width() < 768){
				$('#guide-avi-iframe').css({
					'width':'320px',
					'height':'240px',
				});
			}
		}
		if ((target != "#NavMobile-new")) {
			$('#NavMobile').hide();
			// 사용법 모바일 버튼
			if(target == '#guide-navSideWrap'){
				// console.log('guide-navSideWra');
				$("#"+url).slideToggle();

			}
		}

		// if ((target != "#NavMobile") || (target != "#NavMobile-new")) {
		// 	console.log(target);
		// 	console.log('타겟이 모바일 패널');
		// 	$(target).hide();
		//
		// }
		// 레이어
		// 공통테스트
		// if(target == '#layer'){
		// 	console.log('layer')
		// 	$('html').addClass('overflow-hidden')
		// 	objThis._ctrLoad(url,target);
		//
		// // //내비 모바일
		// }
		// else if(target == '#NavMobile'){
		// 	console.log('NavMobile')
		// 	// console.log($(target))
		// 	$('html').addClass('overflow-hidden')
		// 	$(target).toggle();
		// //페이지
		// }
		else if(target == '#NavMobile-new'){
			// console.log($(target))
			$('html').addClass('overflow-hidden');
			$(target).toggle();
			$(target).css({
				width:'100%',
				opacity:1
			})
			objThis._btnNavClose.click(function () {
				$(target).css({
					width:'0%',
					opacity:0
				})
				$('html').removeClass('overflow-hidden');
			})
			// if (target != "NavMobile-panel"){
			// 	console.log('_bgDim')
			// }

			// objThis._bgDim.trigger('objThis._btnNavClose');
			//페이지
		}

		// 공통테스트
		else {
			//console.log('else')
			$('html').removeClass('overflow-hidden');
			objThis._ctrLoad(url,target);
		}

	})

	// 폼
	// 라벨을 클릭하면 폼 클릭시와 같이
	$("body").on("click", ".labelText", function(){
		var formControlWrap = $(this).parent(".form-control-wrap");
		var formControl = formControlWrap.find(".form-control");
		formControl.trigger("focus");
	})

	$("body").on("click, focus", ".form-control", function(){
		var formControlWrap = $(this).parent(".form-control-wrap");
		var labelText = formControlWrap.find(".labelText");
		labelText.addClass("labelText-form-top");
	})
	// 다른 영역 초기화
	$("body").on("blur", ".form-control", function(){
		var val = $(this).val();
		if (val === undefined || val == null || val == "") {
			var formControlWrap = $(this).parent(".form-control-wrap");
			var labelText = formControlWrap.find(".labelText");
			labelText.removeClass("labelText-form-top");
		}
	})
	// 스크롤 픽스
	this._ctrScrollFixed($('[data-scroll="scroll"]'));

	// 스크롤 탭
	this._ctrScrollTab($('.pageCon'))


	// 스크롤 탭
	$(document).scroll(function(){
		var currentScroll = $(document).scrollTop();

		for(var i=0; i<objThis.outerHeight.length; i++){
			if( currentScroll >= objThis.outerHeight[i] ) {
				$(objThis._navTabScroll).removeClass('active');
				$(objThis._navTabScroll[i]).addClass('active');
			}else if(currentScroll == 0){
				$(objThis._navTabScroll).removeClass('active');
			}
		}
		// 프로세스 바 윈도우폭 대비 위치
		// if(objThis.$selector.attr("data-scroll") == "scroll"){
		// 	var left = $('.breadcrumbWrap .active').offset().left;
		// 	var outerWidth = $('.breadcrumbWrap .active').outerWidth(true);
		// 	left = left + outerWidth;
		// 	var width = $(document).width();
		// 	$('#pageTabs').scrollLeft(0);
		// 	if( width <= left){
		// 		$('#pageTabs').scrollLeft(left);
		// 	}
		// }

	});
	// 토글
	this._ctrShow(objThis._showWrap);
	// 탭
	this._navTab.click(function(e){
		e.preventDefault();
		// 선택
		var meObj = $(this);

		objThis._ctrSel(meObj,objThis._navTab);
		var clickIdx = meObj.index();
		var navTabId = meObj.attr("data-navTab");
		var targetObj = null;
		var siblingObj = null;

		// console.log("navTabId=[" + navTabId + "]");

		if (navTabId != undefined && navTabId != null && navTabId != "") {
			targetObj = objThis._pageCard.filter("[data-navTab-target='" + navTabId +"']");
			siblingObj = objThis._pageCard.filter("[data-navTab-target]");
			objThis._navTab.removeClass('active');
			objThis._navTab.filter("[data-navTab='" + navTabId +"']").addClass('active');


			// 서비스 신청 탭 스타일
			if( navTabId == 'regCompanyIndv' || navTabId == 'regCompanyCorp' ){
				if(meObj.find('button').hasClass('contactNavGoodsInfo')){
					objThis._navTab.find('button').removeClass('btn-primary');
					objThis._navTab.find('button').addClass('btn-light');
					meObj.find('button').removeClass('btn-light');
					meObj.find('button').addClass('btn-success');
				}else{
					objThis._navTab.find('button').removeClass('btn-success');
					objThis._navTab.find('button').addClass('btn-light');
					meObj.find('button').removeClass('btn-light');
					meObj.find('button').addClass('btn-primary');
				}
			}

		}else {
			siblingObj = $(objThis._pageCard);
			targetObj = $(objThis._pageCard[clickIdx]);
		}
		// 전체숨기기
		siblingObj.filter(":visible").trigger("beforeHide");
		siblingObj.hide();
		siblingObj.filter(":visible").trigger("afterHide");

		// 선택보여주기
		targetObj.trigger("beforeShow");
		targetObj.show();
		objThis._ctrFolderTextMobile($(this));
		targetObj.trigger("afterShow");

		// $('.btnTop').trigger("click");

		// if($(window).width()<=768){
		// 	console.log('html')
		// 	var html = objThis.html();
		// 	objThis._btnFolderM.html(html);
		// 	objThis._btnFolderM.find('.btn').addClass('btn-brand-blue')
		// 	objThis._objFolderM.slideUp("slow");
		// }

		// console.log(clickIdx)
	})
	// 사이드
	this._navSide.click(function(e){
		e.preventDefault();
		var meObj = $(this);
		var clickIdx = meObj.index();
		var navSideId = meObj.attr("data-navSide");

		var navSideWrap = meObj.attr("data-navSide-wrap");

		var navSide = $("#"+navSideWrap).find('.navSide');
		var targetObj = null;
		var siblingObj = null;

		if (navSideId != undefined && navSideId != null && navSideId != "") {
			targetObj = objThis._pageCard.filter("[data-navSide-target='" + navSideId +"']");
			siblingObj = objThis._pageCard.filter("[data-navSide-target]");

			navSide.removeClass('active');
			navSide.filter("[data-navSide='" + navSideId +"']").addClass('active');
		}else {
			siblingObj = $(objThis._pageCard);
			targetObj = $(objThis._pageCard[clickIdx]);
		}

		siblingObj.filter(":visible").trigger("beforeHide");
		siblingObj.hide();
		siblingObj.filter(":visible").trigger("afterHide");

		targetObj.trigger("beforeShow");
		targetObj.show();
		objThis._ctrFolderTextMobile($(this));
		targetObj.trigger("afterShow");

		$('.btnTop').trigger("click");

		// if($(window).width()<=768){
		// 	console.log('html')
		// 	var html = objThis.html();
		// 	objThis._btnFolderM.html(html);
		// 	objThis._btnFolderM.find('.btn').addClass('btn-brand-blue')
		// 	objThis._objFolderM.slideUp("slow");
		// }

		// console.log(clickIdx)
	})
	// this._navSide.click(function(){
	//
	// 	// 선택
	// 	var meObj = $(this);
	// 	var closest = $(this).parent();
	// 	var navSide = closest.find(objThis._navSide);
	//
	// 	var clickIdx = meObj.index();
	// 	var navSideId = meObj.attr("data-navSide");
	// 	var targetObj = null;
	// 	var siblingObj = null;
	// 	// console.log("navTabId=[" + navTabId + "]");
	//
	// 	if (navSideId != undefined && navSideId != null && navSideId != "") {
	//
	// 		// objThis._ctrSel(meObj,navSideId);
	// 		console.log('meObj'+meObj);
	// 		console.log(navSide);
	// 		targetObj = objThis._pageCard.filter("[data-navSide-target='" + navSideId +"']");
	// 		siblingObj = objThis._pageCard.filter("[data-navSide-target]");
	// 		navSide.removeClass('active');
	// 		objThis._navSide.filter("[data-navSide='" + navSideId +"']").addClass('active');
	// 	}else {
	// 		siblingObj = $(objThis._pageCard);
	// 		targetObj = $(objThis._pageCard[clickIdx]);
	// 	}
	//
	// 	siblingObj.filter(":visible").trigger("beforeHide");
	// 	siblingObj.hide();
	// 	siblingObj.filter(":visible").trigger("afterHide");
	//
	// 	targetObj.trigger("beforeShow");
	// 	targetObj.show();
	// 	objThis._ctrFolderTextMobile($(this));
	// 	targetObj.trigger("afterShow");
	//
	// 	$('.btnTop').trigger("click");
	//
	// 	// if($(window).width()<=768){
	// 	// 	console.log('html')
	// 	// 	var html = objThis.html();
	// 	// 	objThis._btnFolderM.html(html);
	// 	// 	objThis._btnFolderM.find('.btn').addClass('btn-brand-blue')
	// 	// 	objThis._objFolderM.slideUp("slow");
	// 	// }
	//
	// 	// console.log(clickIdx)
	// })
	// 더보기, 스타트 사용법
	// objMore,wrapMore,btnMore,tarMore
	this._btnMore.click(function(){
		var targetId = $(this).attr('data-more');
		var target = null;
		var wrap = null;
		if($(this).html() == '접기 <i class="fas fa-angle-up"></i>'){
			$('.btnMore').html('더보기 <i class="fas fa-angle-down"></i>');
		}else{
			$('.btnMore').html('접기 <i class="fas fa-angle-up"></i>');
		}
		//console.log(targetId)
		wrap = $('.wrapMore').filter("[data-more-wrap='" + targetId +"']")
		if(wrap !== null && wrap !== undefined && wrap != ""){
			wrap.toggleClass('bg-white');
			wrap.toggleClass('box-shadow');
		}
		target = $('.tarMore').filter("[data-more-target='" + targetId +"']")
		target.slideToggle("slow");
	})

	// 리스트 폴더, 스타드 사용법
	// btnFolder,objFolder
	this._btnFolder.click(function(){
		var $thisBtn = $(this);

		// 스타일
		objThis._btnFolder.find('.text').removeClass("text-brand-blue");
		$(this).find('.text').addClass("text-brand-blue");
		// 선택
		var idx = $(this).index('.btnFolder');
		var toClose = objThis._objFolder.eq(idx).is(':visible');
		if (toClose) {
			$(objThis._objFolder).eq(idx).slideUp("slow");
			$(this).find('.text').removeClass("text-brand-blue");
		}
		else {
			$('.objFolder').filter(':visible').slideUp("slow");
			$(objThis._objFolder).eq(idx).slideDown("slow", function() {
				var bodyPos = $('html, body').scrollTop();
				var pos = $thisBtn.offset().top;
//				console.log("pos=" + pos + ", bodyPos="+bodyPos);
				if (pos < bodyPos) {
					$('html, body').stop().animate({
						scrollTop: pos
					}, 500, 'easeOutQuint');
				}
			});
		}
	})

	// 모바일 메뉴 폴더
	this._btnFolderM.click(function(){
		objThis._ctrFolderMobile();
		// 텍스트 교체
		objThis._navTab.click(function(){
			objThis._ctrFolderTextMobile($(this));
		})
	})
	// FAQ 리스트 펼치기
	this._slideList($('.mainFaqListTitle'),'.listContent');

};

// Layout.prototype._navSub = function(name) {
// 	console.log(name)
// 	switch (name) {
// 	case "intro":
// 		alert("1");
// 		break;
// 	case "string":
// 		alert("2");
// 		break;
// 	case "object":
// 		alert("3");
// 		break;
// 	default:
// 		alert("4");
// 		break;
// 	}
// 	return;
// };

Layout.prototype._slideList = function(obj,cName) {
	obj.click(function(e){
		// console.log(obj)
		// console.log(cName)
		e.preventDefault();
		obj.removeClass('title');
		$(this).addClass('title');
		var parent = $(this).parent();
		var articleContent = parent.find(cName);
		// console.log(parent)
		// console.log(articleContent)
		var toClose = articleContent.is(':visible');
		if (toClose) {
			$(articleContent).slideUp("slow");
			obj.removeClass('title');
		}
		else {
			$(cName+':visible').slideUp("slow");
			$(articleContent).slideDown("slow");
		}
	})
};

Layout.prototype._ctrFolderTextMobile = function(obj) {
	var text = obj.text();
	this._btnFolderM.find('.btn').text(text);
	this._objFolderM.slideUp("slow");
};

// 모바일 메뉴 폴더
Layout.prototype._ctrFolderMobile = function() {
	this._objFolderM.slideToggle("slow");
};



//레이어 닫기
Layout.prototype._ctrClose = function() {
	var objThis = this;
	var btnClose  = $('.closeWrap').find('.btnClose');
	btnClose.click(function() {
		$('.closeWrap').hide();
		$('html, body').removeClass('overflow-hidden')
	})
};

// 상단 메뉴 선택
Layout.prototype._setMenuById = function(menuId) {
	if (menuId === undefined || menuId == null || menuId == "") {
		return;
	}
	//	 메뉴선택
	$('[data-fss-menu-id]').removeClass('active');
	$('[data-fss-menu-id='+menuId+']').addClass('active');
};

//페이지 로드
// 공통테스트
Layout.prototype._ctrLoad = function(url,target) {
	// $(target).removeClass('d-none')
	$(target).show();
	this._ctrStyle(url);

	showLoadingPopup();
	$.ajax({
		url:url, // 호출 페이지 URL 입력   ex) 'faq.html'
		type:'POST',
		dataType:'html',
		success: function(page){
			hideLoadingPopup();
			// 페이지를 DIV에 추가 하는 부분
			$(target).empty();
			$(target).append(page);
			// 메뉴 활

		},
		complete : function(){
			// Ajax가 정상적으로 끝났을 경우의 후 처리
			// 필요 없으면 complete 함수 삭제

		},
		error : function() {
			hideLoadingPopup();
			// Ajax 호출 시 오류가 발생하면 호출 되는 함수
			// 필요 없으면 complete 함수 삭제
		}
	});
};


// 토글
Layout.prototype._ctrShow = function(obj) {
	// 토글 버튼
	var btnShow = obj.find('.btnShow')
	// 토글 오브젝트
	var objShow = obj.find('.objShow')
	btnShow.click(function(){
		//console.log('btnShow')
		objShow.slideToggle("slow");
	})
	// $(document).scroll(function(){
	// 	objShow.hide();
	// })
	this._navTabScroll.click(function(){
		objShow.hide();
	})
};

//스타일 교체
Layout.prototype._ctrStyle = function(url) {
	var objThis = this;
	if( (url=='fms.html' || url=='/content/layerSNSLogin' && this._$navTop.hasClass('navMain')) || url=='/content/main' || url=='myMenu'){
		objThis._$navTop.addClass('navMain');
		objThis._$navTop.removeClass('navSub');
		objThis._$navTop.addClass('scrollType');

		objThis._$navTop.css({
			'position':'relative'
		})
	}
	else{
		objThis._$navTop.removeClass('navMain');
		objThis._$navTop.addClass('navSub');
		objThis._$navTop.removeClass('scrollType');
	}
};
// 내비 초기화
Layout.prototype._ctrNav= function() {
	if(this._$navTop.hasClass('navSub')){
		$('#navTop').css({
			'position':'relative',
		});

	}else {
		$('#navTop').css({
			'top':this._mainBannerWelcome+'px',
			'position':'absolute',
			'left':'0px'
		});
	}


	$('html, body').stop().animate({
		scrollTop:0
	}, 500,'easeOutQuint');
}
// 스크롤 픽스
Layout.prototype._ctrScrollFixed = function(obj) {
	var objThis = this;
	$scrollObj = $(obj).find($('.objFixed'));
	$(window).scroll(function(){
		if (objThis._$navTopHeight < objThis._windowPos){
			// 스크롤시
			$scrollObj.addClass('position-fixed')
		}else if(objThis._$navTopHeight > objThis._windowPos){
			//console.log('1111')
			$scrollObj.removeClass('position-fixed');
		}
	})
};
// 탭 스크롤
Layout.prototype._ctrScrollTab = function(obj) {
	var objThis = this;
	// console.log('_ctrScrollTab')
	obj.each(function(index){
		objThis.outerHeight.push($(this).outerHeight());
	})

	// this.outerHeight[0] = $('.pageTitle').outerHeight()
	// 제외 영역
	if($('.exceptCon').length > 0){
		objThis.outerHeight[0] = 0;
		$('.exceptCon').each(function(index){
			objThis.outerHeight[0] +=  $(this).outerHeight();
//			console.log($(this).outerHeight())
		})
	}
	if(this.outerHeight.length > 1) {
		for(var i=1; i<objThis.outerHeight.length; i++) {
			objThis.outerHeight[i] = objThis.outerHeight[i-1]+$(obj[i-1]).outerHeight();
		}
	}
	this._navTabScroll.click(function() {
		objThis._ctrSel($(this),objThis._navTabScroll)
		var clickIdx = $(this).index();
		$('html').stop().animate({
			scrollTop: objThis.outerHeight[clickIdx]
		}, 500, 'easeOutQuint');
	});
};

// 선택
Layout.prototype._ctrSel = function(obj,wrap) {
	wrap.removeClass('active');
	obj.addClass('active');
};


// 스크롤
Layout.prototype._ctrScroll= function() {
	var objThis = this;
	var objTop = $('.objTop').offset().top;
	var objTopHeight = $('.objTop').height();
	var objTopPos = objTop + objTopHeight;
	//console.log(objTopPos);
	if ((this._windowPos > objTopPos) && (this._topHeight1 < this._windowPos) ) {
		// console.log('목표지점 아래');
		// console.log('_topHeight1'+this._topHeight1);
		// console.log('_windowPos' +this._windowPos);

		// 스크롤 타입 내비
		if (objThis._$navTop.hasClass("scrollType")) {
			//console.log('스크롤');
			// 스크롤 스타일
			// objThis._$navTop.addClass('box-shadow-lg');
			objThis._$navTop.addClass('navSub');
			objThis._$navTop.removeClass('navMain');
			objThis._$navTop.stop().animate({
				'top':'0px',
				'position':'absolute',
				'left':'0px'
			},300,'easeInOutCubic')
		}
		// 위로 버튼
		objThis._$btnTop.stop().animate({
			'opacity':'1'
		})
	}
	else if( (this._topHeight1 < this._windowPos) &&  (this._windowPos < objTopPos) ) {
		// console.log('네비 아래고 목표지점 위');
		//console.log('mid 준비');
		// 스크롤 타입 내비
		if (objThis._$navTop.hasClass("scrollType")) {
			objThis._$navTop.css({
				'top':-objThis._$navTopHeight,
				'position':'fixed',
				'z-index': '77'
			});
		}
	}
	else if((this._topHeight1 > this._windowPos)){
		// console.log('내비 안');
		// 스크롤 타입 내비
		if (objThis._$navTop.hasClass("scrollType")) {
			// objThis._$navTop.removeClass('box-shadow-lg');
			objThis._$navTop.removeClass('navSub');
			objThis._$navTop.addClass('navMain');

			objThis._$navTop.stop().animate({
				'top':this._mainBannerWelcome+'px',
				'left':'0px',
				'position':'absolute'
			},300,'easeInOutCubic')

		}
		// 위로 버튼
		objThis._$btnTop.stop().animate({
			'opacity':'0'
		})
	}

};

