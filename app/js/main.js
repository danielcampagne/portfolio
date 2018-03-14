'use strict';
$( document ).ready(function() {

	 //////// Bottler 

	var header = new Blotter.Text("Daniel Campagne \u2013 Digital Designer", {
		family : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 70,
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
		autobuild : false
	});

	blotter.needsUpdate = true;

	var scope = blotter.forText(header);
	
	material.uniforms.uOffset.value = 0;

	scope.appendTo($(".title"));


	///// Project on viewport

	var lastProject, currentProject;;
	var $sections = $('.wrapper-projects section');

	function checkVisibility() {
		lastProject = $('.most-visible').attr('id');
		currentProject = $sections.mostVisible().attr('id');
		if (currentProject !== lastProject) {
			$sections.removeClass('most-visible').mostVisible().addClass('most-visible');
			
			/// Change title
			var scope = blotter.forText(eval(currentProject));
			$(".title").html("");
			scope.appendTo($(".title"));
			console.log(currentProject);
		}

	}

	///// Percentage of visible project

	$.fn.ratioVisible = function() {
		var returnValue;
		var $win = $(window),
			wh = $win.height(),
			vp = {
				top: $win.scrollTop(),
				bottom: wh
			},
		  $el = $(this),
		  elbox = $el.offset();
		vp.bottom +=vp.top;
		elbox.bottom = elbox.top + $el.height();
		if(elbox.bottom >= vp.top && elbox.top <= vp.bottom) {
			if(elbox.bottom < vp.bottom) {
				returnValue = (elbox.bottom-vp.top) / wh;
				return returnValue;
			} else if(elbox.top > vp.top) {
				returnValue = (vp.bottom-elbox.top) / wh;
				return returnValue;
			}
		  return 1;
		}
		return 0;
	}

	///// Add transitions

	function setOpacity(value) {
		var valueProcessed;
		if (value <= 0.75) {
			valueProcessed = (value - 0.75) * 4 + 1;
			console.log(valueProcessed);
		} else {
			valueProcessed = 1;
		}
		//console.log('value valueProcessed',Math.abs(valueProcessed));
		//$('#text').css('opacity',valueProcessed);
		material.uniforms.uOffset.value = 1 - valueProcessed;
	}


	///// Listener

	checkVisibility();

	$(window).on('scroll', function () {
		checkVisibility();
		//console.log($('.most-visible').ratioVisible());
		setOpacity($('.most-visible').ratioVisible());
	});

});

$( window ).on( "load", function() {


})
