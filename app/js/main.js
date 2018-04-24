'use strict';

var screenFactor = 1.6;
var isLoaded = false;

// Preload
$( window ).on( "load", function(){
	isLoaded = true
    $('.preloader').hide();
    $('body').removeClass('preloader-site');
});

// Set factor for font sizes
function checkPosition() {
if ($(window).innerWidth() < 700) {
		screenFactor = 0.7;	
	} else if ($(window).innerWidth() < 1025) {
		screenFactor = 1.1;
	} else if ($(window).innerWidth() < 1370) {
		screenFactor = 1.4;
	}
}
checkPosition();

// Check if it's a retina display
if (window.devicePixelRatio > 1) {
	var isRetina = true;
} 

// Check if it's a mobile browser
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	isMobile = true;
}

// When the DOM is loaded...
$( document ).ready(function() {
	// Set project titles
	var projects = {	
		"header" : {
			text :"Daniel Campagne — Digital Designer", 
			size: Math.round(50 * screenFactor)
		},
		"kirsi" : {
			text :"Kirsi Sabri", 
			size: Math.round(95 * screenFactor)
		},
		"moj" : {
			text :"My Own Jupiter",
			size: Math.round(80 * screenFactor)
		},
		"junait" : {
			text :"Junait",
			size: Math.round(95 * screenFactor)
		},
		"confapp" : {
			text :"ConfApp",
			size: Math.round(95 * screenFactor)
		},
		"jerszy" : {
			text :"Jerszy Seymour",
			size: Math.round(80 * screenFactor)
		}
	};

	// Check project on viewport
	var sections = $('.wrapper--projects section');
	var currentProject, lastProject;
	function markVisible() {
		lastProject = $('.most-visible').attr('id');
		currentProject = sections.mostVisible().attr('id');
		console.log(currentProject);
		if (currentProject !== lastProject) {
			sections.removeClass('most-visible').mostVisible().addClass('most-visible');
			setCurrentTitle();
		}
	}
	markVisible();

	///// Set Current Title
	var scopeMobile;
	function setCurrentTitle() {
		scopeMobile = projects[currentProject].text;
		$(".title--alternative").html(scopeMobile).css("font-size",projects[currentProject].size);
	}

	///// Snow overlay
	$('.overlay__toggle').click(function(){
		$('body').toggleClass('navigation-open');
		$('.hamburger').toggleClass('is-active');
	});

	//// Image change z-index on click
	$(".project__image img").click(function() {
		$(this).parent().parent().parent().children('.level--top').removeClass('level--top');
		$(this).parent().parent().addClass('level--top');
		console.log($(this).parent().parent().parent().children('.level--top'));
	});

	//// Listener
	document.addEventListener('scroll', (evt) => {
		markVisible();
	}, { capture: true, passive: true });


});

