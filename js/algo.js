//keep track of how many images are put in
var pantsIndex = 0;
var shirtIndex = 0;
var changeDictsValue = 1;

var imagePreview = '#imagePreview';
//input the blobs of the clothes
var shirtPics = [];
var pantsPics = [];

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
        //save the url of the object to an array, so we can return to it later
        if (changeDictsValue == 1) {
            var imgType = 'id="myShirtsImg';
            shirtPics[shirtIndex] = objectUrl;
            imgType = imgType.concat(shirtIndex + '"');
            $(imagePreview).append('<img src="' + objectUrl + '"' + imgType + "/>");
            shirtIndex++;
        }
        else if (changeDictsValue == 2) {
            var imgType = 'id="myPantsImg';
            pantsPics[pantsIndex] = objectUrl;
            imgType = imgType.concat(pantsIndex + '"');
            $(imagePreview).append('<img src="' + objectUrl + '"' + imgType + "/>");
            pantsIndex++;
        }
        
        window.URL.revokeObjectURL(fileList[i]);
    }
}

function changeID(imagePreview, id) {
    this.imagePreview = imagePreview;
}

function changeDicts(num) {
    if(num == 1) {
        changeDictsValue = 1;
    }
    else {
        changeDictsValue = 2;
    }
}

//currently this function dupes images if you click the submit btn again
//but it shouldnt be an issue since
//we should redirect the user to another page when they click the button
//clicking the button will call colorthief and create a dict of all the items in it
document.getElementById('btn').onclick= function() {
    var anyWindow = window.URL || window.webkitURL;
    var colorThief = new ColorThief();
    for (var i = 0; i < shirtPics.length; i++) {
        //finds the id of myImg then the index
        var img = document.getElementById('myShirtsImg' + i);
        //call colorthief to get array of most common color
        var color = colorThief.getColor(img);
        //push the data to a dict
        shirtsDict.push({blob: shirtPics[i], value: color});
    }

    for (var i = 0; i < pantsPics.length; i++) {
        //finds the id of myImg then the index
        var img = document.getElementById('myPantsImg' + i);
        //call colorthief to get array of most common color
        var color = colorThief.getColor(img);
        //push the data to a dict
        pantsDict.push({blob: pantsPics[i], value: color});
    }
    console.log(shirtsDict);
    console.log(pantsDict);
}
