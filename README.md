Responsive Timeline Slider
==========================

This is a responsive timeline slider. 

Instructions 
==========================

Essentially this is a timeline scroller. Very simple jQuery is used to make it work.

Initialise by using the following

~~~

$().timeline({
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
</div>						
~~~

Notes
=====

Essentially, this is a two tier image scroller. It auto resizes on screen change, And has some markup for mobile devices. There is some basic SASS included.
