/* Fast Click Initialise */
$(function() {
    FastClick.attach(document.body);
});

/*-----------------------------------------------------------------------------------*/
/*	MENU HOVER ON TOUCH-able DEVICE
/*-----------------------------------------------------------------------------------*/
$(function($){
	//Fix dropdown bootstrap
	$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); })
				.on('touchstart.dropdown', '.dropdown-submenu', function (e) {e.preventDefault();});
	if( 'ontouchstart' in document.documentElement ) {
		var clickable = null;
		$('#access .menu-item').each(function(){
			var $this = $(this);

			if( $this.find('ul.sub-menu').length > 0 ) {

				$this.find('a:first').unbind('click').bind('touchstart',function(event){
					if( clickable != this ) {
						clickable = this;
						event.preventDefault();
					} else {
						clickable = null;
					}
				});
			}
		});
	}
});


var whatAmI = new Array();
whatAmICounter = 0;
whatAmI[0] = "a web developer";
whatAmI[1] = 'currently employed at <a href="//www.stackla.com" target="_blank">Stackla</a>';
whatAmI[2] = 'based in Sydney';
whatAmI[3] = 'always interested in cool projects, so drop me a line: <a href="mailto:morgancarter1@gmail.com">morgancarter1@gmail.com</a>';
whatAmI[4] = 'listening to <a href="http://open.spotify.com/artist/163tK9Wjr9P9DmM0AVK7lm" target="_blank">Lorde</a> at the moment';
whatAmI[5] = 'trying to find a new pair of appropriately hipster glasses';
whatAmI[6] = 'eating lasagne made by <a href="https://twitter.com/Amelia_Lewis";target="_blank">@Amelia_Lewis</a>. It\'s pretty good';

var widgetDescriptionStuff = "Here's some stuff I'm into, powered by <a href='//www.stackla.com' target='_blank'>Stackla</a>. I don't moderate this, so there's probably design stuff, fashion, porn, music, test posts and the occasional selfie. Enjoy! Alternatively, check out my <a class='js-filter-portfolio important'>portfolio</a>!";
var widgetDescriptionPortfolio = "These are some of the things I've made over the years - some are designed, others just coded up. Check out the descriptions in each for more info! If you're interested in working with me, <a class='important' href='mailto:morgancarter1@gmail.com'>drop me a line</a>. Otherwise, when you're bored, go check out some more <a class='js-filter-stuff'>stuff I like</a>.";

$('.js-what-am-i-refresh').click(function() {
	whatAmICounter++;
	$('.js-what-am-i').html(whatAmI[whatAmICounter%whatAmI.length]);
	var spinnything = $(this);
	spinnything .addClass('animate');
	setTimeout(function() {
		spinnything .removeClass('animate');
	}, 1000);
});
$(document).ready(function() {
	window.scrollTo(0, 0);
	resizeHero();

	$('.js-widget-description').html(widgetDescriptionStuff);

	var attachClickFn = function() {
		$('.js-filter-portfolio').click(function() {
			StacklaFluidWidget.changeFilter(75,960);
			$('.js-widget-description').html(widgetDescriptionPortfolio);
			attachClickFn();
		});
		$('.js-filter-stuff').click(function() {
			StacklaFluidWidget.changeFilter(75,957);
			$('.js-widget-description').html(widgetDescriptionStuff);
			attachClickFn();
		});
	}
	attachClickFn();

	$('.js-open-mobile-nav').click(function() {
		$('body').toggleClass('mobile-nav-open');
	});
	$('.js-close-mobile-nav').click(function() {
		$('body').removeClass('mobile-nav-open');
	});
});
$(window).load(function () {
	resizeHero();
});
$(window).resize(function() {
	resizeHero();
});
$(window).scroll(function() {
	var scrollPos = 3 * $(window).scrollTop()/$(window).height();
	$('.hero-bg').css('opacity', scrollPos);
	$('.hero-text').css('opacity', 1-scrollPos);
});
function resizeHero() {
	var heroHeight = $('.js-hero-height-one').height() + $('.js-hero-height-two').height() + $('.js-hero-height-three').height();
	$('.js-hero-content').height(heroHeight);
	$('.js-hero-content').width($('.js-hero').width());
	$('.js-hero').outerHeight($(window).height());
};

$('.js-scroll-down').click(function() {
	$('html,body').animate({
		scrollTop: $('.js-scroll-to').offset().top
	}, 400);
});



window.addEventListener('deviceorientation', function(eventData) {
	var xTilt = 10 * eventData.gamma * (15/180);
	if (xTilt > 15)
		xTilt = 15;
	else if (xTilt < -15)
		xTilt = -15;

	$('.js-tilt-image').css('transform', 'translate3d(' + xTilt + '%, 0, 0)');
}, false);



$(document).ready(function() {
	console.log($('.cta a'))
	$('.cta a').hover(function() {
		console.log($(this).parent())
		$(this).closest('.cta').addClass('hover');
		if ($(this).parent('article').hasClass('cta-another'))
			$(this).closest('.cta').addClass('another');
	}, function() {
		$(this).closest('.cta').removeClass('hover').removeClass('another');
	});

});