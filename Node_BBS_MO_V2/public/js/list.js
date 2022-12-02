document.addEventListener("DOMContentLoaded", () => {
  const bbsList = document.querySelector("table.bbs.list");
  const btnInsert = document.querySelector("button.bbs.insert");

  btnInsert?.addEventListener("click", () => {
    document.location.href = "/insert";
  });
  bbsList?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const id = target.closest("TR").dataset.id;
      document.location.href = `/detail/${id}`;
    }
  });
});
