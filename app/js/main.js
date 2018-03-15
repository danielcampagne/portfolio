'use strict';
$( document ).ready(function() {

	 //////// Bottler 

	var header = new Blotter.Text("Daniel Campagne \u2013 Digital Designer", {
		family : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 65,
		fill : "#000",
		paddingTop: 100,
		paddingBottom: 100,
		paddingLeft: 100,
		paddingRight: 100,
	});

	var kirsi = new Blotter.Text("Kirsi Sabri", {
		family : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 90,
		fill : "#000",
		paddingTop: 100,
		paddingBottom: 100,
		paddingLeft: 100,
		paddingRight: 100,
	});

	var moj = new Blotter.Text("My Own Jupiter", {
		family : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 80,
		fill : "#000",
		paddingTop: 100,
		paddingBottom: 100,
		paddingLeft: 100,
		paddingRight: 100,
	});

	var junait = new Blotter.Text("Junait", {
		family : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 90,
		fill : "#000",
		paddingTop: 100,
		paddingBottom: 100,
		paddingLeft: 100,
		paddingRight: 100,
	});

	var confapp = new Blotter.Text("ConfApp", {
		family : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 90,
		fill : "#000",
		paddingTop: 100,
		paddingBottom: 100,
		paddingLeft: 100,
		paddingRight: 100,
	});

	var jerszy = new Blotter.Text("Jerszy Seymour", {
		family : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 80,
		fill : "#000",
		paddingTop: 100,
		paddingBottom: 100,
		paddingLeft: 100,
		paddingRight: 100,
	});

	var material = new Blotter.ChannelSplitMaterial();
	material.uniforms.uRotation.value = 140;

	var blotter = new Blotter(material, { 
		texts : [header, kirsi, moj, junait, confapp, jerszy],
		ratio: 1
	});

	if (window.devicePixelRatio == 1) {}   /// For a retina performance
	var scope = blotter.forText(header);
	material.uniforms.uOffset.value = 0;
	scope.appendTo($(".title"));



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
		scope.appendTo($(".title"));
	}

	//// Define Transformation on scroll
	function setTransformation(value) {
		var valueProcessed;
		if (value <= 0.75) {
			valueProcessed = (value - 0.75) * 4 + 1;
		} else {
			valueProcessed = 1;
		}
		$('.project__description').css('opacity',valueProcessed);
		material.uniforms.uOffset.value = 1 - valueProcessed;
	}


	///// Listener

	markVisible();

	document.addEventListener('scroll', (evt) => {

		markVisible();
		setTransformation($('.most-visible').ratioVisible());

	}, {
	  capture: true,
	  passive: true
	});

	///// Snow overlay
	$('.overlay__toggle').click(function(){
		$('body').toggleClass('navigation-open');
		$('.hamburger').toggleClass('is-active');
	});


});


