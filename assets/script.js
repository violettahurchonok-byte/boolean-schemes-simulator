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
// Побудова схеми за введеною булевою функцією
function buildScheme() {
  const input = document.getElementById("booleanInput").value;

  try {
    // Парсимо вираз через Math.js
    const expr = math.parse(input);

    // Очищаємо робоче поле
    const workspace = document.getElementById("workspace");
    workspace.innerHTML = "";

    // Малюємо дерево операцій
    drawNode(expr, 50, 50);
  } catch (error) {
    alert("Помилка у виразі: " + error.message);
  }
}

// Рекурсивне малювання вузлів (змінні та операції)
function drawNode(node, x, y) {
  const workspace = document.getElementById("workspace");
  const div = document.createElement("div");

  if (node.isSymbolNode) {
    div.className = "variable";
    div.innerText = node.name;
  } else if (node.isOperatorNode) {
    div.className = "operation";
    div.innerText = node.op; // AND, OR, NOT
  }

  div.style.top = y + "px";
  div.style.left = x + "px";
  workspace.appendChild(div);

  // Якщо є аргументи — малюємо їх нижче
  if (node.args) {
    node.args.forEach((arg, i) => {
      drawNode(arg, x + 150, y + i * 80);
    });
  }
}


// Запуск анімації імпульсів по всій схемі
function runSimulation() {
  const workspace = document.getElementById("workspace");
  const variables = workspace.getElementsByClassName("variable");

  Array.from(variables).forEach((variable, index) => {
    const pulse = document.createElement("div");
    pulse.className = "pulse";

    // Кольори для імпульсів
    const colors = ["yellow", "blue", "red", "green", "orange"];
    pulse.style.backgroundColor = colors[index % colors.length];

    // Початкова позиція
    pulse.style.top = variable.style.top;
    pulse.style.left = variable.style.left;

    workspace.appendChild(pulse);

    // Анімація: рух до першої операції
    let pos = parseInt(variable.style.left);
    const targetX = 150; // координата першої операції
    const interval = setInterval(() => {
      pos += 2;
      pulse.style.left = pos + "px";

      if (pos >= targetX) {
        clearInterval(interval);

        // Зміна кольору залежно від операції
        const operations = workspace.getElementsByClassName("operation");
        if (operations.length > 0) {
          const op = operations[0].innerText;
          if (op === "AND") pulse.style.backgroundColor = "green";
          if (op === "OR") pulse.style.backgroundColor = "blue";
          if (op === "NOT") pulse.style.backgroundColor = "red";
        }
      }
    }, 50);
  });
}

}
