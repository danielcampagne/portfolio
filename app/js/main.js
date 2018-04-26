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
	} else {
		screenFactor = 1.8;
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
			size: Math.round(38 * screenFactor)
			//size: "5vmax"
		},
		"confapp" : {
			text :"ConfApp",
			size: Math.round(95 * screenFactor)
		},
		"junait" : {
			text :"Junait",
			size: Math.round(95 * screenFactor)
		},
		"kirsi" : {
			text :"Kirsi Sabri", 
			size: Math.round(90 * screenFactor)
		},
		"moj" : {
			text :"My Own Jupiter",
			size: Math.round(56 * screenFactor)
		}
		// "jerszy" : {
		// 	text :"Jerszy Seymour",
		// 	size: Math.round(80 * screenFactor)
		// }
	};
	// Check project on viewport
	var sections = $('.wrapper--projects section');
	var currentProject, lastProject;
	function markVisible() {
		lastProject = $('.most-visible').attr('id');
		currentProject = sections.mostVisible().attr('id');
		if (currentProject !== lastProject) {
			sections.removeClass('most-visible').mostVisible().addClass('most-visible');
			setCurrentTitle();
		}


		// if (projects.indexOf(currentProject) === projects.lenght) {
		// } 
	}
	markVisible();

	///// Set Current Title
	var scopeMobile;
	function setCurrentTitle() {
		scopeMobile = projects[currentProject].text;
		if (projects[currentProject].text === "Daniel Campagne — Digital Designer") {
			if (screenFactor === 0.7) {
				$(".title--alternative").html("Daniel Campagne<br/>Digital Designer").css("font-size",projects[currentProject].size);
				console.log('ss');
			} else {
				$(".title--alternative").html(scopeMobile).css("font-size",projects[currentProject].size);
			}
		} else {
			$(".title--alternative").html(scopeMobile).css("font-size",projects[currentProject].size);
		}

		if ((Object.keys(projects).indexOf(currentProject) + 1) === Object.keys(projects).length) {
			$('.arrows').addClass('end');
		} else {
			$('.arrows').removeClass('end');
		}
		if ((Object.keys(projects).indexOf(currentProject)) === 0) {
			$('.arrows').fadeOut("fast");
		} else {
			$('.arrows').fadeIn("fast");

		}
	}

	///// Arrow functions
	$('.arrows--down, #header').click(function(){
		console.log($('.most-visible').next());
		if($('.most-visible').next().length) {
			$('html,body').animate({scrollTop:$('.most-visible').next().offset().top - 100}, 600, 'swing');
		} else {
			$('html,body').animate({scrollTop:$('#header').next().offset().top - 100}, 600, 'swing');
		}
	
	});

	$('.arrows--up').click(function(){
		$('html,body').animate({scrollTop:$('.most-visible').prev().offset().top - 100}, 600, 'swing');
	});


	///// Snow overlay
	$('.overlay__toggle').click(function(){
		$('body').toggleClass('navigation-open');
		$('.hamburger').toggleClass('is-active');
		$(this).text(function(i, text){
          return text === "info" ? "close" : "info";
      	});
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

