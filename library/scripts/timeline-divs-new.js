/* ----------------------------------
jQuery timeline version 1.2
Author: Ash Whiting
---------------------------------- */

jQuery.fn.timeline = function(options){

	// default plugin options
	var options = jQuery.extend({
		containerDiv:                        '#timeline',		
		datesDiv:                            '#dates',			
		datesSelectedClass:                  'selected',			
		datesSpeed:                          'slow',				
		slideDiv:                            '#issues',			
		slideSelectedClass:                  'selected',			
		slideSpeed:                          'medium',			
		slideTransparency:                   0.2,				
		slideTransparencySpeed:              500,				
		startAt:                             1
	}, options);

	$(function(){
		
		var howManyDates = $(options.datesDiv+' div').length;
		var howManySlides = $(options.slideDiv+' div').length;
		var currentDate = $(options.datesDiv).find('a.'+options.datesSelectedClass);
		var currentSlide = $(options.slideDiv).find('div.'+options.slideSelectedClass);
		var widthContainer = $(options.containerDiv).width();
		var widthSlide = widthContainer;
		var widthDates = $(options.datesDiv).width();
		var widthDate = 100;
		
		// Dynamically set the width of the slide
		
		$('body').find('.historyEntry').css('width', widthContainer);

		// set positions!
			
		$(options.slideDiv).width(widthContainer*howManySlides);
		$(options.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
		
		defaultPositionDates = parseInt($(options.datesDiv).css('marginLeft').substring(0,$(options.datesDiv).css('marginLeft').indexOf('px')));
		$(options.datesDiv+' a').click(function(event){
			event.preventDefault();

			var currentIndex = $(this).parent().prevAll().length;
			
			$(options.issuesDiv).animate({
					'marginLeft':-widthContainer*currentIndex
				},{
					queue:false, duration:options.slideSpeed
			});
			
			$(options.slideDiv+' div').animate().removeClass(options.slideSelectedClass).eq(currentIndex).addClass(options.slideSelectedClass).fadeTo(options.slideTransparencySpeed,1);
			
			$(options.datesDiv+' a').removeClass(options.datesSelectedClass);
			
			$(this).addClass(options.datesSelectedClass);
			
			$(options.datesDiv).animate({
					'marginLeft':defaultPositionDates-(widthDate*currentIndex)
				} , {
					queue:false, 
					duration:'options.datesSpeed'
				});
			});

		$(options.datesDiv+' div').eq(options.startAt-1).find('a').trigger('click');
	});
	
	
	// Client side 
	// ******************************************************************************
	
	// Make these variables an obj

	var global = {
		windowSize:     $(window).width(),
		device:         false,
		windowType:     "",
		isTablet:       false
	};
	
	// timeline initialisation event - boom
	
	function launchTimeline() {
        $().timeline();
	}
	
	function isDeviceMobile(){
		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPod/i);
			},
			iPad: function() {
				return navigator.userAgent.match(/iPad/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/webOS/i) ;
			},
			any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.iPad() || isMobile.Opera() || isMobile.Windows());
			}
		};      
		global.device = isMobile.any();
	}
						
	isDeviceMobile();
		
	// Are we a mobile device?
	
	if (global.device) {
		var mobileDevice = true;
	}
	
	// If not, initialise the timeline
	
	if (!global.device) {
		launchTimeline();
	}
	
	// Check for tablet if it's Android/Blackberry... A tad hacky this, but it works
	
	function checkDeviceType () {
		if (global.windowSize <= 1024 && global.windowSize >= 769 && global.device=="Android" || global.windowSize <= 1024 && global.windowSize >= 601 && global.device=="Blackberry") {
		
			global.windowType = "tablet-landscape"; // just for reference
			global.isTablet = true;
			
		} else if (global.windowSize <= 768 && global.device=="Android" || global.windowSize <= 600 && global.device=="Blackberry") {
		
			global.windowType = "tablet-portrait"; // just for reference
			global.isTablet = true;
		}
	}
	
	// If I'm a tablet then launch the timeline
	
	if (global.device === "iPad" || global.isTablet) {
		launchTimeline();
	}
	
	// Orientation change for tablets.

	$( window ).on( "orientationchange", function( event ) {
	    windowSize = $(window).width();
	    checkDeviceType();
	    if (global.isTablet || global.device === "iPad") {
			launchTimeline();
		}
	});
	
	// Bind the resizing with caveats (Don't do it on a mobile device, or Android tablets)
	
	$(window).bind('resize', function(e){
	    window.resizeEvt;
	    $(window).resize(function(){
	        clearTimeout(window.resizeEvt);
	        window.resizeEvt = setTimeout(function(){
	        	// Exclude mobile devices.
		        if(!global.device) {
					launchTimeline();
				}
	        }, 100);
	    });
	});

};