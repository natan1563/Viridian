const input = document.getElementById("nome");
const button = document.getElementById("button");
const list = document.querySelector(".list-group");

input.addEventListener("keypress", (event) => {
  if (event.key !== 'Enter') return;
  button.click();
});

button.addEventListener("click", () => {
  if (!input.value.trim()) return

  const newListItem = document.createElement("li");
  newListItem.innerText = input.value.trim();
  newListItem.classList.add("list-group-item");
  newListItem.style.cursor = "pointer";

  list.appendChild(newListItem);
  list.classList.remove("d-none");

  input.value = '';
})

list.addEventListener('click', (event) => {
  const currentLi = event.target;

  if (currentLi.classList.contains("active")) {
    currentLi.classList.remove("active");
    return
  }

  currentLi.classList.add("active")
})