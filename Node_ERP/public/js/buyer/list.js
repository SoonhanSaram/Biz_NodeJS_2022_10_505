document.addEventListener("DOMContentLoaded", () => {
  const btnInsert = document.querySelector("button.buyer.insert");
  const buyerList = document.querySelector("table.buyer.list");
  btnInsert?.addEventListener("click", () => {
    document.location.href = "/buyer/insert";
  });

  buyerList?.addEventListener("click", (tag) => {
    const target = tag.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const bcode = tr.dataset.b_code;
      if (bcode) {
        // alert(`${bcode}`);
        document.location.href = `/buyer/detail/${bcode}`;
      }
    }
  });
});
