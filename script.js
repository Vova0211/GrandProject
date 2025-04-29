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

function moreInfo(e) {
  const div = document.createElement('div');
  div.classList.add("contact_info");
  if (e.target.classList[0] == "tel") {
    div.textContent = `Телефон: ${e.target.dataset.value}`;
  } else if (e.target.classList[0] == "email") {
    div.textContent = `Email: ${e.target.dataset.value}`;
  } else if (e.target.classList[0] == "twitter") {
    div.textContent = `Twitter: ${e.target.dataset.value}`;
  } else if (e.target.classList[0] == "vk") {
    div.textContent = `Vk: ${e.target.dataset.value}`;
  } else if (e.target.classList[0] == "facebook") {
    div.textContent = `Facebook: ${e.target.dataset.value}`;
  }
  e.target.appendChild(div);
}

function delInfo(e) {
  e.target.querySelector("div").remove();
}

async function delCont(id) {
  const delAns = await fetch(`http://localhost:3000/api/clients/${id}`, {method: "DELETE"});
  console.log(delAns);
  return delAns.status;
}

function confDelCont(id) {
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
  });
  const head = document.createElement("h2");
  head.classList.add("window__head", "text-center");
  head.textContent = "Новый клиент";
  window.appendChild(head);
  const descr = document.createElement('p');
  descr.textContent = "Вы действительно хотите удалить данного клиента?";
  descr.classList.add('text-center');
  window.appendChild(descr);
  const btnDel = document.createElement('button');
  btnDel.classList.add("btn_create");
  btnDel.textContent = "Удалить";
  btnDel.addEventListener('click', e => {delCont(id)});
  window.appendChild(btnDel);
  const cancel = document.createElement('p');
    cancel.classList.add("btn_cancel");
    cancel.textContent = "Отмена";
    cancel.addEventListener("click", e => {
      document.querySelector(".back").remove();
      document.querySelector(".window").remove();
    });
    window.appendChild(cancel);
}

async function editWind(id) {
  const ans = await fetch(`http://localhost:3000/api/clients/${id}`);
  const data = await ans.json();
  console.log(data);
  const window = document.querySelector('.window');
  const head = document.createElement("h2");
  
  const pId = document.createElement('p');
  pId.classList.add("p_id");
  pId.textContent = `ID: ${id}`;
  const form = document.createElement("form");
  const surname = document.createElement("input");
  const name = document.createElement("input");
  const lastname = document.createElement("input");
  window.appendChild(head);
  window.appendChild(pId);
  form.classList.add("window__form");
  head.classList.add("window__head");
  head.textContent = "Изменить данные";
  surname.placeholder = "Фамилия";
  name.placeholder = "Имя";
  lastname.placeholder = "Отчество";
  surname.value = data.surname;
  name.value = data.name;
  lastname.value = data.lastName;
    const add = document.createElement('div');
    const addBtn = document.createElement('div');
    addBtn.classList.add("add_btn")
    add.classList.add("add_contact");
    const h3 = document.createElement('h3');
    h3.textContent = "Добавить контакт";
    const addImg = document.createElement('img');
    addImg.src = "img/create.svg";
    add.appendChild(addBtn);
    for (let i = 0; i < data.contacts.length; i++) {
      const divData = document.createElement('div');
      divData.classList.add("data");
      const select = document.createElement('select');
      const input = document.createElement("input");
      const delDiv = document.createElement('div');
      delDiv.classList.add("del_div");
      delDiv.addEventListener("click", e => {
        divData.remove();
      })
      const img = document.createElement('img');
      img.src = "img/cancel.svg";
      delDiv.appendChild(img);
      input.placeholder = "Введите данные контакта";
      select.classList.add("select_contcts");
      const options = document.getElementById("dataToContact").content.cloneNode(true);
      select.appendChild(options);
      select.value = data.contacts[i].type;
      input.value = data.contacts[i].value;
      divData.appendChild(select);
      divData.appendChild(input);
      divData.appendChild(delDiv);
      add.appendChild(divData);
    }
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
    const create = document.createElement('button');
    create.textContent = "Сохранить";
    create.classList.add("btn_create");
    const cancel = document.createElement('p');
    cancel.classList.add("btn_cancel");
    cancel.textContent = "Удалить клиента";
    cancel.addEventListener("click", e => {
      delCont(id);
      document.querySelector(".back").remove();
      document.querySelector(".window").remove();
    })
    create.addEventListener('click', async (e) => {
      if (name.value.length == 0 || surname.value.length == 0) {
        const err = document.createElement('div');
        err.classList.add("error");
        err.textContent = "Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!";
        document.querySelector(".window").insertBefore(err, document.querySelector(".btn_create"));
        return;
      }
      const obj = {name: name.value, surname: surname.value, lastName: lastname.value, contacts: []}
      document.querySelectorAll(".data").forEach(e => {
        let type = e.querySelector(".select_contcts").value;
        let value = e.querySelector('input').value;
        obj.contacts.push({type, value});
      })
      const ans = await fetch(`http://localhost:3000/api/clients/${id}`, {method: "PATCH", body: JSON.stringify(obj)});
    })

    form.appendChild(surname);
    form.appendChild(name);
    form.appendChild(lastname);
    window.appendChild(form);
    window.appendChild(add);
    window.appendChild(create);
    window.appendChild(cancel);
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
  });
  if (type === "edit") {
    const id = arguments[1].target.parentNode.querySelector(".id").textContent;
    editWind(id);
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
    });
    create.addEventListener('click', async (e) => {
      if (name.value.length == 0 || surname.value.length == 0) {
        const err = document.createElement('div');
        err.classList.add("error");
        err.textContent = "Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!";
        document.querySelector(".window").insertBefore(err, document.querySelector(".btn_create"));
        return;
      }
      const obj = {name: name.value, surname: surname.value, lastName: lastname.value, contacts: []}
      document.querySelectorAll(".data").forEach(e => {
        let type = e.querySelector(".select_contcts").value;
        let value = e.querySelector('input').value;
        obj.contacts.push({type, value});
      })
      const ans = await fetch("http://localhost:3000/api/clients", {method: "POST", body: JSON.stringify(obj)});
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

async function searchContact(value) {
  if (value == "") {
    loadCards();
    return;
  }
  const ans = await fetch(`http://localhost:3000/api/clients?search=${value}`);
  let res = await ans.json();
  res = res.map(a => a.id);
  const place = document.querySelector(".main__load");
  let arr = [...document.getElementsByClassName("contact")];
  arr = arr.filter(a => res.includes(a.childNodes[1].textContent));
  console.log(arr);
  document.querySelectorAll(".contact").forEach(e => {e.remove();});
  arr.forEach(el => {place.appendChild(el)});
}

function sortContacts() {
  const place = document.querySelector(".main__load");
  document.querySelector(".id_sort").parentNode.addEventListener('click', e => {
    const arr = [...document.getElementsByClassName("contact")];
    if (document.querySelector(".id_sort").src == "" || document.querySelector(".id_sort").src == "http://127.0.0.1:5500/img/arrow_up.svg") {
      document.querySelector(".id_sort").src = "../img/arrow_down.svg";
      arr.sort((a, b) => a.childNodes[1].textContent - b.childNodes[1].textContent)
    } else {
      document.querySelector(".id_sort").src = "../img/arrow_up.svg";
      arr.sort((a, b) => b.childNodes[1].textContent - a.childNodes[1].textContent)
    }
    document.querySelectorAll(".contact").forEach(e => {e.remove();})
    arr.forEach(el => {place.appendChild(el)});
  })
  document.querySelector(".fio_sort").parentNode.addEventListener('click', e => {
    const arr = [...document.getElementsByClassName("contact")];
    if (document.querySelector(".fio_sort").src == "" || document.querySelector(".fio_sort").src == "http://127.0.0.1:5500/img/arrow_up.svg") {
      document.querySelector(".fio_sort").src = "../img/arrow_down.svg";
      arr.sort((a, b) => a.childNodes[3].textContent.localeCompare(b.childNodes[3].textContent));
    } else {
      document.querySelector(".fio_sort").src = "../img/arrow_up.svg";
      arr.sort((a, b) => b.childNodes[3].textContent.localeCompare(a.childNodes[3].textContent));
    }
    document.querySelectorAll(".contact").forEach(e => {e.remove();})
    arr.forEach(el => {place.appendChild(el)});
  })
  document.querySelector(".create_sort").parentNode.addEventListener('click', e => {
    const arr = [...document.getElementsByClassName("contact")];
    if (document.querySelector(".create_sort").src == "" || document.querySelector(".create_sort").src == "http://127.0.0.1:5500/img/arrow_up.svg") {
      document.querySelector(".create_sort").src = "../img/arrow_down.svg";
      arr.sort((a, b) => Date.parse(a.childNodes[5].dataset.time) - Date.parse(b.childNodes[5].dataset.time))
    } else {
      document.querySelector(".create_sort").src = "../img/arrow_up.svg";
      arr.sort((a, b) => Date.parse(b.childNodes[5].dataset.time) - Date.parse(a.childNodes[5].dataset.time))
    }
    document.querySelectorAll(".contact").forEach(e => {e.remove();})
    arr.forEach(el => {place.appendChild(el)});
  })
  document.querySelector(".edit_sort").parentNode.addEventListener('click', e => {
    const arr = [...document.getElementsByClassName("contact")];
    if (document.querySelector(".edit_sort").src == "" || document.querySelector(".edit_sort").src == "http://127.0.0.1:5500/img/arrow_up.svg") {
      document.querySelector(".edit_sort").src = "../img/arrow_down.svg";
      arr.sort((a, b) => Date.parse(a.childNodes[7].dataset.time) - Date.parse(b.childNodes[7].dataset.time))
    } else {
      document.querySelector(".edit_sort").src = "../img/arrow_up.svg";
      arr.sort((a, b) => Date.parse(b.childNodes[7].dataset.time) - Date.parse(a.childNodes[7].dataset.time))
    }
    document.querySelectorAll(".contact").forEach(e => {e.remove();})
    arr.forEach(el => {place.appendChild(el)});
  })
}

async function loadCards() {
  const ans = await fetch("http://localhost:3000/api/clients");
  const data = await ans.json();
  const place = document.querySelector(".main__load");
  document.querySelectorAll(".contact").forEach(e => {e.remove();});
  for (let i = 0; i < data.length; i++) {
    const temp = document.getElementById("contact").content.cloneNode(true);
    temp.querySelector(".id").textContent = data[i].id;
    temp.querySelector(".fio").textContent = `${data[i].surname} ${data[i].name} ${data[i].lastName}`;
    temp.querySelector(".dateCreate").parentNode.dataset.time = data[i].createdAt;
    temp.querySelector(".dateCreate").textContent = getDate(data[i].createdAt);
    temp.querySelector(".timeCreate").textContent = getTime(data[i].createdAt);
    temp.querySelector(".dateEdit").parentNode.dataset.time = data[i].updatedAt;
    temp.querySelector(".dateEdit").textContent = getDate(data[i].updatedAt);
    temp.querySelector(".timeEdit").textContent = getTime(data[i].updatedAt);
    for (let j = 0; j < data[i].contacts.length; j++) {
      if (data[i].contacts.length > 5 && j >= 4) {
        const dop = document.createElement('div');
        dop.classList.add("contact_icons_more");
        dop.textContent = `+${data[i].contacts.length - 4}`;
        temp.querySelector(".contacts").appendChild(dop);
        dop.addEventListener('click', e => {
          const div = e.target.parentNode;
          div.classList.add("contacts_true");
          dop.remove();
          for (let t = 4; t < data[i].contacts.length; t++) {
            const contact = document.createElement('div');
            contact.classList.add(data[i].contacts[t].type);
            contact.classList.add("contact_icon");
            contact.dataset.value = data[i].contacts[t].value;
            contact.addEventListener('mouseenter', moreInfo);
            contact.addEventListener('mouseleave', delInfo);
            div.appendChild(contact);
          }
        })
        break;
      }
      const contact = document.createElement('div');
      contact.classList.add(data[i].contacts[j].type);
      contact.classList.add("contact_icon");
      contact.dataset.value = data[i].contacts[j].value;
      contact.addEventListener('mouseenter', moreInfo);
      contact.addEventListener('mouseleave', delInfo);
      temp.querySelector(".contacts").appendChild(contact);
    }
    temp.querySelector(".edit").addEventListener('click', e => {
      createWindow("edit", e);
    });
    temp.querySelector(".delete").addEventListener('click', e => {confDelCont(data[i].id)});
    place.appendChild(temp);
  }
}
function start() {
  document.querySelector(".main__load").style = 'background-image: url("");';
  document.querySelector('.main__btn').addEventListener('click', e => {
    createWindow("create");
  })
  document.querySelector('.header__search').addEventListener('keydown', e => {
    if (e.keyCode == 13) {
      searchContact(e.target.value);
      e.target.value = "";
    }
  })
}
loadCards()
start()
//Made by chatGPT
// Grazhdantcev is a god