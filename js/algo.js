var img = new Image();

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
    var colorThief = new ColorThief();
    for(var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);
        //$('#' + imagePreview).append('<img src="' + objectUrl + '"' + "/>");
        $('#' + imagePreview).append("<span class=\"pip\">" +
        "<img class=\"imageThumb\" src=\"" + objectUrl + "\" title=\"" + file.name + "\"/>" +
        "<br/><span class=\"remove\">Remove image</span>" +
        "</span>");

        img.src = objectUrl;
        window.URL.revokeObjectURL(fileList[i]);       
    }
}

//when the image loads in, call colorthief and input it into a dict with its img.src and color
img.onload = function() {
  var colorThief = new ColorThief;
  var color = colorThief.getColor(img);
  /*var temp = {};
  temp['name' + index1] = img.src*/
  if (imagePreview == "imagePreview") {
    shirtsDict.push({blob: img.src, value: color});
    //shirtsDict.push(temp);
    console.log(shirtsDict);
  }
  else if (imagePreview == "imagePreviewPants") {
    pantsDict.push({blob: img.src, value:color});
    console.log(pantsDict);
  }

  $(".remove").click(function(){
    $(this).parent(".pip").remove();
    //delete shirtsDict['name0'];
  });
  
  index1++;
  img.src = "";
}

function changeID(imagePreview) {
    this.imagePreview = imagePreview;
}