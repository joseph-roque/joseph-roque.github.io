var didScroll = false;
var sectionOffscreenThreshold = 150;
var scrollThreshold = 5;
var lastScrollTop = 0;
var elementsToCheck = ['#about', '#projects', '#work', '#contact'];
var navColors = ['dark-gray', 'blue', 'orange', 'red'];
var elementSizePadding = 400;
var headerHeight = 72;

// Returns a distance in pixels of the element from the screen. Value is always greater than or equal to 0
var distanceOffscreen = function(win, element) {
  var screenTop = win.scrollTop();
  var screenBottom = screenTop + win.height();

  var elementTop = element.offset().top + elementSizePadding;
  var elementBottom = elementTop + element.height() - elementSizePadding * 2;

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
  var win = $(window);
  var scrollTop = win.scrollTop();

  // If the minimum threshold for scrolling was not met, then exit method
  if (!skipScrollCheck && Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) {
    return;
  }

  lastScrollTop = scrollTop;

  if (win.width() > 1080) {
    // Set width/height of position indicators
    for (var elem in elementsToCheck) {
      var element = $(elementsToCheck[elem]);
      var indicator = $(elementsToCheck[elem] + '-indicator');
      var distance = distanceOffscreen(win, element);

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
  } else {
    // Set color of navigation icons
    for (var elem in elementsToCheck) {
      var curElem = -elem + (elementsToCheck.length - 1);
      var element = $(elementsToCheck[curElem]);
      var screenTop = win.scrollTop();
      var elementTop = element.offset().top;

      if (elementTop < screenTop + win.height() / 3) {
        for (var eToUpdate in elementsToCheck) {
          var elementToUpdate = $(elementsToCheck[eToUpdate] + '-icon');
          elementToUpdate.removeClass();
          elementToUpdate.addClass(navColors[curElem]);
          console.log(navColors[curElem]);
        }

        return;
      }
    }
  }
};

$(window).load(function() {
  hasScrolled(true);
});

$(document).ready(function() {
  $('a[href^="#"]').on('click', function(event) {
    var offset = $(window).width() < 1080
        ? headerHeight
        : -20;
    var target = $($(this).attr('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - offset
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
