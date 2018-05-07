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
			//size: Math.round(40 * screenFactor)
			size: "5vmax"
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
	var sections = $('.wrapper--projects section');
	var currentProject, lastProject;
	function markVisible() {
		lastProject = $('.most-visible').attr('id');
		currentProject = sections.mostVisible().attr('id');
		if (currentProject !== lastProject) {
			sections.removeClass('most-visible').mostVisible().addClass('most-visible');
			setCurrentTitle();
			$('.project__description').hide();
			$('.most-visible .project__description').fadeIn();
		}
	}
	markVisible();

	///// Set Current Title
	var scopeMobile;
	function setCurrentTitle() {
		scopeMobile = projects[currentProject].text;
		if (projects[currentProject].text === "Daniel Campagne — Digital Designer") {
			if (screenFactor === 0.7) {
				$(".title--alternative").html("Daniel Campagne<br/>Digital Designer").css("font-size",projects[currentProject].size);
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
	$(".project__image img:not(.dont-move)").click(function() {

		if (!$(this).parent().parent().hasClass('level--top--1'))  {
			$(this).parent().parent().hide();
		}
		$(this).parent().parent().parent().children('.level--top--4').removeClass('level--top--4');
		$(this).parent().parent().parent().children('.level--top--3').removeClass('level--top--3').addClass('level--top--4');
		$(this).parent().parent().parent().children('.level--top--2').removeClass('level--top--2').addClass('level--top--3');
		$(this).parent().parent().parent().children('.level--top--1').removeClass('level--top--1').addClass('level--top--2');
		$(this).parent().parent().removeClass('level--top--1 level--top--2 level--top--3 level--top--4').addClass('level--top--1');
		if (!$(this).parent().parent().hasClass('level--top--2')) {
			$(this).parent().parent().fadeIn();
		}

	});

	// //// Add heights to project pushers
	// $('.project').each(function(){
	// 	var sectionStart, sectionEnd;
	// 	console.log($(this).children('.project__image').last().);
	// });

	//// Listener
	document.addEventListener('scroll', (evt) => {
		markVisible();
	}, { capture: true, passive: true });


/* Simple spam protection for email addresses using jQuery*/

$(function() {
 $('a[href^="mailto:"]').each(function() {
  this.href = this.href.replace('(symbol)', '@').replace(/\(dot\)/g, '.');
  this.innerHTML = this.href.replace('mailto:', '');
 });
});/* Simple spam protection for email addresses using jQuery.
 * Well, the protection isn’t jQuery-based, but you get the idea.
 * This snippet allows you to slightly ‘obfuscate’ email addresses to make it harder for spambots to harvest them, while still offering a readable address to your visitors.
 * E.g.
 * <a href="mailto:foo(at)example(dot)com">foo at example dot com</a>
 * →
 * <a href="mailto:foo@example.com">foo@example.com</a>
 */

$(function() {
 $('a[href^="mailto:"]').each(function() {
  this.href = this.href.replace('(at)', '@').replace(/\(dot\)/g, '.');
  // Remove this line if you don't want to set the email address as link text:
  this.innerHTML = this.href.replace('mailto:', '');
 });
});

});

