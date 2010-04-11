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
        fgColor: '#fff'
    },
    initHangman: function(t, c){

    	var hm = $.fn.hangman;
    	hm.c = c;
    	hm.paper = Raphael(t, 650, 420);
    	hm.paper.rect(0, 0, 650, 420, 10)
    		.attr({fill: c.bgColor, stroke: 'none'});
    	
    	return hm;

    }
});