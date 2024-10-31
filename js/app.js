const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const template = document.querySelector("template");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

let editItemId;

// check
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
console.log(todos);

if (todos.length) showTodos();

// setTodos to localstorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// time
function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() <= 9 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month_title = now.getMonth();
  fullDay.textContent = `${date} ${months[month_title]},${year}`;

  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  return `${hour}:${minute}, ${date}.${month}.${year}`;
}
setInterval(getTime, 1000);

// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todos.forEach((item, i) => {
    //     listGroupTodo.removeChild;
    const clone = template.content.cloneNode("true");
    const li = clone.querySelector("li");
    const p = clone.querySelector("p");
    const timeSpan = clone.querySelector("span");
    const img1 = clone.querySelector("#edit");
    const img2 = clone.querySelector("#deletebtn");
    li.setAttribute("ondblclick", `setCompleted(${i})`);
    if (item.completed) {
      li.classList.add("complated");
    } else {
      li.classList.remove("complated");
    }
    img1.setAttribute("onclick", `editTodo(${i})`);
    img2.setAttribute("onclick", `deleteTodo(${i})`);
    p.textContent = item.text;
    timeSpan.textContent = item.time;

    listGroupTodo.appendChild(clone);
  });
}

// show error
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

// get Todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please, enter your todo...");
  }
});

// delete todo
function deleteTodo(id) {
  const deleteTodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deleteTodos;
  setTodos();
  showTodos();
}

// setCompleted
function setCompleted(id) {
  const completeTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  console.log(todos);
  todos = completeTodos;
  setTodos();
  showTodos();
}

// editForm
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formEdit["input-edit"].value.trim();
  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
    close();
    formEdit.reset();
  } else {
    showMessage("message-edit", "Please, enter your todo...");
  }
});

// editTodo
function editTodo(id) {
  open();
  editItemId = id;
}

overlay.addEventListener("click", close);
closeEl.addEventListener("click", close);
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    close();
  }
});

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
