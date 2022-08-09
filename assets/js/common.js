$(function(){
   commonJS.init();
});

$(window).on('load', function(){
    allCheck.init();

    $('.btnBox_next').on('click', function(e){
        if(!$(this).hasClass('on')){
            alert('동의항목을 확인 바랍니다.');
            e.preventDefault();
            e.stopPropagation();
        }else{
            $('.pop_indivi').addClass('on');
        }
    });
});

let commonJS = {
    clickDefault:function(){
        $('a[href="#"]').click(function(e){
           e.preventDefault();
        });

        $('button').click(function(e){
           e.preventDefault();
        });
    },
    accordion:function(){
        $('.accordion .btn_down').on('click', function(){
            let detail = $(this).closest('.accordion').siblings('.detail');

            if(detail.css('display') === 'none'){
                detail.slideDown();
                $(this).removeClass('on');
            } else{
                detail.slideUp();
                $(this).addClass('on');
            }
        });
    },
    highlightBtnClick:function(){
      $('.btn_highlight.effect').on('click', function(){
          let highlightTxt = $(this).parents('.contents').find('.highlight');

          highlightTxt.addClass('on');
      });
    },
    formInfoBoxShow:function(){
        let tooltipBtn = $('.form_group .tooltip_open');

        tooltipBtn.on('click', function(){
            let infoBox = $(this).siblings('.form_infoBox');
            let infoBoxInputValue = infoBox.find('input').prop('value');

            $(this).prop('checked', false);
            if(!infoBox.hasClass('on')){
                infoBox.addClass('on');
            } else{
                infoBox.removeClass('on');
            }

            if(infoBoxInputValue.length > 10) {
                $(this).prop('checked', true);
            }
        });
    },
    pageBtnDisable:function(){
        let pageBtn = $('.btn_page');
        pageBtn.on('click', function(e){
            if($(this).hasClass('disable')){
                e.preventDefault();
                pageBtn.bind('click', false);
            }
        });
    },
    pageBtnActive:function(){
        commonJS.requiredChk('contents');
        commonJS.requiredChk('dialog');
    },
    pageBtnChk:function(param){
        let pageBtn = $('.btn_page');
        let data = $('a[data-pop=' + param + ']');
        let highlight = data.find('.tit .highlight');

        pageBtn.on('click', function(){
            let pageBtnStatus = $(this).hasClass('disable');

            if(!pageBtnStatus){
                data.find('.ico_chk input').prop('checked', true);
                highlight.addClass('on');

            } else {
                data.find('.ico_chk input').prop('checked', false);
                highlight.removeClass('on');
            }
        });
    },
    requiredChk:function(className){
        let pageBtn = $('.btn_page');
        let requiredValue = $('.'+ className).find('.required');
        let requiredInput = requiredValue.find('input');
        let pageBtnChkBox = $('.btn_page_chk').find('input');

        requiredInput.on('change', function() {
            if(requiredCheck()){
                pageBtn.removeClass('disable');
                pageBtn.unbind('click', false);
                pageBtnChkBox.prop('checked', true);
            } else {
                pageBtn.addClass('disable');
                pageBtnChkBox.prop('checked', false);
            }
        });

        function requiredCheck(){
            let result = true;

            requiredValue.each(function(){
                let requiredChildInputLength = $(this).find('input').length;
                let requiredChildInputChk = $(this).find('input:checked');

                if( requiredChildInputChk.length === 0 ) {
                    return result = false;
                } else {
                    if( requiredChildInputLength > 1 ) {
                        if( requiredChildInputChk.length === 0 ) {
                            return result = false;
                        }
                    } else {
                        let isChecked = $(this).find('input').prop('checked');
                        if(!isChecked){
                            return result = false;
                        }
                    }
                }
            });
            return result;
        }
    },
    audioControl:function(){
        $('.btn_listen').on('click', function(){
            let audio = this.getElementsByTagName('audio')[0];
            let stop = this.classList.contains('stop');
            let hightlight = this.parentNode.nextElementSibling.querySelectorAll('.highlight');
            let audioTxt = this.getElementsByTagName('span')[0];

            commonJS.initAudio();

            if(audio){
                if(!stop){
                    audio.play();
                    this.classList.add('stop');
                    audioTxt.innerText = '음성 중지';
                    hightlight.forEach(function(value){
                        value.classList.add('on');
                    });
                } else{
                    audio.pause();
                    audio.currentTime = 0;
                    this.classList.remove('stop');
                    audioTxt.innerText = '음성 듣기';
                    hightlight.forEach(function(value){
                        value.classList.remove('on');
                    });
                }
            } else{
                console.log("해당 오디오 없음");
            }
        });
    },
    signClick:function(){
        let signChk = $('.sign .agree .chk_group input[type=checkbox]');

        signChk.on('change', function(){
           let isChk = $(this).prop('checked');
           let signImg = $(this).parents('.agree').find('.sign_box img');

            if(isChk){
                signImg.stop().show();
            } else{
                signImg.stop().hide();
            }
        });
    },
    initAudio:function(){
        let audioList = document.querySelectorAll('.btn_listen audio');

        audioList.forEach(function(value){
            let valueParent = value.parentNode;
            let initAudioTxt = valueParent.getElementsByTagName('span')[0];
            let initHightLight = valueParent.parentNode.nextElementSibling.querySelectorAll('.highlight');;

            value.pause();
            valueParent.classList.remove('stop');
            initAudioTxt.innerText = '음성 듣기';
            initHightLight.forEach(function(value){
                value.classList.remove('on');
            });
        });
    },
    popupOpen:function(param){
        $('#'+ param).addClass('show');
    },
    popupClose:function(param){
        $('#'+ param).removeClass('show');
        commonJS.initAudio();
    },

    init:function(){
        commonJS.accordion();
        commonJS.clickDefault();
        commonJS.highlightBtnClick();
        commonJS.formInfoBoxShow();
        commonJS.pageBtnDisable();
        commonJS.pageBtnActive();
        commonJS.audioControl();
    }
}

let allCheck = {
    toggleAll: function(_name){
        var $ts = $(event.target)
            , $chk = $('[name="'+_name+'"]');

        $chk.prop('checked', $ts.prop('checked'));
    },
    isAll: function(_name, _id){
        var $ts = $(event.target)
            , $chkAll = $('#'+_id)
            , $chk = $('[name="'+_name+'"]')

            , i = 0
            , flag = false;

        while (i < $chk.length) {
            flag = $chk.eq(i).prop('checked');
            if (!flag){
                break;
            } else i++;
        }
        if (flag){ // 전체 체크일 시
            $chkAll.prop('checked', true);
            $('.btnBox_next').addClass('on');
        } else {
            $chkAll.prop('checked', false);
            $('.btnBox_next').removeClass('on');
        }
    },
    toggleAll2: function(_value){
        var $ts2 = $(event.target)
            , $chk2 = $('[value="'+_value+'"]');

        $chk2.prop('checked', $ts2.prop('checked'));
    },
    isAll2: function(_value, _id){
        var $ts2 = $(event.target)
            , $chkAll2 = $('#'+_id)
            , $chk2 = $('[value="'+_value+'"]')

            , j = 0
            , flag2 = false;

        while (j < $chk2.length) {
            flag2 = $chk2.eq(j).prop('checked');
            if (!flag2){
                break;
            } else j++;
        }
        if (flag2){ // 전체 체크일 시
            $chkAll2.prop('checked', true);
        } else {
            $chkAll2.prop('checked', false);
        }
    },
    toggleAll3: function(_class){
        var $ts3 = $(event.target)
            , $chk3 = $('[class="'+_class+'"]');

            if($ts3.prop('checked')){
                var body = $('body')[0];
                $chk3.prop('checked', $ts3.prop('checked'));
                $('.btnBox_next').addClass('on');
                window.scrollTo({ left: 0, top: body.offsetHeight, behavior: "smooth" });
            }else{
                $chk3.prop('checked', false , $ts3.prop('checked'));
                $('.btnBox_next').removeClass('on');
                window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            }
    },
    isAll3: function(_class, _id){
        var $ts = $(event.target)
            , $chkAll = $('#'+_id)
            , $chk = $('[class="'+_class+'"]')

            , i = 0
            , flag = false;

        while (i < $chk.length) {
            flag = $chk.eq(i).prop('checked');
            if (!flag){
                break;
            } else i++;
        }
        if (flag){ // 전체 체크일 시
            $chkAll.prop('checked', true);
            $('.btnBox_next').addClass('on');
        } else {
            $chkAll.prop('checked', false);
            $('.btnBox_next').removeClass('on');
        }
    },
    isAll4: function(_name, _id){
        var $ts = $(event.target)
            , $chkAll = $('#'+_id)
            , $chk = $('[name="'+_name+'"]')

            , i = 0
            , flag = false;

        while (i < $chk.length) {
            flag = $chk.eq(i).prop('checked');
            if (!flag){
                break;
            } else i++;
        }
        if (flag){ // 전체 체크일 시
            $chkAll.prop('checked', true);
        } else {
            $chkAll.prop('checked', false);
        }
    },
    toggleAll5: function(_name){
        let $ts = $(event.target)
            , pop = $ts.parents('.dialog.page')
            , popId = $ts.parents('.dialog.page').attr('id')
            , dataPop = $('.import_chk_list li a[data-pop='+ popId +']')
            , chkList = dataPop.find('.ico_chk input[type=checkbox]')
            , highlight = dataPop.find('.tit .highlight')
            , $chk = $('[name="'+_name+'"]')
            , chkTrue = $ts.prop('checked');

        $chk.prop('checked', $ts.prop('checked'));

        if(chkTrue){
            chkList.prop('checked', true);
            pop.removeClass('show');
            highlight.addClass('on');
        } else{
            chkList.prop('checked', false);
            pop.addClass('show');
            highlight.removeClass('on');
        }
    },
    isAll5: function(_name, _id){
        var $ts = $(event.target)
            , pop = $ts.parents('.dialog.page')
            , popId = pop.attr('id')
            , dataPop = $('.import_chk_list li a[data-pop='+ popId +']')
            , chkList = dataPop.find('.ico_chk input[type=checkbox]')
            , highlight = dataPop.find('.tit .highlight')
            , $chkAll = $('#'+_id)
            , $chk = $('[name="'+_name+'"]')
            , i = 0
            , flag = false;

        while (i < $chk.length) {
            flag = $chk.eq(i).prop('checked');
            if (!flag){
                break;
            } else i++;
        }
        if (flag){ // 전체 체크일 시
            $chkAll.prop('checked', true);
            chkList.prop('checked', true);
            pop.removeClass('show');
            highlight.addClass('on');
        } else {
            $chkAll.prop('checked', false);
            chkList.prop('checked', false);
            pop.addClass('show');
            highlight.removeClass('on');
        }
    },
    importChk:function(){
        let pageBtn = $('.contents .btn_page');
        let importInput = $('.import_chk_list .ico_chk').find('input');
        let result;

        $(document).on('change', importInput, function(){
            importInput.each(function(){
                result = $(this).prop('checked');
                return result;
            });

            if(result){
                pageBtn.removeClass('disable');
                pageBtn.unbind('click', false);
            } else {
                pageBtn.addClass('disable');
            }
        });
    },

    init:function(){

    }
}

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}