document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector(".bbs.input");
  const btnList = document.querySelector(".bbs.list");
  const formInput = document.querySelector("form.bbs.write");
  btnInput?.addEventListener("click", () => {
    formInput?.submit();
  });
  btnList.addEventListener("click", () => {
    document.location.href = "/";
  });
});
