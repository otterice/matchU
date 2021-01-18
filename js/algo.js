var img = new Image();
var boxWidthTop = "300px";
var boxWidthBot = "300px";

/*indexes for the dicts, 1 is for shirts, 2 for pants*/
var index1 = 0;
var index2 = 0;

var imagePreview = 'imagePreview';

//get the value of the blob and key/color
var shirtsDict = [];
var pantsDict = [];

//gets the shirt files
var inputLocalFont = document.getElementById('file');
inputLocalFont.addEventListener("change", previewImages, false);

//gets the pants files
var inputLocalFont2 = document.getElementById('pantsFile');
inputLocalFont2.addEventListener("change", previewImages, false);

//shows the thumbnail of the image
function previewImages() {
    var fileList = this.files;
    var anyWindow = window.URL || window.webkitURL;

    for(var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);
        //$('#' + imagePreview).append('<img src="' + objectUrl + '"' + "/>");
        $('#' + imagePreview).append("<span class=\"pip\">" +
        "<img class=\"imageThumb\" src=\"" + objectUrl + "\" title=\"" + file.name + "\"/>" +
        "<br/><span class=remove" + index1 + ">Remove image</span>" +
        "</span>");

        img.src = objectUrl;
        window.URL.revokeObjectURL(fileList[i]);       
    }
}



img.onload = function() {
  var colorThief = new ColorThief;
  var color = colorThief.getColor(img);
  
  if (imagePreview == "imagePreview") {
    shirtsDict.push({type: 'shirt', blob: img.src, value:color});
    console.log(shirtsDict);
    boxWidthTop = (parseInt(boxWidthTop.replace(/px/, "")) + 100) + "px";
    document.getElementsByClassName("boxed")[0].style.width = boxWidthTop;
    
  }
  else if (imagePreview == "imagePreviewPants") {
    pantsDict.push({type: 'pants', blob: img.src, value:color});
    console.log(pantsDict);
    boxWidthBot = (parseInt(boxWidthBot.replace(/px/, "")) + 100) + "px";
    document.getElementsByClassName("boxed")[1].style.width = boxWidthBot;
  }
}        

//removes the index in shirtsdict
$(document).on("click", ".remove1", function() {
  //this doesnt work because there are two different pips
  //each elem that goes into each box goes from 0,1,2
  //the other box has its own unique values
  $el = $(this).parent(".pip");
  shirtsDict.splice($el.index(), 1);
  console.log(shirtsDict);
  $el.remove();
  $(this).parent(".pip").remove();
});

//removes the index in pantsdict
$(document).on("click", ".remove2", function() {
  $el = $(this).parent(".pip");
  pantsDict.splice($el.index(), 1);
  console.log(pantsDict);
  $el.remove();
  $(this).parent(".pip").remove();
});

function changeID(imagePreview, index1) {
    this.imagePreview = imagePreview;
    this.index1 = index1;
}