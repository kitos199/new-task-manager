const body = document.querySelector("body");

function getCookie() {
  const cookieValue = document.cookie.split(";");
  let userName;
  cookieValue.forEach((e) => {
    const [name, value] = e.split("=");
    userName = value;
  });
  return userName;
}
const userName = getCookie();

const markup = `<div class="bg-white w-full sm:w-[85%] md:w-[80%] lg:w-[70%] max-w-5xl mt-[5%] rounded-t-3xl">
    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 my-[5%] px-5 md:px-8">
    <h1 class="text-2xl sm:text-3xl font-bold text-center sm:text-left">
      Привет, ${userName}
    </h1>
    <button class="bg-slate-400 px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-500 w-full sm:w-auto">Выйти</button>
    </div>
    <form action="" class="flex flex-col md:flex-row justify-between gap-4 px-5 md:px-8 pb-8">
        <input id = "input-task" class="border border-sky-500 rounded-xl py-1.5 px-4 flex-1 w-full" type="text" placeholder="Введите" name="text">
        <select name="task" id="task" class="border border-sky-500 rounded-xl py-1.5 px-4 w-full md:w-auto">
            <option value="green">Низкий</option>
            <option value="blue">Средний</option>
            <option value="red">Высокий</option>
        </select>
        <input type="submit" name="submit" value="Добавить" class="bg-slate-400 px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-500 w-full md:w-auto">
    </form>
    <div id = "no-task" class="flex flex-col px-5 md:px-8 pb-8">
        <p class="text-xl px-5 md:px-8 pb-8">Нет задач</p>
    </div>
    <div class="wrapper-cart">

    </div>
    </div>
    </div>

   `;

const init = () => {
  const noTask = document.querySelector("#no-task");
  const formTask = document.querySelector("form");
  const wrapperCart = document.querySelector(".wrapper-cart")
  formTask.addEventListener("submit", (e) => {
    e.preventDefault();

    const getFormData = Object.fromEntries(new FormData(formTask));
    const { text, task } = getFormData;
    if (text !== "") {
      const markup = `<div class="task-cart flex  bg-[#e5dede] p-5 rounded-xl mb-5 mx-5">
        <p class="task-text text-xl text-${task}-500">${text}</p>
        <div class="flex ml-auto gap-5 items-center">
        <input type="checkbox" name="checed" class="checkbox-cart w-5 h-5">
        <img class = "paint" src="src/publick/peint.png" alt="ручка">
        <img class = "basket" src="src/publick/wastebasket.jpg" alt="корзина" class="mix-blend-multiply">
        </div>
        </div>`;
        document
        wrapperCart.insertAdjacentHTML("afterend", markup);
      document.querySelector("#input-task").value = "";
      updateCart()
      noTask.remove();
    }
  });
};

const updateCart = () => {
  const taskCart = document.querySelector(".task-cart")
  taskCart.addEventListener("click", (e) => {
    if (e.target.classList.contains("paint")) {
      const redact = prompt("Редактирование")
      const taskCArt = e.target.closest(".task-cart");
      if (taskCart) {
      taskCArt.querySelector(".task-text").textContent = `${redact}`
     }
    } else if (e.target.classList.contains("basket")) {
      taskCart.remove()
    } else if (e.target.classList.contains("checkbox-cart")) {
      const anyChecked = taskCart.querySelector(".checkbox-cart:checked");
      console.log(anyChecked, e.target);
      if (anyChecked) {
        e.target.closest(".task-cart").querySelector(".task-text").classList.add("line-through");
      } else {
        e.target.closest(".task-cart").querySelector(".task-text").classList.remove("line-through");
        // console.log(textElement);
      }
    }
  })
};

document.addEventListener("DOMContentLoaded", () => {
  body.insertAdjacentHTML("afterbegin", markup);
  init();
});
