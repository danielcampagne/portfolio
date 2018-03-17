'use strict';

var screenFactor = 1.4;
var isLoaded = false;


/// Preload
$( window ).on( "load", function(){
	$('body').fadeIn(1500);
	isLoaded = true
});

// Set factor for font sizes
function checkPosition() {
if ($(window).innerWidth() <= 1346) {
		screenFactor = 1;
    // } else if ($(window).innerWidth() <= 700) {
        
    }
}
checkPosition();




$( document ).ready(function() {

	 //////// Bottler 

	var header = new Blotter.Text("Daniel Campagne — Digital Designer", {
		family : "-apple-system-headline, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : Math.round(50 * screenFactor),
		fill : "#000",
		paddingTop: Math.round(100 * screenFactor),
		paddingBottom: Math.round(100 * screenFactor),
		paddingLeft: Math.round(60 * screenFactor),
		paddingRight: Math.round(60 * screenFactor),
	});

	var kirsi = new Blotter.Text("Kirsi Sabri", {
		family : "-apple-system-headline, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 90 * screenFactor,
		fill : "#000",
		paddingTop: Math.round(100 * screenFactor),
		paddingBottom: Math.round(100 * screenFactor),
		paddingLeft: Math.round(120 * screenFactor),
		paddingRight: Math.round(120 * screenFactor),
	});

	var moj = new Blotter.Text("My Own Jupiter", {
		family : "-apple-system-headline, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 80 * screenFactor,
		fill : "#000",
		paddingTop: Math.round(100 * screenFactor),
		paddingBottom: Math.round(100 * screenFactor),
		paddingLeft: Math.round(120 * screenFactor),
		paddingRight: Math.round(120 * screenFactor),
	});

	var junait = new Blotter.Text("Junait", {
		family : "-apple-system-headline, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 90 * screenFactor,
		fill : "#000",
		paddingTop: Math.round(100 * screenFactor),
		paddingBottom: Math.round(100 * screenFactor),
		paddingLeft: Math.round(120 * screenFactor),
		paddingRight: Math.round(120 * screenFactor),
	});

	var confapp = new Blotter.Text("ConfApp", {
		family : "-apple-system-headline, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 90 * screenFactor,
		fill : "#000",
		paddingTop: Math.round(100 * screenFactor),
		paddingBottom: Math.round(100 * screenFactor),
		paddingLeft: Math.round(120 * screenFactor),
		paddingRight: Math.round(120 * screenFactor),
	});

	var jerszy = new Blotter.Text("Jerszy Seymour", {
		family : "-apple-system-headline, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 80 * screenFactor,
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

	if (window.devicePixelRatio > 1) {
		var isRetina = true;
		$('.title').hide();
		$('.title--alternative').css("display","flex");
		console.log('ahora');
	} 

	var scope = blotter.forText(header);
	material.uniforms.uOffset.value = 0;
	scope.appendTo($(".title"));

	console.log(scope);

	///// Generate index
	var projectsIndex = $(".project").toArray();

	console.log(projectsIndex.length);
	for (var i = 0; i < projectsIndex.length; i++) {
		console.log(i);
		console.log(blotter._texts[i].value);

		$(".project__nav").append('<a href="#' + projectsIndex[i].id +'" ><span class="project__nav__line"></span><span class="project__nav__name">' + blotter._texts[i + 1].value + '</span></a>');
	}
	//console.log(projectsIndex[0]);


	///// Project on viewport
	var $sections = $('.wrapper--projects section');

	function markVisible() {
		lastProject = $('.most-visible').attr('id');
		currentProject = $sections.mostVisible().attr('id');
		if (currentProject !== lastProject) {
			$sections.removeClass('most-visible').mostVisible().addClass('most-visible');		
			setCurrentTitle();
		}

	}

	///// Set Current Title
	var lastProject, currentProject;;
	function setCurrentTitle() {
		var scope = blotter.forText(eval(currentProject));
		$(".title").html("");
		$(".title--alternative").html(scope.text.value).css({
			"font-size": scope.text._properties.size,
			"font-weight": scope.text._properties.weight
		});
		scope.appendTo($(".title"));
	}

	//// Define Transformation on scroll
	function setTransformation(value) {
		var valueProcessed;
		if (value <= 0.75) {
			valueProcessed = (value - 0.75) * 4 + 1;
			if (isRetina) {
			 	$('.title').show();
			 	$('.title--alternative').hide();
			 	console.log('show blotter');
			} else {
				$('.title--alternative').hide();
			}

		} else {
			valueProcessed = 1;
			if (isRetina) {
			 	$('.title').hide();
			 	$('.title--alternative').show();
			 	console.log('hide blotter');
			}
		}
		$('.project__description').css('opacity',valueProcessed);
		material.uniforms.uOffset.value = 1 - valueProcessed;
	}


	///// Listener

	markVisible();

	document.addEventListener('scroll', (evt) => {
		markVisible();
		setTransformation($('.most-visible').ratioVisible());
		// console.log($('.most-visible').ratioVisible());
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


