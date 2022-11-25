document.addEventListener("DOMContentLoaded", () => {
  const doc = document;
  const btn = "button.bbs";
  const bbsUpdate = doc.querySelector(`${btn}.update`);
  const bbsDelete = doc.querySelector(`${btn}.delete`);
  const bbsList = doc.querySelector(`${btn}.list`);
  // 댓글 추가버튼
  const bbsCommentAdd = doc.querySelector("button.comment");
  // 댓글 input박스
  const bbsCommentInput = doc.querySelector("input.comment");
  const bbsCommentBox = doc.querySelector(".comments.box");
  const commentListView = (commList) => {
    // list box clear
    bbsCommentBox.textContent = "";
    const commentList = commList.map((comm) => {
      // p.comment.list.box
      const pBox = doc.createElement("P");
      pBox.className = "comment list box";

      let span = doc.createElement("SPAN");
      span.className = "comment write";
      span.textContent = `${comm.ct_write || 익명}`;
      pBox.appendChild(span);

      span = doc.createElement("SPAN");
      span.className = "comment content";
      span.textContent = `${comm.ct_comment}`;
      pBox.appendChild(span);

      span = doc.createElement("SPAN");
      span.className = "comment delete";
      span.innerHTML = `&times;`;
      span.dataset.id = comm._id;
      pBox.appendChild(span);

      return pBox;
    }); // end map
    bbsCommentBox.append(...commentList);
  };
  bbsCommentBox?.addEventListener("click", (e) => {
    const span = e.target;
    if (span.tagName == "SPAN" && span.className.indexOf("delete") > 0) {
      if (confirm(`댓글을 삭제합니다`)) {
        const commentID = span.dataset.id;
        // 서버에 DELETE RequestMethod를 사용하여
        // 데이터 삭제를 요청
        fetch(`/comment/${id}/${commentID}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((json) => {
            commentListView(json.b_comments);
          });
      }
    }
  });

  bbsCommentAdd?.addEventListener("click", () => {
    const comment = bbsCommentInput?.value;
    if (!comment) {
      alert(`댓글을 내용이 없습니다`);
      bbsCommentInput.select();
      return false;
    }
    // id : detail.pug에서 선언된 게시판 ID
    // comment : 입력한 댓글
    const commentData = { id, ct_comment: comment };
    /**
     * fetch 기본 method는 get방식
     * 데이터를 보낼 때는 POST, PUT으로 전송이 기본
     * POST : 없는 데이터를 새로 추가할 때 (INSERT를 실행)
     * PUT : 기존의 데이터를 변경하고자 할 떄
     */
    const fetchOption = {
      method: "PUT", // RequestMethod
      body: JSON.stringify(commentData), //서버로 보낼 데이터
      headers: { "Content-Type": "application/json" }, //보낼 데이터형식(json)
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
        // 위에서 선언한 commentListView함수를 이용
        //
        commentListView(json.b_comments);
        // bbsCommentInput.value = "";
        bbsCommentInput.select();
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
