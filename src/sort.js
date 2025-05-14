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
        document.querySelector(".fio_sort_p").textContent = "А-Я"
        arr.sort((a, b) => a.childNodes[3].textContent.localeCompare(b.childNodes[3].textContent));
      } else {
        document.querySelector(".fio_sort").src = "../img/arrow_up.svg";
        document.querySelector(".fio_sort_p").textContent = "Я-А"
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