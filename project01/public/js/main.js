document.addEventListener("DOMContentLoaded", () => {
  const lis = document.querySelectorAll("lis.menu");

  lis?.addEventListener("click", (tag) => {
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove("active");
    }
  });
});
