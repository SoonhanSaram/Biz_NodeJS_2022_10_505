document.addEventListener("DOMContentLoaded", () => {
  const doc = document;
  const btn = "button.bbs";
  const bbsUpdate = doc.querySelector(`${btn}.update`);
  const bbsDelete = doc.querySelector(`${btn}.delete`);
  const bbsList = doc.querySelector(`${btn}.list`);

  const clickEvent = (e) => {
    const btnInfo = e.target;
    const btnName = btnInfo.textContent;
    let URL = "/";
    switch (btnName) {
      case "수정":
        URL = `/update/${id}`;
        break;
      case "삭제":
        if (!confirm("삭제하시겠습니까?")) {
          return;
        }
        URL = `/delete/${id}`;
        break;
      case "목록":
        URL = "/";
        break;
    }
    document.location.href = URL;
  }; // end clickEvent

  bbsUpdate?.addEventListener("click", clickEvent);
  bbsDelete?.addEventListener("click", clickEvent);
  bbsList?.addEventListener("click", clickEvent);
});
