let imgs = [...document.querySelectorAll('.lazy')]

function lazyLoad() {
  imgs.forEach(img => {
    if (img.offsetTop < window.innerHeight + window.pageYOffset) {
        img.src = img.dataset.src
        img.onload = () => img.classList.add('loaded')
    }
  })
}

lazyLoad()