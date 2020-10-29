(() => {
    let $ = el => document.querySelector(el);
    
    $(".animenu__btn").addEventListener("click", function(){
      this.classList.toggle("animenu__btn--active")
      $(".animenu__nav").classList.toggle("animenu__nav--active")
    });
  })()

  var slider_content = document.getElementById('box');

  window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.onload = imageIsLoaded;
            image.push(img.src);
            console.log(image);
        }
    });
  });
  
  function imageIsLoaded() { 
    alert(this.src);  // blob url
    // update width and height ...
  }

  //contain images in an array
  var image = ['a', 'b', 'c', 'd'];
  

  var i = image.length;

  // function for next slide
  function nextImage() {
    if (i < image.length) {
      i = i + 1;
    }
    else {
      i = 1;
    }
    slider_content.innerHTML = "<img src=/img/" + image[i-1] + ".jpg>";
  }

  //function for previous slide
  function prewImage() {
    if (i < image.length + 1 && i > 1) {
      i = i - 1;
    }
    else {
      i = image.length;
    }
    slider_content.innerHTML = "<img src=/img/" + image[i-1] + ".jpg>";
  }
  