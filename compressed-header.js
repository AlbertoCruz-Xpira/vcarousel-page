/*Dinamic Header Scroll behaviour 
    description: add or remove class to header if is scroll 0 or no
    note: It's neccesary to add id="header" to html tag header
*/

jQuery(document).ready(function( $ ){
	
	var move = 0;
	
    jQuery(window).scroll(function() {
		var scrollPosition= jQuery(window).scrollTop();
		
		if (scrollPosition <= 0) {
			move = 0;
		} else if (scrollPosition > 0) {
			move ++;
		}
		
		if (move == 0) {
			console.log('top = 0');
			jQuery(header).animate({
				"padding-top" : "20px",
				"padding-bottom" : "20px",
				"background-color" : "#AB1419"
			}, "slow" );
			jQuery("#header svg").animate({
				"width" : "100%"
			}, "slow" );
		} else if (move == 1) {
			console.log('top > 0');
			jQuery(header).animate({
				"padding-top" : "0px",
				"padding-bottom" : "0px",
				"background-color" : "#000000"
			}, "slow" );
			jQuery("#header svg").animate({
				"width" : "85%"
			}, "slow" );
		}
	});
});