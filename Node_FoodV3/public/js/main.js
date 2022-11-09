const info = document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.today.input");
  const btnReset = document.querySelector("button.today.reset");
  const infos = document.querySelector("table.today");
  const tform = document.querySelector("form.today");

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

    if (target.tagName === "TD") {
      const pTR = target.closest("TR");
      const t_seq = pTR.dataset.seq;
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

  btnReset?.addEventListener("click", () => {
    btnInput.classList.remove("update");
  });
});
