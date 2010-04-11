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
        font: '30px Fontin-Sans, Arial',
        lineStyle: {stroke:'#fff','stroke-width':10},
        words: ['words','spell','easy','javascript','omg','raphael'],
        letters: ['Q','W','E','R','T','Y','U','I','O','P',''/*new line*/,'A','S','D','F','G','H','J','K','L',''/*new line*/,'Z','X','C','V','B','N','M'],
        platform: 'M 380 385 L 505 385 M 435 385 L 435 85 L 565 85 L 565 105',
        hangmanParts: [['circle',565,130,25],['path','M 565 155 L 565 265'],['path','M 565 184 L 510 170'],['path','M 565 184 L 620 170'],['path','M 565 259 L 520 310'],['path','M 565 259 L 610 310']]
    },
    badGuesses: 0,
    correctGuesses: 0,
    kbLetters: [],
    hmParts: [],
    hmLetters: [],
    hmUnderlines: [],
    currentWord: '',
    initHangman: function(t, c){
    	var hm = $.fn.hangman;
    	hm.c = c;
    	hm.paperContainer = $(t);
    	hm.paper = Raphael(t, 650, 420);
    	hm.paper.rect(0, 0, 650, 420, 10).attr({fill: c.bgColor, stroke: 'none'});
    	hm.paper.text(320,35,'Hangman').attr({font:c.font,fill:c.fgColor}); 
    	hm.paper.path(c.platform).attr(c.lineStyle);
    	hm.drawHangman(hm).drawKeyboard().generateWord();
    	hm.paper.rect(30,355,95,30,6).attr({fill:'#c0c0c0',stroke:c.fgColor,'stroke-width':1});
		hm.paper.text(75,370,'New Word').attr({font:'17px Fontin-Sans, Arial',fill:c.fgColor}).hover(hm.letterHover[0],hm.letterHover[1]).click(function(){ hm.resetGame(hm); });
    	return hm;
    },
    letterHover: [function(){$(this).css('cursor','pointer');},function(){$(this).css('cursor','');}],
    letterClick: function(ev){
    	var ltr = this.attrs.text, hm = $.fn.hangman, c = hm.c, found = false;
    	if (ltr && (hm.badGuesses+1) != hm.hmParts.length){
    		this.attr('fill',c.bgColor);
    		$.each(hm.currentWord, function(i, cltr){
    			if (ltr == cltr.toUpperCase()){
    				found = true;
    				hm.hmLetters.push(hm.paper.text(((i*30)+40), 275, ltr).attr({font:c.font,fill:c.fgColor}));
    				hm.correctGuesses++;
    			}
    		});
    		if (!found){ hm.badGuesses++; hm.updateHangman(hm); }
    	}else{
    		hm.updateHangman(hm);
    		hm.resetGame(hm);
    	}
    },
    drawHangman: function(hm){
    	$.each(hm.c.hangmanParts, function(i, el){
    		hm.hmParts.push(hm.paper[el[0]](el[1],el[2],el[3]).attr(hm.c.lineStyle).hide());      
    	});
    	return hm;
    },
    updateHangman: function(hm){
    	$.each(hm.hmParts, function(i, pt){
    		if ((i+1) == hm.badGuesses){
    			pt.show();
    		}
    	});
    },
    drawKeyboard: function(){
    	// these variables control how the keyboard letters are displayed, position, spacing, etc.
		var y = 80, xd = 5, bs = 30, 
			s = 6, x = xd, o = (bs/2),
			hm = $.fn.hangman, c = hm.c;
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
				hm.kbLetters.push(hm.paper.text(x+o,y+o,ltr)
					.attr({
						font: c.font,
						fill: c.fgColor
					})
					.hover(hm.letterHover[0],hm.letterHover[1])
					.click(hm.letterClick)
				);
			}
		});
    	return hm;
    },
    generateWord: function(){
    	var hm = $.fn.hangman, c = hm.c, rn = Math.floor(Math.random()*c.words.length);
    	hm.currentWord = c.words[rn].split('');
    	$.each(hm.currentWord, function(i, ltr){
    		hm.hmUnderlines.push(hm.paper.path('M '+((i*30)+30)+' 300 L '+((i*30)+50)+' 300').attr(c.lineStyle));
    	});
    	return hm;
    },
    resetGame: function(hm){
    	hm.badGuesses = 0;
    	hm.correctGuesses = 0;
    	for(ltr in hm.kbLetters){ hm.kbLetters[ltr].attr('fill',hm.c.fgColor); };
    	$.each(hm.hmParts, function(i, prt){ prt.hide(); });
    	$.each(hm.hmLetters, function(i, ltr){ ltr.remove(); });
    	$.each(hm.hmUnderlines, function(i, ul){ ul.remove(); });
    	hm.hmLetters = [];
    	hm.hmUnderlines = [];
    	hm.generateWord();
    }
});