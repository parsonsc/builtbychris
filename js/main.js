// BACK TO TOP 
$("#backTop").click(function () {
   $("html, body").animate({scrollTop: 0}, 1200);
});
$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 500) {
        $('#backTop').fadeIn();
    } else {
        $('#backTop').fadeOut();
    }

});
// END BACK TO TOP

// SMOOTH SCROLL ANCHOR
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top 
        }, 1000);
        return false;
      }
    }
  });
});
// END SMOOTH SCROLL ANCHOR

// MOBILE MENU
$( document ).ready(function() {
  var hamburger = $('#menu-icon');
  hamburger.click(function() {
     hamburger.toggleClass('active');
     return false;
  });
});
$('#menu-icon').click(function(){
	$('.site_nav ul').slideToggle();
});
// END MOBILE MENU

// STICKY NAV
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 375) {
        $(".site_nav").addClass("sticky");
    } else {
        $(".site_nav").removeClass("sticky");
    }
});
// END STICKY NAV


$(document).ready(function() {

  /***************** Waypoints ******************/

  $('.work_section').waypoint(function() {
    $('.work_section').addClass('animated fadeIn');
  }, {
    offset: '75%'
  });
  $('.fa-chevron-down').waypoint(function() {
    $('.fa-chevron-down').addClass('animated bounceInDown');
  }, {
    offset: '75%'
  });
  $('.top').waypoint(function() {
    $('.top').addClass('animated slideInLeft');
  }, {
    offset: '75%'
  });
  $('.wp4').waypoint(function() {
    $('.wp4').addClass('animated fadeInDown');
  }, {
    offset: '75%'
  });
});

// NAV SELECTED LI change ON SCROLL
var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();
 
  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
   
    sections.each(function() {
      var top = $(this).offset().top -300,
          bottom = top + $(this).outerHeight();
   
      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');
   
        $(this).addClass('active');
        nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
      }
    });
});

