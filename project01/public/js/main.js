document.addEventListener("DOMContentLoaded", () => {
  const lis = document.querySelector("ul").querySelectorAll("li");
  const img = document.querySelector(".inner.img")
  window.addEventListener("scroll", function() {
    img.style.backgroundSize = 200 - +window.pageYOffset/9.28 +'%'
    img.style.opacity = 0 + +window.pageYOffset/800 + '1'
  })
console.log(lis)


lis.forEach(e => {
  e.addEventListener("click", function(){
    lis.forEach(nav=>nav.classList.remove("active"))

    
    this.classList.add("active")
  })
})   
});
