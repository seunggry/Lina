$(function(){
   commonJS.init();
});

$(window).on('load', function(){
    allCheck.init();
});

let commonJS = {
    accordionFn:function(){
        $('.accordion .btn_down').on('click', function(){
            let detail = $(this).closest('.accordion').siblings('.detail');

            if(detail.css('display') === 'none'){
                detail.slideDown();
                $(this).addClass('on');
            } else{
                detail.slideUp();
                $(this).removeClass('on');
            }
        });
    },


    init:function(){
        commonJS.accordionFn();
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
        } else {
            $chkAll.prop('checked', false);
        }
    },

    init: function(){
        allCheck.toggleAll();
        allCheck.isAll();
    }
}