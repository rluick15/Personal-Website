
var color = $(".selected").css("background-color"); //initialize the proper default selected color
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d"); 
var lastEvent;
var mouseDown = true;

//This block dictates which actions happen when a new color is clicked and selected from the controls
$(".controls").on("click","#colorMenu li",function() {
  $(this).siblings().removeClass("selected"); //deselects all other coloros
  $(this).addClass("selected");               //selects the proper color
  color = $(this).css("background-color");     //stores the color in the cache
});

//This block will show/hide the color selector when the "New Color" button is pressed and update the new color
$("#revealColorSelect").click(function() {
  changeColor();
  $("#colorSelect").toggle();
	$("#lineSelect").hide();
});

//This block will show/hide the line width selector when the "Line Width" button is pressed and update the line width
$("#revealLineSelect").click(function() {
  //changeColor();
  $("#lineSelect").toggle();
	$("#colorSelect").hide();
});

//Updates the color sample as the sliders change
$("input[type=range]").on("input",changeColor);    

//The following function updates the custom color based on the users input
function changeColor() {
  var r = $("#red").val();
  var b = $("#blue").val();
  var g = $("#green").val();
  $("#newColor").css("background-color","rgb(" + r + "," + g + "," + b + ")");
}

//The following block adds the custom color when "New Color" is pressed
$("#addNewColor").click(function() {
  var $newColor = $("<li></li>");
  $newColor.css("background-color",$("#newColor").css("background-color"));
  $(".controls #colorMenu").append($newColor);
  $newColor.click();
});

//Updates the line width sample as the sliders change
$("input[type=range]").on("input",changeLine);    

//The following function updates the custom line width based on user input
function changeLine() {
  var lineWidth = $("#lineWidth").val();
  $("#newLine").css("height",lineWidth);
	$("#newLine").css("width",lineWidth);
	context.lineWidth = lineWidth;
}

$("#clearScreen").click(function() {
	var myCanvas = document.getElementById("myCanvas");
  var ctx = myCanvas.getContext('2d');
  ctx.clearRect(0, 0, 600, 400);
});
	
//Following block will allow users to draw on the canvas with the selected color
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
    if(mouseDown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
      context.lineTo(e.offsetX,e.offsetY);
			context.lineCap="round";
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
}).mouseup(function() {
    mouseDown = false;
}).mouseleave(function() {
    mouseDown = false;
});

















                    
                