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
    place.appendChild(temp);
  }
  document.querySelector(".main__load").style = 'background-image: url("");';
}
async function post() {
  const ans = await fetch("http://localhost:3000/api/clients", {method: "POST", body: JSON.stringify({name: "Владимир", surname: "Черноусов", lastName: "Владимирович"})});
  console.log(ans);
}
start()