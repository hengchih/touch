/**
 * Created by chrischang on 14/12/31.
 */
(function( $ ){
    "use strict";
    $.fn.nineyiTouch = function(p) {


        var nt = (function (p) {
            var sx = 0, sy = 0, cx = 0, cy = 0, isMove = false,reference,prevOrNext ;
            return {
                touchstart: function(e){
                    isMove = false;
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    reference = touch.clientX;
                    //$('footer').append('start' + (touch.clientX ) + ',').append('<br/>');

                },
                touchmove: function(e){
                    isMove = true;
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    //$('footer').append((touch.clientX - sx) + ',').append('<br/>');
                    prevOrNext = touch.clientX - reference; //正数前进，负数后退
                    reference  = touch.clientX;
                    var ml = +($(this).css('-webkit-transform').match(/\-?[0-9]+\.?[0-9]*/g)[4]);

                    var offset = ml + prevOrNext;
                    console.log(prevOrNext);
                    e.preventDefault();

                    $(this).css('-webkit-transform','translate3d('+ (offset-20) +'px, 0, 0)');
                },
                touchend: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    cx = touch.clientX - sx;
                    cy = touch.clientY - sy;
                    isMove = false;
                    e.preventDefault();
                    $('footer').append('end' + (touch.clientX - sx) + ',').append('<br/>');
                }
            };
        })(p);


        return this.each(function() {

            var swipe = nt;

            $(this).on('touchstart',swipe.touchstart);
            $(this).on('touchmove',swipe.touchmove);
            $(this).on('touchend',swipe.touchend);

        });
    };

})(jQuery);