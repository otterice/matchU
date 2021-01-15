var img = new Image();

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
    var colorThief = new ColorThief();
    for(var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);
        $('#' + imagePreview).append('<img src="' + objectUrl + '"' + "/>");
        img.src = objectUrl;
        window.URL.revokeObjectURL(fileList[i]);       
    }
}

//when the image loads in, call colorthief and input it into a dict with its img.src and color
img.onload = function() {
  var colorThief = new ColorThief;
  var color = colorThief.getColor(img);
  console.log(imagePreview);
  if (imagePreview == "imagePreview") {
    shirtsDict.push({blob: img.src, value: color});
    console.log(shirtsDict);
  }
  else if (imagePreview == "imagePreviewPants") {
    pantsDict.push({blob: img.src, value:color});
    console.log(pantsDict);
  }
  
  img.src = "";
}

function changeID(imagePreview, id) {
    this.imagePreview = imagePreview;
}