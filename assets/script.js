// Масив змінних та операцій
let variables = [];
let operations = [];

// Додати змінну
function addVariable() {
  const workspace = document.getElementById("workspace");
  const varName = "X" + (variables.length + 1);

  const div = document.createElement("div");
  div.className = "variable";
  div.innerText = varName;
  div.style.top = (50 * variables.length + 20) + "px";
  div.style.left = "20px";

  workspace.appendChild(div);
  variables.push(div);
}

// Додати операцію
function addOperation(type) {
  const workspace = document.getElementById("workspace");

  const div = document.createElement("div");
  div.className = "operation";
  div.innerText = type;
  div.style.top = (50 * operations.length + 20) + "px";
  div.style.left = "150px";

  workspace.appendChild(div);
  operations.push(div);
}

// Запустити імпульс
function runSimulation() {
  const workspace = document.getElementById("workspace");

  variables.forEach((variable, index) => {
    const pulse = document.createElement("div");
    pulse.className = "pulse";

    // Кольори для імпульсів
    const colors = ["yellow", "blue", "red", "green", "orange"];
    pulse.style.backgroundColor = colors[index % colors.length];

    // Початкова позиція
    pulse.style.top = variable.style.top;
    pulse.style.left = variable.style.left;

    workspace.appendChild(pulse);

    // Анімація руху вправо
    let pos = 20;
    const interval = setInterval(() => {
      pos += 2;
      pulse.style.left = pos + "px";

      // Зупинка біля операцій
      if (pos > 140) {
        clearInterval(interval);
      }
    }, 50);
  });
}
