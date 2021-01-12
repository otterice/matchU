//keep track of how many images are put in
var j = 0;

var pictures = [];
var colorAndBlob = [];

var inputLocalFont = document.getElementById("file");
inputLocalFont.addEventListener("change", previewImages, false);

//shows the thumbnail of the image
function previewImages() {
    var fileList = this.files;
    var anyWindow = window.URL || window.webkitURL;
    for(var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);
        //save the url of the object to an array, so we can return to it later
        pictures[j] = objectUrl;
        $('#imagePreview').append('<img src="' + objectUrl + '"' + "id='myImg" + j + "'/>");
        j++;
        window.URL.revokeObjectURL(fileList[i]);
    }
}

//currently this function dupes images if you click the submit btn again
//but it shouldnt be an issue since
//we should redirect the user to another page when they click the button
//clicking the button will call colorthief and create a dict of all the items in it
document.getElementById('btn').onclick= function() {
    var anyWindow = window.URL || window.webkitURL;
    var colorThief = new ColorThief();
    for (var i = 0; i < j; i++) {
        //finds the id of myImg then the index
        var img = document.getElementById('myImg' + i);
        //call colorthief to get array of most common color
        var color = colorThief.getColor(img);
        //push the data to a dict
        colorAndBlob.push({blob: pictures[i], value: color});
    }
    console.log(colorAndBlob);
}

//document.querySelector("#file").onchange=pullfiles;



/*
//global variable for selecting type
var selectNum = 0;
var userCol = []; 
var userType = [];
var i = 0;

//creates select lists to select a clothing type
function createSelect() {
    var myParent = document.body;
    var arr = ["Shirts", "Pants", "Shoes"];
    var selectList = document.createElement("select");
    selectList.id = "mySelect" + selectNum;
    myParent.appendChild(selectList);

    for (var i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.value = arr[i];
        option.text = arr[i];
        selectList.appendChild(option);
    }
    selectNum++;
}

//global variable for checking how many images were put in.
var j = 0;

var send = document.getElementById("send");


send.onclick = function(){
    var colorThief = new ColorThief();	
    for (var i = 0; i < j; i++) {
        var img = document.getElementById('myImg' + i);
        var color = colorThief.getColor(img);
        userCol[i] = color; 
    }

    for (var i = 0; i < selectNum; i++) {
        var choice = document.getElementById("mySelect" + i);
        var strUser = choice.options[choice.selectedIndex].text;
        userType[i] = strUser; 
    }

    for (var i = 0; i < j; i++) {
        console.log(userCol[i]);
        console.log(userType[i]);
    }
}

document.getElementById('shirtsFile').onclick = function() {
      insertImage('shirtsFile', 'result');
}

document.getElementById('pantsFile').onclick = function() {
    insertImage('pantsFile', 'result2');
}

//Inserts the image into the database/lets users see what images are put in.
function insertImage(type, outputResult) {
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById(type);        
        filesInput.addEventListener("change", function(event){           
        var files = event.target.files; //FileList object
        var output = document.getElementById(outputResult);           
        //for(var i = 0; i < files.length; i++)
        //{
            var file = files[i];         
            //Only pics
            //if(!file.type.match('image'))
            //    continue;                
            var picReader = new FileReader();				                
            picReader.addEventListener("load",function(event){                    
                var picFile = event.target;
                var div = document.createElement("div");
                //Create new image div
                div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                "title='" + picFile.name + "'id='myImg" + j + "'/>";
                //createSelect();
                j++;
                output.insertBefore(div, null);                                               
            });                
                //Read the image
            picReader.readAsDataURL(file);       				
        //}           
        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }     
}*/