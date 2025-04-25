async function start() {
  const ans = await fetch("http://localhost:3000/api/clients");
  console.log(`Status: ${ans.status}`);
  const data = await ans.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const temp = document.createElement('div');
    const table = document.getElementById("contact").temp

  }
}
async function post() {
  const ans = await fetch("http://localhost:3000/api/clients", {method: "POST", body: JSON.stringify({name: "Владимир", surname: "Черноусов", lastName: "Владимирович"})});
  console.log(ans);
}
start()