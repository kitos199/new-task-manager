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
const storageTasc = JSON.parse(localStorage.getItem("user")) || [];
const markup = `<div class="bg-white w-full sm:w-[85%] md:w-[80%] lg:w-[70%] max-w-5xl mt-[5%] rounded-t-3xl">
    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 my-[5%] px-5 md:px-8">
    <h1 class="text-2xl sm:text-3xl font-bold text-center sm:text-left">
      Привет, ${userName}
    </h1>
    <button class="exit bg-slate-400 px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-500 w-full sm:w-auto">Выйти</button>
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

const nameFilter = storageTasc.filter((item) => item.name === userName);
console.log(nameFilter);
function displayStorage(nameFilter, noTask) {
  if (nameFilter.length > 0) {
    nameFilter.forEach((e) => {
      if (e.chek === "checked") {
        const markup = `<div id=${e.id} class="task-cart flex  bg-[#e5dede] p-5 rounded-xl mb-5 mx-5">
             <p class="task-text text-xl text-${e.task}-500 line-through">${e.text}</p>
             <div class="flex ml-auto gap-5 items-center">
             <input type="checkbox" name="checed" class="checkbox-cart w-5 h-5" checked>
             <img class = "paint" src="src/publick/peint.png" alt="ручка">
             <img class = "basket" src="src/publick/wastebasket.jpg" alt="корзина" class="mix-blend-multiply">
             </div>
             </div>`;

      document
        .querySelector(".wrapper-cart")
        .insertAdjacentHTML("afterend", markup);
      updateCart();
      } else {
        const markup = `<div id=${e.id} class="task-cart flex  bg-[#e5dede] p-5 rounded-xl mb-5 mx-5">
             <p class="task-text text-xl text-${e.task}-500">${e.text}</p>
             <div class="flex ml-auto gap-5 items-center">
             <input type="checkbox" name="checed" class="checkbox-cart w-5 h-5">
             <img class = "paint" src="src/publick/peint.png" alt="ручка">
             <img class = "basket" src="src/publick/wastebasket.jpg" alt="корзина" class="mix-blend-multiply">
             </div>
             </div>`;

      document
        .querySelector(".wrapper-cart")
        .insertAdjacentHTML("afterend", markup);
      updateCart();
      }

    })
    noTask.remove();
  } else {

    console.log(135);
  }
}
const init = () => {
  const noTask = document.querySelector("#no-task");
  const formTask = document.querySelector("form");
  const wrapperCart = document.querySelector(".wrapper-cart");
  const exit = document.querySelector(".exit");

  displayStorage(nameFilter, noTask);

  exit.addEventListener("click", () => {
    document.cookie = "authUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    location.href = "index.html";
  });

  formTask.addEventListener("submit", (e) => {
    e.preventDefault();

    const getFormData = Object.fromEntries(new FormData(formTask));
    const { text, task } = getFormData;
    const userObj = {
      id: 0,
      name: userName,
      text,
      task,
    };

    const getId = (obj) => {
      if (storageTasc.length > 0) {
        maxId = Math.max(
          ...storageTasc.map((item) => {
            return item.id;
          }),
        );
        obj.id = maxId + 1;
        storageTasc.push(obj);
        localStorage.setItem("user", JSON.stringify(storageTasc));
        return obj.id;
      } else {
        storageTasc.push(obj);
        localStorage.setItem("user", JSON.stringify(storageTasc));
        return obj.id;
      }
    };

        if (text !== "") {
          const idUser = getId(userObj);
          const markup = `<div id=${idUser} class="task-cart flex  bg-[#e5dede] p-5 rounded-xl mb-5 mx-5">
          <p class="task-text text-xl text-${task}-500">${text}</p>
          <div class="flex ml-auto gap-5 items-center">
          <input type="checkbox" name="checed" class="checkbox-cart w-5 h-5">
          <img class = "paint" src="src/publick/peint.png" alt="ручка">
          <img class = "basket" src="src/publick/wastebasket.jpg" alt="корзина" class="mix-blend-multiply">
          </div>
          </div>`;
          wrapperCart.insertAdjacentHTML("afterend", markup);
          document.querySelector("#input-task").value = "";
          updateCart(userObj);

      noTask.remove();
    }
  });
};

// Надо сделать что бы еще менялось в localStorage
const updateCart = (userObj) => {
  const taskCart = document.querySelector(".task-cart");

  taskCart.addEventListener("click", (e) => {
    const click = Number(e.target.closest(".task-cart").getAttribute("id"));
    if (e.target.classList.contains("paint")) {
      const redact = prompt("Редактирование");
      if (taskCart && redact) {
        const localStoragePaint = JSON.parse(localStorage.getItem("user"))
        localStoragePaint.find((item) => {
          if (item.id === click) {
            return item.text=redact
          }
        })
        localStorage.setItem("user",JSON.stringify(localStoragePaint))
        taskCart.querySelector(".task-text").textContent = `${redact}`;
      }
    } else if (e.target.classList.contains("basket")) {
      const localStorageBasket = JSON.parse(localStorage.getItem("user"))
      const deleteLocalStorage = localStorageBasket.filter((item) => {
        if (item.id !== click) {
          return item
        }
      })
      // console.log("===>",deleteLocalStorage,localStorageBasket);
      if (deleteLocalStorage.length === 0) {
        document.querySelector("form").insertAdjacentHTML("afterend",`<div id = "no-task" class="flex flex-col px-5 md:px-8 pb-8">
        <p class="text-xl px-5 md:px-8 pb-8">Нет задач</p>
    </div>`)
      } else {
        console.log(1);
      }
      localStorage.setItem("user",JSON.stringify(deleteLocalStorage))
      taskCart.remove();
    } else if (e.target.classList.contains("checkbox-cart")) {
      const anyChecked = taskCart.querySelector(".checkbox-cart:checked");
      if (anyChecked) {
        e.target
          .closest(".task-cart")
          .querySelector(".task-text")
          .classList.add("line-through");
          const getCheckLoacalStorage = JSON.parse(localStorage.getItem("user"));
        const idMapCheckout = getCheckLoacalStorage.find((item) => {
          if (item.id === click) {
            return item.chek="checked"
          }
        })
        localStorage.setItem("user", JSON.stringify(getCheckLoacalStorage))
      } else {
        e.target
          .closest(".task-cart")
          .querySelector(".task-text")
          .classList.remove("line-through");
        const getCheckLoacalStorage = JSON.parse(localStorage.getItem("user"));
        getCheckLoacalStorage.find((item) => {
          if (item.id === click) {
            delete item.chek
            return item
          }
        })
        localStorage.setItem("user", JSON.stringify(getCheckLoacalStorage))
      }
    }
  });
};


document.addEventListener("DOMContentLoaded", () => {
  body.insertAdjacentHTML("afterbegin", markup);
  init();
});
