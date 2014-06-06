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
		issuesDiv: 					'#issues',			// value: any HTML tag or #id, default to #issues
		issuesSelectedClass: 		'selected',			// value: any class, default to selected
		issuesSpeed: 				'medium',				// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
		issuesTransparency: 		0.2,				// value: integer between 0 and 1 (recommended), default to 0.2
		issuesTransparencySpeed: 	500,				// value: integer between 100 and 1000 (recommended), default to 500 (normal)
		startAt: 					1,					// value: integer, default to 1 (first)
	}, options);

	$(function(){
		
		var howManyDates = $(opts.datesDiv+' div').length;
		var howManyIssues = $(opts.issuesDiv+' div').length;
		var currentDate = $(opts.datesDiv).find('a.'+opts.datesSelectedClass);
		var currentIssue = $(opts.issuesDiv).find('div.'+opts.issuesSelectedClass);
		var widthContainer = $(opts.containerDiv).width();
		var widthIssues = widthContainer;
		var widthDates = $(opts.datesDiv).width();
		var widthDate = 100;
		
		// Dynamically set the width of the slide
		$('body').find('.historyEntry').css('width', widthContainer);

		// set positions!
			
		$(opts.issuesDiv).width(widthContainer*howManyIssues);
		$(opts.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
		
		defaultPositionDates = parseInt($(opts.datesDiv).css('marginLeft').substring(0,$(opts.datesDiv).css('marginLeft').indexOf('px')));
		$(opts.datesDiv+' a').click(function(event){
			event.preventDefault();

			var currentIndex = $(this).parent().prevAll().length;
			
			$(opts.issuesDiv).animate({
					'marginLeft':-widthContainer*currentIndex
				},{
					queue:false, duration:opts.issuesSpeed
			});
			
			$(opts.issuesDiv+' div').animate().removeClass(opts.issuesSelectedClass).eq(currentIndex).addClass(opts.issuesSelectedClass).fadeTo(opts.issuesTransparencySpeed,1);
			
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