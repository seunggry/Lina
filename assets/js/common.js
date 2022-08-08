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

        tooltipBtn.on('change', function(){
            let checked = $(this).prop('checked');
            if(checked) {
                $(this).siblings('.form_infoBox').addClass('on');
            } else{
                $(this).siblings('.form_infoBox').removeClass('on');
            }
        });
    },
    pageBtnDisable:function(){
      let pageBtn = $('.btn_page');

      pageBtn.on('click', function(){
          if($(this).hasClass('disable')){
              pageBtn.bind('click', false);
              alert('동의항목을 확인 바랍니다.');
          }
      });
    },
    pageBtnActive:function(){
        let requiredValue = $('body').find('.required');
        let pageBtn = $('.btn_page');
        let pageBtnChkBox = $('.btn_page_chk').find('input');
        let requiredInput = $('.required input');
        let count = 0, count2 = 0;

        requiredInput.on('change', function(e){
            let target = $(e.target);
            let required = target.parents('.required');
            let requiredChildInputLength = required.find('input').length;
            let requiredChildInputChk = required.find('input:checked');
            let isChecked = target.prop('checked');

            if(requiredChildInputLength > 1){
                if(target.prop('type') === 'checkbox'){
                    requiredChildInputChk.length >= 1 ? count = 1 : count = 0;
                } else if(target.prop('type') === 'radio') {
                    requiredChildInputChk.length >= 1 ? count++ : count--;
                }
            } else if(requiredChildInputLength === 1) {
                isChecked ? count2++ : count2--;
            }

            if(count + count2 < requiredValue.length){
                pageBtn.addClass('disable');
                pageBtn.bind('click', false);
                pageBtnChkBox.prop('checked', false);
            } else{
                pageBtn.removeClass('disable');
                pageBtn.unbind('click', false);
                pageBtnChkBox.prop('checked', true);
            }
        });
    },
    audioControl:function(){
        $('.btn_listen').on('click', function(){
            let audio = this.getElementsByTagName('audio')[0];
            let stop = this.classList.contains('stop');
            let hightlight = this.parentNode.nextElementSibling.querySelectorAll('.highlight');
            let audioTxt = this.getElementsByTagName('span')[0];
            
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
    popupOpen:function(param){
        $('#'+ param).addClass('show');
    },
    popupClose:function(param){
        $('#'+ param).removeClass('show');
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
    toggleAll4: function(_name){
        let $ts = $(event.target)
            , popId = $ts.parents('.dialog.page').attr('id')
            , chkList = $('.import_chk_list li a[data-pop='+ popId +']').find('.ico_chk input[type=checkbox]')
            , $chk = $('[name="'+_name+'"]')
            , chkTrue = $ts.prop('checked');

        $chk.prop('checked', $ts.prop('checked'));

        if(chkTrue){
            chkList.prop('checked', true);
        } else{
            chkList.prop('checked', false);
        }
    },
    isAll4: function(_name, _id){
        var $ts = $(event.target)
            , popId = $ts.parents('.dialog.page').attr('id')
            , chkList = $('.import_chk_list li a[data-pop='+ popId +']').find('.ico_chk input[type=checkbox]')
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
        } else {
            $chkAll.prop('checked', false);
            chkList.prop('checked', false);

        }
    },
    
    init: function(){
        allCheck.toggleAll();
        allCheck.isAll();
        allCheck.toggleAll2();
        allCheck.isAll2();
        allCheck.toggleAll3();
    }
}

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}