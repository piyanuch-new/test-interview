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
    if (img.getBoundingClientRect().top < window.pageYOffset + window.innerHeight ) {
      img.src = img.dataset.src
      img.onload = () => img.classList.add('loaded')
    }
  })
}
lazyLoad()
window.addEventListener('scroll', debounce(lazyLoad, 16))
window.addEventListener('resize', debounce(lazyLoad, 16))