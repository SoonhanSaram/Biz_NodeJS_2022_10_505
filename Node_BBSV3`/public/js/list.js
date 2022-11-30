document.addEventListener("DOMContentLoaded", () => {
  const bbsList1 = document.querySelector("table.bbs.list");
  const btnInsert = document.querySelector("button.bbs.insert");
  const trList = document.querySelector("tbody tr")
  const previews = document.querySelectorAll(".glance")

  // 미리보기 상자 만들기
  // const boradView = (bbsList) => {
  //   const boardBox = bbsList.map((value)=>{
  //     glanceItem.textContent = "";
  //     const bBox = document.createElement("DIV")
  //     bBox.className = "boardContainer"

  //     let div = document.createElement("DIV")
  //     div.className = "board write"
  //     div.textContent = `${value.b_write || 익명} `
  //     bBox.appendChild(div)

  //     div = document.createElement("DIV")
  //     div.className = "board subject"
  //     div.textContent = `${value.b_subject} `
  //     bBox.appendChild(div)

  //     div = document.createElement("DIV")
  //     div.className = "board content"
  //     div.textContent = `${value.b_content} `
  //     bBox.appendChild(div)

  //     return bBox
  //   })
  //   glanceItem.append(...boardBox)
  // };
  btnInsert?.addEventListener("click", () => {
    document.location.href = "/insert";
  });
  bbsList1?.addEventListener("click", (e) => {
    const target = e.target;
    // alert(`${target.closest("TR").dataset.id}`)
    if (target.classList == "more") {
      const id = target.closest("TR").dataset.id;
      document.location.href = `/detail/${id}`      
    }     
    const id = target.closest("TR").dataset.id;
    target.closest("TR").classList.toggle("click")
    previews.forEach ((tr, index) => {
      if (tr.dataset.id === id) {
        // target.closest("TR").classList.remove('click')
        previews[index].classList.toggle('click' )
      }
    })
    // 1개 프리뷰만 온/오프
    // if  (previews.dataset.id === id) {
    // target.closest("TR").classList.toggle('click' )
    // previews.classList.toggle('click' ) }
    
  });
  
  // bbsList1?.addEventListener("click",  async (e) => {
    
    

    // 클릭시 tag생성
    // if (target.tagName == "TD" && target.classList != "more") {
      
    //   const createDiv = document.createElement("DIV")
    //   createDiv.className = "glance"
      
    //   let innerDiv = document.createElement("DIV")
    //   innerDiv.className = "inner"
    //   innerDiv.textContent = "작성자"
    //   createDiv.appendChild(innerDiv)
      
    //   innerDiv = document.createElement("DIV")
    //   innerDiv.className = "inner"
    //   innerDiv.textContent = "제발되세용"
    //   createDiv.appendChild(innerDiv)
      
    //   innerDiv = document.createElement("DIV")
    //   innerDiv.className = "inner"
    //   innerDiv.textContent = "제목"
    //   createDiv.appendChild(innerDiv)
      
    //   innerDiv = document.createElement("DIV")
    //   innerDiv.className = "inner"
    //   innerDiv.textContent = "방법을 찾아보자"      
    //   createDiv.appendChild(innerDiv)
      
    //   innerDiv = document.createElement("DIV")
    //   innerDiv.className = "inner"
    //   innerDiv.textContent = "제발되세용"      
    //   createDiv.appendChild(innerDiv)

    //   trList.appendChild(createDiv)      
    // }
      
          
      
      // console.log(id)
      // const option = {
      //   method : "GET",
      //   headers : {"Content-Type" : "application/json"}, 
      // }
      // const response = await fetch(`/${id}`, option)
      // response_json = await response.json()
      
      // . then(text=>  console.log(text))
//       .then(async (res)=>{
//       if(!res.ok) {
//       const text = await res.text()
//       throw new Error(text)}
//       const text = await res.text()      
//       return JSON.parse(text)
  
// })
//       .catch((error)=> console.log(`Error:`, error))
//       .then((text)=>console.log(text) )

      //  샘한테 배운 res 코드
      // .then (res = await res.json())
      // .then ( (json) => (console.json(json)) )
      // .then ( (json) => boradView(json))     
  
  // });
});
