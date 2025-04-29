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
  const close = document.createElement('div');
  close.classList.add("x");
  window.appendChild(close);
  document.body.appendChild(back);
  document.body.appendChild(window);
  close.addEventListener("click", e => {
    document.querySelector(".back").remove();
    document.querySelector(".window").remove();
  })
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

    const add = document.createElement('div');
    const addBtn = document.createElement('div');
    addBtn.classList.add("add_btn")
    add.classList.add("add_contact");
    const h3 = document.createElement('h3');
    h3.textContent = "Добавить контакт";
    const addImg = document.createElement('img');
    addImg.src = "img/create.svg";
    addBtn.addEventListener("click", e => {
      const div = document.createElement('div');
      div.classList.add("data");
      const select = document.createElement('select');
      const input = document.createElement("input");
      const delDiv = document.createElement('div');
      delDiv.classList.add("del_div");
      delDiv.addEventListener("click", e => {
        div.remove();
      })
      const img = document.createElement('img');
      img.src = "img/cancel.svg";
      delDiv.appendChild(img);
      input.placeholder = "Введите данные контакта";
      select.classList.add("select_contcts");
      const options = document.getElementById("dataToContact").content.cloneNode(true);
      select.appendChild(options);
      div.appendChild(select);
      div.appendChild(input);
      div.appendChild(delDiv);
      add.appendChild(div);
    })
    addBtn.appendChild(addImg);
    addBtn.appendChild(h3);
    add.appendChild(addBtn);
    const create = document.createElement('button');
    create.textContent = "Сохранить";
    create.classList.add("btn_create");
    const cancel = document.createElement('p');
    cancel.classList.add("btn_cancel");
    cancel.textContent = "Отмена";
    cancel.addEventListener("click", e => {
      document.querySelector(".back").remove();
      document.querySelector(".window").remove();
    })

    form.appendChild(surname);
    form.appendChild(name);
    form.appendChild(lastname);
    window.appendChild(form);
    window.appendChild(add);
    window.appendChild(create);
    window.appendChild(cancel);
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
    for (let j = 0; j < data[i].contacts.length; j++) {
      const contact = document.createElement('div');
      contact.classList.add(data[i].contacts[j].type);
      temp.querySelector(".contacts").appendChild(contact);
    }
    temp.querySelector(".edit").addEventListener('click', e => {
      createWindow("edit");
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
//Made by chatGPT 