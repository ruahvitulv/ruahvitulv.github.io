/* Fast Click Initialise */
$(function() {
		FastClick.attach(document.body);
});

// get image's natural width and height
(function ($) {
    var props = ['Width', 'Height'],
        prop;

    while (prop = props.pop()) {
        (function (natural, prop) {
            $.fn[natural] = (natural in new Image()) ?
                function () {
                    return typeof (this[0]) !== 'undefined' && typeof (this[0][natural]) !== 'undefined' ? this[0][natural] : 0;
            } :
                function () {
                    var node = this[0],
                        img,
                        value = 0;

                    if (typeof (node) !== 'undefined' && typeof (node.tagName) !== 'undefined' && node.tagName.toLowerCase() === 'img') {
                        img = new Image();
                        img.src = node.src,
                        value = img[prop];
                    }
                    return value;
            };
        }('natural' + prop, prop.toLowerCase()));
    }
}(jQuery));

function fitImage(img) {
    var realWidth = img.naturalWidth(),
    realHeight = img.naturalHeight(),
    imgWrapper = $(img).parent(),
    windowWidth = imgWrapper.width(),
    windowHeight = imgWrapper.height();

    // use largest scale factor of horizontal/vertical
    var scale_h = windowWidth / realWidth;
    var scale_v = windowHeight / realHeight;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    // now scale the img
    img.width(scale * realWidth);
    img.height(scale * realHeight);
}




$(document).ready(function() {

	$('button').click(function() {
			$.fn.fullpage.moveSectionDown();
	});

	$('body').one('mousemove', function() {
		$('.js-animate-1').addClass('animate-after');
		setTimeout(function() {
			$('.js-animate-2').addClass('animate-after');	
		}, 50);
		setTimeout(function() {
			$('.js-animate-3').addClass('animate-after');	
		}, 100);
		setTimeout(function() {
			$('.js-animate-4').addClass('animate-after');	
		}, 150);
	});


	$('#fullpage').fullpage({
		anchors: ['welcome', 'about', 'trueskate', 'admin', 'stackla', 'manchester', 'asntm', 'myer', 'contact'],
		css3: true
	});


	$(window).resize(function() {
		if ($(window).width() < 960) {
			$('.img-viewer').each(function() {
				var h = $(window).height() - $(this).parent().prev().height();
				// $(this).height(h);
				$(this).css('top', $(this).parent().prev().innerHeight())
				fitImage($(this));
			});
		}
	}).resize();

	window.addEventListener('deviceorientation', function(eventData) {
		var xTilt = 10 * eventData.gamma * (15/180);
		if (xTilt > 15)
				xTilt = 15;
		else if (xTilt < -15)
				xTilt = -15;
		// console.log(xTilt);

		$('.img-viewer').css('transform', 'translate3d(' + xTilt + '%, 0, 0)');
	}, false);

	$('body').mousemove(function(event) {
		var x = event.pageX / $(window).width();
		var y = event.pageY / $(window).height();
		$('.img-viewer').each(function() {
			var img = $(this).find('img');
			fitImage(img);

			var diffX = img.width() - $(this).width();
			var diffY = img.height() - $(this).height();
			var xTilt = (1.3 * ((diffX * x) - diffX/2)) + diffX/2;
			var yTilt = (1.3 * ((diffY * y) - diffY/2)) + diffY/2;

			if (yTilt > diffY) {
				yTilt = diffY;
			} else if (yTilt < 0) {
				yTilt = 0;
			}
			if (xTilt > diffX) {
				xTilt = diffX;
			} else if (xTilt < 0) {
				xTilt = 0;
			}
			img.css('transform', 'translate3d(' + -xTilt + 'px, ' + -yTilt + 'px, 0)')
		});
	});


});