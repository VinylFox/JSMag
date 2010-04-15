$.fn.blinky = function(config){

    config = $.extend({}, $.fn.blinky.defaults, config);
            
    return this.children('div.item').each(function() {
        
        $.fn.blinky.initBlinky($(this), config);
        
    });

};

$.extend($.fn.blinky, {
    defaults: {
        color: '#ff0000',
        duration: 3
    },
    initBlinky: function(t, c){
        
        t.bind('click', function(ev){
            $(this).effect('highlight', c, (c.duration*1000));
        });
        
    }
});