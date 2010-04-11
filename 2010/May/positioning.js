/**
 * @author Shea Frederick - http://www.vinylfox.com
 */

$.fn.rposdemo = function(config){
    config = $.extend({}, $.fn.rposdemo.defaults, config);
    return this.each(function() {
        $.fn.rposdemo.initRPosDemo(this, config);
    });
};
$.extend($.fn.rposdemo, {
    defaults: {
        bgColor: '#000',
        fgColor: '#fff',
        width: 650,
        height: 420,
        font: '30px Fontin-Sans, Arial',
        lineStyle: {stroke:'#fff','stroke-width':1},
        testItems: [['circle',0,0,50],['text',0,0,'Text String'],['rect',0,0,100,100]]
    },
    testItems: [],
    initRPosDemo: function(t, c){
    	var d = $.fn.rposdemo,
    		wc = (c.width/2),
    		hc = (c.height/2),
    		crosshairs = 'M 0 '+hc+' L '+c.width+' '+hc+' M '+wc+' 0 L '+wc+' '+c.height;
    	d.paperContainer = $(t);
    	d.paper = Raphael(t, c.width, c.height);
		d.paper.rect(0, 0, c.width, c.height, 10)
			.attr({
				fill: c.bgColor, 
				stroke: 'none'
			});
    	d.paper.path(crosshairs).attr(c.lineStyle);
    	$.each(c.testItems, function(i, itm){
    		d.testItems.push(d.paper[itm[0]](wc+itm[1],hc+itm[2],itm[3],itm[4])
    			.hide()
    			.attr({
    				fill: c.fgColor,
    				font: c.font
    			})
    		);
    	});
    	$.each(c.testItems, function(i, itm){
    		d.paper.rect(15+(i*80),c.height-45,70,30,6)
    			.attr({
    				fill: '#c0c0c0',
    				stroke: c.fgColor,
    				'stroke-width':1
    			});
    		d.paper.text(45+(i*80),c.height-30,itm[0])
    			.attr({
    				font:'17px Fontin-Sans, Arial',
    				fill: c.fgColor
    			})
    			.click(function(){
    				$.each(d.testItems, function(c, ti){ ti.hide(); });
    				d.testItems[i].show();
    			});
    	});
    	
    	return d;
    }
});