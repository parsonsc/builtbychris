$(document).ready(function(){
	var hamburger = $('#menu-icon');
  hamburger.click(function() {
      hamburger.toggleClass('active');
      return false;
  });
  $("#menu-icon").click(function(){
      $(".site_nav").slideToggle();
  });
});

// SMOOTH SCROLL ANCHOR
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 140
        }, 1000);
        return false;
      }
    }
  });
});
// END SMOOTH SCROLL ANCHOR

// EQUAL HEIGHTS
  equalheight = function(container){
  var currentTallest = 0,
       currentRowStart = 0,
       rowDivs = new Array(),
       $el,
       topPosition = 0;
   $(container).each(function() {
     $el = $(this);
     $($el).height('auto')
     topPostion = $el.position().top;

     if (currentRowStart != topPostion) {
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
         rowDivs[currentDiv].height(currentTallest);
       }
       rowDivs.length = 0; // empty the array
       currentRowStart = topPostion;
       currentTallest = $el.height();
       rowDivs.push($el);
     } else {
       rowDivs.push($el);
       currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
   });
  }

  $(window).load(function() {
    equalheight('.case_resources .block article, .challenge_ideas ul li');
  });
  $(window).resize(function(){
    equalheight('.case_resources .block article, .challenge_ideas ul li');
  });

  // $('.grid_copy > .absolute').each(function() {
  //   $(this).parent().height('+=' + $(this).height());
  //   $(this).css('position', 'absolute');
  // });
// END EQUAL HEIGHTS


// WAYPOINTS
  // hide our element on page load         
  $('.post').waypoint(function() {
    $('.post').addClass('fadeInLeft');

  }, {offset: '75%' });

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
              offset: '65%'
        });
  });
}

 onScrollInit( $('.os-animation') );
 onScrollInit( $('.staggered-animation'), $('.staggered-animation-container') );
// END WAYPOINTS


// load more 
$(function(){
    $("section.gallery_grid ul li").slice(0, 8).fadeIn(); // select the first ten
    $("#load").click(function(e){ // click event for load more
        e.preventDefault();
        $("section.gallery_grid ul li:hidden").slice(0, 4).fadeIn(); // select next 10 hidden divs and show them
        if($("section.gallery_grid ul li:hidden").length == 0){ // check if any hidden divs still exist
            alert("No more News articles"); // alert if there are none left
        }
    });
});


// ACCORDIAN - FAQ's
$(document).ready(function() {
  function close_accordion_section() {
    $('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
  }

  $('.accordion-section-title').click(function(e) {
    // Grab current anchor value
    var currentAttrValue = $(this).attr('href');

    if($(e.target).is('.active')) {
      close_accordion_section();
    }else {
      close_accordion_section();

      // Add active class to section title
      $(this).addClass('active');
      // Open up the hidden content panel
      $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
    }

    e.preventDefault();
  });
});



