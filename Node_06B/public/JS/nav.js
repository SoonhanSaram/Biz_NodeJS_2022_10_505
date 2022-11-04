document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav.main");
  nav?.addEventListener("click", (tag) => {
    /**
     * tag.target
     * nav.main tag가 포함하고 있는 tag요소들 중에서
     * 마우스 클릭이된 대상
     */
    const target = tag.target;
    if (target.tagName === "LI") {
      const navText = target.textContent;
      //   if (navText === "홈") {
      //     document.location.href = "/";
      //   } else if (navText === "학생정보") {
      //     document.location.href = "/student";
      //   } else if (navText === "성적정보") {
      //     document.location.href = "/score";
      //   } else if (navText === "학과정보") {
      //     document.location.href = "/dept";
      //   } else if (navText === "로그인") {
      //     document.location.href = "/user/login";
      //   }
      // }

      // switch (navText) {
      //   case "홈":
      //     document.location.href = "/";
      //     break;
      //   case "학생정보":
      //     document.location.href = "/student";
      //     break;
      //   case "성적정보":
      //     document.location.href = "/score";
      //     break;
      //   case "학과정보":
      //     document.location.href = "/dept";
      //     break;
      //   case "로그인":
      //     document.location.href = "/user/login";
      // }
      let href = "/";
      switch (navText) {
        case "홈":
          href = "/";
          break;
        case "학생정보":
          href = "/student";
          break;
        case "성적정보":
          href = "/score";
          break;
        case "학과정보":
          href = "/dept";
          break;
        case "로그인":
          href = "/user/login";
      } //end switch
      document.location.href = href;
    }
  });
});
