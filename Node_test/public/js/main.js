const tdClickHnadlerV2 = (tag) => {
 const target = tag.target;
 const parentTR = target.closest("TR");
 const c_id = parentTR.dataset.c_id;
 document.location.href = `/view/${c_id}/detail`;
  };
  document.addEventListener("DOMContentLoaded", () => {
 const btnAdd = document.querySelector("button.add");
 const btnReset = document.querySelector("button.reset"); 
 const btnGoAdd = document.querySelector("button.goadd");
 const btnGoList = document.querySelector("button.golist");
 const btnDelete = document.querySelector("button.eliminate");
 const btnGoModifying = document.querySelector("button.modifying"); 
 const customInputs = document.querySelectorAll("form.manage input");
 const nav = document.querySelector("nav");
 const customList = document.querySelector("table.list");
 customList?.addEventListener("click", tdClickHnadlerV2);
nav?.addEventListener("click", (tag) => {
 const target = tag.target;
 
 if (target.tagName === "LI") {
 const navText = target.textContent;
 let href = "/";
 switch (navText) {
 case "Home":
 href = "/";
 break;
 case "주문관리":
 href = "/ordermanagement";
 break;
 case "결제관리":
 href = "/paymanagemnet";
 break;
 case "거래처관리":
 href = "/customermanagemnet";
 break;
 case "상품관리":
 href = "/stockmanagemnet";
 break;
 case "로그인":
 href = "/user/login";
 break;
 }
 document.location.href = href;
 }
});
btnAdd?.addEventListener("click", (tag) => {
 const customInputs = document.querySelectorAll("form.manage input");
 for (let tag of customInputs) {
 if (tag.name !== "c_id") {
 const value = tag.value;
 }
 if (!value) {
 alert(`${tag.plaecholder}을/를 입력하세요 `);
 tag.tagselect();
 return false;
 }
 }
 document.querySelector("form.manage").submit();
 });
 btnReset?.addEventListener("click", () => {
 customInputs.forEach((input) => {
 input.value = "";
 });
 });
 btnGoAdd?.addEventListener("click", () => {
 document.location.href = "/add";
 });
 btnGoList?.addEventListener("click", () => {
 document.location.href = "/customermanagemnet";
 });
 btnGoModifying?.addEventListener("click", (tag) => {
 const c_id = tag.target.dataset.c_id;
 // console.log(c_id);
 document.location.href = `/modify/${c_id}`;
 });
 btnDelete?.addEventListener("click", (tag) => {
 const c_id = tag.currentTarget.dataset.c_id
 
 // console.log(c_id)
 if (confirm(`${c_id}고객처 정보를 삭제하겠습니까?`)) {
 document.location.replace(`/customermanagemnet`)
 }
 
 document.querySelector("form.detail").submit()
 });
 
 
 
});
  