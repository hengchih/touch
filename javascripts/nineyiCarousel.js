/**
 * Created by chrischang on 14/12/30.
 *
 */
(function( $ ){
    "use strict";


    $.fn.nineyiCarousel= function() {

        var nc = (function(){
            var mw = 0, count = 0;
            return{
                width: function(w){
                    if(w){
                        mw = w;
                    }else{
                        return w;
                    }
                },
                count: function(c){
                    if(c){
                        count = c;
                    }else{
                        return count;
                    }
                },
                setContainerWidth: function($ul){
                    $ul.width( mw * count);
                    $ul.find('.nc-li').width( mw );
                }
            }
        })();

        return this.each(function() {
            var $this = $(this);
            var carousel = nc;
            carousel.width($this.outerWidth());
            carousel.count($this.find('.nc-li').length);
            carousel.setContainerWidth($this.find('.nc-ul'));

        });
    };

})(jQuery);