Responsive-Timeline-Slider
==========================

This is a responsive timeline slider. 

Instructions 
==========================

Essentially this is a timeline scroller. Very simple jQuery is used to make it work.

Initialise by using the following

~~~
 $().timeline({

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

});

~~~

Example markup 

~~~
<section id="content">						
	<div class="date-caption">
		<div id="timeline">
		<div id="dates">
			<div><a href="#1">title</a></div>
		</div>
		<div id="issues">
			<div id="1" class="historyEntry">
				<img src="image" class="timelineImage">
				<h2>Title</h2>
				<p>Description</p>
			</div>
		</div>
		<div id="grad_left"></div>
		<div id="grad_right"></div>
	</div>
</div>	
~~~

Notes
=====

Essentially, this is a two tier image scroller. It auto resizes on screen change, And has some markup for mobile devices. There is some basic SASS included.
