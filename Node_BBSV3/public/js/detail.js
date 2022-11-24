document.addEventListener("DOMContentLoaded", () => {
  const doc = document;
  const btn = "button.bbs";
  const bbsUpdate = doc.querySelector(`${btn}.update`);
  const bbsDelete = doc.querySelector(`${btn}.delete`);
  const bbsList = doc.querySelector(`${btn}.list`);

  const bbsCommentAdd = doc.querySelector("button.comment.add");
  const bbsCommentInput = doc.querySelector("input#b_comment");

  bbsCommentAdd?.addEventListener("click", () => {
    const comment = bbsCommentInput?.value;
    if (!comment) {
      alert(`댓글을 내용이 없습니다`);
      bbsCommentInput.select();
      return false;
    }
    const commentData = { id, ct_comment: comment };
    /**
     * fetch 기본 method는 get방식
     * 데이터를 보낼 때는 POST, PUT으로 전송이 기본
     * POST : 없는 데이터를 새로 추가할 때 (INSERT를 실행)
     * PUT : 기존의 데이터를 변경하고자 할 떄
     */
    const fetchOption = {
      method: "PUT",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    };
    fetch("/comment/add", fetchOption)
      // fetch가 성공적으로 수행되고 server에서 req가 오면
      // then()함수가 호출되고 res 변수에 서버에서 보낸
      // response정보가 담긴다
      // Response정보 중에서 우리가 필요한 것은 json type의
      // 데이터만 필요
      // res에서 json을 추출하여 다음 then()함수에게 전달
      // .then(res => {return res.json()})
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const commentList = json.b_comments;
        const cmmBox = doc.querySelector(".comments.item");
        //  map을 사용하여 댓글 개수만큼 pTag를 만들기
        //  생성된 ptag는 pTagList 배열에 담기
        const pTagList = commentList.map((cmm) => {
          const pTag = doc.createElement("P");
          pTag.textContent = `${cmm.ct_write}.. ${cmm.ct_comment}`;
          return pTag;
        });
        cmmBox.textContent = "";
        // pTagList 배열을 cmmBox에 한꺼번에 append
        // 배열을 한꺼번에 추가할 때 append(...배열)
        cmmBox.append(...pTagList);
      });
  });

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
