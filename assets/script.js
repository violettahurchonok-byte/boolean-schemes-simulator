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
    div.innerText = node.op;
  }

  div.style.top = y + "px";
  div.style.left = x + "px";
  workspace.appendChild(div);

  // Зберігаємо координати вузла
  node.ui = { x: x, y: y };

  if (node.args) {
    node.args.forEach((arg, i) => {
      drawNode(arg, x + 150, y + i * 80);
    });
  }
}

// Запуск імпульсів по всьому дереву
function runSimulation() {
  const input = document.getElementById("booleanInput").value;
  try {
    const expr = math.parse(input);
    animatePulse(expr);
  } catch (error) {
    alert("Спочатку побудуйте правильну схему!");
  }
}

// Рекурсивна анімація імпульсу
function animatePulse(node) {
  const workspace = document.getElementById("workspace");

  // Створюємо імпульс
  const pulse = document.createElement("div");
  pulse.className = "pulse";
  pulse.style.backgroundColor = "yellow";
  pulse.style.top = node.ui.y + "px";
  pulse.style.left = node.ui.x + "px";
  workspace.appendChild(pulse);

  // Якщо є аргументи — рухаємо імпульс до них
  if (node.args) {
    node.args.forEach((arg, i) => {
      let posX = node.ui.x;
      let posY = node.ui.y;
      const targetX = arg.ui.x;
      const targetY = arg.ui.y;

      const interval = setInterval(() => {
        // Плавний рух
        posX += (targetX - posX) / 10;
        posY += (targetY - posY) / 10;
        pulse.style.left = posX + "px";
        pulse.style.top = posY + "px";

        // Коли досягли аргументу
        if (Math.abs(posX - targetX) < 2 && Math.abs(posY - targetY) < 2) {
          clearInterval(interval);

          // Зміна кольору залежно від операції
          if (node.isOperatorNode) {
            if (node.op === "AND") pulse.style.backgroundColor = "green";
            if (node.op === "OR") pulse.style.backgroundColor = "blue";
            if (node.op === "NOT") pulse.style.backgroundColor = "red";
            if (node.op === "XOR") pulse.style.backgroundColor = "purple";
            if (node.op === "NAND") pulse.style.backgroundColor = "orange";
            if (node.op === "NOR") pulse.style.backgroundColor = "brown";
          }

          // Запускаємо імпульс далі
          animatePulse(arg);
        }
      }, 50);
    });
  }
}
