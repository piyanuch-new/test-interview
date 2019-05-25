function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var imgs = _toConsumableArray(document.querySelectorAll('.lazy'));

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

;

function lazyLoad() {
  imgs.forEach(function (img) {
    if (img.getBoundingClientRect().top < window.pageYOffset + window.innerHeight) {
      img.src = img.dataset.src;

      img.onload = function () {
        return img.classList.add('loaded');
      };
    }
  });
}

lazyLoad();
window.addEventListener('scroll', debounce(lazyLoad, 16));
window.addEventListener('resize', debounce(lazyLoad, 16));