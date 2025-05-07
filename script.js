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
function moreInfo(e, dop) {
  if (dop == true) {
    return `${e.target.dataset.value}`; 
  }
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
  return delAns.status;
}

function confDelCont(id) {
  const back = document.createElement("div");
  back.classList.add("back");
  document.body.appendChild(back);
  document.body.appendChild(document.getElementById("deleteWindow").content.cloneNode(true));
  document.querySelector(".x").addEventListener("click", e => {
    document.querySelector(".back").remove();
    document.querySelector(".window").remove();
  });
  document.querySelector(".btn_create").addEventListener('click', e => {delCont(id)});
  document.querySelector('.btn_cancel').addEventListener("click", e => {
    document.querySelector(".back").remove();
    document.querySelector(".window").remove();
  });
}

async function editWind(id) {
  const ans = await fetch(`http://localhost:3000/api/clients/${id}`);
  const data = await ans.json();
  document.querySelector(".window").appendChild(document.getElementById("editWindow").content.cloneNode(true));
  
  const surname = document.querySelector(".surname");
  const name = document.querySelector(".name");
  const lastname = document.querySelector(".lastname");
    surname.value = data.surname;
    name.value = data.name;
    lastname.value = data.lastName;
    const add = document.querySelector('.add_contact');
    for (let i = 0; i < data.contacts.length; i++) {
      const divData = document.getElementById("contactData").content.cloneNode(true);
      divData.querySelector('select').value = data.contacts[i].type;
      divData.querySelector('input').value = data.contacts[i].value;
      divData.querySelector(".del_div").addEventListener("click", e => {e.target.parentNode.remove()})
      add.appendChild(divData);
    }
    document.querySelector(".add_btn").addEventListener("click", e => {
      if (e.target.parentNode.querySelectorAll(".data").length == 10) return;
      const contact = document.getElementById("contactData").content.cloneNode(true);
      contact.querySelector(".del_div").addEventListener('click', e => {e.target.parentNode.remove()})
      document.querySelector(".add_contact").appendChild(contact);
    });
    document.querySelector(".btn_cancel").addEventListener("click", e => {
      delCont(id);
      document.querySelector(".back").remove();
      document.querySelector(".window").remove();
    })
    document.querySelector(".btn_create").addEventListener('click', async (e) => {
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
}

function createWindow(type = "edit", elem) {
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
    const id = elem.target.parentNode.parentNode.querySelector(".id").textContent;
    editWind(id);
  } else {
    document.querySelector(".window").appendChild(document.getElementById("createWindow").content.cloneNode(true));
    const surname = document.querySelector(".surname");
    const name = document.querySelector(".name");
    const lastname = document.querySelector(".lastname");
    document.querySelector(".add_btn").addEventListener("click", e => {
      if (e.target.parentNode.querySelectorAll(".data").length == 10) return;
      const contact = document.getElementById("contactData").content.cloneNode(true);
      contact.querySelector(".del_div").addEventListener('click', e => {e.target.parentNode.remove()})
      document.querySelector(".add_contact").appendChild(contact);
    });
    document.querySelector(".btn_cancel").addEventListener("click", e => {
      document.querySelector(".back").remove();
      document.querySelector(".window").remove();
    });
    document.querySelector(".btn_create").addEventListener('click', async (e) => {
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
  document.querySelectorAll(".contact").forEach(e => {e.remove();});
  arr.forEach(el => {place.appendChild(el)});
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
            contact.addEventListener('click', e => {navigator.clipboard.writeText(moreInfo(e, true))});
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
      contact.addEventListener('click', e => {navigator.clipboard.writeText(moreInfo(e, true))});
      contact.addEventListener('mouseleave', delInfo);
      temp.querySelector(".contacts").appendChild(contact);
    }
    temp.querySelector(".edit").addEventListener('click', e => {
      createWindow("edit", e);
    });
    temp.querySelector(".delete").addEventListener('click', e => {confDelCont(data[i].id)});
    place.appendChild(temp);
  }
  start()
}
function start() {
  if (document.querySelectorAll(".contact").length > 0) {
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
}
loadCards()
// Made by chatGPT
// Grazhdantcev is a god