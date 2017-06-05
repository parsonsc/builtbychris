$(window).on("scroll", function() {
    if($(window).scrollTop() > 100) {
        $(".site_header").addClass("active_bg");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".site_header").removeClass("active_bg");
    }
});

$(window).on("scroll", function() {
    if($(window).scrollTop() > 2000) {
        $(".to-top").addClass("active");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".to-top").removeClass("active");
    }
});

  // Mobile hamburger
    var hamburger = $('.mobile_menu');
    hamburger.click(function() {
        hamburger.toggleClass('active');
        return false;
    });
    $(".mobile_menu").click(function() {
        $(".site_nav ul").slideToggle();
    });

function onScrollInit( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');
      
        osElement.css({
          '-webkit-animation-delay':  osAnimationDelay,
          '-moz-animation-delay':     osAnimationDelay,
          'animation-delay':          osAnimationDelay
        });

        var osTrigger = ( trigger ) ? trigger : osElement;
        
        osTrigger.waypoint(function() {
          osElement.addClass('animated').addClass(osAnimationClass);
          },{
              triggerOnce: true,
              offset: '90%'
        });
  });
}

 onScrollInit( $('.os-animation') );
 onScrollInit( $('.staggered-animation'), $('.staggered-animation-container') );




$(document).ready(function(){
  $('.skillbar').each(function(){
    $(this).find('.skillbar-bar').animate({
      width:$(this).attr('data-percent')
    },6000);
  });
});


// Counter
(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);

$(function($) {
    $('.timer1').delay(400).countTo({
        from: 0,
        to: 1805,
        decimals: 0,
        speed: 1000,
        refreshInterval: 2,
        onComplete: function(value) {
          console.debug(this);
          $(".block_01").addClass("done");
          $(".finish-text").addClass("fadeInDown");
        }
    });

    $('.timer2').delay(400).countTo({
        from: 0,
        to: 150,
        decimals: 0,
        speed: 1300,
        refreshInterval: 2,
        onComplete: function(value) {
            console.debug(this);
            $(".block_02").addClass("done");
            $(".finish-text").addClass("fadeInDown");
        }
    });

    $('.timer3').delay(400).countTo({
        from: 0,
        to: 5546,
        decimals: 0,
        speed: 1600,
        refreshInterval: 2,
        onComplete: function(value) {
            console.debug(this);
            $(".block_03").addClass("done");
            $(".finish-text").addClass("fadeInDown");
        }
    });

    $('.timer4').delay(400).countTo({
        from: 0,
        to: 30,
        decimals: 0,
        speed: 1900,
        refreshInterval: 2,
        onComplete: function(value) {
            console.debug(this);
            $(".block_04").addClass("done");
            $(".finish-text").addClass("fadeInDown");
        }
    });
});



// Smooth scroll - Click anchor tag to smoothly scroll you to the relavant section
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


$(document).ready(function(){
  $('.bxslider').bxSlider({
    auto: true,
    pager: false,
    autoHover: true,
    speed: 1000,
    delay: 10000
  });
});















