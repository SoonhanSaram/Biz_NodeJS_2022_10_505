document.addEventListener("DOMContentLoaded", () => {
  const lis = document.querySelector("ul").querySelectorAll("li");
  const img = document.querySelector(".inner.img");
  const urls = document.querySelectorAll(".url");
  window.addEventListener("scroll", function () {
    img.style.backgroundSize = 200 - +window.pageYOffset / 9.28 + "%";
    img.style.opacity = 0 + +window.pageYOffset / 800 + "1";
  });
  console.log(lis);

  lis.forEach((e) => {
    e.addEventListener("click", function () {
      lis.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });

<<<<<<< HEAD
lis.forEach(e => {
  e.addEventListener("click", function(){
    lis.forEach(nav=>nav.classList.remove("active"))    
    this.classList.add("active")
  })
})   
=======
  urls?.addEventListener("click", () => {});
>>>>>>> 30ca33bd6435f7713db33ff00b3327f34dd07e5a
});


// lis.forEach(e => {
// e.addEventListener("click", ()=>{
//   lis.forEach(nav=>nav.classList.remove("active"))

//   let target = e.currentTarget
//   target.classList.add("active")
// })
// })