/*1. ANIMATION FUNCTIONS */
/* for every .animate of section, add class fadeText */
function fadeText(section, direction) {
    if (direction == "down") {
        jQuery(section).find(".animate").each(function(i) {
            var seconds = i + 1.5;
            var value = 'fade-text-down '+ seconds +'s';
            jQuery(this).css('animation', value);
        });
    } else if (direction == "up") {
        jQuery(section).find(".animate").each(function(i) {
            var seconds = i + 1.5;
            var value = 'fade-text-up '+ seconds +'s';
            jQuery(this).css('animation', value);
        });
    }
}

function cleanAnimation(section) {
    jQuery(section).find(".animate").each(function() {
        jQuery(this).css("animation","");
    });
}

/*2. SCROLL FUNCTIONS */
function jumpToSelector(selector) {
    jQuery('html, body').animate({
        scrollTop: jQuery(selector).offset().top
    }, 10);
}

function stepDown(sectionNow, sections) {
    
    cleanAnimation(sections[sectionNow]);
    sectionNow++;
    jumpToSelector(sections[sectionNow]);
    fadeText(sections[sectionNow],"down");

    return sectionNow;
}

function stepUp(sectionNow, sections) {

    cleanAnimation(sections[sectionNow]);
    sectionNow--;
    jumpToSelector(sections[sectionNow]);
    fadeText(sections[sectionNow],"up");
    
    return sectionNow;
}

function scrollListenerOn(totalSections, sections) {
    var scrollingDirection = 0; //idle; 1 is down; 2 is up
    var lastScroll = 9999;
    var scrollIdleTime = 300; // time interval that we consider a new scroll event
    var sectionNow = 0;
	
    window.addEventListener('wheel',wheel);
    window.addEventListener('keydown', keyDown);

    /*PHONE SCROLL EVENT*/
	var ts = 0;
	window.addEventListener('touchstart', function (e) {
        if (jQuery(window).scrollTop() != undefined) {
            ts = jQuery(window).scrollTop();
        }
	});

	window.addEventListener('touchend', function (e){
	   var te = jQuery(window).scrollTop();
	   if (ts > te + 1) { //tochmove down
		    sectionNow = stepUp(sectionNow, sections);
	   }else if (ts < te - 1) { //tochmove up
		    sectionNow = stepDown(sectionNow, sections);
	   }
	});

    function wheel(e){
        var delta = e.deltaY;
        var timeNow = performance.now();

        if (delta > 0 && ( scrollingDirection != 1 || timeNow > lastScroll + scrollIdleTime) && sectionNow < totalSections - 1 ) {
            sectionNow = stepDown(sectionNow, sections);
            scrollingDirection = 1;
        } else if (delta < 0 && ( scrollingDirection != 2 || timeNow > lastScroll + scrollIdleTime) && sectionNow > 0) {
            sectionNow = stepUp(sectionNow, sections);
            scrollingDirection = 2;
        }

        lastScroll = timeNow;
    }

    function keyDown(e) {
        if(e.keyCode == 40 && sectionNow < totalSections - 1 )  { // keyboard down
            sectionNow = stepDown(sectionNow, sections);
        } else if(e.keyCode == 38 && sectionNow > 0 ) { //keyboard up
            sectionNow = stepUp(sectionNow, sections);
        }
    }
}

/*3. ADJUST 100% sections*/
function resizeSections(totalSections, sections) {
	var windowHeight = jQuery(window).height();
	for (i = 0; i < totalSections; i++) {
		jQuery(sections).eq(i).css('height', windowHeight);
	}
}

function resizeWindowOn(totalSections, sections) {
	jQuery(window).resize(function() {
		resizeSections(totalSections, sections);
	});
}

/*M. MAIN FUNCION*/
function main(selectorSection) {
    var totalSections = jQuery(selectorSection).children().length;
    var sections = jQuery(selectorSection).children();
	
	resizeSections(totalSections, sections);
	resizeWindowOn(totalSections, sections);
    scrollListenerOn(totalSections, sections);
}

jQuery(document).ready(function( $ ){
    main(".elementor-inner > .elementor-section-wrap");
});
