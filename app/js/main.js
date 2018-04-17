'use strict';

var screenFactor = 1.6;
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


$( document ).ready(function() {
	//////// Projects Oject * Remember to duplicate the information here.
		var projects = {	
			"header" : {
				text :"Daniel Campagne — Digital Designer", 
				size: Math.round(50 * screenFactor)
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
  

	///// Generate index
	var projectsIndex = $(".project").toArray();

	for (var i = 0; i < projectsIndex.length; i++) {
		$(".project__nav").append('<a class="project__nav__link project__nav__link--' + projectsIndex[i].id + ' " href="#' + projectsIndex[i].id +'" ><span class="project__nav__line"></span><span class="project__nav__name">' + projects[projectsIndex[i].id].text + '</span></a>');
	}
	$('.project__nav__link').on('click', function(event){     
	    event.preventDefault();
	    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800, 'swing');
	});
	$('.scroll-down').on('click', function(event){     
	    event.preventDefault();
	    $('html,body').animate({scrollTop:$('.project').offset().top}, 800, 'swing');
	});




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
			console.log(currentProject);
		}

	}

	///// Set Current Title
	var lastProject, currentProject, scopeMobile;
	function setCurrentTitle() {
		scopeMobile = projects[currentProject].text;
		$(".title--alternative").html(scopeMobile).css("font-size",projects[currentProject].size);
	}
	//// Define Transformation on scroll
	function setTransformation(value) {
		var valueProcessed;
		if  (value <= 0.80) {
			valueProcessed = (value - 0.80) * 5 + 1;
		} else {
			valueProcessed = 1;
		}
		//$('.project__description').css('opacity',valueProcessed);
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

	//// Image change z-index on click
	$(".project__image img").click(function() {
		$(this).parent().parent().parent().children('.level--top').removeClass('level--top');
		$(this).parent().parent().addClass('level--top');
		console.log($(this).parent().parent().parent().children('.level--top'));
	});

});


