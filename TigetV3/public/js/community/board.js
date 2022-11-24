document.addEventListener("DOMContentLoaded", () => {
  const btnContainer = document.querySelector("div.categorylist");

  btnContainer?.addEventListener("clikc", async (e) => {
    const boardList = document.querySelector("table.boardcontainer tbody");
    const btnButton = e.target;
    const btnName = btnButton.textContent;
    if (!btnName) return false;
    let URL = "/";
    URL = `/forum/get/${btnName}`;
    // switch (btnName) {
    //   case "sample1":
    //     URL = `/forum/get/${btnName}`;
    //     break;
    //   case "sample2":
    //     URL = `/forum/get/${btnName}`;
    //     break;
    //   case "sample3":
    //     URL = `/forum/get/${btnName}`;
    //     break;
    //   case "sample4":
    //     URL = `/forum/get/${btnName}`;
    //     break;
    //   case "sample5":
    //     URL = `/forum/get/${btnName}`;
    //     break;
    // }
    await fetch(URL);
  });
});
