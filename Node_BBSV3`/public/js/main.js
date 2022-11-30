document.addEventListener("DOMContentLoaded", () => {
  const homeButton = document.querySelector("h1");

  homeButton?.addEventListener("click", () => {
    document.location.href = "/";
  });
});
