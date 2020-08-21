const allTheSpans = document.querySelectorAll("span");
const allTheLIs = document.querySelectorAll("li");
const textInput = document.querySelector("input");
const list = document.querySelector("ul");
const thePlus = document.getElementById("thePlus");
const collapseTarget = document.querySelector(".collapseTarget");

function lineToggle(event) {
  const buttonClicked = event.currentTarget;
  buttonClicked.closest("li").classList.toggle("complete");
  event.stopPropagation();
}

function lineFadeOut() {
  this.parentElement.classList.add("target");
  this.parentElement.style.opacity = "0";
  this.parentElement.addEventListener("transitionend", lineKill);
}

function lineKill() {
  this.remove();
}

function handleKey(e) {
  if (textInput.value === "") {
    textInput.placeholder = "Help me help you - I can't be blank :) ";
    return;
  } else if (e.which === 13) {
    var toDoText = this.value;
    textInput.value = "";
    var newLI = document.createElement("li");
    newLI.innerHTML = `<span><i class="fas fa-ban"></i></span> ` + toDoText;
    var newSpan = newLI.querySelector("span");
    list.append(newLI);
    newLI.addEventListener("click", lineToggle);
    newSpan.addEventListener("click", lineFadeOut);
    textInput.placeholder = "Add new to-do";
  }
}

allTheLIs.forEach((li) => li.addEventListener("click", lineToggle));

allTheSpans.forEach((span) => span.addEventListener("click", lineFadeOut));

textInput.addEventListener("keydown", handleKey);

thePlus.addEventListener("click", function () {
  if (collapseTarget.classList.contains("closed")) {
    collapseTarget.style.display = "block";
    let divHeight = collapseTarget.scrollHeight;
    collapseTarget.style.height = divHeight + "px";
    thePlus.style.transform = "rotate(90deg)";
    collapseTarget.classList.remove("closed");
  } else {
    let divHeight = collapseTarget.scrollHeight;
    collapseTarget.style.height = divHeight + "px";
    collapseTarget.classList.add("closed");
    thePlus.style.transform = "rotate(180deg)";
    requestAnimationFrame(function () {
      collapseTarget.style.height = 0 + "px";
    });

    collapseTarget.addEventListener(
      "transitionend",
      function () {
        collapseTarget.style.display = "none";
      },
      { once: true }
    );
  }
});
