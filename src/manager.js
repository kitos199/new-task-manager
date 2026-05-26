const body = document.querySelector("body");

const storageTasc = JSON.parse(localStorage.getItem("user")) || [];

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

// const nameArr = storageTasc.find(item =>item.name === userName)
// console.log(nameArr);
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

// console.log(nameFilter);
function displayStorage(nameFilter, noTask) {
  if (nameFilter.length > 0) {
    nameFilter.forEach((e) => {
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
    });
    noTask.remove();
  }
}
const init = () => {
  const noTask = document.querySelector("#no-task");
  const formTask = document.querySelector("form");
  const wrapperCart = document.querySelector(".wrapper-cart");
  const exit = document.querySelector(".exit");
  displayStorage(nameFilter, noTask);
  exit.addEventListener("click", () => {
    location.href = "outyput.html";
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

    const id = (obj) => {
      const idLocal = JSON.parse(localStorage.getItem("user"));
      if (idLocal) {
        maxId = Math.max(
          ...idLocal.map((item) => {
            return item.id;
          }),
        );
        obj.id = maxId + 1;
        idLocal.push(obj);
        localStorage.setItem("user", JSON.stringify(idLocal));
        return obj.id;
      } else {
        storageTasc.push(obj);
        localStorage.setItem("user", JSON.stringify(storageTasc));
        return obj.id;
      }
    };
    // console.log(id(userObj))
    // if (storageTasc.length) {
      //   const saveTasc = JSON.parse(localStorage.getItem("user"));
      //   saveTasc.push(userObj);
      //   localStorage.setItem("user", JSON.stringify(saveTasc));
      //   // console.log("===>", saveTasc);
      // } else {
        //   storageTasc.push(userObj);
        //   localStorage.setItem("user", JSON.stringify(storageTasc));
        //   // console.log("===>", storageTasc);
        // }
        
        if (text !== "") {
          const idUser = id(userObj);
          const markup = `<div id=${idUser} class="task-cart flex  bg-[#e5dede] p-5 rounded-xl mb-5 mx-5">
          <p class="task-text text-xl text-${task}-500">${text}</p>
          <div class="flex ml-auto gap-5 items-center">
          <input type="checkbox" name="checed" class="checkbox-cart w-5 h-5">
          <img class = "paint" src="src/publick/peint.png" alt="ручка">
          <img class = "basket" src="src/publick/wastebasket.jpg" alt="корзина" class="mix-blend-multiply">
          </div>
          </div>`;
          // id(userObj);
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
    if (e.target.classList.contains("paint")) {
      const redact = prompt("Редактирование");
      const taskCArt = e.target.closest(".task-cart");
      if (taskCart) {
        taskCArt.querySelector(".task-text").textContent = `${redact}`;
      }
    } else if (e.target.classList.contains("basket")) {
      taskCart.remove();
    } else if (e.target.classList.contains("checkbox-cart")) {
      const anyChecked = taskCart.querySelector(".checkbox-cart:checked");
      if (anyChecked) {
        e.target
          .closest(".task-cart")
          .querySelector(".task-text")
          .classList.add("line-through");
        // userObj.check = "checked";
        const getCheckLoacalStorage = JSON.parse(localStorage.getItem("user"));
        idCheck = getCheckLoacalStorage.map((item) => {
          return item.id;
        });
        console.log(idCheck);
      } else {
        e.target
          .closest(".task-cart")
          .querySelector(".task-text")
          .classList.remove("line-through");
        delete userObj.check;
      }
    }
  });
};

// localStorage.setItem()

document.addEventListener("DOMContentLoaded", () => {
  body.insertAdjacentHTML("afterbegin", markup);
  init();
  // displayStorage(nameArr)
});
