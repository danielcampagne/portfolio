'use strict';

var screenFactor = 1.4;
var isLoaded = false;

/// Preload
$( window ).on( "load", function(){
	isLoaded = true
    $('.preloader').hide();
    $('body').removeClass('preloader-site');
});

// Set factor for font sizes
function checkPosition() {
if ($(window).innerWidth() < 700) {
		screenFactor = 0.7;	
	} else if ($(window).innerWidth() < 1346) {
		screenFactor = 1;
	}
}

checkPosition();
console.log(screenFactor);

// Check if it's a retina display

if (window.devicePixelRatio > 1) {
	var isRetina = true;
	$('.title').hide();
	$('.title--alternative').css("display","flex");
} 

// Check if it's a mobile browser

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	isMobile = true;
}

$( document ).ready(function() {
	//////// Projects Oject * Remember to duplicate the information here.
	if (isMobile) {
		var projects = {	
			"header" : {
				text :"Daniel Campagne — Digital Designer", 
				size: Math.round(55 * screenFactor)
			},
			"kirsi" : {
				text :"Kirsi Sabri", 
				size: Math.round(90 * screenFactor)
			},
			"moj" : {
				text :"My Own Jupiter",
				size: Math.round(80 * screenFactor)
			},
			"junait" : {
				text :"Junait",
				size: Math.round(90 * screenFactor)
			},
			"confapp" : {
				text :"ConfApp",
				size: Math.round(90 * screenFactor)
			},
			"jerszy" : {
				text :"Jerszy Seymour",
				size: Math.round(80 * screenFactor)
			}

		};
	}
console.log(50 * screenFactor);

	 //////// Bottler 
	if (!isMobile) {
		var header = new Blotter.Text("Daniel Campagne, Digital Designer", {
			family : "'bold', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
			weight: "bold",
			size : Math.round(55 * screenFactor),
			fill : "#000",
			paddingTop: Math.round(100 * screenFactor),
			paddingBottom: Math.round(100 * screenFactor),
			paddingLeft: Math.round(60 * screenFactor),
			paddingRight: Math.round(60 * screenFactor),
		});

		var kirsi = new Blotter.Text("Kirsi Sabri", {
			family : "'bold', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
			weight: "bold",
			size : Math.round(105 * screenFactor),
			fill : "#000",
			paddingTop: Math.round(100 * screenFactor),
			paddingBottom: Math.round(100 * screenFactor),
			paddingLeft: Math.round(120 * screenFactor),
			paddingRight: Math.round(120 * screenFactor),
		});

		var moj = new Blotter.Text("My Own Jupiter", {
			family : "'bold', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
			weight: "bold",
			size : Math.round(100 * screenFactor),
			fill : "#000",
			paddingTop: Math.round(100 * screenFactor),
			paddingBottom: Math.round(100 * screenFactor),
			paddingLeft: Math.round(120 * screenFactor),
			paddingRight: Math.round(120 * screenFactor),
		});

		var junait = new Blotter.Text("Junait", {
			family : "'bold', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
			weight: "bold",
			size : Math.round(90 * screenFactor),
			fill : "#000",
			paddingTop: Math.round(100 * screenFactor),
			paddingBottom: Math.round(100 * screenFactor),
			paddingLeft: Math.round(120 * screenFactor),
			paddingRight: Math.round(120 * screenFactor),
		});

		var confapp = new Blotter.Text("ConfApp", {
			family : "'bold', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
			weight: "bold",
			size : Math.round(90 * screenFactor),
			fill : "#000",
			paddingTop: Math.round(100 * screenFactor),
			paddingBottom: Math.round(100 * screenFactor),
			paddingLeft: Math.round(120 * screenFactor),
			paddingRight: Math.round(120 * screenFactor),
		});

		var jerszy = new Blotter.Text("Jerszy Seymour", {
			family : "'bold', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
			weight: "bold",
			size : Math.round(80 * screenFactor),
			fill : "#000",
			paddingTop: Math.round(100 * screenFactor),
			paddingBottom: Math.round(100 * screenFactor),
			paddingLeft: Math.round(120 * screenFactor),
			paddingRight: Math.round(120 * screenFactor),
		});

		var material = new Blotter.ChannelSplitMaterial();
		material.uniforms.uRotation.value = 140;

		var blotter = new Blotter(material, { 
			texts : [header, kirsi, moj, junait, confapp, jerszy],
			ratio: 1
		});

		var scope = blotter.forText(header);
		material.uniforms.uOffset.value = 0;
		scope.appendTo($(".title"));

		///// Generate index
		var projectsIndex = $(".project").toArray();

		for (var i = 0; i < projectsIndex.length; i++) {
			$(".project__nav").append('<a class="project__nav__link project__nav__link--' + projectsIndex[i].id + ' " href="#' + projectsIndex[i].id +'" ><span class="project__nav__line"></span><span class="project__nav__name">' + blotter._texts[i + 1].value + '</span></a>');
		}
				//$('.project__nav__link').animatescroll();

	}


	///// Project on viewport
	var $sections = $('.wrapper--projects section');

	function markVisible() {
		lastProject = $('.most-visible').attr('id');
		currentProject = $sections.mostVisible().attr('id');
		if (currentProject !== lastProject) {
			if (currentProject === 'header') {
				$('.project__nav').fadeOut('slow');
			} else {
				if (lastProject === 'header') {
					$('.project__nav').fadeIn('slow');
				}
			}
			$sections.removeClass('most-visible').mostVisible().addClass('most-visible');		
			$('.project__nav__link').removeClass('active');
			$('.project__nav__link--' + currentProject + '').addClass('active');
			setCurrentTitle();
		}

	}

	///// Set Current Title
	var lastProject, currentProject, scopeMobile;
	function setCurrentTitle() {
		if (!isMobile) {
			var scope = blotter.forText(eval(currentProject));
			$(".title").html("");
			$(".title--alternative").html(scope.text.value).css({
				"font-size": scope.text._properties.size,
				"font-weight": scope.text._properties.weight
			});
			scope.appendTo($(".title"));
		} else {
				scopeMobile = projects[currentProject].text;
				$(".title--alternative").html(scopeMobile).css("font-size",projects[currentProject].size);
		} 
	}
	//// Define Transformation on scroll
	function setTransformation(value) {
		var valueProcessed;
		if (value <= 0.75) {
			valueProcessed = (value - 0.75) * 4 + 1;
			if (isRetina) {
			 	$('.title').show();
			 	if (!isMobile) {
			 		$('.title--alternative').hide();
			 	} 
			} else {
				$('.title--alternative').hide();
			}
		} else {
			valueProcessed = 1;
			if (isRetina) {
			 	$('.title').hide();
			 	$('.title--alternative').show();
			}
		}
		$('.project__description').css('opacity',valueProcessed);
		if (!isMobile) {
			material.uniforms.uOffset.value = 1 - valueProcessed;
		}
	}


	///// Listener

	markVisible();
	var firstScroll = true;
	document.addEventListener('scroll', (evt) => {
		if (firstScroll) {
			firstScroll = false
			$(".scroll-down").fadeOut("fast");
		}
		markVisible();
		setTransformation($('.most-visible').ratioVisible());
	}, {
	  capture: true,
	  passive: true
	});


	////// Parallax elements


	const easeBoxes = []

	// Create an animation for each ease box. Each with a different timing.
	document.querySelectorAll('.easeBox').forEach((elem, i) => {

	  // Get the timing from the data attribute.
	  // You can also hard-code the timing, but for the demo it's easier this way. -> Not used
	  const timing = elem.getAttribute('data-timing');

	  // Crate an instance for the current element and store the instance in an array.
	  // We start the animation later using the instances from the array.
	  easeBoxes.push(basicScroll.create({
	    elem: elem,
	    from: 'bottom-bottom',
	    to: 'bottom-top',
	    direct: true,
	    props: {
	      '--ty': {
	        from: '300px',
	        to: '0',
	        timing: 'backInOut'
	      }
	    }
	  }))

	});

	easeBoxes.forEach((easeBox) => easeBox.start());



	///// Snow overlay
	$('.overlay__toggle').click(function(){
		$('body').toggleClass('navigation-open');
		$('.hamburger').toggleClass('is-active');
	});

	//// Header hijack 

});


