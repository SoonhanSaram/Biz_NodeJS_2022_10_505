document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.querySelector("nav.main");

  mainNav?.addEventListener("click", (e) => {
    const nav = e.target;
    const className = nav.className;

    let url = "/";
    switch (className) {
      case "home":
        url = "/";
        break;
      case "books":
        url = "/book";
        break;
      case "mybook":
        url = "/book/user";
        break;
      case "login":
        url = "/users/login";
        break;
      case "logout":
        url = "/users/logout";
        break;
      case "join":
        url = "/users/join";
        break;
      case "mypage":
        url = "/users/mypage";
        break;
    } // end switch
    document.location.href = url;
  });
});
