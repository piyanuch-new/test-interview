$(document).ready(function () {
  console.log("ready");
});
$(document).keydown(function (e) {
  var ew = e.which;

  switch (ew) {
    case 37:
      // left
      console.log("left");
      break;

    case 39:
      // right
      console.log("right");
      break;

    default:
      return;
    // exit this handler for other keys
  }

  e.preventDefault(); // prevent the default action (scroll / move caret)
});