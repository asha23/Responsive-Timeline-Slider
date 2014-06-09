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
	
	// Grab the current window size so we know what it is
	var  windowSize = $(window).width();
	
	// Make these variables globals

	var device = false;
	var windowType = "";
	var isTablet = false;
	
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
		device = isMobile.any();
	}
						
	isDeviceMobile();
		
	// Are we a mobile device?
	
	if (device != false) {
		var mobileDevice = true;
	}
	
	// If not, initialise the timeline
	
	if (mobileDevice != true) {
		launchTimeline();
	}
	
	// Check for tablet if it's Android/Blackberry... A tad hacky this, but it works
	
	function checkDeviceType () {
		if (windowSize <= 1024 && windowSize >= 769 && device=="Android" || windowSize <= 1024 && windowSize >= 601 && device=="Blackberry") {
		
			windowType = "tablet-landscape"; // just for reference
			isTablet = true;
			
		} else if (windowSize <= 768 && device=="Android" || windowSize <= 600 && device=="Blackberry") {
		
			windowType = "tablet-portrait"; // just for reference
			isTablet = true;
		}
	}
	
	// If I'm a tablet then launch the timeline
	
	if (device == "iPad" || isTablet == true) {
		launchTimeline();
	}
	
	// Orientation change for tablets.

	$( window ).on( "orientationchange", function( event ) {
	    windowSize = $(window).width();
	    checkDeviceType();
	    if (isTablet == true || device == "iPad") {
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
		        if(mobileDevice != true) {
					launchTimeline();
				}
	        }, 100);
	    });
	});

};