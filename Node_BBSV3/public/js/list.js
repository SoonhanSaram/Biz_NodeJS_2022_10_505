const bbsDetail = document.querySelector("article.bbs.detail");
const divDatas = document.querySelectorAll("article.bbs.detail div.label");
document.addEventListener("DOMContentLoaded", () => {
  const bbsList = document.querySelector("table.bbs.list");
  const btnInsert = document.querySelector("button.bbs.insert");
  const boradView = (board) => {
    divDatas.textContent = "";
    const boardDetails = board.map((detail) => {
      const divBox = document.createElement("ARTICLE");
      divBox.className = "bbs detail";

      let div = document.createElement("DIV");
      div.className = "label";
      div.textContent = 작성자;

      div = document.createElementI("DIV");
      div.className = "data";
      div.textContent = `${bbs.b_write}`;

      div = document.createElement("DIV");
      div.className = "label";
      div.textContent = 제목;

      div = document.createElementI("DIV");
      div.className = "data";
      div.textContent = `${bbs.b_subject}`;

      div = document.createElement("DIV");
      div.className = "label";
      div.textContent = 내용;

      div = document.createElementI("DIV");
      div.className = "data";
      div.textContent = `${bbs.b_content}`;

      divBox.appendChild(div);
    });
  };
  btnInsert?.addEventListener("click", () => {
    document.location.href = "/insert";
  });
  bbsList?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList == "more") {
      const id = target.closest("TR").dataset.id;
      document.location.href = `/detail/${id}`;
    }
  });
  bbsList?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName == "TD" && target.classList != "more") {
      const id = target.closest("TR").dataset.id;
      const fetchOption = {
        method: "POST",
        body: JSON.stringify(id),
        headers: { "Content-Type": "application/json" },
      };
      fetch(`/detail/:id`, fetchOption)
        .then((res) => res.json())
        .then((json) => {});
    }
  });
});
