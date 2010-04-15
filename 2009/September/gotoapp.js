var GoToApp = Class.create(
/** 
 * @lends GoToApp#
 */
{
	/**
	 * The GoToApp constructor. This is a awesome class for doing mundane stuff.
	 * @author Shea
	 * @class This is a class for creating a deck of cards, where only one element will display at a time, I call it the GoToApp.
	 * @param {String} name The name of our instance of this GoToApp (also the id of our div).
	 * @return {GoToApp} the instance of GoToApp
	 * @constructs
	 */
    initialize: function(name){
		this.name = name;
		this.goToPage(1);
		return this;
    },
    
    /** 
     * A method to go to a specific page.
     * @param {Integer} page The page index to go to (starts at one)
     */
    goToPage: function(page){
		$$('#'+this.name+' .page').invoke('setStyle', 'display: none;');
		$$('#'+this.name+' .page:nth-child('+page+')').invoke('setStyle', 'display: inline;');
		this.setPageInfo(page);
    },
	
    /** 
     * A method to set page information.
     * @param {Integer} curpage The currently active page
     * @param {Integer} totpages The total number of pages (counts the pages if not specified)
     */
    setPageInfo: function(curpage, totpages){
		this.currentPage = curpage;
		this.pagesTotal = totpages || $$('#'+this.name+' .page').length;
    },
	
	/** A method to go to the first page. */
    goToFirst: function(){
		this.goToPage(1);
    },
	
	/** A method to go to the last page. */
    goToLast: function(){
		this.goToPage(this.pagesTotal);
    },
	
    /** The current page were on. */
    currentPage: 1,
	/** The number of total pages. */
    pagesTotal: 0
});