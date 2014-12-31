/**
 * Created by chrischang on 14/12/31.
 */
(function( $ ){
    "use strict";
    $.fn.nineyiTouch = function() {

        var nineSwipe = function () {
            var sx = 0, sy = 0, cx = 0, cy = 0;
            return {
                touchstart: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    sx = touch.pageX - cx;
                    sy = touch.pageY - cy;
                },
                touchmove: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    $(this).css({
                        'webkitTransform':'translate3d('+(touch.pageX-sx)+'px,0px,0)',
                        '-webkit-transition': 'all 600ms cubic-bezier(0.165, 0.84, 0.44, 1)',
                        'transition': 'all 600ms cubic-bezier(0.165, 0.84, 0.44, 1)'
                    });
                },
                touchend: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    cx = touch.pageX - sx;
                    cy = touch.pageY - sy;

                }
            };
        };


        return this.each(function() {

            var swipe = nineSwipe();

            $(this).on('touchstart',swipe.touchstart);
            $(this).on('touchmove',swipe.touchmove);
            $(this).on('touchend',swipe.touchend);

        });
    };

})(jQuery);