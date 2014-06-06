/* ----------------------------------
jQuery timeline version 1.2
Author: Ash Whiting

A heavily stripped-down version of Jquery Timelinr
http://www.csslab.cl/2011/08/18/jquery-timelinr/

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
		startAt:                             1,
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
};