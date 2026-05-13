const body = document.querySelector("body")

function getCookie() {
      const cookieValue = document.cookie.split(";")
      let userName
      cookieValue.forEach(e => {
        const [name, value] = e.split("=")
        userName = value
      })
      return userName
    }
    const userName = getCookie()

const markup = `<div class="bg-white w-full sm:w-[85%] md:w-[80%] lg:w-[70%] max-w-5xl mt-[5%] rounded-t-3xl">
    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 my-[5%] px-6 md:px-8">
    <h1 class="text-2xl sm:text-3xl font-bold text-center sm:text-left">
      Привет, ${userName}
    </h1>
    <button class="bg-slate-400 px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-500 w-full sm:w-auto">Выйти</button>
    </div>
    <form action="" class="flex flex-col md:flex-row justify-between gap-4 px-6 md:px-8 pb-8">
        <input id = "input-task" class="border border-sky-500 rounded-xl py-1.5 px-4 flex-1 w-full" type="text" placeholder="Введите" name="text">
        <select name="task" id="task" class="border border-sky-500 rounded-xl py-1.5 px-4 w-full md:w-auto">
            <option value="Низкий">Низкий</option>
            <option value="Средний">Средний</option>
            <option value="Высокий">Высокий</option>
        </select>
        <input type="submit" name="submit" value="Добавить" class="bg-slate-400 px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-500 w-full md:w-auto">
    </form>
    <div id = "no-task" class="flex flex-col px-6 md:px-8 pb-8">
        <p class="text-xl px-6 md:px-8 pb-8">Нет задач</p>
    </div>
    </div>`

const init = () => {
  const noTask = document.querySelector("#no-task")
  const formTask = document.querySelector("form")
  formTask.addEventListener("submit", (e) => {
    e.preventDefault();

    const getFormData = Object.fromEntries(new FormData(formTask));
    const { text, task } = getFormData;
    if (text !== '') {
      const markup = `<div class="flex  bg-[#e5dede] p-5 rounded-xl mb-5">
        <p class="text-xl">${text}</p>
        <div class="flex ml-auto gap-5 items-center">
        <input type="checkbox" name="checed" class="w-5 h-5">
        <img src="src/publick/peint.png" alt="ручка">
        <img src="src/publick/wastebasket.jpg" alt="корзина" class="mix-blend-multiply">
        </div>
    </div>`
      formTask.insertAdjacentHTML("afterend", markup)
      document.querySelector('#input-task').value = ""
      noTask.remove()
    } else {
      
    }
  })
}



    document.addEventListener("DOMContentLoaded", () => {
      body.insertAdjacentHTML("afterbegin", markup)
      init()

    })
