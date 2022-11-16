document.addEventListener("DOMContentLoaded", () => {
  const updateBtn = document.querySelector("button.buyer.update");
  const deleteBtn = document.querySelector("button.buyer.delete");
  const buttonBox = document.querySelector("article.detail.button");

  //   updateBtn?.addEventListener("click", () => {
  const parents = updateBtn.closest("ARTICLE");
  const bcode = parents.dataset.bcode;
  // console.log(bcode);
  //   })

  buttonBox?.addEventListener("click", (tag) => {
    const button = tag.target;
    if (button.tagName === "BUTTON") {
      //   alert(button.classList);
      const bcode = button.closest("ARTICLE")?.dataset.b_code;
      let url = "/buyer";
      const classList = Array.from(button.classList);
      if (classList.indexOf("update") > 0) {
        // alert(`update${bcode}`);
        url += `/update/${bcode}`; // /buyer/udate/${bcode}
        // location.href = GET method로 새로운 페이지를 요청하기
        // 현재 보이는 화면이 뒤로 밀리고 새로운 페이지가 열림
        document.location.href = url;
      } else if (classList.indexOf("delete") > 0) {
        if (!confirm("삭제하시겠습니까?")) {
          return false;
        }
        // alert(`delete${bcode}`);
        url += `/delete/${bcode}`; // /buter/delete/${bcdoe}
        // 보통 delete를 할 땐 replace 사용
        // location.replace() 함수 : 현재 화면(페이지)를 url페이지로 덮어쓰기
        // 뒤로갈 때 이 페이지를 건너뛴다.
        // 현재 보고있는 detail 데이터가 삭제 되었는데
        // 뒤로가기를 했을 때 다시 detail화면이 나타나는 것은 어색
        // 이럴때는 replace() 함수를 사용
        document.location.replace(url);
      }
    }
  });
});
