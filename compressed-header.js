/*Dinamic Header Scroll behaviour 
    description: add or remove class to header if is scroll 0 or no
    note: It's neccesary to add header id to header
*/

jQuery(document).ready(function( $ ){
    jQuery(window).scroll(function() {
		var scrollPosition= jQuery(window).scrollTop();
		if (scrollPosition != 0) {
			if (!(jQuery("#header").hasClass('compressed'))) {
				jQuery(header).addClass('compressed');
			}
		} else if ((scrollPosition == 0) && (jQuery("#header").hasClass('compressed'))) {
			jQuery(header).removeClass('compressed');
		}
	});
});