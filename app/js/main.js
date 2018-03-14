'use strict';
$( document ).ready(function() {

	 //////// Bottler 

	var text = new Blotter.Text("Daniel Campagne \u2013 Digital Designer", {
		family : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
		weight: "bold",
		size : 70,
		fill : "#000",
		paddingTop: 100,
		paddingBottom: 100,
		paddingLeft: 100,
		paddingRight: 100,
	});

	var material = new Blotter.ChannelSplitMaterial();
	material.uniforms.uRotation.value = 140;
	var blotter = new Blotter(material, { texts : text });
	var scope = blotter.forText(text);
	scope.appendTo($(".title"));

	///// Project on viewport

	var $sections = $('.project');
	function checkVisibility() {
	  $sections.removeClass('most-visible').mostVisible({percentage: false}).addClass('most-visible');
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
	} else {
		valueProcessed = 1;
	}
	console.log('value valueProcessed',Math.abs(valueProcessed));
	//$('#text').css('opacity',valueProcessed);
	material.uniforms.uOffset.value = 1 - valueProcessed;
	}

	///// Change title

	function toggleTittle() {

	}

	///// Listener

	checkVisibility();

	$(window).on('scroll', function () {
		checkVisibility();
		console.log($('.most-visible').ratioVisible());
		setOpacity($('.most-visible').ratioVisible());
	});

});

$( window ).on( "load", function() {


})
