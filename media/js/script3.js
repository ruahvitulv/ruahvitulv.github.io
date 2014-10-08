/* Fast Click Initialise */
$(function() {
    FastClick.attach(document.body);
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
	$('#fullpage').fullpage({
		anchors:['firstSlide', 'secondSlide', 'thirdSlide', 'fourtbSlide', 'firstSlide']
	});
	$('button').click(function() {
		$.fn.fullpage.moveSectionDown();
	});
	$('body').one('mousemove', function() {
		$('.js-animate-1').addClass('animate-after');
		$('.js-animate-2').addClass('animate-after');
		$('.js-animate-3').addClass('animate-after');
		$('.js-animate-4').addClass('animate-after');
	} );
});

var density = 1,
	speed = 0.1,
	h = $(window).height(),
	w = $(window).width(),
	start = {yMin:0, yMax:h, xMin:0, xMax:w, scaleMin:2, scaleMax:4, opacityMin:0.2, opacityMax:0.4},
	mid = {yMin:0, yMax:h, xMin:0, xMax:w, scaleMin:2, scaleMax:3, opacityMin:0.7, opacityMax:1},
	end = {yMin:0, yMax:h, xMin:0, xMax:w, scaleMin:0.5, scaleMax:2, opacityMin:0.2, opacityMax:0.4};

function range(map, prop) {
	var min = map[prop + "Min"],
		max = map[prop + "Max"];
	return min + (max - min) * Math.random();
}

function _spawn(particle) {
	var wholeDuration = (10 / speed) * (0.7 + Math.random() * 0.4),
		partialDuration = (wholeDuration + 1) * (0.3 + Math.random() * 0.4);

	//set the starting values
	TweenLite.set(particle, {y:range(start, "y"), x:range(start, "x"), scale:range(start, "scale"), opacity:range(start, "opacity")});

	//the y tween should be continuous and smooth the whole duration
	TweenLite.to(particle, wholeDuration, {y:range(end, "y"), ease:Linear.easeNone});

	//now tween the x independently so that it looks more randomized (rather than linking it with scale/opacity changes too)
	TweenLite.to(particle, partialDuration, {x:range(mid, "x"), ease:Power1.easeOut});
	TweenLite.to(particle, wholeDuration - partialDuration, {delay:partialDuration, x:range(end, "x"), ease:Power1.easeIn});

	//now create some random scale and opacity changes
	partialDuration = wholeDuration * (0.5 + Math.random() * 0.3);
	TweenLite.to(particle, partialDuration, {scale:range(mid, "scale"), autoAlpha:range(mid, "opacity"), ease:Linear.easeNone});
	TweenLite.to(particle, wholeDuration - partialDuration, {delay:partialDuration, scale:range(end, "scale"), autoAlpha:range(end, "opacity"), ease:Linear.easeNone, onComplete:spawn, onCompleteParams:[particle]});
}

var mousePos;
function handleMouseMove(event) {
    event = event || window.event; // IE-ism
    mousePos = {
        x: event.clientX,
        y: event.clientY
    };
}

function spawn(particle, _startX, _startY) {
	window.onmousemove = handleMouseMove;

	var wholeDuration = 100,
		partialDuration = (wholeDuration + 1) * (0.3 + Math.random() * 0.4),
		startY = (_startY) ? _startY : Math.random() * $(window).height(),
		startX = (_startX) ? _startX : Math.random() * $(window).width(),
		endY = startY + (Math.random() - 0.5) * 20,
		endX = startX + (Math.random() - 0.5) * 20;
		if (typeof mousePos !== 'undefined') {
			// if (endY > mousePos.y) endY += 100;
			// if (endX > mousePos.x) endX += 100;
			// if (endY < mousePos.y) endY -= 100;
			// if (endX < mousePos.x) endX -= 100;
		}
		console.log(endX, endY)


	//set the starting values
	// TweenLite.set(particle, {y:startY, x:startX, scale:range(start, "scale"), opacity:range(start, "opacity")});
	TweenLite.set(particle, {y:startY, x:startX});

	//the y tween should be continuous and smooth the whole duration
	TweenLite.to(particle, wholeDuration, {y:endY, ease:Linear.easeNone});
	TweenLite.to(particle, wholeDuration, {x:endX, ease:Power1.easeOut, onComplete:spawn, onCompleteParams:[particle, endX, endY]});

	//now tween the x independently so that it looks more randomized (rather than linking it with scale/opacity changes too)
	// TweenLite.to(particle, partialDuration, {x:range(mid, "x"), ease:Power1.easeOut});
	// TweenLite.to(particle, wholeDuration - partialDuration, {delay:partialDuration, x:range(end, "x"), ease:Power1.easeIn});

	//now create some random scale and opacity changes
	// partialDuration = wholeDuration * (0.5 + Math.random() * 0.3);
	// TweenLite.to(particle, partialDuration, {scale:range(mid, "scale"), autoAlpha:range(mid, "opacity"), ease:Linear.easeNone});
	// TweenLite.to(particle, wholeDuration - partialDuration, {delay:partialDuration, scale:range(end, "scale"), autoAlpha:range(end, "opacity"), ease:Linear.easeNone, onComplete:spawn, onCompleteParams:[particle, endX, endY]});
}

$(window).ready(function() {
	var body = $("#bokeh"),
		i, particle;
	for (i = 0; i < density; i++) {
		spawn( $("<div />", {id:"particle"+i}).addClass("particle").addClass('colour' + Math.ceil(8*Math.random())).appendTo(body) );
	}
	console.log($('#bokeh div'))
});