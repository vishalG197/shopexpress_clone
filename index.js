
let slidearr=['https://cdn.shopclues.com/images/banners/2023/Jan/18/HB1_GRDS_Web_NCP_18Jan23.jpg','https://cdn.shopclues.com/images/banners/2023/Jan/18/HB2_Prebuzz_Web_NCP_18Jan23.jpg','https://cdn.shopclues.com/images/banners/2023/Jan/18/Jdd_HB3_Web_Riya_18Jan23.jpg','https://cdn.shopclues.com/images/banners/2023/Jan/18/HB4_JMAX_Web_Esha_18Jan23.jpg']
window.addEventListener("load", function () {
    slideshowFun(slidearr);
    
  });

function slideshowFun(images){
    let slide=document.getElementById("slideshow");
    let img1=document.createElement("img");
    img1.src=images[0];
    slide.append(img1);
    let i=0;
      x=setInterval(function(){
        if(i==images.length){
          i=0
        }
    // if(i<images.length){
      img1.src=images[i++];
    slide.append(img1);

      },2000)
        
    }