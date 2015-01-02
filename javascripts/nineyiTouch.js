/**
 * Created by chrischang on 14/12/31.
 */
(function( $ ){
    "use strict";
    $.fn.nineyiTouch = function(p) {


        var nt = (function (p) {
            var sx = 0, sy = 0, cx = 0, cy = 0, isMove = false;
            return {
                touchstart: function(e){
                    isMove = false;
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    sx = touch.pageX - cx;
                    sy = touch.pageY - cy;
                },
                touchmove: function(e){
                    isMove = true;
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    var prevOrNext = touch.pageX - sx;
                    var ml = +($(this).css('-webkit-transform').match(/\-?[0-9]+\.?[0-9]*/g)[1]);
                    var offset = ml + prevOrNext;
                    //p.swipeLeft && p.swipeLeft();
                    $(this).css('-webkit-transform','translate3d('+ offset +'px, 0, 0)');
                },
                touchend: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    cx = touch.pageX - sx;
                    cy = touch.pageY - sy;
                    isMove = false;
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