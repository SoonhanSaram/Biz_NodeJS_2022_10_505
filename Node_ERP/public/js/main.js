document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.querySelector("nav.main");

  mainNav?.addEventListener("click", (tag) => {
    const target = tag.target;

    if (target.tagName === "LI") {
      let url = "";
      switch (target.textContent) {
        case "Home":
          url = "/";
          break;
        case "거래처관리":
          url = "/buyer";
          break;
      }
      document.location.href = url;
    }
  });
});
