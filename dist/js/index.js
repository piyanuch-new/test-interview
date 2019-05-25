function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var imgs = _toConsumableArray(document.querySelectorAll('.lazy'));

function lazyLoad() {
  imgs.forEach(function (img) {
    if (img.offsetTop < window.innerHeight + window.pageYOffset) {
      img.src = img.dataset.src;

      img.onload = function () {
        return img.classList.add('loaded');
      };
    }
  });
}

lazyLoad();