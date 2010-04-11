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
        font: '30px Fontin-Sans, Arial',
        platform: 'M 380 385 L 505 385 M 435 385 L 435 85 L 565 85 L 565 105',
        letters: ['Q','W','E','R','T','Y','U','I','O','P',''/*new line*/,'A','S','D','F','G','H','J','K','L',''/*new line*/,'Z','X','C','V','B','N','M'],
        hangmanParts: [['circle',565,130,25],['path','M 565 155 L 565 265'],['path','M 565 184 L 510 170'],['path','M 565 184 L 620 170'],['path','M 565 259 L 520 310'],['path','M 565 259 L 610 310']]
    },
    initHangman: function(t, c){

		var hm = $.fn.hangman;
		hm.c = c;
		
		hm.paper = Raphael(t, 650, 420);
		hm.paper.rect(0, 0, 650, 420, 10)
			.attr({
				fill: c.bgColor, 
				stroke: 'none'
			});
		
		hm.paper.path(c.platform)
			.attr(c.lineStyle);
		
		hm.paper.text(320,35,'Hangman')
			.attr({
				font: c.font,
				fill: c.fgColor
			});
		
		var y = 80, xd = 5, bs = 30, 
			s = 6, x = xd, o = (bs/2);
		$.each(c.letters, function(i, ltr){
			if (!ltr){
				y = y+bs+s;
				x = xd;
			}else{
				x = x+bs+s;
				hm.paper.rect(x,y,bs,bs,s)
					.attr({
						fill: '#c0c0c0',
						stroke: c.fgColor,
						'stroke-width': 1
					});
				hm.paper.text(x+o,y+o,ltr)
					.attr({
						font: c.font,
						fill: c.fgColor
					})
					.click(function(ev){
				    	this.attr('fill',c.bgColor);
				    });
			}
		});
		
		$.each(hm.c.hangmanParts, function(i, el){
			hm.paper[el[0]](el[1],el[2],el[3]).attr(hm.c.lineStyle); //.hide();      
		});
		
		return hm;

    }
});