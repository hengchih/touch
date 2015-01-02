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
                    //sy = touch.pageY - cy;
                    $('footer').append('start' + (touch.pageX ) + ',').append('<br/>');
                    e.preventDefault();
                },
                touchmove: function(e){
                    isMove = true;
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    $('footer').append((touch.pageX - sx) + ',').append('<br/>');
                    console.log(touch.pageX - sx);
                    $(this).css({
                        'webkitTransform':'translate3d('+(touch.pageX - sx)+'px,0px,0)',
                        'mozTransform':'translate3d('+(touch.pageX - sx)+'px,0px,0)'
                    });

                    e.preventDefault();

                },
                touchend: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    cx = touch.pageX - sx;
                    cy = touch.pageY - sy;
                    isMove = false;
                    e.preventDefault();
                    $('footer').append('end' + (touch.pageX - sx) + ',').append('<br/>');
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