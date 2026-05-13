const wrapper = document.querySelector(".wrapper");

const markup = ` <h1> task manager</h1>
        <p>Войдите, чтобы управлять своими задачами</p>
        <form action="" class="form-output">
            <input class="login" type="text" name="name" placeholder="Ваше имя">
            <input class="submit" type="submit" value="Войти">
        </form>`;

const init = (formTyupe) => {
  const formOutput = document.querySelector(".form-output");
  formOutput.addEventListener("submit", (e) => {
    e.preventDefault();

    const getFormValue = new FormData(formOutput);
    const fromData = Object.fromEntries(getFormValue);

    if (!(fromData.name === '')) {
      document.cookie = `authUser=${fromData.name}; path =/; max-age=86400`
      location.href = "manager.html"
      } else {
        alert("Ввидите имя")
      }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  wrapper.insertAdjacentHTML("afterbegin", markup);
  init();
});
