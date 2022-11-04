document.addEventListener("DOMContentLoaded", () => {
  const btnGroup = document.querySelector("div.student.btn_box");
  btnGroup?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      //  tag 속성에서 class 이름을 get
      const className = target.className;
      const st_num = target.closest("div")?.dataset?.st_num;
      //   alert(className); 확인
      let reqURL = "/";
      //   !confrim 취소했을 때 {}처리
      if (className === "st_delete") {
        if (!confirm(`${st_num}학생정보를 삭제합니다1?`)) {
          return false;
        }
      }
      switch (className) {
        case "st_update":
          reqURL = `/student/${st_num}/update`;
          break;
        case "st_delete":
          reqURL = `/student/${st_num}/delete`;
          break;
        case "st_list":
          reqURL = `/student/`;
      }
      document.location.href = reqURL;
    }
  });
});
