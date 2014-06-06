<?php
/*
	Template Name: History
*/
get_header();
?>


		<div class="contentBox sideBar headerBox">
			<?php dynamic_sidebar('Left'); ?>
		</div>
		
		</div><!-- .fourCol -->
		
		<div class="eightCol lastCol">
		
			<section id="content">
				
				<?php if (is_active_sidebar('Top')) : ?>
					<section id="top">
						<?php dynamic_sidebar('Top'); ?>
					</section>
				<?php endif; ?>
		
				<?php while ( have_posts() ) : the_post(); ?>
					<h2><?php the_title(); ?></h2>					
					<?php the_content(); ?>
				
				<?php
				
				$events = array(); $i = 0;
				$events_query = new WP_Query(array( 'post_type' => 'history-event', 'posts_per_page' => -1 ));
				if($events_query->have_posts()) {
					while($events_query->have_posts()) {
						$events_query->the_post();
						$events[$i]->title = get_the_title();
						$events[$i]->description = get_the_content();
						$img = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'history-thumb');
						if ($img) {
						    $events[$i]->thumbnail = esc_attr($img[0]);
						}	
						$i++;
					}
				}
				wp_reset_postdata();
				
				?>
							
					<div class="date-caption">
				    <div id="timeline">
				       
				        <div id="dates">
				            <?php
				            $i = 1;
				            foreach($events as $event) {
				            	?>
				            	<div><a href="#<?php echo $i; ?>"><?php echo $event->title; ?></a></div>
				            	<?php
				            	$i++;
				            }
				            ?>
				        </div>
				        <div id="issues">
				        	<?php
				            $i = 1;
				            foreach($events as $event) {
				            	?>
				            	<div id="<?php echo $i; ?>" class="historyEntry">
					        	    <img src="<?php echo $event->thumbnail; ?>" class="timelineImage">
									<h2><?php echo $event->title; ?></h2>
									<p><?php echo $event->description; ?></p>
				            	</div>
				            	<?php
				            	$i++;
				            }
				            ?>
				        </div>
				        <div id="grad_left"></div>
				        <div id="grad_right"></div>
				    </div>
				</div>					

					
				<?php endwhile; ?>
	
				<?php if (is_active_sidebar('Bottom')) : ?>
					<section id="bottom">
						<?php dynamic_sidebar('Bottom'); ?>
					</section>
				<?php endif; ?>
		
			</section> <!-- #content -->
	
		<?php if (is_active_sidebar('Right')) : ?>
			<section id="right">
				<?php dynamic_sidebar('Right'); ?>
			</section>
		<?php endif; ?>
		
		</div><!-- .eightCol -->
		
	</div><!-- .wrapper -->
		

<?php get_footer(); ?>

<script type="text/javascript">
				
$( document ).ready(function() {

	// Grab the current window size so we know what it is
	var  windowSize = $(window).width();
	
	// Make these variables globals

	var device = "";
	var windowType = "";
	var isTablet = false;
	// timeline initialisation event
	
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
	
	if (device == "iPhone" || device == "BlackBerry" || device == "Windows" || device == "Opera" || device == "Android" || device == "iPad") {
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
