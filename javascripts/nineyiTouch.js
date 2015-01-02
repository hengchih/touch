/**
 * Created by chrischang on 14/12/31.
 */
(function( $ ){
    "use strict";
    $.fn.nineyiTouch = function(p) {


        var nt = (function (p) {
            var isMove = false,
                reference,
                referenceX = 0,
                referenceY = 0,
                offsetX = 0,
                offsetY = 0,
                behavior,
                rd = 180 / Math.PI;
            return {
                touchstart: function(e){
                    isMove = false;
                    reference = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    referenceX = reference.pageX;
                    referenceY = reference.pageY;
                },
                touchmove: function(e){
                    var $this = $(this);
                    var newReference = (e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]),
                        newReferenceX = newReference.pageX,
                        newReferenceY = newReference.pageY,
                        offsetX = newReferenceX - referenceX,
                        offsetY = newReferenceY - referenceY;

                    isMove = true;
                    reference = newReference;
                    referenceX = newReferenceX;
                    referenceY = newReferenceY;

                    //console.log(Math.abs( offsetY / offsetX ) * rd);
                    if( Math.abs(Math.atan(offsetY / offsetX)  * rd) < 60 ){ //水平
                        reference  = newReference;
                        //获取css3属性值
                        var transform = $this.css('-webkit-transform') || $container.css('transform') || $container.css('-moz-transform') || $container.css('-ms-transform');
                        var ml = +(transform.match(/\-?[0-9]+\.?[0-9]*/g)[4]);
                        //console.log(offsetX);
                        //offset = ml + prevOrNext;
                        /*超过界限禁止移动*/
                        //if( offset > 0 || offset <= -$containerWidth + targetWidth + space ){return;}
                        /*超过界效果*/
                        //if(offset < -$containerWidth + targetWidth + space || offset > 0){offset =  ml + prevOrNext / 3 ;}

                        //开启硬件加速
                        $(this).css('-webkit-transform','translate3d('+ (ml + offsetX) +'px, 0, 0)');
                        $(this).css('transform','translate3d('+ (ml + offsetX) +'px, 0, 0)');
                    }
                },
                touchend: function(e){
                    if(!isMove){ //點擊
                        alert('1');
                    }else{ //移動

                    }
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