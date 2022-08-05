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
    clickDefaultFn:function(){
        $('a[href="#"]').click(function(e){
           e.preventDefault();
        });

        $('button').click(function(e){
           e.preventDefault();
        });
    },
    accordionFn:function(){
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


    init:function(){
        commonJS.accordionFn();
        commonJS.clickDefaultFn();
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
    toggleAll4: function(_class){
        var $ts4 = $(event.target)
            , $chk4 = $('[class="'+_class+'"]');
        $chk4.prop('checked', $ts4.prop('checked'));
    },

    init: function(){
        allCheck.toggleAll();
        allCheck.isAll();
        allCheck.toggleAll2();
        allCheck.isAll2();
        allCheck.toggleAll3();
        allCheck.toggleAll4();
    }
}

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}