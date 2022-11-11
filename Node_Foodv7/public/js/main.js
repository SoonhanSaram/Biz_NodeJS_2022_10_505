const info = document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.today.input");
  const btnReset = document.querySelector("button.today.reset");
  const infos = document.querySelector("table.today");
  const formTr = document.querySelector("form.today tr");
  const btnDelete = document.querySelector("button.today.delete");
  window.oncontextmenu = function () {
    return false;
  };
  btnInput?.addEventListener("click", (tag) => {
    const updateTag = tag.currentTarget;

    // tag에 update라는 class가 포함되어 있으면 유효성검사 건너뛰기
    // if (Array.from(updateTag.classList).includes("update")) return false;
    // alert("추가");
    const todayInputs = document.querySelectorAll("input");

    for (let tag of todayInputs) {
      // input tag의 name이 seq이면 건너뛰기
      if (tag.name !== "t_seq") {
        const value = tag.value;
        if (!value) {
          alert(`값을 입력하세요\n
        "${tag.title}"`);
          tag.select(); // tag.focus()를 포함한다.
          return false;
        }
      }
    }
    //end for
    // 유효성 검사가 끝나면 server로 데이터를 전송하기
    document.querySelector("form.today").submit();
  });

  infos?.addEventListener("click", (tag) => {
    const target = tag.target;
    const pTR = target.closest("TR");
    const t_seq = pTR?.dataset?.seq;

    if (target.tagName === "SPAN") {
      if (confirm(`${t_seq}번 데이터를 삭제하겠습니까?`)) {
        document.location.replace(`/delete/${t_seq}`);
      }
    }
    if (target.tagName === "TD") {
      const tds = pTR.childNodes;
      for ([index, td] of tds.entries()) {
        if (td?.title) {
          const input = document.querySelector(`input[name=${td.title}]`);
          input.value = td.textContent;
        }
      }
      document.querySelector("input[name='t_seq']").value = t_seq;
      btnInput.classList.add("update");
    }
  });
  infos?.addEventListener("contextmenu", (tag) => {
    const target = tag.target;
    alert("해당 정보 삭제를 원하시면 삭제를 눌러주세요");

    if (target.tagName === "TD") {
      const pTR = target.closest("TR");
      const t_seq = pTR.dataset.seq;
      document.querySelector("input[name='t_seq']").value = t_seq;
    }
  });
  btnReset?.addEventListener("click", () => {
    btnInput.classList.remove("update");
  });
  btnDelete?.addEventListener("click", () => {
    document.querySelector("form.today").submit();
  });
});
