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


/* Particles */
$(document).ready(function() {
	var canvas;
	var context;
	var proton;
	var renderer;
	var emitter;
	var mouseObj;
	var bgImg;
	var repulsionBehaviour, crossZoneBehaviour;

	Main();
	function Main() {
		canvas = document.getElementById("testCanvas");
		canvas.width = 720;
		canvas.height = 480;
		context = canvas.getContext('2d');
		beginScene();
	}

	function beginScene() {
		createProton();
		createRenderer();
		tick();
		canvas.addEventListener('mousemove', mousemoveHandler, false);
	}

	function createProton() {
		proton = new Proton;
		emitter = new Proton.Emitter();
		emitter.damping = 0.0075;
		emitter.rate = new Proton.Rate(180);
		emitter.addInitialize(new Proton.ImageTarget('media/images/particle.png', 32));
		emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, 1003, 550)));
		emitter.addInitialize(new Proton.Mass(1), new Proton.Radius(Proton.getSpan(5, 10)));
		mouseObj = {
			x : canvas.width / 2,
			y : canvas.height / 2
		};
		repulsionBehaviour = new Proton.Repulsion(mouseObj, 0, 0);
		crossZoneBehaviour = new Proton.CrossZone(new Proton.RectZone(-2, 0, 1005, 550), 'cross');
		emitter.addBehaviour(repulsionBehaviour, crossZoneBehaviour);
		emitter.addBehaviour(new Proton.Scale(Proton.getSpan(.1, .6)));
		emitter.addBehaviour(new Proton.Alpha(.5));
		// emitter.addBehaviour(new Proton.RandomDrift(10, 10, .2));
		emitter.addBehaviour(new Proton.RandomDrift(10, 10, .2));
		emitter.addBehaviour({
			initialize : function(particle) {
				particle.tha = Math.random() * Math.PI;
				particle.thaSpeed = 0.015 * Math.random() + 0.005;
			},

			applyBehaviour : function(particle) {
				particle.tha += particle.thaSpeed;
				particle.alpha = Math.abs(Math.cos(particle.tha));
			}
		});
		emitter.emit('once');
		proton.addEmitter(emitter);
	}

	function mousemoveHandler(e) {
		if (e.layerX || e.layerX == 0) {
			mouseObj.x = e.layerX;
			mouseObj.y = e.layerY;
		} else if (e.offsetX || e.offsetX == 0) {
			mouseObj.x = e.offsetX;
			mouseObj.y = e.offsetY;
		}

		repulsionBehaviour.reset(mouseObj, 5, 200);
	}

	function createRenderer() {
		renderer = new Proton.Renderer('canvas', proton, canvas);
		renderer.start();
	}

	function tick() {
		requestAnimationFrame(tick);
		proton.update();
	}
});




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