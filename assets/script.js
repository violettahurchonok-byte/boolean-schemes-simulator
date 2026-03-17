// Додає символ у поле вводу
function insertSymbol(symbol) {
  const input = document.getElementById("booleanInput");
  input.value += symbol;
}

// Побудова схеми за булевою функцією
function buildScheme() {
  const input = document.getElementById("booleanInput").value;

  try {
    const expr = math.parse(input);
    const workspace = document.getElementById("workspace");
    workspace.innerHTML = "";

    // Малюємо дерево операцій
    drawNode(expr, 50, 50);
  } catch (error) {
    alert("Помилка у виразі: " + error.message);
  }
}

// Рекурсивне малювання вузлів
function drawNode(node, x, y) {
  const workspace = document.getElementById("workspace");
  const div = document.createElement("div");

  if (node.isSymbolNode) {
    div.className = "variable";
    div.innerText = node.name;
  } else if (node.isOperatorNode) {
    div.className = "operation";
    div.innerText = node.op; // AND, OR, NOT, XOR, NAND, NOR
  }

  div.style.top = y + "px";
  div.style.left = x + "px";
  workspace.appendChild(div);

  if (node.args) {
    node.args.forEach((arg, i) => {
      drawNode(arg, x + 150, y + i * 80);
    });
  }
}

// Анімація імпульсів
function runSimulation() {
  const workspace = document.getElementById("workspace");
  const variables = workspace.getElementsByClassName("variable");

  Array.from(variables).forEach((variable, index) => {
    const pulse = document.createElement("div");
    pulse.className = "pulse";

    const colors = ["yellow", "blue", "red", "green", "orange"];
    pulse.style.backgroundColor = colors[index % colors.length];

    pulse.style.top = variable.style.top;
    pulse.style.left = variable.style.left;

    workspace.appendChild(pulse);

    let pos = parseInt(variable.style.left);
    const targetX = 150;
    const interval = setInterval(() => {
      pos += 2;
      pulse.style.left = pos + "px";

      if (pos >= targetX) {
        clearInterval(interval);

        const operations = workspace.getElementsByClassName("operation");
        if (operations.length > 0) {
          const op = operations[0].innerText;
          if (op === "AND") pulse.style.backgroundColor = "green";
          if (op === "OR") pulse.style.backgroundColor = "blue";
          if (op === "NOT") pulse.style.backgroundColor = "red";
          if (op === "XOR") pulse.style.backgroundColor = "purple";
          if (op === "NAND") pulse.style.backgroundColor = "orange";
          if (op === "NOR") pulse.style.backgroundColor = "brown";
        }
      }
    }, 50);
  });
}
