/**
 * @author Shea Frederick - http://www.vinylfox.com
 */

$.fn.hangman = function(config){

    config = $.extend({}, $.fn.hangman.defaults, config);

    return this.each(function() {
        $.fn.hangman.initHangman(this, config);
    });

};
$.extend($.fn.hangman, {
    defaults: {
        bgColor: '#000',
        fgColor: '#fff',
        lineStyle: {stroke:'#fff','stroke-width':10},
        platform: 'M 380 385 L 505 385 M 435 385 L 435 85 L 565 85 L 565 105',
    },
    initHangman: function(t, c){

		var hm = $.fn.hangman;
		hm.c = c;
		
		hm.paper = Raphael(t, 650, 420);
		hm.paper.rect(0, 0, 650, 420, 10)
			.attr({fill: c.bgColor, stroke: 'none'})
			.click(function(ev){
				prompt('Coordinates', ev.clientX+' '+ev.clientY);
			});
		
		hm.paper.path(c.platform).attr(c.lineStyle);
		
		return hm;

    }
});