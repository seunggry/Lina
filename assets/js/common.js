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
    highlightRedClick:function(){
        $('.highlight.red').on('click', function(){
           $(this).addClass('pen');
        });
    },
    formInfoBoxShow:function(){
        let tooltipBtn = $('.form_group .tooltip_open');

        tooltipBtn.on('click', function(e){
            e.stopPropagation();
            let infoBox = $(this).siblings('.form_infoBox');
            let infoBoxInput = infoBox.find('input');

            $(this).prop('checked', false);

            if(!infoBox.hasClass('on')){
                infoBox.addClass('on');
                formInfoBoxHide();
            } else{
                infoBox.removeClass('on');
                $('body').off('click');
            }

            function formInfoBoxHide(){
                $('body').on('click', function(e){
                    let target = $(e.target);

                    if(!target.hasClass('form_infoBox') && target.parents('.form_infoBox').length < 1){
                        infoBox.removeClass('on');
                    }
                });
            }

            infoBoxInput.on('change', function(){
                let checkBox = $(this).parents('.form_infoBox').siblings('input');

                if($(this).prop('value').length > 10) {
                    checkBox.prop('checked', true);
                } else {
                    checkBox.prop('checked', false);
                }
            });
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
        let pageBtn = $('.dialog .btn_page');
        let data = $('a[data-pop=' + param + ']');
        let highlight = data.find('.tit .highlight');

        pageBtn.on('click', function(e){
            let dialog = $(this).parents('.dialog');
            let pageBtnStatus = $(this).hasClass('disable');

            if(!pageBtnStatus){
                data.find('.ico_chk input').prop('checked', true);
                highlight.addClass('on');
                if(dialog){
                    dialog.removeClass('show');
                }
            } else {
                e.preventDefault();
                data.find('.ico_chk input').prop('checked', false);
                highlight.removeClass('on');
            }
        });
    },
    importChk:function(){
        let pageBtn = $('.contents .btn_page');
        let importInput = $('.contents .import_chk_list').find('.ico_chk');
        let checked = importInput.prop('checked');

        $(document).on('change', importInput, function(){
            if(importChecked()){
                pageBtn.removeClass('disable');
                pageBtn.unbind('click', false);
            } else {
                pageBtn.addClass('disable');
            }
        });

        function importChecked(){
            let result = true;

            importInput.each(function(){
                let isChecked = $(this).find('input').prop('checked');
                if(!isChecked){
                    return result = false;
                }
            });
            return result;
        }
    },
    requiredChk:function(className){
        let pageBtn = $('.'+ className).find('.btn_page');
        let requiredValue = $('.'+ className).find('.required');
        let requiredInput = requiredValue.find('input');

        requiredInput.on('change', function() {
            if(requiredCheck()){
                pageBtn.removeClass('disable');
                pageBtn.unbind('click', false);
            } else {
                pageBtn.addClass('disable');
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
            let highLight = this.parentNode.nextElementSibling.querySelectorAll('.highlight');
            let audioTxt = this.getElementsByTagName('span')[0];
            let confirmChkInput = this.parentNode.nextElementSibling.querySelector('.detail_box .chk_group2 input');

            commonJS.initAudio();
            commonJS.audioStop();

            if(audio){
                if(!stop){
                    audio.play();
                    this.classList.add('stop');
                    audioTxt.innerText = '음성 중지';
                    highLight.forEach(function(value){
                        value.classList.add('on');
                    });
                    confirmChkInput.setAttribute('disabled', true);
                } else{
                    audio.pause();
                    audio.currentTime = 0;
                    this.classList.remove('stop');
                    audioTxt.innerText = '음성 듣기';
                    highLight.forEach(function(value){
                        value.classList.remove('on');
                    });
                    confirmChkInput.removeAttribute('disabled');
                }
            } else{
                console.log("해당 오디오 없음");
            }

            audio.addEventListener('timeupdate', function (){
                let confirmChkInput = this.parentNode.parentNode.nextElementSibling.querySelector('.detail_box .chk_group2 input');
                let btnListen = this.parentNode;

                if(audio.duration === audio.currentTime && audio.currentTime > 0){
                    confirmChkInput.removeAttribute('disabled');
                    confirmChkInput.setAttribute('checked', true);
                    btnListen.classList.remove('stop');
                    audioTxt.innerText = '음성 듣기';
                    highLight.forEach(function(value){
                        value.classList.remove('on');
                    });
                }
            });

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
            let initHighLight = valueParent.parentNode.nextElementSibling.querySelectorAll('.highlight');

            value.pause();
            valueParent.classList.remove('stop');
            initAudioTxt.innerText = '음성 듣기';
            initHighLight.forEach(function(value){
                value.classList.remove('on');
            });
        });
    },
    audioStop:function(){
        $('.pop_header .btn_recruiter').on('click', function(){
            commonJS.initAudio();
        });

    },
    timeStamp:function(){
        $('.timeStamp').on('click', function(){
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);

            let hours = ('0' + today.getHours()).slice(-2);
            let minutes = ('0' + today.getMinutes()).slice(-2);

            let dateString = year + '.' + month + '.' + day;
            let timeString = hours + ':' + minutes;

            let timeStampInput = $(this).children('input').prop('checked');
            let $html = '<p class="currentTime"><span>' + dateString+ '</span><span>' + timeString + '</span></p>';

            if(timeStampInput){
                $(this).after($html);
            } else{
                $(this).siblings('.currentTime').remove();
            }

        });
    },
    popupOpen:function(param){
        $('#'+ param).addClass('show');
        $('body').css('overflow', 'hidden');
    },
    popupClose:function(param){
        $('#'+ param).removeClass('show');
        $('body').css('overflow', '');
        commonJS.initAudio();
    },
    init:function(){
        commonJS.accordion();
        commonJS.clickDefault();
        commonJS.highlightBtnClick();
        commonJS.highlightRedClick();
        commonJS.formInfoBoxShow();
        commonJS.pageBtnDisable();
        commonJS.pageBtnActive();
        commonJS.timeStamp();
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
    isAll1: function(_name, _id){
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
            $('.certification_btn').prop('disabled', false);
        } else {
            $chkAll.prop('checked', false);
            $('.certification_btn').prop('disabled', true);
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


    init:function(){

    }
}

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}