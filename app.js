const todoTitle = document.getElementById("todo-input");
const todoAbout = document.getElementById("todo-about");
const addButton = document.querySelector(".add");
const todoUl = document.querySelector(".todo-ul");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

const getTodoListFromLocalStorage = () => {
  todoList.forEach((todo) => {
    createTodo(todo);
  });
};

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoTitle.value.trim() === "" || todoAbout.value.trim() === "") {
    alert("Please, enter new todo text");
    return;
  }
  var newTodo = {
    id: new Date().getTime(),
    completed: false,
    title: todoTitle.value,
    about: todoAbout.value,
  };

  createTodo(newTodo);
  console.log(newTodo);

  todoList.push(newTodo);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  e.target.closest("form").reset();
});

const createTodo = (newTodo) => {
  var { id, completed, title, about } = newTodo;

  const li = document.createElement("li");
  li.setAttribute("id", id);

  completed ? li.classList.add("checked") : "";
  li.setAttribute("id", id);

  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");
  li.append(icon);

  const pContainer = document.createElement("div");
  pContainer.classList.add("pContainer");
  li.appendChild(pContainer);

  const pTitleText = document.createElement("p");
  pTitleText.innerText = title;
  pTitleText.classList.add("pTitleText");
  pContainer.appendChild(pTitleText);

  const pAboutText = document.createElement("p");
  pAboutText.innerText = about;
  pTitleText.classList.add("pAboutText");
  pContainer.appendChild(pAboutText);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");

  li.append(removeIcon);

  todoUl.prepend(li);
};

todoUl.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");

  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");
    todoList.forEach((todo) => {
      if (todo.id == idAttr) {
        todo.completed = !todo.completed;
        if (todo.completed === true) {
          e.target.style.transition = "color 1s ease";
          e.target.style.color = "#1cd80b";
        } else {
          e.target.style.color = "red";
        }
      }
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todoList = todoList.filter((todo) => todo.id != idAttr);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
});
