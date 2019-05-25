var wrap    = $(".slide");
function slideFullScreen(){
  var item    = wrap.find("li"),
      active  = wrap.find("li.active"),
      activeW = active.width(),
      winW    = $(window).width(),
      half    = (winW - activeW)/2,
      sum     = 0;

  console.log(sum, winW, activeW, half);    
  item.each( function(i){
    var width = $(this).width(),
        img   = $(this).find("img");

    $(this).css("width", width);
    img.css({
      "transform": "translate(-50%, -50%)",
      "position": "absolute",
      "left": "50%",
      "top": "50%",      
      "max-width" : "calc(100% - 16px)"
    })
    sum += width;

  });
  wrap.css({
    "width": sum,
    "transform": "matrix(1, 0, 0, 1, "+ half +", 0)"
  })
}
function nextSlide(){
  var item         = $(".slide li"),
      currentSlide = item.index($(".active")),
      next         = currentSlide + 1,
      pastW        = 0,
      nextW        = item.eq(next).width(),
      winW         = $(window).width(),
      halfNext     = parseInt((winW - nextW)/2);

  // console.log(next);
  item.eq(currentSlide).removeClass("active");
  item.eq(next).addClass("active");
  for(i = 0; i < next; i++) {     
    pastW += item.eq(i).width();
  }
  var sumNext = -Math.abs(pastW) + halfNext;
  wrap.css("transform", "matrix(1, 0, 0, 1, "+ sumNext +", 0)")
}
$(document).ready(function() {  
  slideFullScreen()
});
$(document).keydown(function(e) {
  var ew = e.which;
  switch(ew) {
      case 37: // left
        console.log("left")
        prevSlide();
      break;

      case 39: // right
        console.log("right")
        nextSlide();
      break;
      default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});