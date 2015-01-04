/**
 * Created by chrischang on 14/12/31.
 */
(function( $ ){
    "use strict";
    $.fn.nineyiTouch = function(p) {

        $('body').bind('touchstart',function(e){
            $('body').css('overflow','visible');
        });

        var nt = (function (p) {
            var sx = 0,
                sy = 0,
                cx = 0,
                cy = 0,
                x = 0,
                y = 0,
                isMove = false,
                isHorizontal = null,
                isLock = false;
            return {
                touchstart: function(e){
                    isMove = false;
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    sx = touch.pageX - cx;
                    sy = touch.pageY - cy;
                    x = touch.pageX;
                    y = touch.pageY;
                },
                touchmove: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                        mx = touch.pageX,
                        my = touch.pageY,
                        offsetX = mx - x,
                        offsetY = my - y;

                    isMove = true;

                    if(!isLock){
                        if( Math.abs( Math.atan( offsetY / offsetX ) * ( 180/ Math.PI ) ) > 70 ){ // 垂直
                            isHorizontal = false;
                            $('body').css({
                                'overflow': 'visible'
                            });
                            //console.log('v');
                        }else{
                            isHorizontal = true;
                            e.preventDefault();
                            $('body').css({
                                'overflow': 'hidden'
                            });
                            //console.log('h');
                        }
                        isLock = true;
                    }

                    if(p.touchMoveAnimate && isHorizontal){
                        $(this).css({
                            'webkitTransform':'translate3d('+(mx - sx)+'px,0px,0)',
                            'transform':'translate3d('+(mx - sx)+'px,0px,0)'
                        });
                    }
                },
                touchend: function(e){
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

                    if(isHorizontal){
                        cx = touch.pageX - sx;
                        cy = touch.pageY - sy;

                        if( (touch.pageX - x) < 0 ){
                            p.swipeLeft() && p.swipeLeft();
                        }else{
                            p.swipeRight() && p.swipeRight();
                        }
                    }

                    if(!isMove){
                        p.click() && p.click();
                    }

                    isMove = false;
                    isHorizontal = null;
                    isLock = false;
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