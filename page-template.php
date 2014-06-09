<section id="content">						
	<div class="date-caption">
		<div id="timeline">
		
			<div id="dates">
				<div><a href="#1">Feb 17th 1942</a></div>
				<div><a href="#2">March 18th 1951</a></div>
			</div>
			<div id="issues">
				<div id="1" class="historyEntry">
					<img src="image" class="timelineImage">
					<h2>Title</h2>
					<p>Description</p>
				</div>
				<div id="2" class="historyEntry">
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
			
<script type="text/javascript">
				
$( document ).ready(function() {

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
	
	
});
</script>
