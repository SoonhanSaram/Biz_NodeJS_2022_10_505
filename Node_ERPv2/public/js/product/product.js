document.addEventListener("DOMContentLoaded", () => {
  const btnAdd = document.querySelector("button.product.add");
  const productList = document.querySelector("table.product.list");

  productList?.addEventListener("click", (tag) => {
    const target = tag.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const pcode = tr.dataset?.p_code;
      if (pcode) {
        document.location.href = `/product/detail/${pcode}`;
      }
    }
  });

  btnAdd?.addEventListener("click", () => {
    document.location.href = "/product/add/";
  });
});
