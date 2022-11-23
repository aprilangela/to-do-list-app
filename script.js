// update users time and date on the page
function updateClock() {
  let now = new Date();
  let date = now.toDateString();
  let time = now.toLocaleTimeString();
  document.getElementById("date").innerHTML = date;
  document.getElementById("time").innerHTML = time;
  setInterval(updateClock, 1000);
}

updateClock();



// reset button for input form
const reset = document.querySelector("#btnReset");
reset.addEventListener("click", function () {
  document.querySelector("#form").reset();
});


