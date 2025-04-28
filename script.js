function getDate(str) {
  str = str.split("T")[0];
  let newStr = `${str.slice(-2)}.${str.slice(5, 7)}.${str.slice(0, 4)}`;
  return newStr;
}
function getTime(str) {
  str = str.split("T")[1];
  let newStr = `${str.slice(0, 5)}`;
  return newStr;
}
async function delCont(id) {
  const delAns = await fetch(`http://localhost:3000/api/clients/${id}`, {method: "DELETE"});
  console.log(delAns);
  return delAns.status;
}
async function editCont(id) {
  
}
async function createCont(data) {
  
}
function createWindow(type = "edit") {
  const back = document.createElement("div");
  back.classList.add("back");
  const window = document.createElement("div");
  window.classList.add("window");
  const x = document.createElement('div');
  x.classList.add("x");
  window.appendChild(x);
  document.body.appendChild(back);
  document.body.appendChild(window);
  if (type === "edit") {
    
  } else {
    const head = document.createElement("h2");
    head.classList.add("window__head");
    head.textContent = "Новый клиент";
    window.appendChild(head);
    const form = document.createElement("form");
    form.classList.add("window__form");
    const surname = document.createElement("input");
    const name = document.createElement("input");
    const lastname = document.createElement("input");
    surname.placeholder = "Фамилия";
    name.placeholder = "Имя";
    lastname.placeholder = "Отчество";

    form.appendChild(surname);
    form.appendChild(name);
    form.appendChild(lastname);
    window.appendChild(form);
  }
}
async function start() {
  const ans = await fetch("http://localhost:3000/api/clients");
  console.log(`Status: ${ans.status}`);
  const data = await ans.json();
  console.log(data);
  const place = document.querySelector(".main__load")
  for (let i = 0; i < data.length; i++) {
    const temp = document.getElementById("contact").content.cloneNode(true);
    temp.querySelector(".id").textContent = data[i].id;
    temp.querySelector(".fio").textContent = `${data[i].surname} ${data[i].name} ${data[i].lastName}`;
    temp.querySelector(".dateCreate").textContent = getDate(data[i].createdAt);
    temp.querySelector(".timeCreate").textContent = getTime(data[i].createdAt);
    temp.querySelector(".dateEdit").textContent = getDate(data[i].updatedAt);
    temp.querySelector(".timeEdit").textContent = getTime(data[i].updatedAt);
    temp.querySelector(".edit").addEventListener('click', e => {

    });
    temp.querySelector(".delete").addEventListener('click', e => {delCont(data[i].id)});
    place.appendChild(temp);
  }
  document.querySelector(".main__load").style = 'background-image: url("");';
  document.querySelector('.main__btn').addEventListener('click', e => {
    createWindow("create");
  })
}
start()