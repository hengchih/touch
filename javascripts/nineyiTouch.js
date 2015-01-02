/**
 * Created by chrischang on 14/12/31.
 */
(function( $ ){
    "use strict";
    $.fn.nineyiTouch = function(p) {


        var nt = (function (p) {
            var sx = 0, sy = 0, cx = 0, cy = 0, isup=true;
            return {
                touchstart: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    sx = touch.pageX - cx;
                    sy = touch.pageY - cy;
                    isup = false;
                },
                touchmove: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    isup || $(this).css({
                        'webkitTransform':'translate3d(320px,0px,0)',
                        'mozTransform':'translate3d(320px,0px,0)',
                        'msTransform':'translate3d(320px,0px,0)',
                        'transform':'translate3d(320px,0px,0)'
                    });
                    p.swipeLeft && p.swipeLeft();
                },
                touchend: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    cx = touch.pageX - sx;
                    cy = touch.pageY - sy;
                    isup=true;
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