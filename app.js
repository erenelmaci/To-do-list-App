const addButton = document.querySelector(".add");
const titleInput = document.getElementsByClassName("title")[0];
const aboutInput = document.getElementsByClassName("about")[0];
const main = document.querySelector("main");
const deleteButton = document.querySelector(".delete");
const sectionList = document.querySelector(".section");
const editButton = document.querySelector(".done");
const checkbox = document.querySelector("input[type='checkbox']");
const savedCheckbox = localStorage.getItem("checkbox");

addButton.addEventListener("click", () => {
  add();
});

function add() {
  sectionList.innerHTML += `<section>
   <div class="todo">
  <div class="todo-list">
    <div class="todo-title">
      <h2>${titleInput.value}</h2>
    </div>
    <div class="todo-about">
      <p>
        ${aboutInput.value}
      </p>
    </div>
  </div>
  <div class="todo-buttons">
    <button class="done bstyle ">
      <i class="fa-solid fa-pen-to-square done"></i>
    </button>
    <input class="checkbox bstyle" type="checkbox" name="" id="" />
    <button class="delete bstyle">
      <i class="fa-regular fa-trash-can delete"></i>
    </button>
  </div>
</div>
</section>`;
  titleInput.value = "";
  aboutInput.value = "";
  saveToLocalStorage();
}

sectionList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.parentElement.parentElement.remove();
  } else if (event.target.classList.contains("done")) {
    let title = event.target.parentElement.parentElement.children[0].children[0].children[0];
    let about = event.target.parentElement.parentElement.children[0].children[1].children[0];

    title.setAttribute("contentEditable", true);
    about.setAttribute("contentEditable", true);
  }else if (savedCheckbox === "checked") {
    // const savedCheckbox = localStorage.getItem("checkbox");
    checkbox.checked = true;
  }
  saveToLocalStorage();
});

function saveToLocalStorage() {
  localStorage.setItem("todo-list", sectionList.innerHTML);
}

const savedList = localStorage.getItem("todo-list");
if (savedList) {
  sectionList.innerHTML = savedList;
}
