(()=>{
    let yOffset = 0; //pageYOffset
    let prevScrollHeight = 0; // 이전 스크롤 합
    let currentScene = 0; //활성화된 scene
    let enterNewScene = false; // 새로운 scene이 시작되는 순간
    const sceneInfo = [
        {
            //0
            type: 'normal',
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.jScroll00')
            }
        },
        {
            //1
            // 브라우져 높이의 배수
            type: "sticky",
            heightNum: 4.5,
            scrollHeight: 0,
            position:{
                elemAa:[{ start: 0.1, end: 0.2 }],
            },
            //적용 객체 그룹, 적용 객체
            objs: {
                container: document.querySelector(".jScroll01"),
                elemAa: document.querySelector(".jScroll01 .elemA .a"),
                elemAb: document.querySelector(".jScroll01 .elemA .b"),
                elemAc: document.querySelector(".jScroll01 .elemA .c"),
                elemAd: document.querySelector(".jScroll01 .elemA .d"),
                elemBa: document.querySelector(".jScroll01 .elemB .a"),
                elemBb: document.querySelector(".jScroll01 .elemB .b"),
                elemBc: document.querySelector(".jScroll01 .elemB .c"),
                elemBd: document.querySelector(".jScroll01 .elemB .d"),               
                elemC: document.querySelector(".jScroll01 .tabWraper .active"),  
                elemCb: document.querySelectorAll(".jScroll01 .tabWraper .tab"),
                elemCb0: document.querySelectorAll(".jScroll01 .tabWraper .tab")[0],
            }
        },
        {
            //2
            type: "sticky",
            heightNum: 1.5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.jScroll02'),
                contain: document.querySelector('.jScroll02 .contain'),
                elemA: document.querySelector(".jScroll02 .jParticle"),
                elemC: document.querySelector(".jScroll02 .jUI"),
            },
            // [적용 값,적용 값, 적용 지점]
            values: {
                //elemAa
                //A 객체 그룹
                //a 같은 시점
                // [value,value,{위치}]
                // elemA_opacity_down: [1, 0, { start: 0.1, end: 0.9 }],
                elemA_translateY_down: [1, 50,{ start: 0.1, end: 0.3 }],
                elemA_scale_down: [1, 0.7,{ start: 0.1, end: 0.3 }],
                elemA_opacity_down: [1, 0,{ start: 0.1, end: 0.3 }],
                elemC_scale_down: [1, 1.2,{ start: 0.1, end: 0.3 }],
            }
        },   
        {
            //3
            type: 'normal',
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.jScroll03')
            }
        },                   
    ]
    // 움직임 계산(적용 값, 현재 scene 스크롤 위치)
    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        // scrollRatio
        // 스크롤을 이용한 인터랙션 구현/ 스크롤 애니메이션 구현 3
        // 스크롤 진행율 = 현재 스크롤 된 값 / 현재 scene의 컨텐츠 높이
        const scrollRatio = currentYOffset / scrollHeight;
        // 스크롤을 이용한 인터랙션 구현/ 특정 타이밍 스크롤 애니메이션 기능 추가 5:25
        // 적용값 인덱스 3이 있는 경우: 부분 스크롤 효과

        if (values.length === 3) {
            // 시작점
            const start = values[2].start * scrollHeight;
            // 끝점
            const end = values[2].end * scrollHeight;
            // 애니메이션 재생 구간
            const keyframes = end - start;
            // 스크롤을 이용한 인터랙션 구현/ 특정 타이밍 스크롤 애니메이션 기능 추가 10:30
            if (currentYOffset >= start && currentYOffset <= end) {
                // 반영 값 = 진행율 * 적용 값
                rv =
                ((currentYOffset - start) / keyframes) * (values[1] - values[0]) +
                values[0];
                // start 위 위치
            } else if (currentYOffset < start) {
                rv = values[0];
                //end 아래 위치
            } else if (currentYOffset > end) {
                rv = values[1];
            }
            } else {
            // 전체 scene 반영
            // 반영 값 = 진행율 * 적용 값
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }
    // 각 scene에서 움직임 선언
    function playAnimation() {
        // 현재 scene의 변경 객체
        const objs = sceneInfo[currentScene].objs;
        // 현재 scene 적용 값
        const values = sceneInfo[currentScene].values;
        // 현재 scene에서 스크롤 위치
        const currentYOffset = yOffset - prevScrollHeight;
        //스크롤을 이용한 인터랙션 구현/ 특정 타이밍 스크롤 애니메이션 적용하기 12:28
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        //현재 scene 분기 처리
        switch (currentScene) {
        case 1:
            // 탭
            if(scrollRatio < 0.25){
                objs.elemC.style.transform = `translate3d(0px, 0, 0)`; 
            }else if(scrollRatio > 0.25 && scrollRatio < 0.5){
                if(objs.elemCb[1]){
                    objs.elemCb[1].style.color="#fff";
                }
                objs.elemC.style.transform = `translate3d(79px, 0, 0)`; 
                objs.elemC.style.width = `60px`; 
            }else if(scrollRatio > 0.5 && scrollRatio < 0.75){
                if(objs.elemCb[2]){
                    objs.elemCb[2].style.color="#fff";
                }
                objs.elemC.style.transform = `translate3d(158px, 0, 0)`; 
                objs.elemC.style.width = `90px`; 
            }else if(scrollRatio > 0.75 && scrollRatio < 1){
                if(objs.elemCb[3]){
                    objs.elemCb[3].style.color="#fff";
                }
                objs.elemC.style.transform = `translate3d(268px, 0, 0)`; 
                objs.elemC.style.width = `60px`; 
            }
            if (scrollRatio < 0.25) {
                objs.elemCb[0].style.color="#fff";
                objs.elemAa.style.opacity = 1;
                objs.elemBa.style.opacity = 1;
            } else {
                objs.elemCb[0].style.color="#000";
                objs.elemAa.style.opacity = 0;
                objs.elemBa.style.opacity = 0;
            }
            if (scrollRatio > 0.25 && scrollRatio < 0.5) {
                objs.elemCb[1].style.color="#fff";
                objs.elemAb.style.opacity = 1;
                objs.elemBb.style.opacity = 1;
            } else {
                objs.elemCb[1].style.color="#000";
                objs.elemAb.style.opacity = 0;
                objs.elemBb.style.opacity = 0;
            }
            if (scrollRatio > 0.5 && scrollRatio < 0.75) {
                objs.elemCb[2].style.color="#fff";
                objs.elemAc.style.opacity = 1;
                objs.elemBc.style.opacity = 1;
            } else {
                objs.elemCb[2].style.color="#000";
                objs.elemAc.style.opacity = 0;
                objs.elemBc.style.opacity = 0;
            } 
            if (scrollRatio > 0.75 && scrollRatio < 1) {
                objs.elemCb[3].style.color="#fff";
                objs.elemAd.style.opacity = 1;
                objs.elemBd.style.opacity = 1;
            } else {
                objs.elemCb[3].style.color="#000";
                objs.elemAd.style.opacity = 0;
                objs.elemBd.style.opacity = 0;
            } 
            break;
        case 2:
            if (scrollRatio > 0 && scrollRatio <= 0.31) {
                // down
                objs.elemA.style.transform = `translate3d(0,${calcValues(values.elemA_translateY_down, currentYOffset
                )}%,0) scale(${calcValues(values.elemA_scale_down, currentYOffset)})`;   
                objs.elemA.style.opacity = calcValues(values.elemA_opacity_down, currentYOffset);   
                objs.elemC.style.transform = `scale(${calcValues(values.elemC_scale_down, currentYOffset)})`;   
            }else if(scrollRatio > 0.21 && scrollRatio <= 1){
                objs.elemA.style.opacity = 0;   
            }
            break;
        }
    }
    // 현재 스크롤중인 섹션
    function scrollLoop() {
        // enterNewScene
        // 스크롤을 이용한 인터랙션 구현/ 스크롤 애니메이션 구현 4
        // enterNewScene 스크롤 오차 버그 수정
        enterNewScene = false;
        //초기화
        prevScrollHeight = 0;
        //스크롤을 이용한 인터랙션 구현 / 현재 활성시킬 씬 결정하기
        // 이전 스크롤 크기: currentScene가 0 이상일 때
        
        // 3. 이전 scene 높이
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        // 현재 scene 증가: 다음 scene으로 갈때
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            // 새로운 scene
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute("id", `show-scene-${currentScene}`);
        }
        // 현재 scene 감소: 이전 scene으로 갈때
        if (yOffset < prevScrollHeight) {
            // 새로운 scene
            enterNewScene = true;
            // 0에서 이전으로 갈때
            if (currentScene === 0) {
                return; //모바일 브라우저 마이너스 방지
            }
            currentScene--;
            document.body.setAttribute("id", `show-scene-${currentScene}`);
        }

        // scene이 바뀌는 순간만 playAnimation을 실행하지 않고 종료
        if (enterNewScene) {
            return;
        }
        // console.log(sceneInfo[currentScene].objs.elemCb)
        // sceneInfo[currentScene].objs.elemCb.addEventListener('click',console.log('ok'));

        playAnimation();
    }
    //각 로딩, 리사이즈 시 scene을 셋팅
    function setLayout() {
        // 1. sceneInfo[i].scrollHeight 기본값 설정
        for (let i = 0; i < sceneInfo.length; i++) {
            // 스크롤을 이용한 인터랙션 구현 / 자잘한 수정사항들 처리
            if (sceneInfo[i].type === "sticky") {
                // 화면 높이 * heightNum
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === "normal") {
                // container 크기
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            // container 크기
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        // 2. 현재 scene구하기: 현재 scene에 해당하는 애니메이션
        // 스크롤을 이용한 인터랙션 구현/ 현재 활성 씬 반영하기 9:13

        // 스크롤 높이
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            // yOffset이 totalScrollHeight 보다 작을때까지 만 break
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        // body에 클래스 넣기
        document.body.setAttribute("id", `show-scene-${currentScene}`); 
        // console.log(sceneInfo[currentScene].scrollHeight)
         
    }
    
    window.addEventListener("scroll", () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener("resize", setLayout);
    window.addEventListener("load", setLayout);
})();

