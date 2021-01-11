//global variable for selecting type
var selectNum = 0;
var userCol = []; 
var userType = [];

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

window.onload = function(){    
    //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("files");        
        filesInput.addEventListener("change", function(event){           
            var files = event.target.files; //FileList object
            var output = document.getElementById("result");           
            for(var i = 0; i< files.length; i++)
            {
                var file = files[i];                
                //Only pics
                if(!file.type.match('image'))
                  continue;                
                var picReader = new FileReader();				                
                picReader.addEventListener("load",function(event){                    
                    var picFile = event.target;
                    var div = document.createElement("div");
					div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
					"title='" + picFile.name + "'id='myImg" + j + "'/>";
                    createSelect();
					j++;
                    output.insertBefore(div, null);   
                                               
                });                
                 //Read the image
                picReader.readAsDataURL(file);       				
            }           
        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }       
}

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