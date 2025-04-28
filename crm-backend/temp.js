async function post() {
  const ans = await fetch("http://localhost:3000/api/clients", {method: "POST", body: JSON.stringify({name: "Иван", surname: "Иванов", lastName: "Иванович"})});
  console.log(ans.status);
}
post();