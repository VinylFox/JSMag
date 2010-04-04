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
        platform: 'M 380 385 L 505 385 M 435 385 L 435 80 M 430 85 L 570 85 M 565 85 L 565 105',
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
    	hm.paperContainer = $(t);
    	hm.paper = Raphael(t, 650, 420);
    	hm.paper.rect(0, 0, 650, 420, 10).attr({fill: hm.defaults.bgColor, stroke: 'none'});
    	hm.paper.text(320,35,'Hangman').attr({font:hm.defaults.font,fill:hm.defaults.fgColor}); 
    	hm.drawPlatform().drawHangman().drawKeyboard().generateWord();
    	hm.paper.rect(30,355,95,30,6).attr({fill:'#c0c0c0',stroke:hm.defaults.fgColor,'stroke-width':1});
		hm.paper.text(75,370,'New Word').attr({font:'17px Fontin-Sans, Arial',fill:hm.defaults.fgColor}).hover(hm.letterHover[0],hm.letterHover[1]).click(hm.resetGame);
    	return hm;
    },
    letterHover: [function(){$(this).css('cursor','pointer');},function(){$(this).css('cursor','');}],
    letterClick: function(ev){
    	var ltr = $(this.node).text(), hm = $.fn.hangman, found = false;
    	console.log(this);
    	console.log(this.node);
    	console.log(ltr);
    	if (ltr && (hm.badGuesses+1) != hm.hmParts.length){
    		$(this.node).attr('fill',hm.defaults.bgColor);
    		$.each(hm.currentWord, function(i, cltr){
    			if (ltr == cltr.toUpperCase()){
    				found = true;
    				hm.hmLetters.push(hm.paper.text(((i*30)+40), 275, ltr).attr({font:hm.defaults.font,fill:hm.defaults.fgColor}));
    				hm.correctGuesses++;
    			}
    		});
    		if (!found){ hm.badGuesses++; hm.updateHangman(); }
    	}else{
    		hm.updateHangman();
    		hm.resetGame();
    	}
    },
    drawPlatform: function(){    	
    	var hm = $.fn.hangman;
    	hm.paper.path(hm.defaults.platform).attr(hm.defaults.lineStyle);
    	return hm;
    },
    drawHangman: function(){
    	var hm = $.fn.hangman;
    	$.each(hm.defaults.hangmanParts, function(i, el){
    		hm.hmParts.push(hm.paper[el[0]](el[1],el[2],el[3]).attr(hm.defaults.lineStyle).hide());      
    	});
    	return hm;
    },
    updateHangman: function(){
    	var hm = $.fn.hangman;
    	$.each(hm.hmParts, function(i, pt){
    		if ((i+1) == hm.badGuesses){
    			pt.show();
    		}
    	});
    },
    drawKeyboard: function(){
    	// these variables control how the keyboard letters are displayed, position, spacing, etc.
    	var y = [85,100], xd = [5,70], bw = 30, bh = 30, s = 6, x = [xd[0],xd[1]], hm = $.fn.hangman;
    	$.each(hm.defaults.letters, function(i, ltr){
    		if (!ltr){
    			y = [y[0]+bw+s,y[1]+bh+s];
    			x = [xd[0],xd[1]];
    		}else{
    			hm.paper.rect(x[0]=x[0]+(bw/2)+s,y[0],bw,bh,s).attr({fill:'#c0c0c0',stroke:hm.defaults.fgColor,'stroke-width':1});
    			hm.kbLetters[ltr] = hm.paper.text(x[0]=x[0]+(bw/2),y[1],ltr).attr({font:hm.defaults.font,fill:hm.defaults.fgColor}).hover(hm.letterHover[0],hm.letterHover[1]).click(hm.letterClick);
    		}
    	});
    	return hm;
    },
    generateWord: function(){
    	var hm = $.fn.hangman, rn = Math.floor(Math.random()*hm.defaults.words.length);
    	hm.currentWord = hm.defaults.words[rn].split('');
    	$.each(hm.currentWord, function(i, ltr){
    		hm.hmUnderlines.push(hm.paper.path('M '+((i*30)+30)+' 300 L '+((i*30)+50)+' 300').attr(hm.defaults.lineStyle));
    	});
    	return hm;
    },
    resetGame: function(){
    	var hm = $.fn.hangman;
    	hm.badGuesses = 0;
    	hm.correctGuesses = 0;
    	for(ltr in hm.kbLetters){ hm.kbLetters[ltr].attr('fill',hm.defaults.fgColor); };
    	$.each(hm.hmParts, function(i, prt){ prt.hide(); });
    	$.each(hm.hmLetters, function(i, ltr){ ltr.remove(); });
    	$.each(hm.hmUnderlines, function(i, ul){ ul.remove(); });
    	hm.hmLetters = [];
    	hm.hmUnderlines = [];
    	hm.generateWord();
    }
});