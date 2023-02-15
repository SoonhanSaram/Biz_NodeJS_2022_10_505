document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");
  const UL = document.querySelector("ul");
  let tr = document.createElement("li");
  let ROOMNAME = document.createElement("span");
  let JOIN = document.createElement("button");

  const ws = new WebSocket(`ws://192.168.4.118:3000/`);
  Generator.addEventListener("click", (e) => {
    if (InputValue.value) {
      localStorage.setItem("ID", InputValue);

      // document.location.href = `/chat/${InputValue}`;
    } else {
      alert("아이디를 입력해주세요");
      InputValue.focus();
    }
  });

  InputValue.addEventListener("keydown", (e) => {
    InputValue = e.target.value;
    if (e.keyCode === 13) {
      if (InputValue) {
        localStorage.setItem("ID", InputValue);
        JOIN.dataset.id = InputValue;
        console.log(JOIN.dataset);
        JOIN.style.display = "inline-block";
        JOIN.innerText = "입장";
        ROOMNAME.innerText = InputValue;
        tr.appendChild(ROOMNAME);
        tr.appendChild(JOIN);
        UL.appendChild(tr);

        //  document.location.href = `/chat/${InputValue}`;
      } else {
        alert("아이디를 입력해주세요");
        e.currentTarget.select();
      }
    }
  });

  JOIN?.addEventListener("click", () => {
    document.location.href = `/chat/${JOIN.dataset.id}`;
  });

  ws.addEventListener("onopen", () => {
    JOIN.dataset.id = InputValue;
    console.log(JOIN.dataset);
    JOIN.style.display = "inline-block";
    JOIN.innerText = "입장";
    ROOMNAME.innerText = InputValue;
    tr.appendChild(ROOMNAME);
    tr.appendChild(JOIN);
    UL.appendChild(tr);
  });
});
