const navClick = (tag) => {
  const target = tag.target
  
  if ( target.tagName === "LI") {
    const navText = target.textContent
    alert("LI클릭")
    let href="/"
    switch (navText) {
      case "홈" :
      href = "/"
      break
      case "공지사항":
      href = "/alarm"
      break
      case "이벤트" :
      href = "/event"
      break
      case "로그인":
      href = "/login"
      break
      case "회원가입" :
      href = "/membership application"      
    }
    document.location.href=href
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav.nav")
  
  nav?.addEventListener("click", navClick)

})