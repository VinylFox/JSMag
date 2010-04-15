Ext.ns('Ext.ux');
Ext.ux.Blinky = Ext.extend(Ext.util.Observable, {
    defaultOpts: {
        color: '#ff0000',
        duration: 3
    },
    constructor: function(elId, config) {
        
        config = Ext.applyIf(config || {}, this.defaultOpts);
                
        Ext.ux.Blinky.superclass.constructor.call(this, config);
        
        this.el = Ext.get(elId);
        
        this.initBlinky(config);
        
    },
    initBlinky: function(c) {
    	
        this.el.on('click', function(ev, t) {
            Ext.get(t).highlight(c.color, c);
        }, this, {delegate: 'div.item'});
        
    }
});