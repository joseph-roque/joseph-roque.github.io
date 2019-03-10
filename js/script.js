// Scrolling

function getElementY(id) {
  return window.pageYOffset + document.getElementById(id).getBoundingClientRect().top
}

function getHeaderHeight() {
  return document.getElementById("header").getBoundingClientRect().height;
}

function doScrolling(element, duration) {
	const startingY = window.pageYOffset;
  const elementY = getElementY(element) - getHeaderHeight();
  const targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
	const diff = targetY - startingY;
  const easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
  let start;

  if (!diff) {
    return
  }

	window.requestAnimationFrame(function step(timestamp) {
    if (!start) {
      start = timestamp
    }

    var time = timestamp - start
    var percent = Math.min(time / duration, 1)
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

function scrollToTarget(target) {
  doScrolling(target, 750)
}
