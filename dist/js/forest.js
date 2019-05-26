$(document).ready(function () {
  var wrap = $(".slide");

  function slideFullScreen() {
    var item = $(".slide > li"),
        active = $(".slide > li.active"),
        activeW = active.width(),
        winW = $(window).width(),
        half = (winW - activeW) / 2,
        sum = 0; // console.log(sum, winW, activeW, half);    

    item.each(function (i) {
      var width = $(this).width(),
          box = $(this).find(".box-img"),
          img = $(this).find("img"),
          src = img.attr("src");
      $(this).css("width", width);

      if (wrap.hasClass("slide-fullheight")) {
        box.css("background-image", "url(" + src + ")");
      }

      console.log(i, src);
      setTimeout(function () {
        img.css({
          "transform": "translate(-50%, -50%)",
          "position": "absolute",
          "left": "50%",
          "top": "50%",
          "max-width": "calc(100% - 16px)"
        });
        sum += width;
      }, 50);
    });
    setTimeout(function () {
      wrap.css({
        "width": sum,
        "transform": "matrix(1, 0, 0, 1, " + half + ", 0)"
      }).addClass("initSlide");
    }, 50);
  }

  function nextSlide() {
    var item = $(".slide > li"),
        currentSlide = item.index($(".active")),
        next = currentSlide + 1,
        pastW = 0,
        nextW = item.eq(next).width(),
        winW = $(window).width(),
        halfNext = parseInt((winW - nextW) / 2);

    if (next != item.length) {
      console.log(next);
      item.eq(currentSlide).removeClass("active");
      item.eq(next).addClass("active");

      for (i = 0; i < next; i++) {
        pastW += item.eq(i).width();
      }

      var sumNext = -Math.abs(pastW) + halfNext;
      wrap.css("transform", "matrix(1, 0, 0, 1, " + sumNext + ", 0)");
    }
  }

  function prevSlide() {
    var item = $(".slide > li"),
        currentSlide = item.index($(".active")),
        prev = currentSlide - 1,
        pastW = 0,
        prevW = item.eq(prev).width(),
        winW = $(window).width(),
        halfPrev = parseInt((winW - prevW) / 2);

    if (currentSlide != 0) {
      console.log(prev);
      item.eq(currentSlide).removeClass("active");
      item.eq(prev).addClass("active");

      for (i = 0; i < prev; i++) {
        pastW += item.eq(i).width();
      }

      var sumPrev = -Math.abs(pastW) + halfPrev;
      wrap.css("transform", "matrix(1, 0, 0, 1, " + sumPrev + ", 0)");
    }
  }

  function resizeSlide() {
    var item = $(".slide li"),
        currentSlide = item.index($(".active")),
        prev = currentSlide - 1,
        pastW = 0,
        sumResize = 0;
    console.log("resize : " + currentSlide);
    wrap.css("width", "100vw");
    item.each(function (i) {
      var thisItem = $(this),
          img = thisItem.find("img");
      img.css({
        "transform": "translate(0, 0)",
        "position": "relative",
        "left": "0",
        "top": "0",
        "max-width": "100%"
      });
      setTimeout(function () {
        thisItem.css("width", "max-content");
      }, 10);
      setTimeout(function () {
        var width = thisItem.width();
        thisItem.css("width", width);
        setTimeout(function () {
          img.css({
            "transform": "translate(-50%, -50%)",
            "position": "absolute",
            "left": "50%",
            "top": "50%",
            "max-width": "calc(100% - 16px)"
          });
          sumResize += width;
        }, 50);
      }, 50);
    });
    setTimeout(function () {
      var prevW = item.eq(currentSlide).width(),
          winW = $(window).width(),
          activeW = $(".slide li.active").width(),
          halfActive = (winW - activeW) / 2;

      if (currentSlide != 0) {
        for (i = 0; i < currentSlide; i++) {
          pastW += item.eq(i).width();
        }

        var sumPrev = -Math.abs(pastW) + halfActive;
        wrap.css("transform", "matrix(1, 0, 0, 1, " + sumPrev + ", 0)");
      } else {
        wrap.css("transform", "matrix(1, 0, 0, 1, " + halfActive + ", 0)");
      }

      wrap.css("width", sumResize).addClass("initSlide");
      console.log(sumResize);
    }, 130);
  }

  setTimeout(function () {
    slideFullScreen();
  }, 100);
  $(window).resize(function () {
    wrap.removeClass("initSlide");
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function () {
      console.log('Resized finished.');
      resizeSlide();
    }, 150);
  });
  $(document).keydown(function (e) {
    var ew = e.which;

    switch (ew) {
      case 37:
        // left
        // console.log("left");
        prevSlide();
        break;

      case 39:
        // right
        // console.log("right");
        nextSlide();
        break;

      default:
        return;
    }

    e.preventDefault();
  });
});