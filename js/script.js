/* Fast Click Initialise */
$(function() {
    FastClick.attach(document.body);
});

$(document).ready(function() {
    var jsHomePage = $('.js-homePage');
    var jsFadePadding = $('.js-fadePadding');
    var jsFadeIn = $('.js-fadeIn');
    var ticking = false;
    var windowY = 0;
    var windowYPrev = 0;
    var windowHeight = 0;

    function update() {
        $('.bg-image').each(function() {
            var bgY = $(this).offset().top;
            var percentage = (100 - (100 * (windowY - bgY) / windowHeight)) / 2;
            if (windowY > (bgY - windowHeight) && windowY < (bgY + windowHeight)) {
                // $(this).css('background-position', percentage + '% ' + percentage + '%');
            }
        });
        $('.bg-cover').each(function() {
            var bgY = $(this).offset().top;
            var percentage = (1 - (1 * (windowY - bgY) / windowHeight)) / 2;

            var img = $(this).find('img');
            fitImage(img);

            var diffX = img.width() - $(this).width();
            var diffY = img.height() - $(this).height();
            var xTilt = diffX * percentage;
            var yTilt = diffY * percentage;

            img.css('transform', 'translate3d(' + -xTilt + 'px, ' + -yTilt + 'px, 0)')
        });
    }

    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    $(window).resize(function() {
        windowHeight = $(window).height();
        $('.page').innerHeight(windowHeight);
    }).resize();

    $('.js-expandTrigger').click(function() {
        var left = -($(window).width() - $('.js-expand').width()) / 2;
        var top = -($(window).height() - $('.js-expand').height()) / 2;
        $('.js-expand').toggleClass('is-expanded');
        if ($('.js-expand').hasClass('is-expanded')) {
            $('.js-expand').css('left', left).css('right', left).css('top', top-20).css('bottom', top);
        } else {
            $('.js-expand').css('left', 0).css('right', 0).css('top', 0).css('bottom', 0);
        }
    });

    $('.js-scrollDown').click(function() {
        $(window).disablescroll();
        $("html, body").animate({ scrollTop: windowHeight }, 1000, function() {
             $(window).disablescroll("undo");
        });
    });

    if (windowY >= windowHeight) {
        jsHomePage.addClass('is-scrolled').addClass('no-animate');
        jsFadePadding.addClass('is-scrolled').addClass('no-animate');
        jsFadePadding.scrollTop(); // force browser reflow
        jsHomePage.removeClass('no-animate');
        jsFadePadding.removeClass('no-animate');
    }
});

/**
 * $.disablescroll
 * Author: Josh Harrison - aloofdesign.com
 *
 * Disables scroll events from mousewheels, touchmoves and keypresses.
 * Use while jQuery is animating the scroll position for a guaranteed super-smooth ride!
 */(function(e){"use strict";function i(t,n){this.opts=e.extend({handleKeys:!0,scrollEventKeys:[32,33,34,35,36,37,38,39,40]},n);this.$container=t;this.$document=e(document);this.disable()}var t,n=function(e){for(var t=0;t<this.opts.scrollEventKeys.length;t++)if(e.keyCode===this.opts.scrollEventKeys[t]){e.preventDefault();return}},r=function(e){e.preventDefault()};i.prototype={disable:function(){var e=this;e.$container.on("mousewheel.UserScrollDisabler DOMMouseScroll.UserScrollDisabler touchmove.UserScrollDisabler",r);e.opts.handleKeys&&e.$document.on("keydown.UserScrollDisabler",function(t){n.call(e,t)})},undo:function(){var e=this;e.$container.off(".UserScrollDisabler");e.opts.handleKeys&&e.$document.off(".UserScrollDisabler")}};e.fn.disablescroll=function(e){!t&&(typeof e=="object"||!e)?t=new i(this,e):t&&t[e]?t[e].call(t):t&&t.disable.call(t)}})(jQuery);

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