$(function(){
    common.isApp();
    deviceCheck();
    common.init();
    Dialog.init();
    buttonUI.init();
    tooltip.init();
    tabUI();
    scrollUI.init();
    formUI.init();
    listUI.init();
    totalSearchUI();

    scrollItem.init();
    if($('.step_complete_guide .items').length)completeEffect('.step_complete_guide .items');

    $(window).scroll();
    $(window).resize();
});

$(window).on('load',function(){
    //console.log('window load complete');
    common.winLoad();
    formUI.winLoad();
    listUI.winLoad();
    buttonUI.winLoad();
    accordion();
    tabNavi();
    slickUI.init();
    Loading.aria();

    //안드로이드 메인에서 상단 로고 클릭시 상단으로 스크롤
    if(isAppChk('android')){
        var $scrollTop = $(window).scrollTop();
        if($scrollTop > 0)$(window).scrollTop(0);
    }

    $(window).scroll();
    $(window).resize();
});

//로딩함수
var Loading ={
    speed:150,
    open:function(txt){
        var $html = '<div id="loading" class="hide">';
        $html += '<div class="tl">';
        $html += '<div>';
        $html += '<div class="ld_lg" aria-hidden="true">';
        $html += '<div class="lg_d"></div>';
        $html += '<div class="lg_b"></div>';
        $html += '</div>';
        if(!!txt){
            $html +='<div class="txt">'+txt+'</div>';
        }else{
            $html += '<div class="offscreen">화면을 불러오는중입니다.</div>';
        }
        $html += '</div>';
        $html += '</div>';
        $html += '</div>';

        if(!$('#loading').length)$('body').prepend($html);
        $('#loading').stop(true,false).fadeIn(Loading.speed);
    },
    close:function(){
        $('#loading').stop(true,false).fadeOut(Loading.speed,function(){
            $(this).remove();
        });
    },
    box:function(tar,height,txt){
        var $wrapTag = 'div';
        if($(tar).is('ul') || $(tar).is('ol'))$wrapTag = 'li';
        if($(tar).is('dl'))$wrapTag = 'dd';
        var $html = '<'+$wrapTag+' class="loading_box"';
        if(!!height)$html +=' style="height:'+height+'px"';
        $html += '>';
        $html += '<div class="tl">';
        $html += '<div>';
        $html += '<div class="ld_lg" aria-hidden="true">';
        $html += '<div class="lg_d"></div>';
        $html += '<div class="lg_b"></div>';
        $html += '</div>';
        if(!!txt){
            $html += '<div class="txt">'+txt+'</div>';
        }else{
            $html += '<div class="offscreen">데이터를 불러오는중입니다.</div>';
        }
        $html += '</div>';
        $html += '</div>';
        $html += '</'+$wrapTag+'>';

        $(tar).html($html);
    },
    dimmedClass:'.loading_dimmed',
    aria:function(){
        var $box = $('.section_box');
        $box.each(function(){
            var $this = $(this),
                $inBox = $this.find('.section_box_in');
            if($this.find(Loading.dimmedClass).length && $inBox.length){
                $inBox.attr('aria-hidden',true);
                $inBox.find(':focusable').attr('tabindex',-1);
            }
        });
    },
    dimmed:function(tar,txt){
        var $inBox = $(tar).find('.section_box_in');
        var $logoHtml = '<div class="ld_lg" aria-hidden="true">';
        $logoHtml += '<div class="lg_d"></div>';
        $logoHtml += '<div class="lg_b"></div>';
        $logoHtml += '</div>';
        if(!!txt){
            $logoHtml += '<div class="txt">'+txt+'</div>';
        }else{
            $logoHtml += '<div class="offscreen">데이터를 불러오는중입니다.</div>';
        }
        if($(tar).find(Loading.dimmedClass).length){
            $(tar).find(Loading.dimmedClass+' .tl>div').html($logoHtml);
        }else{
            var $wrapTag = 'div';
            if($(tar).is('ul') || $(tar).is('ol'))$wrapTag = 'li';
            if($(tar).is('dl'))$wrapTag = 'dd';
            var $html = '<'+$wrapTag+' class="'+Loading.dimmedClass.substring(1)+'">';
            $html += '<div class="tl">';
            $html += '<div>';
            $html += $logoHtml;
            $html += '</div>';
            $html += '</div>';
            $html += '</'+$wrapTag+'>';

            $(tar).prepend($html);
        }
        if($inBox.length){
            $inBox.attr('aria-hidden',true);
            $inBox.find(':focusable').attr('tabindex',-1);
        }
    },
    undimmed:function(tar){
        var $inBox = $(tar).find('.section_box_in');
        if($inBox.length){
            $inBox.removeAttr('aria-hidden');
            $inBox.find(':focusable').removeAttr('tabindex');
        }
        if($(tar).find(Loading.dimmedClass).length)$(tar).find(Loading.dimmedClass).remove();
    }
};

//body scroll lock
var Body = {
    scrollTop :'',
    lock: function(){
        if(!$('html').hasClass('lock')){
            Body.scrollTop = window.pageYOffset;
            $('#wrap').css('top',-(Body.scrollTop));
            $('html').addClass('lock');
        }
    },
    unlock: function(){
        $('html').removeClass('lock');
        $('#wrap').removeAttr('style');
        window.scrollTo(0, Body.scrollTop);
        window.setTimeout(function (){
            Body.scrollTop = '';
        }, 0);
    }
};

//PC 디바이스 체크
var isPC = {
    window: function(){
        return navigator.userAgent.match(/windows/i) == null ? false : true;},
    mac: function(){
        return navigator.userAgent.match(/macintosh/i) == null ? false : true;},
    chrome: function(){
        return navigator.userAgent.match(/chrome/i) == null ? false : true;},
    firefox: function(){
        return navigator.userAgent.match(/firefox/i) == null ? false : true;},
    opera: function(){
        return navigator.userAgent.match(/opera|OPR/i) == null ? false : true;},
    safari: function(){
        return navigator.userAgent.match(/safari/i) == null ? false : true;},
    edge: function(){
        return navigator.userAgent.match(/edge/i) == null ? false : true;},
    msie: function(){
        return navigator.userAgent.match(/rv:11.0|msie/i) == null ? false : true;},
    ie11: function(){
        return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;},
    ie10: function(){
        return navigator.userAgent.match(/msie 10.0/i) == null ? false : true;},
    ie9: function(){
        return navigator.userAgent.match(/msie 9.0/i) == null ? false : true;},
    ie8: function(){
        return navigator.userAgent.match(/msie 8.0/i) == null ? false : true;},
    any: function(){
        return (isPC.window()|| isPC.mac());},
    check: function(){
        if(isPC.any()){
            if(isPC.window())$('html').addClass('window');
            if(isPC.mac())$('html').addClass('mac');
            if(isPC.msie())$('html').addClass('msie');
            if(isPC.ie11())$('html').addClass('ie11');
            if(isPC.ie10())$('html').addClass('ie10');
            if(isPC.ie9())$('html').addClass('ie9');
            if(isPC.ie8())$('html').addClass('ie8');
            if(isPC.edge()){
                $('html').addClass('edge');
            }else if(isPC.opera()){
                $('html').addClass('opera');
            }else if(isPC.chrome()){
                $('html').addClass('chrome');
            }else if(isPC.safari()){
                $('html').addClass('safari');
            }else if(isPC.firefox()){
                $('html').addClass('firefox');
            }
        }
    }
};

//모바일 디바이스 체크
var isMobile = {
    Android: function(){
        return navigator.userAgent.match(/Android/i) == null ? false : true;
    },
    BlackBerry: function(){
        return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
    },
    iOS: function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
    },
    iPhone :function(){
        return navigator.userAgent.match(/iPhone/i) == null ? false : true;
    },
    iPad :function(){
        return navigator.userAgent.match(/iPad/i) == null ? false : true;
    },
    iPhoneVersion :function(){
        var $sliceStart = navigator.userAgent.indexOf('iPhone OS') + 10,
            $sliceEnd = $sliceStart + 2,
            $version = parseFloat(navigator.userAgent.slice($sliceStart,$sliceEnd));
        return $version;
    },
    Opera: function(){
        return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
    },
    Windows: function(){
        return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
    },
    tablet: function(){
        if(isMobile.any()){
            if(window.screen.width < window.screen.height){
                return window.screen.width > 760 ? true : false;
            }else{
                return window.screen.height > 760 ? true : false;
            }
        }
    },
    any: function(){
        return (isMobile.Android() || isMobile.iOS() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows());
    },
    check: function(){
        if(isMobile.tablet()){
            $('html').addClass('tablet');
        }else{
            $('html').addClass('mobile');
        }
        if(isMobile.iOS())$('html').addClass('ios');
        if(isMobile.Android())$('html').addClass('android');
        //if(isMobile.iPhoneVersion() == 12)$('html').addClass('ios12');
    }
};

//앱인지 체크: isAppChk(),isAppChk('ios'),isAppChk('android')
var isAppChk = function(os){
    if(typeof _isDevice != 'undefined'){
        if(_isDevice == 'A'){
            switch(os){
                case 'ios':
                    if(isMobile.iOS()){
                        return true;
                    }else{
                        return false;
                    }
                    break;
                case 'android':
                    if(isMobile.Android()){
                        return true;
                    }else{
                        return false;
                    }
                    break;
                default:
                    if(os == undefined){
                        return true;
                    }else{
                        console.log('isAppChk 함수 os 오류');
                        return false;
                    }
                    break;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}

//디바이스체크 실행
var deviceCheck = function(){
    isMobile.check();
    isPC.check();
    if(isMobile.any()){
        var $pixelRatio = window.devicePixelRatio;
        if(!!$pixelRatio) $('html').addClass('pixel_ratio_'+$pixelRatio);
    }

    //아이폰X (스크린:375*812, 윈도우: 375*735)
    //아이폰8+ (스크린:414*736, 윈도우: 414*622)
    //아이폰8 (스크린:375*667, 윈도우: 375*554)
    var $iPhone8PlusH = 736,	//아이폰8+ 높이값 736(보다 크면 아이폰X 시리즈로 처리)
        $screenH = window.screen.height,
        $screenW = window.screen.width,
        //$default = 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no';
        $default = $('meta[name=viewport]').attr('content');

    var isIPhoneX = function(e){
        $('html').addClass('iPhoneX');
        $('meta[name=viewport]').attr('content',$default+',viewport-fit=cover');
    };
    var notIPhoneX = function(e){
        $('html').removeClass('iPhoneX');
        if(isMobile.Android()){
            $('meta[name=viewport]').attr('content',$default+',target-densitydpi=medium-dpi');
        }else{
            $('meta[name=viewport]').attr('content',$default);
        }
    };

    //아이폰X체크
    if(isMobile.iPhone() && $screenH > $iPhone8PlusH){
        //첫로딩
        if($(window).width() < $(window).height()){
            isIPhoneX();
        }else{
            notIPhoneX();
        }

        //가로, 세로 회전시
        $(window).on('orientationchange',function(){
            if(window.orientation == 0){
                isIPhoneX();
            }else{
                notIPhoneX();
            }
        });
    }
};

//공통: 헤더, gnb, 레이아웃, 앱용플로팅버튼, 스킵네비, meta[og:image]
var $isFixedBtn = false;
var common = {
    isApp:function(){
        //앱일때만 'html'에 isApp 클래스추가
        //_isDevice: A-앱,W-웹 (header.jsp 확인)
        if(typeof _isDevice != 'undefined'){
            if(_isDevice == 'A')$('html').addClass('isApp');
        }else{
            // console.log('_isDevice 없음')
        }
    },
    winLoad:function(){
        //hr태그 토크백 제외
        $('hr').each(function(){
            $(this).attr('aria-hidden',true);
        });

        //페이지타이틀이 없는 화면일 경우
        if($('#header h1').length){
            var titHtml = $('#header h1').html();
            if(titHtml == ''){
                var $home = $('.btn_gnb_home'),
                    $href = '/';
                if($home.length)$href = $home.attr('href');
                $('#header h1').addClass('logo center').html('<a href="'+$href+'">DB손해보험</a>');
                if($('#content .cont_logo').length)$('#content .cont_logo').remove();
            }
        }

        //버튼없는 헤더 쓸때
        if($('.fake_header').length && $('#header').length){
            $('#header').addClass("no_btn");
            $('.fake_header').remove();
        }
    },
    gnbSubOpenTxt:'하위메뉴 펼치기',
    gnbSubCloseTxt:'하위메뉴 접기',
    gnbBgClass:'.gnb_bg',
    gnbBg:'<div class="gnb_bg" aria-hidden="true"></div>',
    gnbOutCont:'#skipNavi,#header h1,.btn_back,#container,#floatingNavi,#footer',
    gnb:function(){
        $('#gnb').attr('aria-hidden',true);
        $(document).on('click','.btn_gnb',function(e){
            e.preventDefault();
            if($('#gnb').hasClass('show')){
                common.gnbClose();
            }else{
                common.gnbOpen();
            }
        });
        $(document).on('click','.btn_gnb_close',function(e){
            e.preventDefault();
            common.gnbClose();
        });
        $(document).on('click','.gnb_dep1>ul>li>a',function(e){
            e.preventDefault();
            common.gnbActive(this);
        });
        $(document).on('click','.gnb_content a.in_sub',function(e){
            e.preventDefault();
            common.gnbActive(this,true);
        });

        $('#gnb .in_sub').each(function(){
            $(this).attr('title',common.gnbSubOpenTxt);
        });
    },
    gnbOpen:function(){
        Body.lock();
        $('#gnb').attr('tabindex',0).focus();
        $('#gnb').attr('aria-hidden',false);
        $(common.gnbOutCont).attr('aria-hidden',true);
        $('#gnb').addClass('show');
        $('#gnb').before(common.gnbBg);
        $(common.gnbBgClass).addClass('show');
        $('#gnb').find('.gnb_dep1').scrollTop(0);
        $('#gnb').find('.gnb_dep2').scrollTop(0);
        Dialog.focusMove('#gnb');
        //$('.btn_gnb').addClass('on');
        $('.btn_gnb span').changeTxt('열기','닫기');

        if($('#gnb').find('.active').length){
            $('#gnb').find('.active').addClass('open').children('div').show().siblings('.in_sub').attr('title',common.gnbSubCloseTxt);
            $('#gnb').find('.gnb_dep1>ul>li.active>a').attr('title','현재선택');
        }else{
            $('#gnb').find('.gnb_dep1>ul>li').first().addClass('open').children('a').attr('title','현재선택').siblings('.gnb_dep2').find('>ul>li').first().addClass('open').children('div').show();
        }

        //모바일 접근성보완: 모바일일때 마지막에 닫기 버튼 추가
        var $lastCloseBtn = '<a href="#" class="btn_gnb_close last_focus" role="button"><i class="offscreen">전체메뉴 닫기</i></a>';
        if(isMobile.any() && !$('#gnb').find('.btn_gnb_close.last_focus').length)$('#gnb').append($lastCloseBtn);
    },
    gnbClose:function(){
        Body.unlock();
        $('.btn_gnb').focus();
        $('#gnb').attr('aria-hidden',true);
        $(common.gnbOutCont).removeAttr('aria-hidden');
        $('#gnb').removeClass('show');
        $(common.gnbBgClass).removeClass('show');
        $('#gnb').removeAttr('tabindex style');
        //$('.btn_gnb').removeClass('on');
        $('.btn_gnb span').changeTxt('닫기','열기');

        setTimeout(function(){
            $(common.gnbBgClass).remove();
            common.gnbDepthReset();
            if($('#gnb').find('.btn_gnb_close.last_focus').length)$('#gnb').find('.btn_gnb_close.last_focus').remove();
        },610);
    },
    gnbDepthReset:function(){
        $('#gnb').find('.open').removeClass('open');
        $('#gnb').find('.gnb_dep3').removeAttr('style');
        $('#gnb').find('.gnb_dep4').removeAttr('style');
        $('#gnb .in_sub').each(function(){
            $(this).find('.offscreen').changeTxt('접기','펼치기');
        });
    },
    gnbActiveIng: false,
    gnbActive:function(target,isToggle){
        var $parent = $(target).parent(),
            $slideSpeed = 300;
        //클릭시 메뉴 활성화
        if(isToggle){
            //뎁스2,3
            if(common.gnbActiveIng == false){
                common.gnbActiveIng = true;
                if($parent.hasClass('open')){
                    if(!isAppChk('ios')){
                        $parent.removeClass('open').find('.in_sub').attr('title',common.gnbSubOpenTxt);
                        $(target).next().stop(true,false).slideUp($slideSpeed,function(){
                            common.gnbActiveIng = false;
                        });
                    }else{
                        common.gnbActiveIng = false;
                    }
                }else{
                    if($parent.find('.active').length){
                        $parent.find('.active').addClass('open').children('div').show().siblings('.in_sub').attr('title',common.gnbSubCloseTxt);
                    }
                    $parent.addClass('open').find('.in_sub').attr('title',common.gnbSubCloseTxt);
                    $parent.siblings().removeClass('open').find('.open').removeClass('open');
                    $isScroll = true;
                    $parent.siblings().children('div').stop(true,false).slideUp($slideSpeed,function(){
                        $(this).removeAttr('style').find('.gnb_dep4').removeAttr('style');
                    }).siblings('.in_sub').attr('title',common.gnbSubOpenTxt);
                    $(target).next().stop(true,false).slideDown($slideSpeed,function(){
                        common.gnbInScroll(target,'sub');
                        common.gnbActiveIng = false;
                    });
                }
            }
        }else{
            //뎁스1
            if($parent.find('.active').length){
                $parent.find('.active').addClass('open').children('div').show();
            }else{
                $parent.find('.gnb_dep2>ul>li').first().addClass('open').children('div').show();
            }
            $parent.addClass('open').children('a').attr('title','현재선택');
            $parent.siblings().removeClass('open').children('a').removeAttr('title').siblings('div').removeAttr('style').find('.open').removeClass('open').children('div').removeAttr('style');
            $isScroll = true;
            common.gnbInScroll(target);
        }
    },
    gnbInScroll:function(target,type){
        var $parent = $(target).parent(),
            $wrap = $('.gnb_content'),
            $wrapPdTop = parseInt($wrap.css('paddingTop')),
            $wrapHeight = $wrap.height(),
            $sclWrap = $wrap.find('.gnb_dep1'),
            $sclWrapTop = $sclWrap.scrollTop(),
            $parentTop = $parent.position().top + $sclWrapTop - $wrapPdTop,
            $parentHeight = $parent.outerHeight(),
            $scl = null,
            $sclSpeed = 200;

        if(type == 'sub'){		//뎁스2,3
            $sclWrap = $wrap.find('li.open>.gnb_dep2');
            $sclWrapTop = $sclWrap.scrollTop();
            $parentTop = $parent.position().top + $sclWrapTop;
            $sclSpeed = 300;
        }else{
            $wrap.find('.gnb_dep2').scrollTop(0);
        }

        if(($wrapHeight+$sclWrapTop) < ($parentTop+$parentHeight)){
            $scl = Math.min($parentTop,$parentTop+$parentHeight-$wrapHeight);
        }else if($parentTop < $sclWrapTop){
            $scl = $parentTop;
        }
        if($scl != null){
            $sclWrap.stop(true,false).animate({'scrollTop':$scl},$sclSpeed,function(){
                $isScroll = false;
            });
        }
    },
    fixed:function(target){
        //고정(fixed)
        var $target = $(target),
            isHeader = false;
        if($target.attr('id') == 'header')isHeader = true;
        $(window).on('scroll',function(){
            var $scrollTop = $(this).scrollTop();
            $target.each(function(){
                if($(this).hasClass('no_fixed') || $(this).closest('.dialog').length) return;
                var $top = $(this).offset().top;
                //if(isAppChk('ios') && isHeader == true)$top = $(this).parent().offset().top;
                if($scrollTop > $top){
                    if(!$(this).hasClass('fixed')){
                        $(this).addClass('fixed');
                    }
                }else{
                    $(this).removeClass('fixed');
                }
            })
        });
    },
    layout:function(){
        //레이아웃
        var $header = $('#header'),
            $container = $('#container'),
            $content = $('#content'),
            $footer = $('#footer'),
            $floatingBtn = $('.floating_btn'),
            $fixedBtn = '',
            $fixedBtnH = 60;

        //컨텐츠 픽스버튼 찾기(팝업제외)
        if($('.step_section').length){
            if($('.step_section').first().find('.fixed_bottom_button').not('.t1').length){
                $fixedBtn = $('.step_section').first().find('.fixed_bottom_button').not('.t1');
            }
        }else{
            if($content.find('.fixed_bottom_button').not('.t1').length){
                $fixedBtn = $content.find('.fixed_bottom_button').not('.t1');
            }
        }

        if($fixedBtn != '' && $fixedBtn.is(':visible')){
            $isFixedBtn = true;
            $fixedBtnH = $fixedBtn.children().height();
            $footer.addClass('add_fixed_btn');
            $('#floatingNav').addClass('hide');
            if($floatingBtn.length)$floatingBtn.addClass('is_fixed_btn');
        }
        if($container.length && $footer.length){
            $(window).resize(function(){
                var $headH = $header.outerHeight(),
                    $footH = $footer.outerHeight();
                $container.removeAttr('style');
                if($('.foot_contact').length){
                    $footH = 81;
                    if($fixedBtn != '')$footH = $footH + $fixedBtnH;
                }
                var $conH = $(window).height()-$headH-$footH;
                $container.css('min-height',$conH);

                if($('.step_section').length){
                    var $contPd = parseInt($content.css('paddint-top')) + parseInt($content.css('paddint-bottom'));
                    $('.step_section').css('min-height',$conH-$contPd);
                }
            });
        }

        $(document).on('click','.h1_scl_top',function(){
            $('html,body').stop(true,false).animate({'scrollTop':0},100);
        });
    },
    floating: function(){
        //앱용 플로팅메뉴
        var $navi = $('#floatingNav');
        if(isAppChk()){
            //if(!$navi.hasClass('hide') && !$('.step_swipe').length){
            if(!$navi.hasClass('hide')){
                if($navi.length)$('#footer').addClass('add_floating_navi');
                if($('.floating_btn').length){
                    $('.floating_btn').each(function(){
                        var $this = $(this);
                        $navi.find('.ft_wrap').append($this);
                    })
                }
            }

            var $fileName = location.pathname.split('/').pop().split('.').shift();
            $navi.find('.icon_btn li').each(function(){
                var $this = $(this),
                    $activeLink = $this.data('active-link');
                if($fileName.indexOf($activeLink)>=0)$(this).addClass('active').find('a').attr('title','현재선택');
            });

            $navi.find('.icon_btn .btn').click(function(){
                var $href = $(this).attr('href');
                var $location = location.pathname;
                if($href == $location)return false;
            });
        }
    },
    skipNavi: function(){
        //스킵네비 삽입
        var $naviHtml = '<div id="skipNavi"><a href="#content" class="no-button">본문내용 바로가기</a> </div>';
        if($('#header').length && $('#content').length && !$('#skipNavi').length)$('body').prepend($naviHtml);
    },
    meta: function(){
        //소셜 공유용 이미지설정:해당 메타태그 스크립트로는 적용안되는듯
        if(!$('meta[property=og\\:image]').length){
            var $origin = location.origin;
            $('head').append('<meta property="og:image" content="'+$origin+'/moweb/images/logo_1200x1200.png">');
        }
    },
    init:function(){
        common.gnb();
        common.layout();
        common.floating();
        common.skipNavi();
        //common.meta();

        common.fixed('#header');
        if($('.tab_swipe_wrap').length){
            $('.tab_swipe_wrap').each(function(){
                if(!$(this).closest('.dialog').length)common.fixed(this);
            })
        }

        //버튼없는 헤더 쓸때(타이틀만 있는 헤더:완전판매모니터링 메뉴)
        if($('.fake_header').length && $('#header').length){
            var $h1Tit = $('#header h1').text(),
                $h1Tit2 = $('.fake_header h1').text();
            if($h1Tit != $h1Tit2)$('.fake_header h1').text($h1Tit);
        }
    }
};

//레이어팝업(dialog): 레이어 팝업은 #container 밖에 위치해야함
//해당 팝업함수는 개발 및 퍼블에서만 사용
//cms 팝업은 webponent.press.js의 Dialog_cms_mo 함수를 같이 수정해야함
var Dialog = {
    id:'uiDialog',
    alertClass:'ui-alert',
    focusClass:'dialog_focused',
    selectId:'uiSelectDialog',
    selectClass:'ui-pop-select',
    headClass:'dialog_header',
    contClass:'dialog_content',
    etcCont:'#skipNavi,#header,#container,#floatingNavi,#footer',
    beforeCont:[],
    content:'',
    check: function(){
        //focus 이벤트 시 중복열림 방지
        var $focus = $(':focus');
        if(!!event){
            if(event.type === 'focus' && $($focus).hasClass(Dialog.focusClass)){
                return false;
            }
        }

        //같은 내용 중복열림 방지
        if(Dialog.beforeCont.indexOf(Dialog.content) == -1){
            Dialog.beforeCont.push(Dialog.content);
        }else{
            return false;
        }
    },
    html: function(type,popId,title,content,btnCloseId,btnActionId,btnActionTxt,btnCancelId,btnCancelTxt){
        var $popHtml = '';

        $popHtml += '<div id="'+popId+'" class="dialog modal';
        if(type === 'alert' || type === 'confirm' || type === 'prompt'){
            $popHtml += ' alert '+Dialog.alertClass;
        }
        $popHtml += '" role="dialog" aria-hidden="true">';
        $popHtml += '<div class="dialog_wrap">';
        if(!!title){
            $popHtml += '<div class="'+Dialog.headClass;
            if(btnCloseId == '')$popHtml += ' offscreen';
            $popHtml += '">';
            $popHtml += '<h2>'+title+ '</h2>';
            if(!!btnCloseId)$popHtml += '<button id="'+btnCloseId+'" class="dialog_close ui_dialog_close"><span class="offscreen">팝업창 닫기</span></button>';
            $popHtml += '</div>';
        }
        $popHtml += '<div class="'+Dialog.contClass+'">';
        $popHtml += '<div class="section">';
        if(type === 'alert' || type === 'confirm'){
            $popHtml += '<div class="message">';
            $popHtml += '	<div role="alert" aria-live="assertive"></div>';
            $popHtml += '</div>';
        }else if(type === 'prompt'){
            $popHtml += '<div class="form_item">';
            $popHtml += '<label for="prompt_inp" class="lb" role="alert" aria-live="assertive"></label>';
            $popHtml += '<div class="input">';
            $popHtml += '<span class="dv"><input id="prompt_inp" class="i_txt" type="text" placeholder="직접입력"></span>';
            $popHtml += '</div>';
            $popHtml += '</div>';
        }else{
            $popHtml += Dialog.content;
        }
        $popHtml += '</div>';
        $popHtml += '</div>';
        if(type ==='alert' || type === 'confirm' || type === 'prompt'){
            $popHtml += '<div class="dialog_btn btn_flex">';
            if(type === 'confirm' || type === 'prompt'){
                $popHtml += '<div><button id="'+btnCancelId+'" class="btn" type="button">'+btnCancelTxt+'</button></div>';
            }
            $popHtml += '<div><button id="'+btnActionId+'" class="btn" type="button">'+btnActionTxt+'</button></div>';
            $popHtml += '</div>';
        }
        $popHtml += '</div>';
        $popHtml += '</div>';

        $('body').append($popHtml);
        if(type === 'alert' || type === 'confirm' || type === 'prompt'){
            Dialog.open('#'+popId,function(){
                if(type === 'alert' || type === 'confirm'){
                    $('#'+popId).find('.message > div').html(content);
                }else if(type === 'prompt'){
                    $('#'+popId).find('.form_item .lb').html(content);
                }
            });
        }
    },
    alert: function(option, callback){
        var $title = '알려드립니다.',
            $length = $('.' +Dialog.alertClass).length,
            $popId = Dialog.id+'Alert'+$length,
            $actionId = $popId+'ActionBtn',
            $actionTxt = '확인',
            $closeId = $popId+'CloseBtn';

        if(typeof option === 'object'){
            if(!!option.title){
                $title = option.title;
            }else if(option.title == false){
                $title = false;
            }
            if(!!option.actionTxt)$actionTxt = option.actionTxt;
            Dialog.content = option.content;
        }else if (typeof option == 'string'){
            //약식 설절
            Dialog.content = option;
        }
        //중복팝업 체크
        if(Dialog.check() === false) return false;

        //팝업그리기, 버튼이벤트
        if(option.closeCancel){
            Dialog.html('alert',$popId,$title,Dialog.content,$closeId,$actionId,$actionTxt);
            Dialog.clickEvt('alert',$popId,$actionId,'',$closeId,option.action,'',callback);
        }else{
            Dialog.html('alert',$popId,$title,Dialog.content,'',$actionId,$actionTxt);
            Dialog.clickEvt('alert',$popId,$actionId,'','',option.action,'',callback);
        }
    },
    confirm:function(option, callback){
        var $title = '알려드립니다.',
            $length = $('.' +Dialog.alertClass).length,
            $popId = Dialog.id+'Cofirm'+$length,
            $actionId = $popId+'ActionBtn',
            $actionTxt = '확인',
            $cancelId = $popId+'CancelBtn',
            $cancelTxt = '취소',
            $closeId = $popId+'CloseBtn';

        if(typeof option === 'object'){
            if(!!option.title){
                $title = option.title;
            }else if(option.title == false){
                $title = false;
            }
            if(!!option.actionTxt)$actionTxt = option.actionTxt;
            if(!!option.cancelTxt)$cancelTxt = option.cancelTxt;
            Dialog.content = option.content;
        }else if (typeof option == 'string'){
            //약식 설절
            Dialog.content = option;
        }
        //중복팝업 체크
        if(Dialog.check() === false) return false;

        //팝업그리기, 버튼이벤트
        if(option.closeCancel){
            Dialog.html('confirm',$popId,$title,Dialog.content,$closeId,$actionId,$actionTxt,$cancelId,$cancelTxt);
            Dialog.clickEvt('confirm',$popId,$actionId,$cancelId,$closeId,option.action,option.cancel,callback);
        }else{
            Dialog.html('confirm',$popId,$title,Dialog.content,'',$actionId,$actionTxt,$cancelId,$cancelTxt);
            Dialog.clickEvt('confirm',$popId,$actionId,$cancelId,'',option.action,option.cancel,callback);
        }
    },
    prompt:function(option, callback){
        var $title = '알려드립니다.',
            $length = $('.' +Dialog.alertClass).length,
            $popId = Dialog.id+'Prompt'+$length,
            $actionId = $popId+'ActionBtn',
            $actionTxt = '확인',
            $cancelId = $popId+'CancelBtn',
            $cancelTxt = '취소',
            $closeId = $popId+'CloseBtn';

        if(typeof option === 'object'){
            if(!!option.title){
                $title = option.title;
            }else if(option.title == false){
                $title = false;
            }
            if(!!option.actionTxt)$actionTxt = option.actionTxt;
            if(!!option.cancelTxt)$cancelTxt = option.cancelTxt;
            Dialog.content = option.content;
        }else if (typeof option == 'string'){
            //약식 설절
            Dialog.content = option;
        }
        //중복팝업 체크
        if(Dialog.check() === false) return false;

        //팝업그리기, 버튼이벤트
        if(option.closeCancel){
            Dialog.html('prompt',$popId,$title,Dialog.content,$closeId,$actionId,$actionTxt,$cancelId,$cancelTxt);
            Dialog.clickEvt('prompt',$popId,$actionId,$cancelId,$closeId,option.action,option.cancel,callback);
        }else{
            Dialog.html('prompt',$popId,$title,Dialog.content,'',$actionId,$actionTxt,$cancelId,$cancelTxt);
            Dialog.clickEvt('prompt',$popId,$actionId,$cancelId,'',option.action,option.cancel,callback);
        }
    },
    clickEvt:function(type,popId, btnActionId, btnCancelId, btnCloseId, action, cancel, callback){
        var result = false;
        if(!!btnActionId){
            var $actionBtn = $('#'+btnActionId);
            if(!!btnCloseId && type == 'alert')$actionBtn = $('#'+btnActionId+',#'+btnCloseId);
            $actionBtn.on('click',function(){
                Dialog.close('#'+popId);
                if(!!action)action();
                if(!!callback){
                    result = true;
                    callback(result);
                }
            });
        }
        if(!!btnCancelId){
            var $cancelBtn = $('#'+btnCancelId);
            if(!!btnCloseId && type == 'confirm')$cancelBtn = $('#'+btnCancelId+',#'+btnCloseId);
            $cancelBtn.on('click',function(){
                Dialog.close('#'+popId);
                if(!!cancel)cancel();
                if(!!callback){
                    result = false;
                    callback(result);
                }
            });
        }
    },
    keyEvt:function(){
        //컨펌팝업 버튼 좌우 방할기로 포거스 이동
        $(document).on('keydown', '.'+Dialog.alertClass+' .dialog_btn .btn',function(e){
            var $keyCode = (e.keyCode?e.keyCode:e.which),
                $tar = '';
            if($keyCode == 37)$tar = $(this).parent().prev();
            if($keyCode == 39)$tar = $(this).parent().next();
            if (!!$tar)$tar.find('.btn').focus();
        });
    },
    select:function(target,col){
        var $target = $(target),
            $targetVal = $target.val(),
            $title = $target.attr('title'),
            $length = $('.' +Dialog.selectClass).length,
            $popId = Dialog.selectId+$length,
            $length = $target.children().length,
            $opTxt = '',
            $opVal = '',
            $popHtml = '',
            $isBank = false,
            $isBankTy2 = false;

        if(!$title){
            $title = '선택';
        }else if($title.indexOf('은행선택') >= 0 || $title.indexOf('은행 선택') >= 0){
            $isBank = true;
            if($targetVal >= 200)$isBankTy2 = true;
        }
        $popHtml += '<div id="'+$popId+'" class="dialog bottom '+Dialog.selectClass+'" role="dialog" aria-hidden="true">';
        $popHtml += '<div class="dialog_wrap">';
        $popHtml += '<div class="'+Dialog.headClass+'">';
        $popHtml += '<h2>'+$title+'</h2>';
        $popHtml += '<a href="#" class="dialog_close ui_dialog_close" role="button"><span class="offscreen">팝업창 닫기</span></a>';
        $popHtml += '</div>';
        $popHtml += '<div class="'+Dialog.contClass+'">';
        $popHtml += '<div class="section">';
        if($isBank){
            $popHtml += '<div class="tabmenu2 no_hash js_tab">';
            $popHtml += '<ul>';
            $popHtml += '<li role="presentation"'+(!$isBankTy2 ? ' class="active"' : '')+'><a href="#bankPanel1" id="tab_bank_1" role="tab" aria-controls="bankPanel1" aria-selected="'+(!$isBankTy2 ? 'true" title="현재선택"' : 'false"')+'>은행</a></li>';
            $popHtml += '<li role="presentation"'+($isBankTy2 ? ' class="active"' : '')+'><a href="#bankPanel2" id="tab_bank_2" role="tab" aria-controls="bankPanel2" aria-selected="'+($isBankTy2 ? 'true" title="현재선택"' : 'false"')+'>증권</a></li>';
            $popHtml += '</ul>';
            $popHtml += '</div>';
            $popHtml += '<div id="bankPanel1" class="tab_panel'+(!$isBankTy2 ? ' active' : '')+'" role="tabpanel" aria-labelledby="tab_bank_1" aria-expanded="'+(!$isBankTy2 ? 'true' : 'false')+'">';
        }

        $popHtml += '<ul class="user_info_item_wrap';
        if($isBank){
            $popHtml += ' bank';
        }else{
            if(!!col)$popHtml += ' col'+col;
        }
        $popHtml += '">';
        for(var i=0;i<$length;i++){
            $opTxt = $target.children().eq(i).text();
            $opVal = $target.children().eq(i).attr('value');
            if($opVal != ''){
                if($isBank){
                    $popHtml += '<li class="'+($opVal >= 200 ? 'ty2' : 'ty1')+'">';
                }else{
                    $popHtml += '<li>';
                }
                $popHtml += '<div class="user_info_item'+($targetVal == $opVal ? ' selected' : '')+'">';
                $popHtml += '<a href="#" class="ui-pop-select-btn" role="button" data-value="'+$opVal+'">';
                if($isBank)$popHtml += '<i class="bk_'+$opVal+'" aria-hidden="true"></i>';
                $popHtml += '<span>'+$opTxt+'</span>';
                $popHtml += '</a>';
                $popHtml += '</div>';
                $popHtml += '</li>';
            }
        }
        $popHtml += '</ul>';
        if($isBank){
            $popHtml += '</div>';
            $popHtml += '<div id="bankPanel2" class="tab_panel'+($isBankTy2 ? ' active' : '')+'" role="tabpanel" aria-labelledby="tab_bank_2" aria-expanded="'+($isBankTy2 ? 'true' : 'false')+'">';
            $popHtml += '<ul class="user_info_item_wrap bank"></ul>';
            $popHtml += '</div>';
        }
        $popHtml += '</div>';
        $popHtml += '</div>';
        $popHtml += '</div>';
        $popHtml += '</div>';

        $('#wrap').append($popHtml);
        if($isBank){
            var isType2 = false;
            $('#'+$popId+' .user_info_item_wrap.bank>li').each(function(){
                if($(this).hasClass('ty2')){
                    isType2 = true;
                    var $wrap = $(this).closest('.tab_panel').next().find('.user_info_item_wrap')
                    //if($wrap.find('.none').length)$wrap.find('.none').remove();
                    $(this).appendTo($wrap);
                }
            });

            if(isType2 == false){ //증권사가 없으면
                $('#'+$popId).find('.tabmenu2').remove();
                $('#'+$popId).find('#bankPanel2').remove();
                $('#'+$popId).find('.user_info_item_wrap.bank').unwrap();
            }
        }

        $target.data('dialog','#'+$popId);

        $('#'+$popId).on('click','.ui-pop-select-btn',function(e){
            e.preventDefault();
            var $btnVal = $(this).data('value'),
                $btnTxt = $(this).text();
            $(this).parent().addClass('selected').siblings().removeClass('selected');
            target.val($btnVal).change();
            target.siblings('.ui_select_open').find('span').text($btnTxt+'입니다.');
            Dialog.close('#'+$popId);
        });
    },
    selectFirst:function(){
        $('.ui_select_open').each(function(){
            var $select = $(this).siblings('select'),
                $selected = $select.find(':selected');
            $select.attr({
                'tabindex':-1,
                'aria-hidden':true
            });
            if($selected.text().indexOf('선택') < 0 || $selected.val() != ''){
                $(this).find('span').text($selected.text()+'입니다.');
            }
        });
    },
    selectUI:function(){
        //셀렉트 팝업버튼 포커스
        $(document).on('focusin','.select_btn',function(){
            $(this).prev('select').addClass('focus');
        });
        $(document).on('focusout','.select_btn',function(){
            $(this).prev('select').removeClass('focus');
        });

        $(document).on('click','.ui_select_open',function(e){
            e.preventDefault();
            var $select = $(this).siblings('select');
            var $txtLengthArry = [];
            $select.find('option').each(function(){
                var $optVal = $(this).val(),
                    $optTxt = $(this).text();
                if($optVal != ''){
                    $txtLengthArry.push($optTxt.length);
                }
            });
            var $maxTxtLength = Math.max.apply(null, $txtLengthArry);
            if($maxTxtLength <= 4){
                Dialog.select($select,3);
            }else if($maxTxtLength <= 8){
                Dialog.select($select,2);
            }else{
                Dialog.select($select);
            }

            var $pop = $select.data('dialog'),
                $currentTarget = $(e.currentTarget);
            //setTimeout(function(){
            Dialog.open($pop,function(){
                $($pop).data('returnFocus',$currentTarget);
            });
            //},100);
        });


        //건물면적
        $(document).on('click','.layer_select_open',function(e){
            e.preventDefault();
            var $closest = $(this).closest('.form_item'),
                $wrap = $closest.find('.layer_select_wrap');
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                $wrap.attr('aria-hidden',true).find('.layer_select').stop(true,false).slideUp(300);
            }else{
                $(this).addClass('on');
                $wrap.attr('aria-hidden',false).find('.layer_select').stop(true,false).slideDown(300,function(){
                    $(this).find('.option').first().focus();
                });
                //Dialog.focusMove($wrap.find('.layer_select_wrap'));
            }
        });
        $(document).on('click','.layer_select_wrap .option',function(e){
            e.preventDefault();
            layerSelectClose(this,true);
        });
        $(document).on('focusout','.layer_select_wrap li:last-child .option',function(e){
            e.preventDefault();
            layerSelectClose(this);
        });

        function layerSelectClose(target,isInp){
            var $closest = $(target).closest('.form_item'),
                $wrap = $closest.find('.layer_select_wrap');
            if(isInp){
                var $span = $(target).find('span');
                $span.each(function(){
                    var $inpid= $(this).data('inpid');
                    $txt= $(this).text();
                    $('#'+$inpid).val($txt);
                });
            }
            $wrap.attr('aria-hidden',true).find('.layer_select').stop(true,false).slideUp(300);
            $closest.find('.layer_select_open').removeClass('on').focus();
        }
    },
    open:function(tar,callback){
        if(!$(tar).length || !$(tar).children('.dialog_wrap').length) return console.log('해당팝업없음');
        var $idx = $(tar).index('.dialog'),
            $show = $('.dialog.show').length,
            $id = $(tar).attr('id'),
            $lastCloseBtn = '<a href="#" class="dialog_close last_focus ui_dialog_close" role="button"><span class="offscreen">팝업창 닫기</span></a>';
        if($show > 0)$(tar).css('z-index','+='+$show);
        if($id == undefined){
            $id = Dialog.id+$idx;
            $(tar).attr('id',$id);
        }

        //열릴때 플루팅 버튼
        if($('.floating_btn').is(':visible') && $(tar).hasClass('t3')){
            $('.floating_btn').hide();
            if($('.floating_btn').hasClass('is_fixed_btn'))$(tar).addClass('is_fixed_btn')
        }
        if(isAppChk() && !$('#floatingNav').hasClass('off')){
            $(tar).addClass('is_floating');
        }else{
            $(tar).removeClass('is_floating');
        }

        //fixed버튼 있을때 빈공간삽입
        if($(tar).find('.dialog_content').next('.fixed_bottom_button').not('.all_agree').length){
            $(tar).find('.dialog_content').addClass('after_btn');
        }

        //포커스
        var $focusEl = '';
        try{
            if(event.currentTarget != document){
                $focusEl = $(event.currentTarget);
            }else{
                $focusEl = $(document.activeElement);
            }
        }catch(error){
            $focusEl = $(document.activeElement);
        }
        $(tar).data('returnFocus',$focusEl);
        $focusEl.addClass(Dialog.focusClass);
        if($focusEl.closest('.dialog').length){
            var $lastPop = $focusEl.closest('.dialog'),
                $lastPopId = $lastPop.attr('id');
            $(tar).data('lastpop',$lastPopId);
            $lastPop.attr('aria-hidden',true);
        }

        var $openDelay = 10;
        if($(tar).data('ishtml') != true && isMobile.iOS())$openDelay = 300;
        setTimeout(function(){
            //리턴 포커스
            if(isMobile.iOS()){
                var $focusEl2 = $(document.activeElement);
                if(!$focusEl2.hasClass(Dialog.focusClass)){
                    $focusEl.removeClass(Dialog.focusClass);
                    $(tar).data('returnFocus',$focusEl2);
                    $focusEl2.addClass(Dialog.focusClass);
                }
            }

            if($(tar).hasClass(Dialog.alertClass) && !isMobile.any()){
                $(tar).find('.dialog_btn .btn').last().focus();
            }else{
                $(tar).attr({'tabindex':0}).focus();
            }

            //웹접근성
            $(Dialog.etcCont).attr('aria-hidden','true');
            $(tar).attr('aria-hidden','false');
            var $tit = $(tar).find('.'+Dialog.headClass+' h2');
            if($tit.length && $(tar).attr('aria-labelledby') == undefined){
                if($tit.attr('id') == undefined){
                    $tit.attr('id',$id+'Label');
                    $(tar).attr('aria-labelledby', $id+'Label');
                }else{
                    $(tar).attr('aria-labelledby', $tit.attr('id'));
                }
            }

            //열기
            if(!$('html').hasClass('lock'))Body.lock();
            $(tar).addClass('show');
            $(tar).find('.'+Dialog.contClass).scrollTop(0);

            //슬릭 있을때
            if($(tar).find('.guide_info_swipe').length){
                $(tar).find('.dialog_content').addClass('no_touch_scl');
                $(tar).find('.guide_info_swipe').slick('refresh');
                $(tar).find('.guide_info_swipe').slick('slickGoTo',0);
            }

            //이미지 상세보기일때
            // if($(tar).find('.thumb_box.full_view').length){
            // 	$(tar).find('.dialog_content').addClass('no_touch_scl');
            // 	var $tarHeight = $(tar).find('.'+Dialog.contClass).height();
            // 	if($(tar).find('.fixed_bottom_button').length){
            // 		$tarHeight = $tarHeight - $(tar).find('.fixed_bottom_button').children().height() - 10;
            // 	}
            // 	$(tar).find('.thumb_box.full_view').css('height',$tarHeight);
            // }
            if($(tar).find('.img_slick').length){
                $(tar).find('.dialog_content').addClass('no_touch_scl');
                $(tar).find('.img_slick').slick('refresh');
            }else if($(tar).find('.thumb_box.full_view').length){
                $(tar).find('.dialog_content').addClass('no_touch_scl');
            }


            //약관팝업 전체동의버튼 노출여부
            if($(tar).find('.rule_swipe').length && $(tar).find('.all_agree.fixed_bottom_button').length){
                $(tar).find('.dialog_content').addClass('no_touch_scl');
                if(isPopAllAgree){
                    $(tar).find('.rule_swipe').removeClass('no_arr');
                    $(tar).find('.all_agree.fixed_bottom_button').show();
                    $(tar).find('.rule_section .fixed_bottom_button').hide();
                }else{
                    $(tar).find('.rule_swipe').addClass('no_arr');
                    $(tar).find('.all_agree.fixed_bottom_button').removeAttr('style');
                    $(tar).find('.rule_section .fixed_bottom_button').removeAttr('style');
                }
            }

            Dialog.focusMove(tar);
            if(!!callback){
                callback();
            }
            Dialog.position(tar);
            $(window).resize();
        }, $openDelay);
        //모바일 접근성보완: 모바일일때 마지막에 닫기 버튼 추가
        if(isMobile.any() && !$(tar).find('.dialog_close.last_focus').length && $(tar).find('.dialog_close').length)$(tar).children('.dialog_wrap').append($lastCloseBtn);
    },
    close:function(tar,callback){
        if(!$(tar).hasClass('show')) return console.log('해당팝업 안열려있음');
        var $closeDelay = 700,
            $visible = $('.dialog.show').length,
            $id = $(tar).attr('id'),
            $lastPopId = $(tar).data('lastpop');
        if($visible == 1){
            Body.unlock();
            $(Dialog.etcCont).removeAttr('aria-hidden');
        }
        if($lastPopId != undefined){
            $('#'+$lastPopId).attr('aria-hidden',false);
        }

        //포커스
        var $returnFocus = $(tar).data('returnFocus');
        var $stepSection = $returnFocus.closest('.step_section');
        $returnFocus.removeClass(Dialog.focusClass);
        if($stepSection.length){
            //포커스되돌려 줫는데 slick의 비활성영역일때 활성영역으로 포커스
            if(!$stepSection.hasClass('slick-active')){
                $stepSection.siblings('.slick-active').focus();
            }else{
                $returnFocus.focus();
            }
        }else{
            $returnFocus.focus();
        }

        //닫기
        $(tar).removeClass('show');
        isPopAllAgree = false;
        $(tar).attr('aria-hidden','true').removeAttr('style tabindex');

        $(tar).find('.'+Dialog.headClass).removeAttr('style').removeClass('shadow');
        $(tar).find('.'+Dialog.contClass).removeAttr('tabindex style');
        if($(tar).find('.dialog_close.last_focus').length)$(tar).find('.dialog_close.last_focus').remove();

        //알럿창
        if($(tar).hasClass(Dialog.alertClass)){
            setTimeout(function(){
                var $content = $(tar).find('.pop_text>div').html();
                $(tar).remove();
                Dialog.beforeCont.splice(Dialog.beforeCont.indexOf($content),1);
            },$closeDelay);
        }

        //select팝업
        if($(tar).hasClass(Dialog.selectClass)){
            setTimeout(function(){
                $(tar).remove();
            },$closeDelay);
        }

        //callback
        if(!!callback){
            setTimeout(function(){
                callback();
            },$closeDelay);
        }

        //닫힐때 플루팅 버튼
        if(!$('.floating_btn').is(':visible') && $(tar).hasClass('t3')){
            $('.floating_btn').removeAttr('style');
        }

        //약관 slick 닫힐때 맨 처음으로
        if($(tar).find('.rule_swipe').length){
            $(tar).find('.rule_swipe').slick('slickGoTo',0);
        }
    },
    position:function(tar){
        if(!$(tar).hasClass('show'))return false;
        if($(tar).data('popPosition') == true)return false;
        $(tar).data('popPosition',true);
        var $head = $(tar).find('.'+Dialog.headClass),
            $tit = $head.find('h2'),
            $content = $(tar).find('.'+Dialog.contClass);

        $(window).resize(function(){
            $head.removeAttr('style').removeClass('shadow');
            $content.removeAttr('tabindex style');

            //타이틀이 두줄 이상이 될때
            var $headH = $head.outerHeight(),
                $titH = $tit.outerHeight();
            if(30 < $titH && $headH < $titH && !$head.hasClass('offscreen')){
                var $cabH = $titH-$headH;
                $head.css('height','+='+$cabH);
                $(tar).find('.'+Dialog.contClass).css('padding-top','+='+$cabH);
            }

            //컨텐츠 스크롤이 필요할때
            var $height = $(tar).height(),
                $popHeight = $(tar).find('.dialog_wrap').outerHeight();
            if(!$(tar).hasClass('full'))$content.css('max-height',$height);

            //팝업 헤더 shadow
            var $contScrollTop = $content.scrollTop();
            if($contScrollTop > 50){
                $head.addClass('shadow');
            }else{
                $head.removeClass('shadow');
            }
        });

        //팝업 헤더 shadow
        $content.scroll(function(){
            var $contScrollTop = $(this).scrollTop();
            if($contScrollTop > 50){
                $head.addClass('shadow');
            }else{
                $head.removeClass('shadow');
            }
        });
    },
    focusMove:function(tar){
        if(!$(tar).hasClass('show'))return false;
        if($(tar).data('focusMove') == true)return false;
        $(tar).data('focusMove',true);
        var $tar = $(tar),
            $focusaEl = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])'
        $focusaEls = $tar.find($focusaEl);

        //약관 개별팝업 시
        if($tar.find('.rule_swipe').length && isPopAllAgree == false){
            $lastFocus = $tar.find('.slick-active').find(':focusable').last();
        }
        var $isFirstBackTab = false;
        $focusaEls.on('keydown',function(e){
            var $keyCode = (e.keyCode?e.keyCode:e.which),
                $focusable = $tar.find(':focusable').not('.last_focus'),
                $focusLength = $focusable.length,
                $firstFocus = $focusable.first(),
                $lastFocus = $focusable.last(),
                $index = $focusable.index(this);

            $isFirstBackTab = false;
            if($index == ($focusLength-1)){ //last
                if ($keyCode == 9){
                    if(!e.shiftKey){
                        $firstFocus.focus();
                        e.preventDefault();
                    };
                };
            }else if($index == 0){	//first
                if($keyCode == 9){
                    if(e.shiftKey){
                        $isFirstBackTab = true;
                        $lastFocus.focus();
                        e.preventDefault();
                    };
                };
            }
        });

        $tar.on('keydown',function(e){
            var $keyCode = (e.keyCode?e.keyCode:e.which),
                $focusable = $tar.find(':focusable').not('.last_focus'),
                $lastFocus = $focusable.last();

            if(e.target == this && $keyCode == 9){
                if(e.shiftKey){
                    $lastFocus.focus();
                    e.preventDefault();
                };
            }
        });

        $(document).on('focusin',$tar.selector+' .last_focus',function(e){
            var $focusable = $tar.find(':focusable').not('.last_focus'),
                $firstFocus = $focusable.first(),
                $lastFocus = $focusable.last();
            if($isFirstBackTab){
                $lastFocus.focus();
            }else{
                $firstFocus.focus();
            }
        });
    },
    init:function(){
        $('.dialog').attr({
            'aria-hidden':'true',
            'data-ishtml':'true',
        });
        $('#container .dialog').each(function(){
            $('#container').after(this);
        });

        //열기
        $(document).on('click','.ui_dialog_open',function(e){
            e.preventDefault();
            var $pop = $(this).attr('href'),
                $currentTarget = $(e.currentTarget);
            Dialog.open($pop,function(){
                $($pop).data('returnFocus',$currentTarget);
            });
        });

        //닫기
        $(document).on('click', '.ui_dialog_close',function(e){
            e.preventDefault();
            var $pop = $(this).attr('href');
            if ($pop == '#' || $pop == '#none' || $pop == undefined)$pop = $(this).closest('.dialog');
            Dialog.close($pop);
        });

        Dialog.keyEvt();
        Dialog.selectFirst();
        Dialog.selectUI();
    }
};

//토스트팝업
var toastBox = function(txt){
    var $delay = 3000,
        $speed = 500,
        $className = '.toast_box';

    var $boxHtml = '<div class="'+$className.substring(1)+'">';
    $boxHtml += '<div class="txt">'+txt+'</div>';
    $boxHtml += '</div>';

    $('#container').prepend($boxHtml);

    var $height = $($className).outerHeight();
    $($className).stop(true,false).removeAttr('style').css({'height':0}).animate({'height':$height},$speed).delay($delay).animate({'height':0},$speed);
};

//버튼 관련
var buttonUI ={
    winLoad: function(){
        //링크없는 a태그 role=button 추가
        $('a').each(function(e){
            var $href = $(this).attr('href');
            if(!$(this).hasClass('no-button')){
                if($href == undefined){
                    $(this).attr({'href':'#'});
                    if($(this).attr('role') == undefined)$(this).attr('role','button');
                }else{
                    if(($href.startsWith('#'))&& $(this).attr('role') == undefined)$(this).attr('role','button');
                }
            }
        });

        //type없는 button들 type 추가
        $('button').each(function(e){
            var $type = $(this).attr('type');
            if($type == undefined)$(this).attr('type','button');
        });
    },
    default: function(){
        //href가 #시작할때 a태그 클릭 시 기본속성 죽이기
        $(document).on ('click','a',function(e){
            var $href = $(this).attr('href');
            if(!$(this).hasClass('no-button')){ //기본속성 살리는 클래스(스킵네비 등)
                if($href.startsWith('#')){
                    e.preventDefault();
                }
            }
        });
    },
    effect: function(){
        //버튼 클릭 효과
        var btnInEfList = 'a.btn, button.btn,.accordion .title a, .product_item>a, .check_list_line .chk label, .direct_link li a, .bn_link_item2>a, .bn_link_item3>a, .bn_link_item4>a, .bn_link_item5>a, .link_item>a, .wpc-button>a, .wpc-attach-file>a';
        $(document).on('click', btnInEfList,function(e){
            var $btnEl = $(this),
                $delay = 650;

            if(!$btnEl.is('.disabled')){
                if(!$btnEl.find('.btn_click_in').length)$btnEl.append('<i class="btn_click_in"></i>');
                var $btnIn = $btnEl.find('.btn_click_in'),
                    $btnMax = Math.max($btnEl.outerWidth(), $btnEl.outerHeight()),
                    $btnX = e.pageX - $btnEl.offset().left - $btnMax/2,
                    $btnY = e.pageY - $btnEl.offset().top - $btnMax/2;
                $btnIn.css({
                    'left':$btnX,
                    'top':$btnY,
                    'width':$btnMax,
                    'height':$btnMax
                }).addClass('animate').delay($delay).queue(function(next){
                    $btnIn.remove();
                    next();
                });
            }
        });
    },
    top: function(){
        //top 버튼ㄴ
        var settings ={
            button: '#btnTop',
            text: '컨텐츠 상단으로 이동',
            min: 100,
            onClass: 'on',
            hoverClass: 'hover',
            scrollSpeed : 300
        };
        var btnHtml = '<div class="floating_btn btn_top"><a href="#" id="'+settings.button.substring(1)+'" title="'+settings.text+'" role="button"><span class="offscreen">'+settings.text+'</span></a></div>';
        if(!$(settings.button).length && $('#footer').length){
            if(isAppChk() && $('#floatingNav').length){
                if($('#floatingNav').hasClass('hide')){
                    $('#footer').append(btnHtml);
                }else{
                    $('#floatingNav .ft_wrap').append(btnHtml);
                }
            }else{
                $('#footer').append(btnHtml);
            }
            if($isFixedBtn)$(settings.button).parent().addClass('is_fixed_btn');
        }
        $(document).on('click',settings.button,function(e){
            e.preventDefault();
            $('html, body').animate({scrollTop:0},settings.scrollSpeed);
            $('#wrap').find(':focusable').first().focus();
        }).on('mouseenter',function(){
            $(settings.button).addClass(settings.hoverclass);
        }).on('mouseleave',function(){
            $(settings.button).removeClass(settings.hoverClass);
        });
        $(window).on('scroll resize',function(){
            var position = $(window).scrollTop();
            if (position > settings.min){
                $(settings.button).parent().addClass(settings.onClass);
                $('.floating_btn').not('.btn_top').stop(true,false).animate({'margin-bottom':60},300)
            }else{
                $(settings.button).parent().removeClass(settings.onClass);
                $('.floating_btn').not('.btn_top').stop(true,false).animate({'margin-bottom':0},300)
            }
        });
    },
    etc: function(){
        // 인증방식선택
        $('.certify_wrap li a').on('click', function(e){
            e.preventDefault();
            $('.certify_wrap li a').removeClass('is_active');
            $(this).addClass('is_active');
        });

        // 아이콘버튼
        $('.icon_select_btn a.sel').on('click',function(e){
            e.preventDefault();
            $(this).addClass('on').parent().siblings().children().removeClass('on');
        });
    },
    init: function(){
        buttonUI.default();
        buttonUI.effect();
        if(!$('.main_content').length)buttonUI.top(); //메인에는 탑버튼 미사용
        buttonUI.etc();
    }
};

//accordion
var accordion = function(){
    var $accordion = $('.accordion'),
        $title = $accordion.children('.title'),
        $panel = $accordion.children('.panel');
    $panel.hide();
    $accordion.attr({
        role: 'tablist',
        multiselectable: 'true'
    });
    $panel.attr('id', function(IDcount){
        return 'panel-' + IDcount;
    });
    $panel.attr('aria-labelledby', function(IDcount){
        return 'control-panel-' + IDcount;
    });
    $panel.attr('aria-hidden','true');
    $panel.attr('role','tabpanel');
    $title.each(function(){
        var $this = $(this);
        $target = $this.next('.panel')[0].id;
        $link = $('<a>',{
            'href':'#'+$target,
            'aria-expanded':'false',
            'aria-controls':$target,
            'id':'control-'+ $target
        });
        $this.wrapInner($link);
        if($this.hasClass('open')){
            $this.find('a').attr('aria-expanded',true).addClass('active').append('<span class="ico">내용닫기</span>').parent().next('.panel').attr('aria-hidden','false').slideDown(200);
        } else{
            $this.find('a').append('<span class="ico">내용열기</span>');
        }
    });
    $('.accordion .title a').on('click', function (e){
        e.preventDefault();
        var $this = $(this),
            $panel = $this.closest('.title').next('.panel');
        if ($this.attr('aria-expanded') == 'false'){
            if(!$this.closest('.accordion').hasClass('toggle')){
                $this.closest('.accordion').find('[aria-expanded=true]').attr('aria-expanded',false).removeClass('active').parent().next('.panel').attr('aria-hidden','true').slideUp(200);
            }
            $this.attr('aria-expanded',true).addClass('active').find('.ico').text('내용닫기');
            $panel.attr('aria-hidden',false).slideDown(200,function(){
                //열렸을때 스크롤
                toggleScroll($this,this);
            });
            if($panel.find('.tbl_scroll').length){
                tblUI.guide('.tbl_scroll');
            }
        } else{
            $this.attr('aria-expanded',false).removeClass('active').find('.ico').text('내용열기');
            $panel.attr('aria-hidden',true).slideUp(200);
        }
        if($this.closest('.title').hasClass('swipe')){
            setTimeout(function(){
                var stepHeight = $this.closest('.step_section').height();
                $this.closest('.slick-list').height(stepHeight);
            }, 300);
        }
        if($this.closest('.step_swipe').length > 0){
            setTimeout(function(){
                $stepSwipe.slick('reinit');
            },200);
        }
    });
};

//툴팁
var tooltip = {
    position:function(tar){
        var $tar = $(tar),
            $btn = $tar.closest('.tooltip_wrap').find('.tooltip_btn');
        if(!$tar.children('.arr').length)$tar.prepend('<i class="arr" aria-hidden="true"></i>');
        if(!$tar.children('.tooltip_close').length)$tar.append('<a href="#" class="tooltip_close" role="button"><span class="offscreen">툴팁닫기</span></a>');
        $(window).resize(function(){
            var $btnX	= $btn.offset().left,
                $btnW	= $btn.width(),
                $winW	= $(window).width(),
                $scrollEnd	= $(window).height()+$(window).scrollTop();
            if($('.fixed_bottom_button:visible').not('.t1').length)$scrollEnd = $scrollEnd-60;
            $tar.children('.arr').css({
                'left': $btnX-20+($btnW/2)
            });
            $tar.css({
                'width': $winW-40,
                'left': -($btnX-20),
            });
            var $tarH = $tar.outerHeight(),
                $tarY = $tar.closest('.tooltip_wrap').offset().top + parseInt($tar.css('margin-top'));
            if($scrollEnd < ($tarH+$tarY)){
                $tar.addClass('bottom');
            }else{
                $tar.removeClass('bottom');
            }
        });
    },
    init:function(){
        //열기
        $(document).on('click','.tooltip_btn',function(e){
            e.preventDefault();
            var $cont = $(this).closest('.tooltip_wrap').find('.tooltip_cont');
            $('.tooltip_cont').fadeOut();
            tooltip.position($cont);
            $(window).resize();
            $cont.stop(true,false).fadeIn();
        });
        //닫기
        $(document).on('click','.tooltip_close',function(e){
            e.preventDefault();
            var $cont = $(this).closest('.tooltip_cont');
            $cont.stop(true,false).fadeOut();
        });
        $(document).on('click touchend',function(e){
            $('.tooltip_cont').stop(true,false).fadeOut();
        }).on('click','.tooltip_wrap',function(e){
            e.stopPropagation();
        });

        $('.tooltip_wrap').each(function(e){
            var $btn = $(this).find('.tooltip_btn'),
                $cont = $(this).find('.tooltip_cont'),
                $contId = $cont.attr('id'),
                $closeBtn = $(this).find('.tooltip_close');
            if(!$contId)$contId = 'tt_cont_'+e;
            $btn.attr({
                'role':'button',
                'aria-describedby':$contId
            });
            $cont.attr({
                'id':$contId,
                'role':'tooltip'
            });
            $closeBtn.attr('role','button');
        });
    }
};

//탭메뉴 기능
var tabUI = function(){
    var $tab = $('.js_tab'),
        $onText = '현재선택';

    if($('html').attr('lang') == 'en')$onText = 'Activation Menu';

    $(document).on('click','.js_tab a',function(e){
        e.preventDefault();
        var $this = $(this),
            $idx = $this.closest('li').index(),
            $closest = $this.closest('.js_tab'),
            $isNoHash = $closest.hasClass('no_hash') || isAppChk('ios') ? true: false,
            $isFirst = $closest.data('isFirst'),
            $href = $this.attr('href'),
            $target = $closest.data('target'),
            $winScrollTop = $(window).scrollTop();
        if($($href).length){
            if($isFirst == true){
                $closest.data('isFirst', false) ;
            }else if($isNoHash == false){
                location.hash = $href;
                $(window).scrollTop($winScrollTop);
            }
            if($this.closest('.fixed').length){
                var $scrollTop = $this.closest('.fixed').offset().top - $('#header').outerHeight();
                $('html,body').stop(true,false).animate({'scrollTop':$scrollTop},100);
            }

            if($target == undefined){
                $($href).addClass('active').attr('aria-expanded',true).siblings('.tab_panel').attr('aria-expanded',false).removeClass('active');;
            }else{
                $($target).attr('aria-expanded',false).removeClass('active');
                $($href).addClass('active').attr('aria-expanded',true);
            }
            $this.attr('title',$onText).parent().addClass('active').siblings().removeClass('active').find('a').removeAttr('title');
            $this.attr('aria-selected',true).closest('li').siblings().find('[role=tab]').attr('aria-selected',false);

            //slick
            if($($href).find('.slick-slide').length){
                $($href).find('.slick-slide').resize();
            }
            if($($href).closest('.step_swipe.slick-initialized').length){
                $($href).closest('.step_swipe').slick('refresh');
            }

            //fixedBtn
            if($($href).find('.fixed_bottom_button').length){
                $('#footer').addClass('add_fixed_btn');
                $('#floatingNav').addClass('hide');
                //}else if($($href).find('.fixed_bottom_button').length == 0 && $('.fixed_bottom_button:visible').length == 0){
            }else if(!$('.fixed_bottom_button:visible').length){
                $('#footer').removeClass('add_fixed_btn');
                $('#floatingNav').removeClass('hide');
            }

            //scrollItem
            if($($target).find('.animated').length){
                setTimeout(function(){
                    $($target).find('.animated').addClass('paused');
                    $(window).scroll();
                },100);
            }
        }else{
            console.error('대상 지정 오류! href값에 해당 id값을 넣어 주세요~');
        }
        var $arr = $closest.children('.arr')
        if($arr.length){
            var $liLength = $closest.find('>ul>li').length,
                $liWidth = 100/$liLength,
                $arrLeft = ($liWidth*$idx)+($liWidth/2);
            $arr.css('left',$arrLeft+'%');
        }
    });

    var $hash = location.hash;
    if($tab.length){
        $tab.each(function(e){
            $(this).find('ul').attr('role','tablist');
            var isHash =false;
            var tarAry = [];
            var isHashClk = '';
            $(this).find('li').each(function(f){
                $(this).attr('role','presentation');
                var _a = $(this).find('a'),
                    _aId = _a.attr('id'),
                    _href = _a.attr('href');
                if(!_aId) _aId = 'tab_btn_'+e+'_'+f;
                tarAry.push(_href);
                _a.attr({
                    'id' :_aId,
                    'role' :'tab',
                    'aria-controls': _href.substring(1),
                    'aria-selected':'false'
                });
                $(_href).attr({
                    'role':'tabpanel',
                    'aria-labelledby':_aId,
                    'aria-expanded':'false'
                });
                if(_href == $hash || $(_href).find($hash).length){
                    isHash = true;
                    isHashClk = _a;
                }
            });
            $(this).data('target',tarAry.join(','));
            if(isHash == false){
                $(this).data('isFirst',true);
                $(this).find('li').eq(0).find('a').trigger('click');
            }
            if(isHash == true){
                isHashClk.trigger('click');
            }
        });
    }
    if($('.tab_nav').not('.js_tab').length){
        $('.tab_nav').not('.js_tab').each(function(){
            $(this).find('.tab.active > a').attr('title',$onText);
        });
    }

    if($('.tabmenu').length){
        $(document).on('click','.tabmenu.js_tab a',function(e){
            e.preventDefault();
            scrollUI.center($(this).parent());
        });

        $('.tabmenu').each(function(){
            var $active = $(this).find('.active');
            scrollUI.center($active);
        });
    }

    //radio tab
    $(document).on('change','.js_tab_rdo input',function(e){
        var $target = $(this).data('target'),
            $targets = $(this).closest('.js_tab_rdo').data('targets');

        $($targets).removeClass('active');
        $($target).addClass('active');

        if($($target).closest('.step_swipe.slick-initialized').length){
            $($target).closest('.step_swipe').slick('refresh');
        }
    });
    if($('.js_tab_rdo').length){
        $('.js_tab_rdo').each(function(){
            var tarAry = [];
            $(this).find('input[type=radio]').each(function(){
                var $tar = $(this).data('target');
                if(tarAry.indexOf($tar) < 0 && !!$tar)tarAry.push($tar);
                if($(this).is(':checked')){
                    $($tar).addClass('active');

                    if($($tar).closest('.step_swipe.slick-initialized').length){
                        $($tar).closest('.step_swipe').slick('refresh');
                    }
                }
            });
            $(this).data('targets',tarAry.join(','));
        });
    }
};

//1뎁스 탭 swipe
var $tabNavis = [];
var tabNavi = function(){
    $('.tab_track').each(function(i){
        var $navi = $(this),
            $widthSum = 0,
            $class = 'ui-tabnavi-'+i;

        $navi.find('.tab').each(function(){
            $widthSum = $widthSum + $(this).outerWidth();
        });

        $navi.addClass($class);
        var $tabNavi = new Swiper('.'+$class,{
            slidesPerView: 'auto',
            wrapperClass:'tab_swiper',
            slideClass:'tab',
            resizeReInit:true,
            on: {
                touchMove:function(){
                    if($isCenter == true){
                        $tabNavi.params.centeredSlides = false;
                        $tabNavi.update();
                    }
                }
            }
        });

        var $isCenter = false;
        var activeMove = function(idx,speed){
            var $windowCenter = $(window).width()/2,
                $activeTab = $navi.find('.tab').eq(idx),
                $tabLeft = $activeTab.position().left,
                $tabWidth = $activeTab.outerWidth(),
                $tabCenter = $tabLeft + ($tabWidth/2);
            if(speed == undefined)speed=300;
            if($windowCenter < $tabCenter && $tabCenter < ($widthSum-$windowCenter)){
                $tabNavi.params.centeredSlides = true;
                $isCenter = true;
                $tabNavi.update();
            }else{
                $tabNavi.params.centeredSlides = false;
                $isCenter = false;
                $tabNavi.update();
            }
            if($windowCenter < $tabCenter){
                $tabNavi.slideTo(idx,speed);
            }else{
                $tabNavi.slideTo(0,speed);
            }

        }

        var $activeCheckNum = 0;
        var $activeCheck = setInterval(function(e){
            $activeCheckNum++;
            var $active = $navi.find('.tab.active'),
                $activeIdx = $active.index();
            if($activeIdx >= 0){
                activeMove($activeIdx,0);
                clearInterval($activeCheck);
            }
            if($activeCheckNum >= 20)clearInterval($activeCheck);
        },100);

        //$navi.data('navis','$tabNavis['+i+']');
        $tabNavis.push($tabNavi);

        $(window).resize(function(){
            var $parenW = $navi.parent().width();
            if($parenW > $widthSum){
                $navi.find('.tab_nav').addClass('center');
                $tabNavi.params.followFinger = false;
                $tabNavi.update();
            }else{
                $navi.find('.tab_nav').removeClass('center');
                $tabNavi.params.followFinger = true;
                $tabNavi.update();
            }
        });

        $navi.on('click','a',function(e){
            var $jstab = $(this).closest('.js_tab');
            if($jstab.length){
                e.preventDefault();
                var $liIdx = Math.max($(this).closest('li').index());
                activeMove($liIdx)
            }
        });
    });
}

//스크롤 관련
var scrollUI = {
    center: function(el){
        var $parent = $(el).parent(),
            $parentWidth = $parent.outerWidth(),
            $parentScrollW = $parent.get(0).scrollWidth,
            $thisLeft = $(el).position().left,
            $thisWidth = $(el).outerWidth(),
            $scrollLeft = $thisLeft - ($parentWidth/2) + ($thisWidth/2),
            $speed = Math.max(300,Math.abs($scrollLeft * 2));
        if($parentWidth < $parentScrollW)$parent.animate({'scrollLeft':'+='+$scrollLeft},$speed);
    },
    hidden: function(){
        var $window = $(window),
            $position = $window.scrollTop(),
            $floatingNav = $('#floatingNav'),
            $isFloatingNav = false,
            $sclHidden = $('.btn_scl_hidden'),
            $sclHidden2 = $('.scl_hidden');

        if(isAppChk() && !$floatingNav.hasClass('hide'))$isFloatingNav = true;

        $window.on('scroll', function(){
            var $scrollTop = $(this).scrollTop(),
                $wrapH = $('#wrap').height(),
                $end = $wrapH - $(window).height() - 10;
            if($scrollTop >= $position){										//아래로 스크롤하면 숨김
                if($scrollTop >= $end){											//아래로 스크롤해도 마지막에 도달하면 보여줌
                    //if($isFloatingNav)$floatingNav.removeClass('off');		//접근성 문제로 항상 보이게...
                    //$sclHidden.removeClass('off');							//접근성 문제로 항상 보이게...
                    $sclHidden2.removeClass('off');
                }else{
                    //if($isFloatingNav)$floatingNav.addClass('off');
                    //$sclHidden.addClass('off');
                    if($scrollTop > 50)$sclHidden2.addClass('off');
                }
            }else{							//위로 스크롤하면 보여줌
                if(!$('html').hasClass('lock')){
                    if(($position-$scrollTop) > 10){
                        //if($isFloatingNav)$floatingNav.removeClass('off');	//접근성 문제로 항상 보이게...
                        //$sclHidden.removeClass('off');						//접근성 문제로 항상 보이게...
                    }
                    if($scrollTop <= 50){
                        $sclHidden2.removeClass('off');
                    }else{
                        $sclHidden2.addClass('off');
                    }
                }
            }
        });
        $window.scrollEnd(function(){
            var $scrollTop = $(this).scrollTop();
            $position = $scrollTop;
        },300);
        $sclHidden.find('a').on('focusin', function(e){
            $sclHidden.removeClass('off');
        });
    },
    loading:function(){
        $(window).scroll(function(){
            $('.loading_area').each(function(){
                var $this = $(this),
                    $href = $this.data('href')
                if(isScreenIn(this)){
                    $this.load($href,function(res,sta,xhr){
                        if(sta == "success"){
                            $this.children().unwrap();
                        }
                    });
                }
            });
        });
    },
    init: function(){
        scrollUI.hidden();
        scrollUI.loading();
    }

};

//입력요소 관련
var isPopAllAgree = false;
var formUI = {
    winLoad:function(){
        //select off효과
        $('select').each(function(){
            var $val = $(this).val(),
                $title = $(this).attr('title');
            if($val == '' || $val == null){
                $(this).addClass('off');
            }else if($title == '이메일 도메인 선택' && ($val == '' || $val == 0)){
                $(this).addClass('off');
            }
        });

        //product: checkbox
        $('.product_item>.checkbox>input').each(function(){
            if($(this).prop('checked'))$(this).parent().addClass('checked');
        });

        //페이지 로딩 후 검색박스에 입력값이 있으면 X 버튼 추가
        /*
		$('.search_box input[type=text]').each(function(){
			if($(this).val() != '')$(this).after('<a href="#" class="inp_del" role="button">입력내용삭제</a>');
		});
		*/

        //이메일 입력영역
        $('.email_form').each(function(){
            var $this = $(this),
                $inp = $this.find('.i_txt'),
                $inpVal = $inp.val(),
                $sel = $this.find('select'),
                $selVal = $sel.val();
            if($inpVal != '' && ($selVal == '' || $selVal == 0 || $selVal == 'etc')){
                //$sel.val('etc');
                $this.emailFormEdit();
                //$inp.after('<a href="#" class="inp_del" role="button">입력내용삭제</a>');
            }
        });
    },
    select:function(){
        //select off효과
        $(document).on('change','select',function(){
            var $val = $(this).val(),
                $title = $(this).attr('title');
            if($val == ''){
                $(this).addClass('off');
            }else if($title == '이메일 도메인 선택' && ($val == '' || $val == 0)){
                $(this).addClass('off');
            }else{
                $(this).removeClass('off');
            }
        });
    },
    input:function(){
        //input[type=number][maxlength] 되게 처리..(하지만 디바이스 탐): number type을 안쓰는게 좋음
        $(document).on('change keyup input','input[type=number][maxlength]',function(e){
            var $this = $(this),
                $val = $this.val(),
                $max = $this.attr('maxlength'),
                $length = $val.length,
                $dataVal = $this.data('val');
            if($dataVal == undefined)$dataVal ='';
            if($length > $max){
                $this.val($dataVal);
            }else{
                $this.data('val',$val);
            }
        });

        //form 안에 input이 1개일때 엔터시 새로고침 현상방지
        $(document).on('keydown','form input',function(e){
            var $keyCode = (e.keyCode?e.keyCode:e.which),
                $form = $(this).closest('form'),
                $length = $form.find('input').not('[type=checkbox],[type=radio]').length;

            if($length == 1 && !$(this).closest('.search_box').length){ //.search_box 검색창은 예외
                if($keyCode==13)return false;
            }
        });

        //input[type=date]
        $(document).on('change','.i_txt.date+.i_txt[type=date]',function(){
            var $val = $(this).val();
            if($val.indexOf('-') < 0){
                $val = new Date($val).toISOString().split('T')[0];
            }
            $val = $val.split('-').join('.');
            $(this).prev('.i_txt.date').val($val).change().focus();
        });
    },
    inputTime:function(){
        //시간 입력 input(개발에서 사용안함)
        $('.ui-time').keyup(function(){
            var $this = $(this),
                $val = $this.val(),
                $min = 1,
                $max = 23;
            if($this.hasClass('min'))$max = 59;
            if($val != ''){
                $val = Math.max($min,Math.min($max,$val)).toString();
                $this.val($val);
            }
        });

        $('.ui-time').focusout(function(){
            if($(this).val().length == 1 && parseInt(this.value)<10){
                this.value = "0" + this.value;
            }
        });
    },
    checkbox:function(){
        //.product_item checkbox
        $(document).on('change','.product_item>.checkbox>input',function(){
            var $type = $(this).attr('type');
            if($type == 'checkbox'){
                if($(this).prop('checked')){
                    $(this).parent().addClass('checked');
                }else{
                    $(this).parent().removeClass('checked');
                }
            }else if($type == 'radio'){
                if($(this).prop('checked')){
                    $(this).parent().addClass('checked').closest('.product_item').siblings('.product_item').children('.checkbox').removeClass('checked');
                }
            }
        });
        $(document).on('change','.user_info_list>.product_item>.checkbox>input',function(){
            var $type2 = $(this).attr('type');
            if($type2 == 'checkbox'){
                if($(this).prop('checked')){
                    $(this).parent().addClass('checked');
                    $(this).parents('.product_item').removeClass('unchecked');
                }else{
                    $(this).parent().removeClass('checked');
                    $(this).parents('.product_item').addClass('unchecked');
                }
            }
        });
    },
    textarea:function(){
        //textarea
        $(document).on('focusin','textarea',function(){
            $(this).closest('.textarea').addClass('hover');
        }).on('focusout','textarea',function(){
            $(this).closest('.textarea').removeClass('hover');
        });
    },
    invalid:function(){
        //invalid 클래스 삭제
        $(document).on('change','.form_item input, .form_item select, .form_item textarea',function(){
            var $parents = $(this).parents('.invalid');
            if($parents.length){
                $parents.removeClass('invalid');
            }
        });
    },
    /*
	delBtn:function(){
		//input 삭제버튼
		$(document).on('keyup focus','.i_txt',function(){
			var $val = $(this).val();
			if($(this).prop('readonly') || $(this).prop('disabled') || $(this).hasClass('no_del') || $(this).hasClass('i_datepicker')){
				return false;
			}
			if($val != ''){
				if(!$(this).next('.inp_del').length && !$(this).next('.datepicker').length){
					$(this).after('<a href="#" class="inp_del" role="button">입력내용삭제</a>');
				}
			}else{
				if($(this).closest('.inp_price').length){
					if($(this).parent().next().find('.inp_del').length)$(this).parent().next().find('.inp_del').remove();
				}else{
					if($(this).next('.inp_del').length)$(this).next('.inp_del').remove();
				}
			}
		});
		$(document).on('click','.inp_del',function(){
			var $inp = $(this).prev('.i_txt');
			if($(this).closest('.inp_price').length)$inp = $(this).closest('.inp_price').find('.i_txt')
			$(this).remove();
			if($(this).closest('.accout_total_guide').length)$(this).closest('.accout_total_guide').removeClass('bl_line');
			$inp.val('').change().focus();
		});
	},
	*/
    search:function(){
        //검색박스
        var $wrap = '.search_box_wrap',
            $contClass = '.search_box_cont',
            $inpClass = '.search_box .i_txt';

        // listShow 조건용 이벤트 변경
        $($wrap).find($inpClass).on('keyup focus',function(e){
            var $val = $(this).val(),
                $closest = $(this).closest($wrap),
                $cont = $closest.find($contClass);
            if($val != ''){
                $cont.show();
            }else{
                $cont.hide();
            }
        });

        $(document).on('touchend',function(e){
            $($contClass).hide();
        }).on('touchend',$wrap,function(e){
            e.stopPropagation();
        });

        $(document).on('click','.search_box_cont a.link',function(e){
            e.preventDefault();
            var $text = $(this).text();
            $(this).closest($wrap).find($inpClass).val($text);
            $($contClass).hide();
        });
        $(document).on('blur','.search_box_cont .link',function(e){
            if($(this).closest('li').is(':last-child')){
                $(this).closest('.search_box_cont').hide();
            }
        });
    },
    range:function(){
        if($('.range_slider').length){
            $('.range_slider').each(function(){
                var $slider = $(this).find('.slider'),
                    $list = $(this).find('.list'),
                    $inp = $(this).find('input[type=hidden]'),
                    $unit = $list.data('unit'),
                    $title= $list.attr('title'),
                    //$sel = $(this).find('.i_val'),
                    $min = parseInt($slider.data('min')),
                    $max = parseInt($slider.data('max')),
                    $val = parseInt($slider.data('value')),
                    $step = parseInt($slider.data('step'));

                if(!$min)$min = 0;
                if(!$max)$max = 5;
                if(!$step)$step = 1;
                if(!$val)$val = $min;

                if($list.length){
                    $list.empty();
                    if(!!$title)$list.removeAttr('title').append('<strong class="offscreen">'+$title+'</strong>');
                    $list.append('<ul></ul>');
                    for(var i = $min;i <= ($max/$step);i++){
                        $list.find('ul').append('<li><a href="#" role="button">'+i*$step+'<span class="offscreen">'+$unit+'</span></a></li>');
                        //$sel.append('<option value="'+i*$step+'">'+i*$step+'</option>');
                    }
                }

                if($inp.length)$inp.val($val);
                var range = $slider.slider({
                    min:$min,
                    max:$max,
                    value:$val,
                    step:$step,
                    range:'min',
                    create:function(e){
                        $slider.find('.ui-slider-handle').attr({'tabindex':-1}).html('<span class="offscreen">선택한 값은</span><i>'+$val+'</i><span class="offscreen">'+$unit+'입니다.</span>');
                        //$sel.val($val).change();
                        $list.find('li').eq($val/$step).addClass('on').find('a').attr('title','현재선택');
                    },
                    stop:function(event,ui){
                        $(ui.handle).find('i').html(ui.value);
                        //$sel.val(ui.value).change();
                        if($inp.length)$inp.val(ui.value).change();
                        $slider.data('value',ui.value);
                        $list.find('li').eq(ui.value/$step).siblings().removeClass('on').removeAttr('title');
                        $list.find('li').eq(ui.value/$step).addClass('on').find('a').attr('title','현재선택');
                    }
                });

                $list.find('a').click(function(e){
                    e.preventDefault();
                    var $txt = parseInt($(this).text());
                    range.slider('value',$txt);
                    $slider.find('.ui-slider-handle i').text($txt);
                    if($inp.length)$inp.val($txt).change();
                    //$sel.val($txt).change();
                    $(this).parent().addClass('on').attr('title','현재선택').siblings().removeClass('on').removeAttr('title');
                });

            });
        }
    },
    mkCalendar:function(element){
        // mkdatepicker(현재 미사용)
        if($(element).length){
            $(element).each(function(){
                if($(this).hasClass('today-prev')){
                    $(this).mkdatepicker({
                        'max': autoDateFormet($nowDateDay.toString(),'/')
                    });
                }else if($(this).hasClass('today-next')){
                    $(this).mkdatepicker({
                        'min': autoDateFormet($nowDateDay.toString(),'/')
                    });
                }else{
                    $(this).mkdatepicker();
                }
                $(this).prev().on('change.mk-datepicker',function(e,date){
                    if(!!date)formUI.dateValue(this,'.i_date',date);
                });
            });
        }
    },
    calendar:function(element){
        //jquery UI datepicker
        var prevYrBtn = $('<button type="button" class="ui-datepicker-prev-y" title="이전년도"><span>이전년도</span></button>');
        var nextYrBtn = $('<button type="button" class="ui-datepicker-next-y" title="다음년도"><span>다음년도</span></button>');

        if($(element).length){
            $(element).each(function(){
                var $this = $(this),
                    $minDate = $(this).data('min'),
                    $maxDate = $(this).data('max');
                if($minDate == undefined)$minDate = '-100y';
                if($maxDate == undefined)$maxDate = '+100y';
                $this.datepicker({
                    minDate: $minDate,
                    maxDate: $maxDate,
                    closeText: '닫기',
                    prevText: '이전달',
                    nextText: '다음달',
                    currentText: '오늘',
                    buttonText : '기간조회',
                    monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
                    monthNamesShort:['01','02','03','04','05','06','07','08','09','10','11','12'],
                    dayNamesMin: ['일','월','화','수','목','금','토'],
                    dateFormat:'yy.mm.dd',
                    yearRange:'-100:+100',
                    yearSuffix: '.',
                    showMonthAfterYear: true,
                    showButtonPanel: true,
                    showOn:'button',
                    changeMonth: true,
                    changeYear: true,
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    beforeShow: function(el,ob){
                        //열때
                        Body.lock();
                        var $cal = $('#'+ob.dpDiv[0].id);
                        $('body').append('<div class="datepicker-dimmed"></div>');
                        $(this).prop('readonly',true);

                        setTimeout(function(){
                            var $header = $cal.find('.ui-datepicker-header');
                            $header.find('.ui-datepicker-prev').before(prevYrBtn);
                            $header.find('.ui-datepicker-next').after(nextYrBtn);
                            prevYrBtn.unbind('click').bind('click',function(){
                                $.datepicker._adjustDate($this,-1,'Y');
                            });
                            nextYrBtn.unbind('click').bind('click',function(){
                                $.datepicker._adjustDate($this,+1,'Y');
                            });

                            $('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
                            $cal.attr('tabindex',0).focus();
                            Dialog.focusMove($cal);
                        },5);
                    },
                    onChangeMonthYear: function(y,m,ob){
                        //달력 바뀔때
                        var $cal = $('#'+ob.dpDiv[0].id);
                        setTimeout(function(){
                            var $header = $cal.find('.ui-datepicker-header');
                            $header.find('.ui-datepicker-prev').before(prevYrBtn);
                            $header.find('.ui-datepicker-next').after(nextYrBtn);
                            prevYrBtn.unbind('click').bind('click',function(){
                                $.datepicker._adjustDate($this,-1,'Y');
                            });
                            nextYrBtn.unbind('click').bind('click',function(){
                                $.datepicker._adjustDate($this,+1,'Y');
                            });

                            $('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
                            $cal.focus();
                            Dialog.focusMove($cal);
                        },5);
                    },
                    onSelect: function(d,ob){
                        //선택할때
                        Body.unlock();
                        $(ob.input).change();
                        var $cal = $('#'+ob.dpDiv[0].id);
                        $cal.removeAttr('tabindex');
                        $('.datepicker-dimmed').remove();
                        $(this).next('.ui-datepicker-trigger').focus();
                        $(this).prop('readonly',false);

                        if($(this).hasClass('i_date')){
                            formUI.dateValue(this,'.i_date',d);
                        }else{
                            formUI.dateValue(this,'.i_datepicker',d);
                        }
                    },
                    onClose: function(d,ob){
                        //닫을때
                        Body.unlock();
                        var $cal = $('#'+ob.dpDiv[0].id);
                        $('.datepicker-dimmed').remove();
                        $cal.removeAttr('tabindex');
                        $(this).next('.ui-datepicker-trigger').focus();
                        $(this).prop('readonly',false);
                    }
                });

                //달력버튼 카드리더기에서 안읽히게
                $(this).siblings('.ui-datepicker-trigger').attr({
                    'aria-hidden':true,
                    'tabindex':-1
                });

                $(document).on('touchend','.datepicker-dimmed',function(){
                    $('.hasDatepicker').datepicker('hide');
                });
            });

            $(element).focusin(function(){
                if($(this).hasClass('ui-date')){
                    var $val = $(this).val();
                    $(this).val(onlyNumber($val));
                }
            });
            $(element).focusout(function(){
                if($(this).hasClass('ui-date')){
                    var $val = $(this).val();
                    $(this).val(autoDateFormet($val,'.'));
                }
            });
        }
    },
    dateValue:function(target,className,dateVal){
        var $this = $(target);
        var $closest = $this.closest('.date_range');
        if($closest.length && $closest.find(className).length == 2){
            var $idx = $closest.find(className).index(target),
                $range = $this.data('range');
            if(!!$range){
                var $getDate = $this.datepicker('getDate');
                if(className == '.i_date'){
                    dateVal = autoDateFormet(dateVal,'-');
                    $getDate = new Date(dateVal);
                }
                var $rangeAry = $range.split(' '),
                    $getDateYear = $getDate.getFullYear(),
                    $getDateMonth = $getDate.getMonth(),
                    $getDateDay = $getDate.getDate(),
                    $setDateYear = 0,
                    $setDateMonth = 0,
                    $setDateDay = 0,
                    $setDateTxt = '';
                //for(var i in $rangeAry){
                for(var i=0; i<$rangeAry.length; i++){
                    var $yIdx = $rangeAry[i].indexOf('y');
                    var $mIdx = $rangeAry[i].indexOf('m');
                    var $dIdx = $rangeAry[i].indexOf('d');
                    if($yIdx >= 0)$setDateYear = parseInt($rangeAry[i].substr(0,$yIdx));
                    if($mIdx >= 0)$setDateMonth = parseInt($rangeAry[i].substr(0,$mIdx));
                    if($dIdx >= 0)$setDateDay = parseInt($rangeAry[i].substr(0,$dIdx));
                }
            }
            var $first = $closest.find(className).eq(0),
                $last = $closest.find(className).eq(1);
            if($idx == 0){ //앞달력 날짜 선택 시
                if(className == '.i_datepicker')$last.datepicker('option','minDate',dateVal);
                if(!!$range){
                    $getDate.setDate($getDateDay+$setDateDay-1);
                    if($setDateMonth > 0)$getDate.setDate($getDate.getDate()+($setDateMonth*30));
                    if($setDateYear > 0)$getDate.setYear($getDate.getFullYear()+$setDateYear);
                    $setDateTxt = autoDateFormet(timeString($getDate).substr(0,8));
                    $last.val($setDateTxt);
                }
            }else{	//뒷달력 날짜 선택 시
                if(className == '.i_datepicker')$first.datepicker('option','maxDate',dateVal);
                if(!!$range){
                    $getDate.setDate($getDateDay-$setDateDay+1);
                    if($setDateMonth > 0)$getDate.setDate($getDate.getDate()-($setDateMonth*30));
                    if($setDateYear > 0)$getDate.setYear($getDate.getFullYear()-$setDateYear);
                    $setDateTxt = autoDateFormet(timeString($getDate).substr(0,8));
                    $first.val($setDateTxt);
                }
            }
        }
    },
    file:function(){
        //input[type=file](개발에서 사용안함)
        $(document).on('click','.ui_inp_file input[type=file]',function(){
            var $wrap = $(this).closest('.form_item').find('.file_item_wrap');
            if($wrap.find('.file_item').length >= 10){
                alert('10개까지만 첨부가능합니다.');
                return false;
            }
        });
        $(document).on('change','.ui_inp_file input[type=file]',function(){
            var isChk = false,
                $val = $(this).val(),
                $clone = $(this).clone();
            if($val == '')return false;
            var $filName = $val.split('\\').pop(),
                $wrap = $(this).closest('.form_item').find('.file_item_wrap'),
                $item = '';

            $wrap.find('.file_item').each(function(){
                var $thisVal = $(this).find('input').val();
                if($val == $thisVal)isChk = true;
            });
            $(this).val('');
            if(isChk == true){
                alert('이미 첨부된 파일입니다.');
            }else{
                $item += '<div class="file_item">';
                $item += '<strong>'+$filName+'</strong>';
                $item += '<a href="#" class="item_del" role="button"><span class="offscreen">파일 삭제</span></a>';
                $item += '</div>';

                $wrap.append($item);
                $wrap.find('.file_item').last().prepend($clone);
                $wrap.find('input[type=file]').addClass('offscreen').attr({
                    'aria-hidden':true,
                    'tabindex':-1
                });
                $wrap.find('.file_item').each(function(e){
                    $(this).find('input[type=file]').attr({
                        'id':'uploadFile'+e,
                        'name':'uploadFile'+e
                    });
                });
            }
        });
        $(document).on('click','.file_item_wrap .item_del',function(){
            $(this).closest('.file_item').remove();
        });

        /* 이미지 드래그앤드랍 */
        if(!$('html').hasClass('ie9')){
            $('.ui_img_upload').on({
                'dragover':function(e){
                    e.preventDefault();
                },
                'dragenter':function(e){
                    e.preventDefault();
                },
                'drop':function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var file = e.originalEvent.dataTransfer.files[0];
                    var reader = new FileReader();
                    reader.onload = function(e){
                        var src= e.target.result;
                        $this.find('label').html('').append('<img src="'+src+'" alt="'+file.name+'">');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        $('.ui_img_upload input[type=file]').on('change',function(e){
            var $target = $(this).siblings('label');
            if(window.FileReader){
                var $file = $(this)[0].files[0]
                if(!$file.type.match(/image\//)) return;
                var reader = new FileReader();
                reader.onload = function(e){
                    var src= e.target.result;
                    $target.html('').append('<img src="'+src+'" alt="'+$file.name+'">');
                };

                reader.readAsDataURL($file);
            }else{
                $(this)[0].select();
                $(this)[0].blur();
                var imgSrc = document.selection.createRange().text;
                $target.html('').append('<img>');
                var img = $target.find('img');
                img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale', src=\""+imgSrc+"\")";
                // if($target.find('img').width() <= $target.find('img').height()){
                // 	$target.find('img').css('height','100%');
                // }else if($target.find('img').width() > $target.find('img').height()){
                // 	$target.find('img').css('width','100%');
                // }
            }
        });
    },
    etc:function(){
        //계좌 직접입력
        $(document).on('click','.form_item .bank_wrap .btn_inp_change',function(){
            var $closest = $(this).closest('.bank_wrap'),
                $lbl = $closest.closest('.form_item').children('label'),
                $selectId = $closest.siblings('.bank_wrap').find('select').attr('id');

            $closest.hide().siblings('.bank_wrap').show().find(':focusable').first().focus();
            $lbl.attr('for',$selectId);
        });

        //이메일 직접입력
        $(document).on('change', '.email_form .email_sel select', function(){
            var $closest = $(this).closest('.email_form'),
                $inp = $closest.find('.email_inp .i_txt');
            if($(this).find(':selected').text() == '직접입력'){
                $closest.emailFormEdit();
                $inp.val('').focus();
                /*if(isMobile.iOS()){
					if(typeof LayerPop == 'undefined'){
						Dialog.prompt('이메일 계정주소를 직접입력해주세요.<br>예) naver.com, gmail.com',function(e){
							if(e)$inp.val($('#prompt_inp').val()).keyup();
						});
					}else{
						LayerPop.prompt('이메일 계정주소를 직접입력해주세요.<br>예) naver.com, gmail.com','직접입력',function(e){
							if(e)$inp.val($('#prompt_inp').val()).keyup();
						});

					}
				}*/
            }else{
                $closest.emailFormEdit(false);
            }
        });
        $(document).on('click', '.email_form .email_inp .btn_sel', function(){
            var $closest = $(this).closest('.email_form'),
                $emlSel = $closest.find('.email_sel select');
            $closest.emailFormEdit(false);
            $emlSel.find('option').eq(0).prop('selected',true);
            $emlSel.change().focus();
        });
        $(document).on('keyup', '.email_form .email_inp .i_txt', function(e){
            var $keyCode = (e.keyCode?e.keyCode:e.which),
                $closest = $(this).closest('.email_form'),
                $emlSel = $closest.find('.email_sel select'),
                $val = $(this).val();
            if($keyCode == 38 || ($keyCode == 37 && $val == '')){
                $emlSel.find(':selected').prev().prop('selected',true);
                $closest.emailFormEdit(false);
            }
        });

        //버튼 스위치
        var $swichBtn = $('.btn_switch input');
        $swichBtn.each(function(){
            var $txt = $(this).next('label').find('.offscreen').text();
            if($(this).prop('checked')){
                $txt = $txt.replace('해제','등록');
                $(this).next('label').find('.offscreen').text($txt);
            }else{
                $txt = $txt.replace('등록','해제');
                $(this).next('label').find('.offscreen').text($txt);
            }
        });
        $swichBtn.on('change',function(){
            var $txt = $(this).next('label').find('.offscreen').text();
            if($(this).prop('checked')){
                $txt = $txt.replace('해제','등록');
                $(this).next('label').find('.offscreen').text($txt);
            }else{
                $txt = $txt.replace('등록','해제');
                $(this).next('label').find('.offscreen').text($txt);
            }
        });
    },
    focusChk:function(elements){
        var $inpEls= $(elements),
            $top = null,
            $height = null,
            $wrap = null,
            $wrapH = null,
            $scrollTop = null,
            $fixedH = null,
            $gap = null,
            $orginalSize = $(window).width() + $(window).height();
        $inpEls.off('focusin.myFocusChk focusout.myFocusChk').on('focusin.myFocusChk', function(e){
            var $this = $(this);
            $('html').addClass('inp_focus');

            if(isAppChk('android') || $('html').hasClass('android')){ //안드로이드앱 or html.android 체크
                $(window).off('resize.myResizeChk').on('resize.myResizeChk', function(){
                    if($(window).width() + $(window).height() != $orginalSize){//사이즈가 변경됐다면(키보드가 올라왔을 경우)
                        $top = $this.offsetParent().offset().top;
                        $height = $this.outerHeight();
                        $wrap = $(window);
                        $wrapH = $wrap.height();
                        $scrollTop = $wrap.scrollTop();
                        $fixedH = 60;
                        if($this.closest('.dialog_content').length){
                            $fixedH = 110;
                            $wrap = $this.closest('.dialog_content');
                            $scrollTop = $wrap.scrollTop();
                            $top = $top+$scrollTop;
                        }
                        $gap = ($top+$height-$scrollTop)-($wrapH-$fixedH);
                        if($gap > 0){
                            $wrap.animate({ 'scrollTop': $scrollTop+$gap+20 },100);
                        }
                    }
                });
            }
        }).on('focusout.myFocusChk', function(){
            $('html').removeClass('inp_focus');
            $top = null;
            $height = null;
            $wrap = null;
            $wrapH = null;
            $scrollTop = null;
            $fixedH = null;
            $gap = null;
        });
    },
    init:function(){
        agreeItemUI();
        inputTextCount();

        formUI.select();
        formUI.input();
        formUI.inputTime();
        formUI.checkbox();
        formUI.textarea();
        formUI.invalid();
        formUI.search();
        formUI.range();
        //formUI.mkCalendar('.datepicker');
        formUI.calendar('.i_datepicker');
        //formUI.file();
        formUI.etc();

        var $focusEl = 'input:not(:checkbox):not(:radio):not(:hidden),select, textarea';
        formUI.focusChk($focusEl);
    }
}
$.fn.emailFormEdit = function(val){
    var $this = $(this);
    if(val ==  false){
        $this.find('.email_inp').hide();
        $this.find('.email_sel').show();
    }else{
        $this.find('.email_sel').hide();
        $this.find('.email_inp').show();
    }
};

//검색어 강조표시
$.fn.highlightTxt = function(keyword){
    return this.each(function(){
        var $firstHtml = $(this).data('html'),
            $html = $(this).html();
        if(!$firstHtml){
            $firstHtml = $(this).html();
            $(this).data('html',$html);
        }
        if(keyword != ''){
            if($firstHtml.indexOf(keyword) >= 0){
                $html = $firstHtml.split(keyword).join('<em class="bg_keyword">'+keyword+'</em>');
            }else{
                $html = $firstHtml;
            }
        }else{
            $html = $firstHtml;
        }
        $(this).html($html);
    });
};

//입력 텍스트 카운팅(사용안함)
var inputTextCount = function(){
    $(document).on('keyup','[data-word-count]',function(){
        var $this = $(this),
            $val = $this.val(),
            $max = $this.attr('maxlength'),
            $length = $val.length,
            $target = $this.data('word-count');
        if($target == 'next'){
            $target = $this.next('.byte').find('strong');
        }else{
            $target = $('#'+$target);
        }

        $target.text(Math.min($max,$length));
    });
};

//이용약관 UI
var agreeItemUI = function(){
    var $agreeChk = '.agree_item>.checkbox>input';
    var $agreeTitChk = '.agree_tit .checkbox>input';

    //접근성으로 포커스안가게 처리
    $($agreeChk+','+$agreeTitChk).each(function(){
        if($(this).siblings('.bt').length && !$(this).prop('checked')){
            $(this).attr({'tabindex':-1,'aria-hidden':true});
            $(this).siblings('.bt').attr('role','button');
        }
    });
    $(document).on('focus',$agreeChk+','+$agreeTitChk,function(){
        if($(this).siblings('.bt').length && !$(this).prop('checked')){
            $(this).attr({'tabindex':-1,'aria-hidden':true});
            $(this).siblings('.bt').focus();
        }
    });

    //agree_item:checkbox
    $(document).on('click',$agreeChk+','+$agreeTitChk,function(){
        var $btn = $(this).siblings('.bt');
        if($(this).prop('checked') && $btn.length){
            setTimeout(function(){
                if(!!$btn.attr('onclick')){
                    $btn[0].onclick();
                }
                $btn.click();
            },10);
            return false;
        }
    });
    $(document).on('change',$agreeChk,function(){
        var $closest = $(this).closest('.checkbox'),
            $list = $(this).closest('.agree_list'),
            $wrap = $(this).closest('.agree_child'),
            $wrapChk = $wrap.find('>'+$agreeChk).length,
            $wrapChked = $wrap.find('>'+$agreeChk+':checked').length,
            $wrapInp = $wrap.siblings('.checkbox').children('input'),
            $tit = $list.prev('.agree_tit');
        if($list.prev().prev('.agree_tit').length){
            $tit = $list.prev().prev('.agree_tit');
        }
        var $titInp = $tit.find('.checkbox>input');

        if($(this).prop('checked')){
            //체크할때
            if($(this).siblings('.bt').length)$(this).attr({'aria-hidden':false}).removeAttr('tabindex');
            if($closest.next('.agree_child').length){
                //1뎁스 체크박스일때
                $closest.next('.agree_child').find($agreeChk).prop('checked',true).attr({'aria-hidden':false}).removeAttr('tabindex');
            }else if($wrap.length){
                //2뎁스 체크박스일때
                if($wrapChk == $wrapChked){
                    $wrapInp.prop('checked',true);
                    if($wrapInp.siblings('.bt').length)$wrapInp.attr({'aria-hidden':false}).removeAttr('tabindex');
                }
            }

            //타이틀 체크박스 있을때
            var $chk = $list.find('>'+$agreeChk).length,
                $chked = $list.find('>'+$agreeChk+':checked').length;
            if($tit.length){
                if($chk == $chked){
                    $titInp.siblings('label').not('.lbl').changeTxt('동의','해제');
                    $titInp.prop('checked',true);
                    if($titInp.siblings('.bt').length){
                        $titInp.attr({'aria-hidden':false}).removeAttr('tabindex');
                        $titInp.siblings('.bt').attr({'tabindex':-1});
                    }
                }
            }
        }else{
            //해제할때
            if($(this).siblings('.bt').length)$(this).attr({'tabindex':-1,'aria-hidden':true});
            if($closest.next('.agree_child').length){
                //1뎁스 체크박스일때
                $closest.next('.agree_child').find($agreeChk).prop('checked',false);
            }else if($wrap.length){
                //2뎁스 체크박스일때
                $wrapInp.prop('checked',false);
                if($wrapInp.siblings('.bt').length)$wrapInp.attr({'tabindex':-1,'aria-hidden':true});
            }
            //타이틀 체크박스 있을때
            if($tit.length){
                $titInp.prop('checked',false);
                $titInp.siblings('label').not('.lbl').changeTxt('해제','동의');
                if($titInp.siblings('.bt').length){
                    $titInp.attr({'tabindex':-1,'aria-hidden':true});
                    $titInp.siblings('.bt').removeAttr('tabindex');
                }
            }
        }
    });
    $(document).on('click','.agree_item>.checkbox>.bt',function(){
        if(!$(this).hasClass('pop_all_agree')){
            isPopAllAgree = false;
        }
    });

    //isPopAllAgree 세팅
    $(document).on('change',$agreeTitChk,function(){
        var $closest = $(this).closest('.agree_tit'),
            $list = $closest.next('.agree_list');
        if($closest.next().next('.agree_list').length){
            $list = $closest.next().next('.agree_list');
        }
        if($(this).prop('checked')){
            //$(this).siblings('label').not('.lbl').changeTxt('동의','해제');
            $(this).siblings('label').changeTxt('동의','해제');
            $list.find('>'+$agreeChk).prop('checked',true).change();
        }else{
            $(this).siblings('label').changeTxt('해제','동의');
            $list.find('>'+$agreeChk).prop('checked',false).change();
        }
    });
    $(document).on('click','.pop_all_agree',function(){
        isPopAllAgree = true;
    });

    /*$(document).on('click','.rule_section .fixed_bottom_button.t1 .btn.bsr1.bc1',function(){
		var $section = $(this).closest('.rule_section');
		if($section.next('.rule_section').length){
			setTimeout(function(){
				$section.next('.rule_section').focus();
			},500)
		}
	});*/
};

//리스트 관련 UI
var listUI = {
    winLoad:function(){
        //토글실행
        toggleList('.view_chk_list','.tit a','.panel');
        toggleBtn('.ui_toggle_btn');

        //상담내역 리스트:취소버튼
        if($('.qna_list').length){
            var isQnaBtn = $('.qna_list').find('.btn');
            if(isQnaBtn.length){
                isQnaBtn.prev().find('.lb').css('padding-right',110);
            }
        }

        //client_info_item 하단 버튼 여부
        if($('.client_info_item').length){
            var clientInfoItem = $('.client_info_item').find('.btm_etc');
            if(clientInfoItem.length){
                clientInfoItem.prev('.in').addClass('t2');
            }
            var clientInfoItem2 = $('.client_info_item').find('.addr_wrap');
            if(clientInfoItem2.length){
                clientInfoItem2.parent('.in').css('padding-bottom',10);
            }
        }

        //테이블 스크롤 가이드 실행
        if($('.tbl_scroll').length){
            tblUI.guideScl('.tbl_scroll');
            tblUI.guide('.tbl_scroll');
        }
        //:CMS 테이블가이드
        if($('.biz_tbl_scroll_all').length){
            tblUI.guideScl('.biz_tbl_scroll_all');
            tblUI.guide('.biz_tbl_scroll_all');
        }
        if($('.tbl_fixed').length)tblUI.fixed();

        //테이블 rowspan
        if($('table th[rowspan]').length){
            $('table th[rowspan]').each(function(){
                var $this = $(this),
                    $idx = $this.index(),
                    $trIdx = ($this.parent().index()+1),
                    $tbody = $this.parent().parent(),
                    $rowspan = parseInt($this.attr('rowspan'));
                for(var i = $trIdx;i < ($trIdx+$rowspan-1);i++){
                    $tbody.children().eq(i).children().eq($idx).addClass('l_line');
                }
            });
        }
    },
    allChk:function(){
        //전체선택
        $('.all_chk').change(function(){
            var $closest = $(this).closest('[class*=tit_h]').next(),
                $chk = $closest.find('.item_chk');
            if($(this).is(':checked') == true){
                $(this).siblings('label').changeTxt('선택','해제');
                $chk.prop('checked',true).change();
            } else{
                $(this).siblings('label').changeTxt('해제','선택');
                $chk.prop('checked',false).change();
            }
        });
        $('.item_chk').change(function(){
            var $closest = $(this).closest('.product_list');
            if($(this).closest('.chk_wrap').length)$closest = $(this).closest('.chk_wrap');
            var $allchk = $closest.prev().find('.all_chk');
            checkBoxLength = $closest.find('.item_chk').length;
            checkedLength = $closest.find('.item_chk:checked').length;
            if(checkBoxLength == checkedLength){
                $allchk.prop('checked',true).siblings('label').changeTxt('선택','해제');
            }else{
                $allchk.prop('checked',false).siblings('label').changeTxt('해제','선택');
            }
        });
    },
    init:function(){
        listUI.allChk();
    }
};
//토글(아코디언)리스트 함수
var toggleList = function(list,btn,panel,addClass){
    if(!addClass)addClass = 'open';
    $(document).on('click',list+' '+btn,function(e){
        e.preventDefault();
        var $this = $(this),
            $li = $(this).closest('li');
        if($li.hasClass(addClass)){
            $li.find(btn).attr('aria-expanded',false).changeTxt('닫기','열기');
            $li.removeClass(addClass);
            $li.find(panel).attr('aria-hidden',true).stop(true,false).slideUp();
        }else{
            $li.find(btn).attr('aria-expanded',true).changeTxt('열기','닫기');
            $li.addClass(addClass).siblings().removeClass(addClass).find(btn).attr('aria-expanded',false).changeTxt('닫기','열기');
            $li.siblings().find(panel).attr('aria-hidden',true).stop(true,false).slideUp();
            $li.find(panel).attr('aria-hidden',false).stop(true,false).slideDown(500,function(){
                toggleScroll($this,this);
            });
        }
    });

    if($(list).length){
        $(list).each(function(e){
            $(this).each(function(f){
                var $btn = $(this).find(btn),
                    $btnId = $btn.attr('id'),
                    $panel = $(this).find(panel),
                    $pabelId = $panel.attr('id');
                if(!$btnId)$btnId = 'tglist_btn_'+e+'_'+f;
                if(!$pabelId)$pabelId = 'tglist_panel_'+e+'_'+f;
                $btn.attr({
                    'id': $btnId,
                    'role':'button',
                    'aria-expanded':false,
                    'href': '#'+$pabelId,
                    'aria-controls': $pabelId
                });
                $panel.attr({
                    'id': $pabelId,
                    'aria-hidden':'true',
                    'aria-labelledby':$btnId
                });
            });
        });
        if($(list).find('.'+addClass).length){
            $(list).find('.'+addClass).each(function(){
                $(this).find(btn).attr('aria-expanded',true).changeTxt('열기','닫기');
                $(this).find(panel).attr('aria-hidden',false).show();
            })
        }
    }
};
var toggleBtn = function(btn,className){
    if(!className)className = 'open';
    $(document).on('click',btn,function(e){
        e.preventDefault();
        var $this = $(this),
            $panel = $(this).data('target');

        if($this.hasClass(className)){
            $this.removeClass(className).attr('aria-expanded',false).find('.offscreen').changeTxt('닫기','열기');
            $($panel).attr('aria-hidden',true).stop(true,false).slideUp();
        }else{
            $this.addClass(className).attr('aria-expanded',true).find('.offscreen').changeTxt('열기','닫기');
            $($panel).attr('aria-hidden',false).stop(true,false).slideDown(500,function(){
                toggleScroll($this,this);
            });
        }
    });

    if($(btn).length){
        $(btn).each(function(e){
            var $btn = $(this),
                $btnId = $(this).attr('id'),
                $panel = $(this).data('target');
            if(!$btnId)$btnId = 'tg_btn_'+e;
            $btn.attr({
                'id': $btnId,
                'role':'button',
                'aria-expanded':false,
                'href': '#'+$panel,
                'aria-controls': $panel
            });
            $($panel).attr({
                'aria-hidden':'true',
                'aria-labelledby':$btnId
            });

            if($($panel).is(':visible') || $(this).hasClass(className)){
                $(this).addClass(className).attr('aria-expanded',true).find('.offscreen').changeTxt('열기','닫기');
                $($panel).attr('aria-hidden',false).show();
            }else{
                $(this).removeClass(className).attr('aria-expanded',false).find('.offscreen').changeTxt('닫기','열기');
                $($panel).attr('aria-hidden',true).hide();
            }
        })
    }
};

//토글 열릴때 스크롤 함수
var toggleScroll = function(btn,panel){
    var $scrollTop = $(window).scrollTop(),
        $winHeight = $(window).height();
    if($('.fixed_bottom_button').not('.t1').length)$winHeight = $winHeight - 60;
    var $winEnd = $scrollTop+$winHeight,
        $btnTop = $(btn).offset().top - 50,
        $thisTop = $(panel).offset().top,
        $thisHeight = $(panel).outerHeight(),
        $thisEnd = $thisTop+$thisHeight,
        $scroll = Math.min($btnTop,$thisEnd-$winHeight);
    if($winEnd < $thisEnd){
        $('html,body').animate({'scrollTop':$scroll},200);
    }
};

//테이블 스크롤 가이드
var tblUI = {
    guideScl: function(element){
        $(element).each(function(){
            var $this = $(this);
            $this.data('isFirst',true);
            $this.data('direction','좌우');
            $(this).on('scroll',function(){
                $this.data('isFirst',false);
                $this.find('.tbl_guide').remove();
                //$this.removeAttr('title');

                var $sclInfo = $this.next('.tbl_scroll_ifno');
                if($sclInfo.length){
                    var $sclVerticalPercent = (Math.abs($this.scrollTop()/($this.get(0).scrollHeight - $this.height())))*100;
                    var $sclHorizonPercent = (Math.abs($this.scrollLeft()/($this.get(0).scrollWidth - $this.width())))*100;
                    $sclInfo.find('.vertical').children().css('height',$sclVerticalPercent+'%');
                    $sclInfo.find('.horizon').children().css('width',$sclHorizonPercent+'%');
                }
            });
        });
    },
    guide: function(element){
        $(window).on('resize',function(){
            $(element).each(function(){
                var $this = $(this),
                    $direction = $this.data('direction'),
                    $changeDirection = '',
                    $guide = '<div class="tbl_guide" title="해당영역은 테이블을 스크롤하면 사라집니다."><div><i class="icon" aria-hidden="true"></i>테이블을 '+$direction+'로 이동하세요.</div></div>',
                    $width = $this.outerWidth(),
                    $height = $this.outerHeight(),
                    $scrollW = $this.get(0).scrollWidth,
                    $scrollH = $this.get(0).scrollHeight;
                var $sclInfoHtml = '<div class="tbl_scroll_ifno" aria-hidden="true"><div class="horizon"><div></div></div><div class="vertical"><div></div></div></div>',
                    $sclIfno = $this.next('.tbl_scroll_ifno');
                if($this.data('isFirst')){
                    if($width < $scrollW && $height < $scrollH){
                        $changeDirection = '상하좌우';
                    }else if($width < $scrollW){
                        $changeDirection = '좌우';
                    }else if($height < $scrollH){
                        $changeDirection = '상하';
                    }else{
                        $changeDirection = '';
                    }

                    if($changeDirection == ''){
                        $this.removeAttr('tabindex').find('.tbl_guide').remove();
                        $sclIfno.remove();
                        $this.removeAttr('title');
                    }else{
                        if(!$this.find('.tbl_guide').length){
                            if(isMobile.any()){
                                $this.prepend($guide); //mobile 일땐 tabindex 사용안함
                            }else{
                                $this.attr('tabindex',0).prepend($guide); //pc일땐 tabindex 사용
                            }
                        }
                        if(!$sclIfno.length){
                            $this.after($sclInfoHtml);
                            $sclIfno = $this.next('.tbl_scroll_ifno');
                        }
                        if($sclIfno.length){
                            $sclIfno.find('.vertical').css('height',$height);
                            $sclIfno.find('.vertical').show();
                            $sclIfno.find('.horizon').show();
                            if($changeDirection == '좌우'){
                                $sclIfno.find('.vertical').hide();
                            }else if($changeDirection == '상하'){
                                $sclIfno.find('.horizon').hide();
                            }
                        }

                        $this.attr('title','터치스크롤하여 숨겨진 테이블영역을 확인하세요');
                    }

                    if($direction != $changeDirection && $this.find('.tbl_guide').length){
                        $this.find('.tbl_guide').changeTxt($direction,$changeDirection);
                        $this.data('direction',$changeDirection);
                    }
                }
            });
        });
    },
    fixed: function(){
        $(window).on('resize',function(){
            $('.tbl_fixed').each(function(){
                var $this = $(this);
                if($this.find('.fixed_th').length){
                    var $th = $this.find('.tbl_scroll tr').first().children();
                    var $thWidth;
                    if($this.find('.tbl_scroll').hasClass('horizon')){
                        $thWidth = $th.first().outerWidth();
                        $this.find('.fixed_th').addClass('bdbw0').css('width',$thWidth);
                    }else{
                        $this.find('.fixed_th').css('width','100%');
                        $th.each(function(){
                            var $thIdx = $(this).index();
                            $thWidth = $(this).width();
                            $this.find('.fixed_th tr').first().children().eq($thIdx).css('width',$thWidth);
                        });
                    }
                }
            });
            var $trIdx = 0;
            $('.tbl_fixed .tbl_scroll tr').each(function(){
                var $height = $(this).children().first().outerHeight();
                if($(this).children().first().is('th') && $(this).closest('.tbl_fixed').find('.fixed_th').length){
                    $(this).closest('.tbl_fixed').find('.fixed_th').find('tr').eq($trIdx).children().css('height',$height);
                    $trIdx++;
                }
            });
        });
    }
};

//slick 실행(원래 slick으로 만들었다 UI이슈로 일부 swiper로 변경)
var $uiSwipers = [];
var $stepSwipe;
var slickUI = {
    step: function(){
        //스텝
        if ($('.step_swipe').length > 0){
            $('#floatingNav').addClass('hide');

            //step_section 최소높이값설정
            var minHeight = $(window).height()-$('.step_swipe').offset().top;
            if(minHeight > 0){
                $('.step_section').css('min-height',minHeight-120);
            }

            //slick 실행
            $stepSwipe = $('.step_swipe').slick({
                accessibility: false,
                adaptiveHeight: true,
                arrows: false,
                swipe: false,
                useTransform: false,
                infinite: false,
                waitForAnimate: false
            });

            //swipe시 상단으로 이동
            $stepSwipe.on('beforeChange',function(event,slick,currentSlide,nextSlide){
                $(window).scrollTop(0);
            });

            $stepSwipe.on('afterChange',function(event, slick, currentSlide){
                var i = (currentSlide ? currentSlide : 0),
                    $activeSlide = slick.$slides[i];

                //focus
                if($('.step_swipe').find('.slick-slide').not('.slick-active').find(':focus').length){
                    $('.step_swipe').find('.slick-active').focus();
                }

                //이용약관 tabindex 처리
                var $agreeChk = $($activeSlide).find('.agree_item>.checkbox>input');
                if($agreeChk.length){
                    setTimeout(function(){
                        $agreeChk.each(function(){
                            if($(this).siblings('.bt').length && !$(this).prop('checked')){
                                $(this).attr({'tabindex':-1,'aria-hidden':true});
                            }
                        });
                    },10);
                }

                //step안에 fixed 버튼여부 확인
                var $fixedBtn = $($activeSlide).find('.fixed_bottom_button');
                if($fixedBtn.length && $fixedBtn.is(':visible')){
                    $('#footer').addClass('add_fixed_btn');
                    if($('.floating_btn').length && $('.floating_btn').is(':visible'))$('.floating_btn').addClass('is_fixed_btn');
                }else{
                    $('#footer').removeClass('add_fixed_btn');
                    if($('.floating_btn').length)$('.floating_btn').removeClass('is_fixed_btn');
                }

                //달력 재실행
                // var $mk_datepicker = $($activeSlide).find('.datepicker');
                // if($mk_datepicker.length > 0 && !$mk_datepicker.next().hasClass('mk-datepicker')){
                // 	formUI.mkCalendar($mk_datepicker);
                // }
                var $jq_datepicker = $($activeSlide).find('.i_datepicker');
                if($jq_datepicker.length > 0 && !$jq_datepicker.hasClass('hasDatepicker')){
                    formUI.calendar($jq_datepicker);
                }

                var $focusEl = $($activeSlide).find('input:not(:checkbox):not(:radio):not(:hidden),select, textarea');
                if($focusEl.length){
                    formUI.focusChk($focusEl);
                }
            });
        }
    },
    rule: function(){
        //약관
        if ($('.rule_swipe').length > 0){
            $('.rule_section>.section').addClass('terms_section');
            $('.rule_swipe').each(function(){
                var $this = $(this),
                    $page = $this.closest('.dialog').find('.slick_page'),
                    $title = $this.closest('.dialog').find('.slick_title'),
                    $length = $this.find('.rule_section').length;
                if($length > 1){
                    $this.slick({
                        adaptiveHeight: true,
                        arrows: true,
                        swipe: false,
                        useTransform: false,
                        waitForAnimate: false,
                        prevArrow:'<button type="button" class="prev slick-prev"><span class="offscreen">이전 약관내용</span></button>',
                        nextArrow:'<button type="button" class="next slick-next"><span class="offscreen">다음 약관내용</span></button>'
                    });

                    if($page.length)$page.text('(1/'+$length+')');
                    var $dataTit = '';
                    if($title.length){
                        $dataTit = $this.find('.rule_section.slick-active').data('title');
                        if($dataTit == undefined)$dataTit = '약관확인'
                    }
                    $title.text($dataTit);

                    $this.on('afterChange',function(event, slick){
                        var i = (slick.currentSlide ? slick.currentSlide : 0)+1;
                        if($page.length)$page.text('('+i+'/'+slick.slideCount+')');
                        if($title.length){
                            $dataTit = $this.find('.rule_section.slick-active').data('title');
                            if($dataTit == undefined)$dataTit = '약관확인'
                        }
                        $title.text($dataTit);

                        //focus
                        if($this.find('.slick-slide').not('.slick-active').find(':focus').length){
                            $this.find('.slick-active').focus();
                        }
                    });
                    $this.on('beforeChange',function(){
                        //$(this).find('.rule_section').animate({'scrollTop':0},300);
                        $(this).find('.rule_section').scrollTop(0);
                    });
                }else{
                    $this.find('.rule_section').addClass('slick-active');
                }
            });

            /*$(window).resize(function(){
				$('.rule_section').each(function(){
					$(this).removeCss('height');
					var minHeight = $(this).closest('.dialog_content').height() - 110;
					$(this).css('height',minHeight);
				});
			});*/
        }
    },
    img: function(){
        if ($('.img_slick').length > 0){
            $('.img_slick').each(function(){
                var $this = $(this),
                    $page = $this.closest('.dialog').find('.slick_page'),
                    $length = $this.find('.thumb_box').length;
                $this.slick({
                    adaptiveHeight: true,
                    arrows: true,
                    swipe: false,
                    infinite: false,
                    useTransform: false,
                    waitForAnimate: false,
                    prevArrow:'<button type="button" class="prev slick-prev"><span class="offscreen">이전 이미지</span></button>',
                    nextArrow:'<button type="button" class="next slick-next"><span class="offscreen">다음 이미지</span></button>'
                });

                $page.text('(1/'+$length+')');
                $this.on('afterChange',function(event, slick){
                    var i = (slick.currentSlide ? slick.currentSlide : 0)+1;
                    $page.text('('+i+'/'+slick.slideCount+')');

                    //focus
                    if($this.find('.slick-slide').not('.slick-active').find(':focus').length){
                        $this.find('.slick-active').focus();
                    }
                });
            });
        }
    },
    item: function(){
        //일반 slick
        if ($('.ui_slick').length > 0){
            $('.ui_slick').each(function(){
                var $this = $(this);
                var $swipeIdx = $uiSwipers.length+1;
                if($this.closest('.company_main_interview').length){
                    $this.addClass('is_slick');
                }
                if($this.children().length == 1){
                    $this.closest('.ui_slick_wrap').addClass('only');
                }else if($this.children().length > 1){
                    $this.closest('.ui_slick_wrap').removeClass('only');
                    if(!$this.hasClass('is_slick')){
                        //swipe
                        if(!$this.hasClass('swiper-container-initialized')){
                            $this.children('.item').addClass('swiper-slide');
                            $this.wrapInner('<div class="swiper-wrapper"></div>');
                            $this.addClass('swipe-container').append('<div class="swiper-pagination"></div>');
                            var $activeClass = '.swiper-slide-active';
                            if($(window).width() >= 760)$activeClass = '.swiper-slide-active, .swiper-slide-next';
                            if($this.closest('.section_box_in').length && $this.closest('.section_box_in').prev('.loading_dimmed').length)$activeClass = '';
                            var $option = {
                                slidesPerView: 'auto',
                                slideClass:'item',
                                resizeReInit:true,
                                pagination:{
                                    el: '.swiper-pagination',
                                    clickable:true,
                                    renderBullet:function(index, className) {
                                        return '<button type="button" class="'+className+'">'+(index+1)+'번째 슬라이드</button>';
                                    }
                                },
                                on:{
                                    init:function(){
                                        setTimeout(function(){
                                            if($swiper.pagination.bullets.length == 1 && $swiper.slides.length == 2){
                                                $this.closest('.ui_slick_wrap').addClass('double');
                                            }else{
                                                $this.closest('.ui_slick_wrap').removeClass('double');
                                            }

                                            focusAria();
                                        },10)
                                    },
                                    resize:function(){
                                        if($swiper.pagination.bullets.length == 1 && $swiper.slides.length == 2){
                                            $this.closest('.ui_slick_wrap').addClass('double');
                                        }else{
                                            $this.closest('.ui_slick_wrap').removeClass('double');
                                            $swiper.slideTo(0);
                                        }

                                        if($(window).width() >= 760){
                                            $activeClass = '.swiper-slide-active, .swiper-slide-next';
                                        }else{
                                            $activeClass = '.swiper-slide-active';
                                        }
                                        if($this.closest('.section_box_in').length && $this.closest('.section_box_in').prev('.loading_dimmed').length)$activeClass = '';
                                        focusAria();
                                    },
                                    transitionEnd:function(e){
                                        focusAria();
                                    }
                                }
                            };

                            $this.data('idx',$swipeIdx);
                            var $swiper = new Swiper($this,$option);
                            $uiSwipers.push($swiper);

                            //focus 제어
                            function focusAria(){
                                if($activeClass != '')$this.find($activeClass).removeAttr('aria-hidden').find(':focusable').removeAttr('tabindex');
                                $this.find('.swiper-slide').not($activeClass).attr('aria-hidden','true').find(':focusable').attr('tabindex',-1);
                            }
                        }
                    }else{
                        //slick
                        if(!$(this).hasClass('slick-initialized')){
                            $this.slick({
                                dots: true,
                                adaptiveHeight: true,
                                arrows: false,
                                infinite: false,
                                slidesToShow: 2,
                                responsive:[{
                                    breakpoint: 760,
                                    settings:{
                                        slidesToShow: 1
                                    }
                                }],
                                customPaging: function(slider, i) {
                                    return '<button type="button">'+(i+1)+'번째 슬라이드</button>';
                                }
                            });
                        }
                        $this.on('afterChange',function(event, slick){
                            var $scrollTop = $(window).scrollTop(),
                                $headH = $('#header').height(),
                                $offsetTop = $this.offset().top - 10;
                            if($this.hasClass('scroll_top') && $this.closest('dialog').length == 0){
                                if($scrollTop>$offsetTop){
                                    //$(window).scrollTop($offsetTop-$headH);
                                    $('html,body').stop(true,false).animate({'scrollTop':$offsetTop-$headH},200);
                                }
                            }

                            //focus
                            if($this.find('.slick-slide').not('.slick-active').find(':focus').length){
                                $this.find('.slick-active').focus();
                            }
                        });
                    }
                }
            });
        }

        if ($('.ben_service_box.same_h').length > 0){
            $('.ben_service_box.same_h').sameHeight('.inner');
        }
    },
    info: function(){
        //이용가이드
        if ($('.guide_info_swipe').length > 0){
            $('.guide_info_swipe').slick({
                dots: true,
                //adaptiveHeight: true,
                arrows: false,
                infinite: false,
                customPaging: function(slider, i) {
                    return '<button type="button">'+(i+1)+'번째 슬라이드</button>';
                }
            });
            $('.guide_info_swipe').on('beforeChange',function(event,slick,currentSlide,nextSlide){
                var i = nextSlide;
                $(this).siblings('.guide_info_img').find('.img').eq(i).addClass('on').siblings().removeClass('on');
            });
        }
    },
    etc: function(){
        //고객정보
        if ($('.client_info_swipe').length > 0){
            $('.client_info_swipe').each(function(){
                var $this = $(this),
                    $itemLength = $this.find('.client_info_item').length;
                if($this.find('.in').length)$(this).sameHeight('.in');
                if($itemLength == 1){
                    $this.addClass('only');
                }else if($itemLength > 1){
                    $this.removeClass('only');
                    // $this.slick({
                    // 	dots: true,
                    // 	adaptiveHeight: true,
                    // 	arrows: false,
                    // 	variableWidth: true,
                    // 	infinite: false,
                    // 	customPaging: function(slider, i) {
                    // 		return '<button type="button">'+(i+1)+'번째 슬라이드</button>';
                    // 	}
                    // });
                    if(!$this.hasClass('swiper-container-initialized')){
                        $this.find('.client_info_item').addClass('swiper-slide');
                        $this.wrapInner('<div class="swiper-wrapper"></div>');
                        $this.addClass('swipe-container').append('<div class="swiper-pagination"></div>');
                        var $clientInfoSwipe = new Swiper($this,{
                            slidesPerView: 'auto',
                            slideClass:'client_info_item',
                            resizeReInit:true,
                            pagination:{
                                el: '.swiper-pagination',
                                clickable:true,
                                renderBullet:function(index, className) {
                                    return '<button type="button" class="'+className+'">'+(index+1)+'번째 슬라이드</button>';
                                }
                            },
                            on:{
                                init:function(){
                                    setTimeout(function(){
                                        var $length = $clientInfoSwipe.pagination.bullets.length;
                                        focusAria($clientInfoSwipe.snapIndex,$itemLength-$length);
                                    },10)
                                },
                                resize:function(){
                                    var $length = $clientInfoSwipe.pagination.bullets.length;
                                    focusAria($clientInfoSwipe.snapIndex,$itemLength-$length);
                                },
                                transitionEnd:function(){
                                    var $length = $clientInfoSwipe.pagination.bullets.length;
                                    focusAria($clientInfoSwipe.snapIndex,$itemLength-$length);
                                }
                            }
                        });

                        //focus 제어
                        function focusAria(first,last){
                            $this.find('.swiper-slide').attr('aria-hidden','true').find(':focusable').attr('tabindex',-1);
                            $this.find('.swiper-slide').slice(first,first+last+1).removeAttr('aria-hidden').find(':focusable').removeAttr('tabindex');
                        }
                    }
                }
            });
        }
    },
    init:function(){
        slickUI.step();
        slickUI.rule();
        slickUI.img();
        slickUI.item();
        slickUI.info();
        slickUI.etc();
    }
}

//오늘하루그만보기 팝업(개발에서 안씀)
var todayPop ={
    Arry : [],
    Name : 'todayPopChk',
    Path : location.pathname.split('/').pop().split('.').shift(),
    open : function(target,isRemove){
        var $target=$(target),
            $targetId=$target.attr('id'),
            $chkwrap=$target.find('.today_chk'),
            $chekbox=$chkwrap.find('input'),
            //$key=todayPop.Name+'-'+todayPop.Path+'-'+$targetId,
            $key=todayPop.Name+'-'+$targetId,
            $saveDate=parseInt(localStorage.getItem($key));

        if(isRemove == null)isRemove = true;
        todayPop.Arry.push($targetId);
        $chekbox.data('key',$key).attr('id',$targetId+'_chk').siblings('label').attr('for',$targetId+'_chk');

        if($nowDateDay <= $saveDate){
            if(isRemove){
                $target.remove();
            }else{
                $chkwrap.remove();
            }
        }else{
            Dialog.open($target);
            if(!!$saveDate)localStorage.removeItem($key);
        }

        //닫기
        $(target).on('click','.ui_dialog_close',function(e){
            todayPop.close(target,isRemove);
        });
    },
    close: function(target,isRemove){
        var $target=$(target),
            $chkwrap=$target.find('.today_chk'),
            $chekbox=$chkwrap.find('input'),
            $key = $chekbox.data('key'),
            $today = new Date(),
            $year=$today.getFullYear(),
            $month=$today.getMonth()+1,
            $day=$today.getDay();
        if(isRemove == null)isRemove = true;
        if((''+$month).length==1)$month="0"+$month;
        var $lastDay = (new Date($year,$month,0).getDate());
        if($chekbox.prop('checked')){
            var _val=$chekbox.val();
            switch(_val){
                case 'day':
                    localStorage.setItem($key,$nowDateDay);
                    break;
                case 'week':
                    localStorage.setItem($key,$afterDateDay(8-$day));
                    break;
                case 'month':
                    localstorage.setItem($key,''+$year+$month+$lastDay) ;
                    break;
                case 'naver':
                    localStorage.setItem($key,'99999999');
                    break;
                default:
                    if(parseInt(_val)>0){
                        localstorage.setItem($key,$afterDateDay(_val));
                    }
                    break;
            }

            setTimeout(function(){
                if(isRemove){
                    $target.remove();
                }else{
                    $chkwrap.remove();
                }
            },Dialog.speed+Dialog.delay+10);
        }
        setTimeout(function(){
            if($(target).hasClass('show'))Dialog.close(target);
        },10);
    },
    init : function(){
        $('.today.dialog').each(function(i){
            todayPop.open(this);
        });
    }
};

/**
 * escapeRegex(escape 처리)
 *
 * @param value( escape 처리할 문자열 )
 *
 * @return escape 처리된 문자열
 *
 * @Author : 검색엔진 담당 최윤기 과장
 * @CreateDate : 2020.01.02
 *
 **/
function escapeRegex( value ) {
    // escape regular expression's reserved character, remove white spaces and insert ignore white spaces pattern for each characters
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&").replace(/\s/g, "").replace(/[^\\]{1}/g, "$&\\s*");
}

/**
 * akc_highlight(Search Panel Layer 하이라이팅 처리)
 *
 * @param opt( 자동완성 기능 옵션 값 )
 * @param value( 하이라이팅 처리 전 값 )
 * @param seed( 입력된 키워드 )
 *
 * @return 하이라이팅 태그 추가된 값
 *
 * @Author : 검색엔진 담당 최윤기 과장
 * @CreateDate : 2020.01.02
 *
 **/
function akc_highlight( opt, value, seed ) {
    //var that = this;
    var re;
    if ( opt === 's' ) re = new RegExp( "^" + escapeRegex( seed ), "i" ); // starts with
    else if ( opt === 'c' ) re = new RegExp( "\\s+" + escapeRegex( seed ), "i" ); // contains
    else if ( opt === 'e' ) re = new RegExp( escapeRegex( seed ) + "$", "i" ); // ends wuth
    else if ( opt === 't' ) re = new RegExp($.map(seed.match(/\S+/g), function( n, i ) { return escapeRegex( n ); }).join("|"), "ig");
    else re = new RegExp( escapeRegex( seed ), "ig" );
    return value.replace( re, "<strong class=\"t_keyword\">$&</strong>" );
}

//통합검색(개발자 소스 포함)
var totalSearchUI = function(){
    /**
     * Dialog 영역 초기화 시 인기검색어 조회
     * 인기검색어 사전 호출 (인기검색어 사전 도메인번호 0번 / module=rankings, domain_no=0)
     *
     * @Author : 검색엔진 담당 최윤기 과장
     * @CreateDate : 2020.01.07
     **/
    if($('.search_tag_wrap').length){
        $.ajax({
            type: "POST",
            url: "/konanAjaxSearch2.do?",
            dataType: "json",
            data: "module=rankings&domain_no=0&max_count=10",
            success: function(data){
                var ppk_html = "";
                if(data != null) {
                    $.each(data, function(index, item){
                        var kwd = item.toString().split(',');
                        ppk_html += "<a href=\"javascript:dftSchKwd('" + kwd[0] + "');\">" + kwd[0] + "</a>";
                    });
                }
                if(ppk_html.length > 0) {
                    $(ppk_html).appendTo("#mo_ppk > .cont");
                }
            }, error : function(request, status, error) {
                if(typeof url == 'undefined') return;
                //alert("code:" + request.status + "\n" + "url:" + url + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                LayerPop.alert("code:" + request.status + "<br>" + "url:" + url + "<br>" + "message:" + request.responseText + "<br>" + "error:" + error);
            }
        });
    }

    var $wrap = $('.total_search'),
        $searchWrap = '.search_list_wrap',
        $contClass = '.search_list_cont',
        $inpClass = '.search_box .i_txt',
        $closeClass = '.btn_search_list_close';

    var listShow = function(target){
        var $val = $(target).val(),
            $target = '';
        if($val == ''){
            $target = $($contClass+'.recent');
        }else{
            $target = $($contClass+'.auto');
        }

        if($target != ''){
            $($contClass).hide();
            $target.show();
        }
    }

//	$($searchWrap).find($inpClass).focus(function(){
//		listShow(this);
//	}).keyup(function(){
//		listShow(this);
//	});

    // listShow 조건용 이벤트 변경
    $($searchWrap).find($inpClass).on('keyup focus',function(e){

        /**
         * 기존 이벤트 처리 부분에 검색엔진 자동완성 기능 ajax 함수 추가
         * @Author : 검색엔진 담당 최윤기 과장
         * @CreateDate : 2020.01.07
         **/
            // 사용할 변수 선언
        var keyword = $(this).val();
        var akc_list_0 = "";
        var akc_list_1 = "";
        var akc_opt = "t";
        var temp_akc = "";
        var temp_hilight =  "";
        var temp_url =  "";
        var lower_temp_str = "";
        var i = 0;
        $(".search_list_cont").hide();

        // 입력된 값이 있을 때에만 실행
        if(keyword.length > 0) {
            // 메뉴이동 자동완성 사전 호출 (자동완성 사전 도메인번호 0번 / module=suggest, domain_no=0)
            $.ajax({
                type: "POST",
                url: "/konanAjaxSearch2.do?",
                dataType: "json",
                data: "module=suggest&term=" + keyword + "&mode="+ akc_opt +"&domain_no=0&target=complete&max_count=5",
                success: function(data){
                    if(data.suggestions != null) {
                        $.each(data["suggestions"][0], function(){
                            temp_akc = this.toString();
                            temp_akc = temp_akc.split(',');
                            temp_hilight = temp_akc[0];
                            temp_url = temp_akc[1];

                            // 추천질문
                            if(temp_akc.length == 2) {
                                temp_hilight = "<a href=\"" + temp_url + "\" class=\"link\" target=\"_blank\" title=\"검색어 선택\">" + akc_highlight(akc_opt, temp_hilight, keyword) + "</a>";

                                akc_list_0 += "<li id=\"akc" + i + "\">";
                                akc_list_0 += temp_hilight;
                                akc_list_0 += "</li>";
                                i++;
                                // 기본 자동완성
                            } else {
                                var word = this.toString();
                                temp_hilight = "<a href=\"javascript:dftSchKwd('" + word + "');\" class=\"link\" title=\"검색어 선택\">" + akc_highlight(akc_opt, temp_hilight, keyword) + "</a>";

                                akc_list_1 += "<li id=\"akc" + i + "\">";
                                akc_list_1 += temp_hilight;
                                akc_list_1 += "</li>";
                                i++;
                            }
                        });
                    }

                    $("#akc_list").empty().addClass('off');
                    if(akc_list_0 != '')$("#akc_list").removeClass('off');
                    $(akc_list_0).appendTo("#akc_list");
                    if(akc_list_1 != '')$("#akc_list").removeClass('off')
                    $(akc_list_1).appendTo("#akc_list");
                }, error : function(request, status, error) {
                    if(typeof url == 'undefined') return;
                    //alert("code:" + request.status + "\n" + "url:" + url + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                    LayerPop.alert("code:" + request.status + "\n" + "url:" + url + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });

            listShow(this);
        }
    });

    $($searchWrap).find($closeClass).on('click',function(e){
        $($contClass).hide();
    });

    // $wrap.on('touchstart',function(e){
    // 	$($contClass).hide();
    // }).on('touchstart',$searchWrap,function(e){
    // 	e.stopPropagation();
    // });
    $wrap.on('touchmove',function(e){
        $wrap.find($inpClass).blur();
    }).on('touchmove','.search_box',function(e){
        e.stopPropagation();
    });

    $(document).on('click',function(e){
        $($contClass).hide();
    }).on('touchend',function(e){
        $($contClass).hide();
        $($searchWrap+' input').blur();
    }).on('click',$searchWrap,function(e){
        e.stopPropagation();
    }).on('focus',$searchWrap+' input',function(e){
        e.stopPropagation();
    });
    $(document).on('blur',$contClass+' .link',function(e){
        if($(this).closest('li').is(':last-child') && (!$(this).closest('ul').next().length || $(this).closest('ul').next().hasClass('off'))){
            $(this).closest($contClass).hide();
        }
    });

    $('.btn_main_search').click(function(e){
        e.preventDefault();
        Dialog.open($wrap);
    });
};

//스크린안에 있는지 확인
var isScreenIn = function(target){
    var $window = $(window);
    $wHeight = $window.height(),
        $scrollTop = $window.scrollTop(),
        $winBottom = ($scrollTop + $wHeight);
    var $el = $(target),
        $elHeight = $($el).outerHeight(),
        $elTop = $($el).offset().top,
        $elCenter = $elTop + ($elHeight/2),
        $elBottom = $elTop + $elHeight;

    if(($elCenter >= $scrollTop) && ($elCenter <= $winBottom)){
        return true;
    }else{
        return false;
    }
}

//ie에서 startsWith,endsWith 작동되게
if(isPC.msie()){
    String.prototype.startsWith = function(str){
        if(this.length < str.length) return false;
        return this.indexOf(str) == 0;
    }
    String.prototype.endsWith = function(str){
        if(this.length < str.length) return false;
        return this.lastIndexOf(str) + str.length == this.length;
    }
}

/*** 애니메이션 ***/
//data-animation
var scrollItem ={
    checkInView: function(target){
        var $window = $(window);
        $wHeight = $window.height(),
            $scrollTop = $window.scrollTop(),
            $winBottom = ($scrollTop + $wHeight);

        $.each(target, function(){
            var $el = $(this),
                $elHeight = $($el).outerHeight(),
                //$elTop = $($el).offset().top,
                $elTop = $($el).offset().top + 50,
                //$elCenter = $elTop + ($elHeight/2),
                $elCenter = $elTop + ($elHeight/5),
                //$elBottom = $elTop + $elHeight,
                //$elBottom = $elTop + ($elHeight/5)*4,
                $elBottom = $elTop + $elHeight - 50,
                $animationClass = $el.data('animation'),
                $delay = $el.data('delay'),
                $duration = $el.data('duration'),
                $animationIn = $el.data('animation-in'),
                $addClassAry = ['on','active'];

            if(!$el.hasClass('animated') && $addClassAry.indexOf($animationClass) == -1){
                if($delay>0){
                    $el.css({
                        '-webkit-animation-delay':$delay+'ms',
                        'animation-delay':$delay+'ms'
                    });
                }
                if($duration>0){
                    $el.css({
                        '-webkit-animation-duration':$duration+'ms',
                        'animation-duration':$duration+'ms'
                    });
                }
                $el.addClass('animated paused '+$animationClass);
            }

            if($animationIn){
                if(($elTop >= ($scrollTop - ($wHeight/2))) && ($elBottom <= ($winBottom + ($wHeight/2)))){
                    if($el.hasClass('animated')){
                        $el.addClass('paused '+$animationClass);
                    }
                }else{
                    if($el.hasClass('animated')){
                        $el.removeClass($animationClass);
                    }else{
                        $el.removeClass($animationClass);
                    }
                }
            }
            //if(($elCenter >= $scrollTop) && ($elCenter <= $winBottom)){
            if(($elBottom >= $scrollTop) && ($elTop <= $winBottom)){
                if($el.hasClass('animated')){
                    if($el.closest('.tab_panel').length && !$el.closest('.tab_panel').hasClass('active'))return;
                    $el.removeClass('paused');
                }else{
                    $el.addClass($animationClass);
                }
            }
        });
    },
    scrollChk: function(target){
        var $scrollTop = $(window).scrollTop();
        //console.log($scrollTop)
        $.each(target, function(){
            var $el = $(this),
                $Data = $el.data('scrollchk').split(','),
                $Start = $Data[0],
                $End = $Data[1],
                $type = $Data[2].split(' ');

            switch($Start){
                case 'in':
                    $Start = $el.parent().offset().top - $(window).height();
                    break;
                case 'top':
                    $Start = $el.parent().offset().top - 50;
                    break;
                case 'bottom':
                    $Start = $el.parent().offset().top - $el.parent().outerHeight();
                    break;
                default:
                    $Start = parseInt($Start)
                    break;
            }

            switch($End){
                case 'out':
                    $End = $el.parent().offset().top + $el.parent().outerHeight();
                    break;
                case 'top':
                    $End = $el.parent().offset().top - 50;
                    break;
                case 'bottom':
                    $End = $el.parent().offset().top - $el.parent().outerHeight();
                    break;
                default:
                    $End = parseInt($End);
                    break;
            }

            var isFadeOut = false,
                isFadeIn = false,
                isTopDown = false,
                isSclDown = false,
                isSclUp = false;
            if($.inArray('fadeOut',$type) != -1)isFadeOut = true;
            if($.inArray('fadeIn',$type) != -1)isFadeIn = true;
            if($.inArray('topDown',$type) != -1)isTopDown = true;
            if($.inArray('sclDown',$type) != -1)isSclDown = true;
            if($.inArray('sclUp',$type) != -1)isSclUp = true;

            var $min = $el.parent().outerHeight()-$el.outerHeight(),
                $rate = ($el.outerHeight()-$el.parent().outerHeight())/($End-$Start),
                $move = -($scrollTop-$Start)*($rate),
                $opacity = Math.max(0,Math.min(1,($scrollTop-$Start)/$End));

            if($Start > $scrollTop){
                if(isFadeOut)$el.css('opacity',1);
                if(isFadeIn)$el.css('opacity',0);
                if(isTopDown)$el.css('top',0);
                if(isSclDown)$el.css('top',0);
                if(isSclUp)$el.css('bottom',0);
            }else if($scrollTop > $End){
                if(isFadeOut)$el.css('opacity',0);
                if(isFadeIn)$el.css('opacity',1);
                if(isSclDown)$el.css('top',$min);
                if(isSclUp)$el.css('bottom',$min);
            }else{
                if(isFadeOut)$el.css('opacity',1-$opacity);
                if(isFadeIn)$el.css('opacity',$opacity);
                if(isTopDown)$el.css('top',($scrollTop-$Start)/2);
                if(isSclDown)$el.css('top',Math.max($min,$move));
                if(isSclUp)$el.css('bottom',Math.max($min,$move));
            }
        });
    },
    init: function(){
        var $animations = $.find('*[data-animation]');
        if(!isAppChk('ios')){	//아이폰앱에서 실행안되게(웹뷰 문제로 제대로 실행 안됨)
            if($animations.length > 0){
                $(window).on('scroll resize',function(){
                    scrollItem.checkInView($animations);
                });
            }


            var $scrollFades = $.find('*[data-scrollchk]');
            if($scrollFades.length > 0){
                $(window).on('scroll resize',function(){
                    scrollItem.scrollChk($scrollFades);
                });
            }
        }else{
            if($animations.length > 0){
                $.each($animations,function(){
                    var $this = $(this),
                        $data = $this.data('animation');
                    if($data == 'on')$this.addClass('on');
                });
            }
        }
    }
};

//완료 애니메이션
var completeEffect = function(wrap){
    $(wrap).each(function(){
        var $this = $(this),
            $itemLength = 10,
            rdLeft, rdTop, rdDelay, rdSpeed,childAry,rdType,rdChild,rdRotate
        $html ='',
            rdLeftAry = [],
            animationName1 = 'comAniDot',
            animationName2 = 'comAniFirework',
            isError = false;

        $this.html('');
        if($this.closest('.complete_animate.error').length)isError = true;

        for(var i = 0; i < $itemLength;i++){
            rdSize = randomNumber(1,3,0);
            rdColor = (i%3) + 1;
            rdDelay = randomNumber(0,10,0) * 200;
            rdDirection = randomNumber(1,2,0);
            rdSpeed = randomNumber(10,15,0) * 200;
            rdLeft = randomNumber(1,15,0) * 6;
            if(rdLeft < 35){
                rdTop = randomNumber(12,18,0) * 5;
            }else if(rdLeft > 70){
                rdTop = randomNumber(3,18,0) * 5;
            }else{
                rdTop = randomNumber(3,8,0) * 5;
            }

            if(rdLeftAry.indexOf(rdLeft) >= 0 || rdLeft == ''){		//left 랜덤값 겹치지않게
                i--;
            }else{
                rdLeftAry.push(rdLeft);
                if(isError){
                    childAry = ['circle','line','dot'];
                    rdType = randomNumber(1,3,0);
                    rdChild = randomNumber(0,2,0);
                    rdSpeed = rdSpeed*4;
                    animationName1 = 'comAniBalloon';

                    $html = '<span class="item color'+rdColor+' size'+rdSize+'" style="left:'+rdLeft+'%;top:'+rdTop+'%;">';
                    $html += '<span class="'+childAry[rdChild]+'" style="';
                    $html += '-webkit-animation:'+animationName1+rdType+' '+rdSpeed+'ms infinite '+rdDelay+'ms;';
                    $html += 'animation:'+animationName1+rdType+' '+rdSpeed+'ms infinite '+rdDelay+'ms;';
                    $html += '"></span>';
                    $html += '</span>';
                }else{
                    $html = '<span class="item color'+rdColor+' size'+rdSize+'" style="left:'+rdLeft+'%;top:'+rdTop+'%;">';
                    $html += '<span class="dot" style="';
                    $html += '-webkit-animation:'+animationName1+' '+rdSpeed+'ms infinite '+rdDelay+'ms;';
                    $html += 'animation:'+animationName1+' '+rdSpeed+'ms infinite '+rdDelay+'ms;';
                    $html += '"></span>';
                    $html += '<span class="firework" style="';
                    $html += '-webkit-animation:'+animationName2+' '+rdSpeed+'ms infinite '+rdDelay+'ms;';
                    $html += 'animation:'+animationName2+' '+rdSpeed+'ms infinite '+rdDelay+'ms;';
                    $html += '"></span>';
                    $html += '</span>';
                }
                $this.prepend($html);
            }
        }
    });
};

//이미지 미리로딩
var preLoadingImg = function(imgarry){
    var $pathname = location.pathname.split('/')[1],
        isPreLoading = sessionStorage.getItem('isPreLoading'),
        $class = 'pre_loading';
    if(isPreLoading != 'true'){
        console.log('preLoadingImg');
        var $html = '<div class="'+$class+'">';
        for(var i=0; i<imgarry.length; i++){
            var $url = imgarry[i];
            if($pathname == 'MDB'){
                $url = $url.replace('moweb','MDB');
            }
            $html += '<div style="background-image:url('+$url+');"></div>';
        }
        $html += '</div>';
        sessionStorage.setItem('isPreLoading',true);
        $('body').append($html);
    }
};

//차트
var chartUI = function(target,speed){
    var $tar = $(target);
    $tar.each(function(){
        var $target = $(this),
            $speed = speed,
            $type = $target.data('type'),
            $bar = $target.find('.bar'),
            $total = $target.find('.total'),
            $totalNum = onlyNumber($total.first().text()),
            $mark = $target.find('.mark'),
            $markNum = onlyNumber($mark.first().text()),
            $perc = Math.min(100,Math.floor(($markNum/$totalNum)*100)),
            isAnimation = true,
            $barTotal;

        $target.data('first',true);
        $(window).scroll(function(){
            if(isScreenIn($target) && $target.data('first') == true){
                $target.data('first',false);
                switch($type){
                    case 'donut':
                        //도넛(반쪽) 차트
                        var $barIn = $bar.find('i'),
                            $remain = $target.find('.remain'),
                            $remainNum = onlyNumber($remain.text()),
                            $bg = $target.find('.bg>div');
                        if(!$bg.find('i').length)$bg.append('<i></i>');
                        $({p:0}).stop(true,false).animate({p:$perc},{
                            duration: $speed,
                            step: function(p) {
                                $bar.css({
                                    '-webkit-transform': 'rotate('+ ((p*1.8)) +'deg)',
                                    'transform': 'rotate('+ ((p*1.8)) +'deg)'
                                });
                                $barIn.css({
                                    '-webkit-transform': 'rotate('+ -((p*1.8)) +'deg)',
                                    'transform': 'rotate('+ -((p*1.8)) +'deg)'
                                });
                                $mark.offset({left:$barIn.offset().left, top:$barIn.offset().top});

                                var $maxHeight = 36;
                                if(p > ($perc/3))$maxHeight = 72;
                                if(p > ($perc/3*2))$maxHeight = 144;
                                var $bgH = Math.max(0,((p/100)*$maxHeight)-12);
                                $bg.find('i').css('height',$bgH);
                            }
                        });
                        $mark.find('strong').animateNumber($markNum,$speed,true);
                        $remain.find('>strong>strong').animateNumber($remainNum,$speed,true);
                        //$total.find('span').animateNumber($totalNum,$speed,true);
                        break;
                    case 'slickBar':
                        var $slick = $target.closest('.ui_slick');

                        if($target.closest('.ui_slick_wrap').hasClass('only')){
                            barInit();
                        }else{
                            if($slick.hasClass('is_slick')){
                                //슬릭 안에 막대 차트
                                var $slick = $target.closest('.slick-slider');
                                $slick.on('init, afterChange',function(event, slick){
                                    if($target.closest('.slick-slide').hasClass('slick-active')){
                                        barInit();
                                    }
                                });
                                if($target.closest('.slick-slide').index() < ($(window).width()<760?1:2)){
                                    barInit();
                                }
                            }else{
                                //swipe 안에 막대 차트
                                var $idx = $slick.data('idx');
                                $uiSwipers[$idx-1].on('transitionEnd',function(){
                                    var $closestIdx = $target.closest('.swiper-slide').index(),
                                        $paginationIdx = $target.closest('.ui_slick').find('.swiper-pagination-bullet-active').index();
                                    if($(window).width() < 760){
                                        if($closestIdx == $paginationIdx){
                                            barInit();
                                        }
                                    }else{
                                        if($closestIdx == $paginationIdx || $closestIdx == ($paginationIdx+1)){
                                            barInit();
                                        }
                                    }
                                });

                                if($target.closest('.swiper-slide').index() < ($(window).width()<760?1:2)){
                                    barInit();
                                }
                            }
                        }

                        $(window).resize(function(){
                            if(isAnimation == false){
                                setTimeout(function(){ //슬릭 안에 있어서 left값을 제대로 못갖고옴.. setTimeout 추가
                                    var $tLeft = $barTotal.position().left;
                                    $target.find('.bar>.total').css({
                                        'left': $tLeft
                                    });
                                },50);
                            }
                        });
                        break;
                    default:
                        //막대 차트
                        barInit();
                        $(window).resize(function(){
                            if(isAnimation == false){
                                var $tLeft = $barTotal.position().left;
                                $target.find('.bar>.total').css({
                                    'left': $tLeft
                                });
                            }
                        });
                        break;
                }
            }
        });

        var barInit = function(){
            $barTotal = $target.find('.total').not('.clone');
            if($target.hasClass('type2')){
                if(!$mark.find('.perc').length){$mark.append('<strong class="perc">('+$perc+'%)</strong>')}
                if($perc >= 60)$target.addClass('is_good');
            }
            if($bar.width() == 0){
                $bar.stop(true,false).animate({'width':$perc+'%'},{
                    duration: $speed,
                    step: function(now){
                        if(!$target.hasClass('type2')){
                            var $tLeft = $barTotal.position().left;
                            $target.find('.total.clone').css({
                                'left': $tLeft
                            });
                        }
                    },
                    complete:function(){
                        isAnimation = false;
                    }
                });
                if(!$target.hasClass('type2')){
                    $target.find('.mark strong').animateNumber($markNum,$speed,true);
                    $target.find('.total strong').animateNumber($totalNum,$speed,true);
                }
            }
        }
    })
};


/*** 플러그인 ***/
//resize가 끝나면: resizeEnd
//$(window).resizeEnd(function(){console.log('resizeEnd');},300);
var resizeEndCut = 0;
$.fn.resizeEnd = function(callback, timeout){
    resizeEndCut = resizeEndCut+1;
    var cut = resizeEndCut;
    return this.each(function(){
        var $this = $(this);
        $this.resize(function(){
            if($this.data('resizeTimeout'+cut)){
                clearTimeout($this.data('resizeTimeout'+cut));
            }
            $this.data('resizeTimeout'+cut, setTimeout(callback,timeout));
        });
    });
};

//scroll이 끝나면: scrollEnd
//$(window).scrollEnd(function(){console.log('scrollEnd');},300);
var scrollEndCut = 0;
$.fn.scrollEnd = function(callback, timeout){
    scrollEndCut = resizeEndCut+1;
    var cut = scrollEndCut;
    return this.each(function(){
        var $this = $(this);
        $this.scroll(function(){
            if($this.data('scrollTimeout'+cut)){
                clearTimeout($this.data('scrollTimeout'+cut));
            }
            $this.data('scrollTimeout'+cut, setTimeout(callback,timeout));
        });
    });
};

//css 지우기
// $('body').removeCss('background');
// $('body').removeCss(['border','background']);
// $('body').removeCss({color: 'white'});
$.fn.removeCss = function (css) {
    var properties = [];
    var is = $.type(css);

    if (is === 'array') properties = css;
    if (is === 'object') for (var rule in css) properties.push(rule);
    if (is === 'string') properties = css.replace(/,$/, '').split(',');

    return this.each(function () {
        var $this = $(this);
        $.map(properties, function (prop) {
            $this.css(prop, '');
        });
    });
};

//같은높이값: sameHeight(자기 아래 타켓지정 없으면 children);
//$('.ul').sameHeight();
//$('.ul').sameHeight('.li');
$.fn.sameHeight = function(item){
    var $this = this;
    $(window).on('resize',function(){
        $this.each(function(){
            var $heightArry = [],
                $item = $(this).find(item);
            if(item == null)$item = $(this).children();
            $item.each(function(){
                $(this).css('height','auto');
                var $height = $(this).outerHeight();
                $heightArry.push($height);
            });
            var $maxHeight = Math.max.apply(null, $heightArry);
            $item.css('height',$maxHeight);
        });
    });
};

//글자바꾸기: changeTxt(바꿀텍스트,바낄텍스트)
//$('.txt').changeTxt('열기','닫기');
$.fn.changeTxt = function(beforeTxt, afterTxt){
    return this.each(function(){
        var element = $(this);
        element.html(element.html().split(beforeTxt).join(afterTxt));
    });
};

//클래스 넣었다 빼기: addRemoveClass(클래스명, 붙는 시간, 빼는 시간)
//$(this).addRemoveClass('on', 500, 1000);
$.fn.addRemoveClass = function(className,addTime,removeTime){
    var element = this;
    var addIt = function(){
        element.addClass(className);
    };
    var removeIt = function(){
        element.removeClass(className);
    };
    setTimeout(function(){addIt();setTimeout(removeIt,removeTime);},addTime);
    return this;
};

//애니메이트숫자
//$('.number').animateNumber('123');
//$('.number').animateNumber('123',1000);
$.fn.animateNumber = function(number,speed,isComma,useScroll){
    return this.each(function(){
        var $this = $(this);
        if(number == '')number = $this.text();
        var $number = onlyNumber(number);
        if(speed == undefined)speed = 500;
        if(isComma == undefined)isComma = false;
        if(useScroll == undefined)useScroll = false;
        var animateInit = function(){
            $({now:0}).stop(true,false).animate({now:$number},{
                duration: speed,
                step: function(now,e){
                    if(isComma){
                        $this.text(addComma(Math.floor(now)));
                    }else{
                        $this.text(Math.floor(now));
                    }
                }
            });
            $this.data('first',false);
        }
        if(useScroll){
            $this.data('first',true);
            $(window).scroll(function(){
                if($this.data('first') && isScreenIn($this)){
                    animateInit();
                }
            });
        }else{
            animateInit();
        }
    });
};

/*** 유틸함수 ***/
//랜덤값 추출
var randomNumber = function(min,max,point){
    return ((Math.random() * (max-min)) + min).toFixed(point);
};

//전화번호 포맷
var autoPhoneFormet = function(str,mark){
    var $phone = str.replace(/[^0-9]/g, ''),
        $phoneAry = [];
    if(!mark)mark = '-';
    if($phone.length < 4){
        $phoneAry.push($phone);
    }else if(str.length < 8){
        $phoneAry.push($phone.substr(0,3));
        $phoneAry.push($phone.substr(3));
    }else if(str.length < 11){
        $phoneAry.push($phone.substr(0,3));
        $phoneAry.push($phone.substr(3,3));
        $phoneAry.push($phone.substr(6));
    }else{
        $phoneAry.push($phone.substr(0,3));
        $phoneAry.push($phone.substr(3,4));
        $phoneAry.push($phone.substr(7));
    }
    return $phoneAry.join(mark);
}

//Input date
var autoDateFormet = function(str,mark){
    var $date = str.replace(/[^0-9]/g, ''),
        $dateAry = [];
    if(!mark)mark = '.';
    if($date.length < 5){
        $dateAry.push($date);
    }else if(str.length < 7){
        $dateAry.push($date.substr(0,4));
        $dateAry.push($date.substr(4));
    }else{
        $dateAry.push($date.substr(0,4));
        $dateAry.push($date.substr(4,2));
        $dateAry.push($date.substr(6));
    }
    return $dateAry.join(mark);
}

//파라미터 값 갖고오기
var getUnlParams = function(){
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){
        params[key]=value;
    });
    return params;
};

//날짜구하기
var todayTimeString=function(addDay){
    var $today=new Date();
    if(!!addDay)$today.setDate($today.getDate()+addDay);
    return timeString($today);
};
var timeString=function(date){
    var $year=date.getFullYear(),
        $month=date.getMonth()+1,
        $day=date.getDate(),
        $hour=date.getHours(),
        $min=date.getMinutes();
    if((''+$month).length==1)$month='0'+$month;
    if((''+$day).length==1)$day="0"+$day;
    if((''+$hour).length==1)$hour='0'+$hour;
    if((''+$min).length==1)$min='0'+$min;
    return(''+$year+$month+$day+$hour+$min);
};
var $dayLabelPrint = function(){
    var $today = new Date(),
        $week=['일','월','화','수','목','금','토'],
        $dayLabel=$week[$today.getDay()];
    return $dayLabel;
};
var $nowDateFull=parseInt(todayTimeString()),					//년+월+일+시+분
    $nowDateHour=parseInt(todayTimeString().substr(0,10)),		//년+월+일+시
    $nowDateDay=parseInt(todayTimeString().substr(0,8)),		//년+월+일
    $nowDateMonth=parseInt(todayTimeString().substr(0,6)),		//년+월
    $nowDateOnlyTime=parseInt(todayTimeString().substr(8,4)),	//시+분
    $nowDateOnlyYear=parseInt(todayTimeString().substr(0,4)),	//년
    $nowDateOnlyMonth=parseInt(todayTimeString().substr(4,2)),	//월
    $nowDateOnlyDay=parseInt(todayTimeString().substr(6,2)),	//일
    $nowDateOnlyHour=parseInt(todayTimeString().substr(8,2)),	//시
    $nowDateOnlyMin=parseInt(todayTimeString().substr(10,2)),	//분
    $nowDateDayLabel=$dayLabelPrint(),							//요일
    $afterDateDay=function(day){
        return parseInt(todayTimeString(day-1).substr(0,8));
    };
//console.log($nowDateFull,$nowDateHour,$nowDateDay,$afterDateDay(7),$nowDateMonth,$nowDateOnlyTime,$nowDateOnlyYear,$nowDateOnlyMonth,$nowDateOnlyDay,$nowDateOnlyHour,$nowDateOnlyMin)

//byte 체크
var bytePrint=function(tar){
    var $txt = $(tar).text();
    if($(tar).is('input') || $(tar).is('select') || $(tar).is('textarea')){
        $txt = $(tar).val();
    }
    return $txt.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,'$&$1').length;
};

//스크롤바 여부확인
var isScrollbar = function(target,direction){
    if(!!direction)direction = 'vertical';
    if (direction === 'vertical'){
        return $(target).get(0)? $(target).get(0).scrollHeight > $(target).innerHeight() : false;
    }
    if(direction === 'horizon'){
        return $(target).get(0) ? $(target).get(0).scrollWidth > $(target).innerWidth() : false;
    }
};

//숫자만
var onlyNumber = function(num){
    return num.toString().replace(/[^0-9]/g,'');
};

//콤마넣기
var addComma = function(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
};

//콤마빼기
var removeComma = function(num){
    return num.toString().replace(/,/gi,'');
};

//배열에서 문자열 찾기
var arrayIndexOf = function(array,str){
    var $val = false;
    //for(var i in array){
    for(var i=0; i<array.length; i++){
        if(array[i].indexOf(str) >= 0){
            $val = true;
        }
    }
    return $val;
};


/*** 메인 ***/
//메인배너
var mainUI = {
    banner: function(){
        var $container = '.main_banner .swiper-container',
            $pagination = '.main_banner .swiper-pagination',
            $imgWrap = '.main_banner .banner_img',
            $imgCircle = '.main_banner .circle_wrap',
            $slideLength = $($container).find('.swiper-slide').length,
            $paginationTimeout = '',
            $paginationDelay = 300;

        var $paginationFadeOut = function(){
            $paginationTimeout = setTimeout(function(){
                $($pagination).addClass('off');
            }, $paginationDelay);
            $($imgWrap).addClass('active');
        };
        var $paginationFadeIn = function(){
            clearTimeout($paginationTimeout);
            $($pagination).removeClass('off');
            $($imgWrap).removeClass('active');
        };
        var isChange = false;
        var decoNum = 1;
        var decoMax = 3;
        var $mainBanner = new Swiper($container,{
            resizeReInit:true,
            loop:true,
            speed:500,
            pagination:{
                el: $pagination,
                type: 'progressbar'
            },
            navigation:{
                prevEl:'.swiper-button-prev',
                nextEl:'.swiper-button-next'
            },
            on: {
                touchMove:function(e){
                    var $distance = 40,
                        $ratio = 5;
                    if($(window).width() >= 760)$distance = 100,$ratio = 4;
                    var $diff = -(Math.max(-$distance,Math.min($distance,this.touches.diff/$ratio)));
                    if($diff == 0)$($imgCircle).stop(true,false);
                    $($imgCircle).animate({'left':$diff},20);
                },
                touchEnd:function(e){
                    if(isChange == false)$($imgCircle).stop(true,false).animate({'left':0},450,'easeOutCubic');
                },
                slideChangeTransitionStart:function(e){
                    isChange = true;
                    var $distance = 40;
                    if($(window).width() >= 760)$distance = 100
                    var $left = parseInt($($imgCircle).css('left')) < 0 ? -$distance:$distance;
                    $($imgCircle).stop(true,false).animate({'left':$left},200,function(){
                        $($imgCircle).stop(true,false).animate({'left':0},450,'easeOutCubic');
                    });
                },
                slideChangeTransitionEnd:function(e){
                    isChange = false;
                },
                transitionEnd:function(e){
                    for(var i = 1;i<=decoMax;i++){
                        $($imgWrap).removeClass('deco'+i);
                    }
                    if(!!$mainBanner){
                        if($mainBanner.swipeDirection == 'next'){
                            decoNum++;
                        }else if($mainBanner.swipeDirection == 'prev'){
                            decoNum--;
                        }
                        if(decoNum > decoMax)decoNum = 1;
                        if(decoNum < 1)decoNum = decoMax;
                    }

                    var $active = $('.main_banner .swiper-slide-active');
                    $active.find('.banner_img').addClass('deco'+decoNum).addClass('active');
                    $active.siblings().find('.banner_img').removeClass('active');

                    //focus 제어
                    $active.removeAttr('aria-hidden').find(':focusable').removeAttr('tabindex');
                    $active.siblings().attr('aria-hidden','true').find(':focusable').attr('tabindex',-1);
                }
            }
        });
    },
    tab: function(){
        var tabOnLine = function (el,wrap){
            var $el = el,
                $line = wrap.find('.tab_line'),
                $lineWdith = $el.find('span').outerWidth(),
                $lineLeft = $el.find('span').position().left;
            $line.css({
                'width':$lineWdith,
                'left':$lineLeft
            });
        };
        $('.main_quick .tab_panel').first().attr('aria-hidden',false).siblings('.tab_panel').attr('aria-hidden',true).find(':focusable').attr('tabindex',-1);

        $(document).on('click','.js_tab.main_tab a',function(e){
            e.preventDefault();
            var $this = $(this),
                $href = $this.attr('href'),
                $thisIdx = $(this).closest('li').index(),
                $closest = $this.closest('.main_tab'),
                $winW = $(window).width();

            $($href).find(':focusable').removeAttr('tabindex');
            $($href).attr('aria-hidden',false).siblings('.tab_panel').attr('aria-hidden',true).find(':focusable').attr('tabindex',-1);;
            $($href).find('.main_quick_sub>ul').scrollLeft(0);
            scrollUI.center($(this).parent());
            $('.main_quick .tab_panel_wrap').css({
                'left': -($winW*$thisIdx)
            });
            tabOnLine($this,$closest);
            $('.main_quick .tab_panel_wrap').data('idx',$thisIdx);
        });
        $('.js_tab.main_tab ul').on('scroll',function(){
            var $active = $(this).find('.active a'),
                $closest = $(this).closest('.main_tab');
            tabOnLine($active,$closest);
        });
        $(window).on('resize',function(){
            var $active = $('.js_tab.main_tab').find('.active a'),
                $wrap = $('.js_tab.main_tab'),
                $tabLength = $('.js_tab.main_tab li').length,
                $panelWrap = $('.main_quick .tab_panel_wrap')
            $panelIdx = $panelWrap.data('idx'),
                $winW = $(window).width();
            if($panelIdx == undefined)$panelIdx = 0;
            tabOnLine($active,$wrap);
            $('.main_quick .tab_panel').css('width',$winW);
            $panelWrap.css({
                'width':$winW*$tabLength,
                'left': -($winW*$panelIdx)
            });
        });
    },
    recommend: function(){
        $('.recommend_prd_wrap .ui_slick').first().addClass('active').attr('aria-hidden',false).siblings('.ui_slick').attr('aria-hidden',true);

        $('.recommend_prd_wrap .btn_refresh').click(function(e){
            e.preventDefault();
            var $wrap = $(this).closest('.recommend_prd_wrap'),
                $siblings = $wrap.siblings('.recommend_prd_wrap');

            $wrap.addClass('off').attr('aria-hidden',true).find(':focusable').attr('tabindex',-1);
            $siblings.find(':focusable').removeAttr('tabindex');
            $siblings.removeClass('off').attr('aria-hidden',false).find('.btn_refresh').focus();
            $siblings.find('.ui_slick').each(function(){
                var $idx = $(this).data('idx');
                $uiSwipers[$idx-1].slideTo(0);
                $uiSwipers[$idx-1].update();
            });
        });

        $(document).on('change','.sort_wrap select',function(e){
            e.preventDefault();
            var $this = $(this),
                $val = parseInt($this.val()),
                $closest = $this.closest('.recommend_prd_wrap'),
                $wrap = $closest.find('.ui_slick_wrap>div'),
                $winW = $(window).width(),
                $slick = $wrap.find('.ui_slick').eq($val),
                $height = $slick.outerHeight();
            $closest.find('.ui_slick').each(function(){
                var $idx = $(this).data('idx');
                $uiSwipers[$idx-1].slideTo(0);
                $uiSwipers[$idx-1].update();
            });
            $slick.find(':focusable').removeAttr('tabindex');
            $slick.addClass('active').attr('aria-hidden',false).siblings('.ui_slick').removeClass('active').attr('aria-hidden',true).find(':focusable').attr('tabindex',-1);
            $wrap.css({
                'left': -($winW*$val)
            });
        });

        $(window).on('resize',function(){
            $('.recommend_prd_wrap').each(function(e){
                var $this = $(this),
                    $winW = $(window).width(),
                    $wrap = $this.find('.ui_slick_wrap>div'),
                    $length = $this.find('.ui_slick').length,
                    $val = parseInt($this.find('.sort_wrap select').val()),
                    $slick = $wrap.find('.ui_slick').eq($val),
                    $height = $slick.outerHeight();

                $this.find('.ui_slick').css('width',$winW);
                $wrap.css({
                    'width':$winW*$length,
                    'left': -($winW*$val)
                });
                /* setTimeout(function(){
					$this.find('.ui_slick.active').siblings().find(':focusable').attr('tabindex',-1);
					$this.find('.ui_slick.active').find(':focusable').removeAttr('tabindex');
				},10);
				*/
            });
        });
    },
    init: function(){
        mainUI.banner();
        mainUI.tab();
        mainUI.recommend();
    }
};
