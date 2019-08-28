let btn = document.querySelector("button");
let overlay = document.querySelector('.overlay');
let displayedImage = document.querySelector('.displayed-img');
let thumbBar = document.querySelector('.thumb-bar');
for(let i = 1; i <= 5; i++) {
    let newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic' + i + '.jpg');
    thumbBar.appendChild(newImage);
    newImage.onclick = function(e) {
      let imgSrc = e.target.getAttribute('src');
      displayImage(imgSrc);
    }
  }
  
  function displayImage(imgSrc) {
    displayedImage.setAttribute('src', imgSrc);
  }
  


btn.onclick = function()
{
    let classBtn = btn.getAttribute("class");
    if ( classBtn === "dark" )
        {
            btn.setAttribute("class","light");
            btn.textContent = "Lighten";
            overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        }
        else
        {
            btn.setAttribute("class","dark");
            btn.textContent = "Darken";
            overlay.style.backgroundColor = "rgba(0,0,0,0)";
        }
}