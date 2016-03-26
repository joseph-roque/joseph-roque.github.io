var didScroll = false;
var sectionOffscreenThreshold = 150;
var scrollThreshold = 5;
var lastScrollTop = 0;
var elementsToCheck = ['#about', '#projects', '#work', '#contact'];
var elementSizePadding = 400;

// Returns a distance in pixels of the element from the screen. Value is always greater than or equal to 0
var distanceOffscreen = function(element) {
  screen = $(window);

  screenTop = screen.scrollTop();
  screenBottom = screenTop + screen.height();

  elementTop = element.offset().top + elementSizePadding;
  elementBottom = elementTop + element.height() - elementSizePadding * 2;

  if (elementTop <= screenBottom && elementBottom >= screenTop) {
    return 0;
  } else if (elementTop > screenBottom) {
    return elementTop - screenBottom;
  } else if (elementBottom < screenTop) {
    return screenTop - elementBottom;
  }

  return 0;
};

var hasScrolled = function(skipScrollCheck) {
  var scrollTop = $(window).scrollTop();

  // If the minimum threshold for scrolling was not met, then exit method
  if (!skipScrollCheck && Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) {
    return;
  }

  for (elem in elementsToCheck) {
    var element = $(elementsToCheck[elem]);
    var indicator = $(elementsToCheck[elem] + '-indicator');
    var distance = distanceOffscreen(element);

    if (distance == 0) {
      indicator.css('width', '16px');
      indicator.css('height', '16px');
    } else if (distance <= sectionOffscreenThreshold) {
      var size = (-distance + sectionOffscreenThreshold) / sectionOffscreenThreshold * 16;
      indicator.css('width', size + 'px');
      indicator.css('height', size + 'px');
    } else {
      indicator.css('width', '0');
      indicator.css('height', '0');
    }
  }

  lastScrollTop = scrollTop;
};

$(window).load(function() {
  hasScrolled(true);
});

$(document).ready(function() {
  $('a[href^="#"]').on('click', function(event) {
    var target = $($(this).attr('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled(false);
      didScroll = false;
    }
  }, 50);

  $(window).on('scroll', function() {
    didScroll = true;
  });
});
