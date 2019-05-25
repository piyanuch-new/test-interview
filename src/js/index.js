let imgs = [...document.querySelectorAll('.lazy')]
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function lazyLoad() {
  imgs.forEach(img => {
    console.log(window.innerHeight, img.getBoundingClientRect().top, img.getBoundingClientRect().bottom)
    if ((img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) 
    && getComputedStyle(img).display !== "none") {
      img.src = img.dataset.src
      img.classList.remove("lazy");
    }
  })
}
lazyLoad()
window.addEventListener('scroll', debounce(lazyLoad, 16))
window.addEventListener('resize', debounce(lazyLoad, 16))