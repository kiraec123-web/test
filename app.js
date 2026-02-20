const button = document.getElementById("action-btn");
const message = document.getElementById("message");

const messages = [
  "You clicked! Nice work.",
  "Keep going, you're on a roll!",
  "Clicked again? Impressive.",
  "Okay, okay — you really like buttons.",
  "Last one... just kidding, keep clicking!",
];

let index = 0;

button.addEventListener("click", () => {
  message.textContent = messages[index];
  index = (index + 1) % messages.length;
});
