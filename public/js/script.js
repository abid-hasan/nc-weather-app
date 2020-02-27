console.log("Client side JavaScript file is loaded.");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const checkHelp = document.querySelector("#checkHelp");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // To prevent page from reloading on submission

  const location = input.value;
  const url = "/weather?address=" + location;

  checkHelp.textContent = "";
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.innerHTML = 'Need help? <a href="/help">Click here</a>.';
        return;
      }
      checkHelp.innerHTML = 'Location not found? <a href="/help">Check help</a>.';
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });
});