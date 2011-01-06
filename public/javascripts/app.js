/*when your page is fully loaded, do this stuff:*/
document.observe("dom:loaded", function(event){
	document.stopObserving("dom:loaded");
  if ($$('.project_images').size() > 0){
    
    //if each project image on the page we'll..
    /*$$('.project_images').each(function(image_area){
      var images = image_area.childElements();
      images.invoke("hide");
      images.first().show();
    });*/
    try{
    var descriptions = $$('.description');
    if (descriptions.size() > 0){
  		var to_show = descriptions.splice(0,1);
    	descriptions.invoke("hide");
    	to_show.show();
  	} 
	}catch(err){}
    
  }
  
  $$('a[href="'+current_url+'"]').each(function(s){s.addClassName("selected");});
  
  $$('.project_images').each(function(project_images){
    var total_images = project_images.down(".scroller").childElements().size();
    project_images.down(".total_slides").update(total_images);
    if (total_images == 1){
      project_images.down(".next").addClassName("disabled");
    }
  });
  

  
  
  
});


function scroller_previous(scroller){ 
  var scrolledAmount = parseInt(scroller.style.left) || scroller.style.left != ""; // amount = someValue (element.style.left) || someOtherValue
  var currentImageIndex = (Math.abs(scrolledAmount) / 620) || 0;  // takes absol value 
  var newImageIndex = currentImageIndex - 1; // current index - 1; if new image index is < 0  don't do anything
  var newImage = scroller.childElements()[newImageIndex];
  var projectImages = scroller.up(".project_images");
  var totalImages = projectImages.down(".scroller").childElements().size();
  var descriptions = $$('.description');
  

  if (newImageIndex < 0 ) { // is the "newImage" less than zero?
    // do nothing
    } else {
      
      if (newImageIndex + 1 == 1){
        projectImages.down('.previous').addClassName("disabled");
      }else{
        projectImages.down('.previous').removeClassName("disabled");
      }

      if (newImageIndex + 1 == totalImages){
        projectImages.down('.next').addClassName("disabled");
      }else{
        projectImages.down('.next').removeClassName("disabled");
      }
      
      projectImages.down(".current_slide").update(newImageIndex+1);
      
    var caption = scroller.next('.description').down('.caption');  
    
    new Effect.Move(scroller, {
      x: 620,
      duration: .5,
      queue:"end",
      afterFinish: function(){
       /// console.log(newImageIndex);
        var to_show = descriptions.splice(newImageIndex,1);
        descriptions.invoke("hide");
        if (to_show.size() > 0){
          to_show.first().show();
        }else{
          $$('.description').first().show();
        }
      }
    });
    

  }
}

function scroller_next(scroller){ 
  var scrolledAmount = parseInt(scroller.style.left); // amount = someValue (element.style.left) || someOtherValue
  
  var currentImageIndex = (Math.abs(scrolledAmount) / 620) || 0;  // takes absol value 
  var newImageIndex = currentImageIndex + 1; // current index + 1; if new image index is < 0  don't do anything
  var newImage = scroller.childElements()[newImageIndex];
  var projectImages = scroller.up(".project_images");
  var totalImages = projectImages.down(".scroller").childElements().size();
  var descriptions = $$('.description');
  

  
  if (newImage == undefined ) { // is the "newImage" less than zero?
    // do nothing
    } else {
      
      if (newImageIndex + 1 == 1){
        projectImages.down('.previous').addClassName("disabled");
      }else{
        projectImages.down('.previous').removeClassName("disabled");
      }

      if (newImageIndex + 1 == totalImages){
        projectImages.down('.next').addClassName("disabled");
      }else{
        projectImages.down('.next').removeClassName("disabled");
      }
      
      projectImages.down(".current_slide").update(newImageIndex+1);
      
    var caption = scroller.next('.description').down('.caption');  
///    caption.update(newImage.readAttribute("alt"));
      
    new Effect.Move(scroller, {
      x: -620,
      duration: .5,
      queue:"end",
      afterFinish: function(){
      ///  console.log(newImageIndex);
        var to_show = descriptions.splice(newImageIndex,1);
        descriptions.invoke("hide");
        if (to_show.size() > 0){
          to_show.first().show();
        }else{
          $$('.description').first().show();
        }
      }
    });
  }
}


document.observe("click", function(event){
  var element = event.findElement();
  // of this is an image inslide a scroller
  if (element.up().hasClassName("scroller")){
    scroller_next(element.up(".scroller"));
  }
  
  if (element.hasClassName("next")){
    scroller_next(element.up(".controls").previous('.scroller'));
  }
  
  if (element.hasClassName("previous")){
    scroller_previous(element.up(".controls").previous('.scroller'));
  }

	if (element.hasClassName('overlay')){
		window.location.href = element.previous("a").readAttribute("href");
	}
  
  
});