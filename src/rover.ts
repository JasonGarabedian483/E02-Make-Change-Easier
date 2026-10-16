export {};

const canvas = document.querySelector<HTMLCanvasElement>("#rover-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>("#rover-readout")!;
const queueDisplay = document.querySelector<HTMLParagraphElement>(
  "#rover-queue",
)!;

const commandQueue: Command[] = [];

let x = 2;
let y = 2;
let direction = 0;

type Command = {
  label: string;
  execute(): void;
};

type Direction = {
  name: string;
  dx: number;
  dy: number;
};

const directions: Direction[] = [
  { name: "North", dx: 0, dy: -1 },
  { name: "East", dx: 1, dy: 0 },
  { name: "South", dx: 0, dy: 1 },
  { name: "West", dx: -1, dy: 0 },
];

function drawRover() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#718881";
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      ctx.strokeRect(10 + column * 56, 10 + row * 56, 56, 56);
    }
  }
  ctx.save();
  ctx.translate(38 + x * 56, 38 + y * 56);
  ctx.rotate(direction * Math.PI / 2);
  ctx.fillStyle = "#27766b";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(17, 16);
  ctx.lineTo(-17, 16);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  readout.textContent = `Position: (${x}, ${y}) · Facing: ${
    directions[direction].name
  }`;
}

function updateQueueDisplay() {
  queueDisplay.replaceChildren();

  commandQueue.forEach((command) => {
    const commandElement = document.createElement("span");
    commandElement.textContent = command.constructor.name;
    queueDisplay.appendChild(commandElement);
  });
}

function enqueueCommand(command: Command) {
  commandQueue.push(command);
  updateQueueDisplay();
}

function clearCommandQueue() {
  commandQueue.length = 0;
  updateQueueDisplay();
}

const forwardCommand: Command = {
  label: "Forward",
  execute() {
    x = Math.max(0, Math.min(4, x + directions[direction].dx));
    y = Math.max(0, Math.min(4, y + directions[direction].dy));
    drawRover();
  },
};

const rightCommand: Command = {
  label: "Right",
  execute() {
    direction = (direction + 1) % directions.length;
    drawRover();
  },
};

function runCommand() {
  while (commandQueue.length > 0) {
    const command = commandQueue.shift()!;
    command.execute();
  }
  updateQueueDisplay();
}

document.querySelector<HTMLButtonElement>("#rover-forward")!.onclick = () => {
  enqueueCommand(forwardCommand);
};
document.querySelector<HTMLButtonElement>("#rover-right")!.onclick = () => {
  enqueueCommand(rightCommand);
};
document.querySelector<HTMLButtonElement>("#rover-run")!.onclick = () => {
  runCommand();
};
document.querySelector<HTMLButtonElement>("#rover-clear")!.onclick = () => {
  clearCommandQueue();
};

document.querySelector<HTMLButtonElement>("#rover-reset")!.onclick = () => {
  x = 2;
  y = 2;
  direction = 0;
  drawRover();
};
drawRover();
