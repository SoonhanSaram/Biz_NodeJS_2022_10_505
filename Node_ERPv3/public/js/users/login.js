document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.querySelector("button.user.login");
  const inputUsername = document.querySelector("input[name='username']");
  const inputPassword = document.querySelector("input[name='password']");
  btnLogin?.addEventListener("click", () => {
    const username = inputUsername.value;
    const password = inputPassword.value;
    if (!username) {
      alert(`username을 입력하세요`);
      inputUsername.select();
      return false;
    }
    if (!password) {
      alert(`password를 입력하세요`);
      inputPassword.select();
      return false;
    }
    document.querySelector("form.login").submit();
  });
});
