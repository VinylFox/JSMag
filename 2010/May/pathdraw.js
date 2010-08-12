/**
 * @author Shea Frederick - http://www.vinylfox.com
 */

$.fn.pathdraw = function(config){
    config = $.extend({}, $.fn.pathdraw.defaults, config);
    return this.each(function() {
        $.fn.pathdraw.initPathDraw(this, config);
    });
};
$.extend($.fn.pathdraw, {
    defaults: {
        bgColor: '#000',
        fgColor: '#fff',
        width: 650,
        height: 420,
        lineStyle: {stroke:'#fff','stroke-width':1}
    },
    initPathDraw: function(t, c){
        var d = $.fn.pathdraw;
        d.outputField = $('#'+c.target);
        d.resetButton = $('#'+c.target+'reset');
        d.closeButton = $('#'+c.target+'close');
    	d.paperContainer = $(t);
    	d.paper = Raphael(t, c.width, c.height);
        d.resetButton.click(function(){
            if (d.curLine) {
                d.curLine.remove();
            }
            d.outputField.val('');
        });
        d.closeButton.click(function(){
            if (d.curLine) {
                d.curLine.remove();
                var cval = d.outputField.val();
                d.outputField.val(cval+' Z');
                d.curLine = d.paper.path(cval+' Z')
        			.attr(c.lineStyle);
            }
        });
		d.paper.rect(0, 0, c.width, c.height, 10)
			.attr({
				fill: c.bgColor, 
				stroke: 'none'
			}).click(function(ev){
                var cval = d.outputField.val();
                if (!cval || cval === '') {
                    cval = 'M '+ev.clientX+','+ev.clientY+' L';
                } else {
                    cval = cval.replace(' Z','') + ' ' + ev.clientX + ',' + ev.clientY;
                }
                d.outputField.val(cval);
                if (d.curLine) {
                    d.curLine.remove();
                }
                d.curLine = d.paper.path(cval)
        			.attr(c.lineStyle);
            });
    	
    	return d;
    }
});