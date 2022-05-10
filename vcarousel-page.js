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
    }, 50);
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

    function wheel(e){
        var delta = e.deltaY;
        var timeNow = performance.now();

        if (delta > 0 && ( scrollingDirection != 1 || timeNow > lastScroll + scrollIdleTime) && sectionNow < totalSections - 1 ) {
            sectionNow = stepDown(sectionNow, sections);
            scrollingDirection = 1;
        } else if (delta < 0 && ( scrollingDirection != 2 || timeNow > lastScroll + scrollIdleTime) && sectionNow > 0) {
            sectionNow = stepUp(sectionNow, sections);
            console.log("up");
            scrollingDirection = 2;
        }

        lastScroll = timeNow;
    }
}

/*M. MAIN FUNCION*/
function main(selectorSection) {
    const totalSections = jQuery(selectorSection).children().length;
    const sections = jQuery(selectorSection).children();

    scrollListenerOn(totalSections, sections);
}

main(".elementor-inner > .elementor-section-wrap");