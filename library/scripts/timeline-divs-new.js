/* ----------------------------------
jQuery timeline version 1
---------------------------------- */

jQuery.fn.timeline = function(options){

	// default plugin opts
	var opts = jQuery.extend({
		orientation: 				'horizontal',		// value: horizontal | vertical, default to horizontal
		containerDiv: 				'#timeline',		// value: any HTML tag or #id, default to #timeline
		datesDiv: 					'#dates',			// value: any HTML tag or #id, default to #dates
		datesSelectedClass: 		'selected',			// value: any class, default to selected
		datesSpeed: 				'slow',				// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
		slideDiv: 					'#issues',			// value: any HTML tag or #id, default to #issues
		slideSelectedClass: 		'selected',			// value: any class, default to selected
		slideSpeed: 				'medium',				// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
		slideTransparency: 		0.2,				// value: integer between 0 and 1 (recommended), default to 0.2
		slideTransparencySpeed: 	500,				// value: integer between 100 and 1000 (recommended), default to 500 (normal)
		startAt: 					1,					// value: integer, default to 1 (first)
	}, options);

	$(function(){
		
		var howManyDates = $(opts.datesDiv+' div').length;
		var howManySlides = $(opts.slideDiv+' div').length;
		var currentDate = $(opts.datesDiv).find('a.'+opts.datesSelectedClass);
		var currentIssue = $(opts.slideDiv).find('div.'+opts.slideSelectedClass);
		var widthContainer = $(opts.containerDiv).width();
		var widthSlide = widthContainer;
		var widthDates = $(opts.datesDiv).width();
		var widthDate = 100;
		
		// Dynamically set the width of the slide
		$('body').find('.historyEntry').css('width', widthContainer);

		// set positions!
			
		$(opts.slideDiv).width(widthContainer*howManySlides);
		$(opts.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
		
		defaultPositionDates = parseInt($(opts.datesDiv).css('marginLeft').substring(0,$(opts.datesDiv).css('marginLeft').indexOf('px')));
		$(opts.datesDiv+' a').click(function(event){
			event.preventDefault();

			var currentIndex = $(this).parent().prevAll().length;
			
			$(opts.issuesDiv).animate({
					'marginLeft':-widthContainer*currentIndex
				},{
					queue:false, duration:opts.slideSpeed
			});
			
			$(opts.slideDiv+' div').animate().removeClass(opts.slideSelectedClass).eq(currentIndex).addClass(opts.slideSelectedClass).fadeTo(opts.slideTransparencySpeed,1);
			
			$(opts.datesDiv+' a').removeClass(opts.datesSelectedClass);
			
			$(this).addClass(opts.datesSelectedClass);
			
			$(opts.datesDiv).animate({
				'marginLeft':defaultPositionDates-(widthDate*currentIndex)
				} , {
					queue:false, 
					duration:'opts.datesSpeed'
				});
			});

		$(opts.datesDiv+' div').eq(opts.startAt-1).find('a').trigger('click');
	});
};