const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const ulElement = document.querySelector(".list");
let list = JSON.parse(localStorage.getItem("list"));

list.forEach((task) => {
  toDoList(task);
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputElement.value;
  if (task) {
    newTask = task.name;
  }

  const liElement = document.createElement("li");
  if (task && task.checked) {
    liElement.classList.add("checked");
  }
  liElement.innerText = newTask;
  ulElement.appendChild(liElement);
  inputElement.value = "";

  const checkBtnElement = document.createElement("div");
  checkBtnElement.innerHTML = `<i class="fa-solid fa-square-check">`;
  liElement.appendChild(checkBtnElement);

  const trashBtnElement = document.createElement("div");
  trashBtnElement.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  liElement.appendChild(trashBtnElement);

  checkBtnElement.addEventListener("click", () => {
    liElement.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnElement.addEventListener("click", () => {
    liElement.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
