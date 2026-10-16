export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let producersVar = 2;

function updateDisplay() {
  const productionVar = producersVar * 3;
  const consumptionVar = 6;
  const balanceVar = productionVar - consumptionVar;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < producersVar ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < producersVar ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${producersVar} / 6`, 18, 76);
  ctx.fillText(`Production: ${productionVar}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, productionVar * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${consumptionVar}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, consumptionVar * 14, 20);
  readout.textContent =
    `Assigned: ${producersVar}/6 · Production: ${productionVar} · Consumption: ${consumptionVar} · Balance: ${
      balanceVar > 0 ? "+" : ""
    }${balanceVar}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  producersVar = Math.max(0, producersVar - 1);
  updateDisplay();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  producersVar = Math.min(6, producersVar + 1);
  updateDisplay();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    producersVar = 2;
    updateDisplay();
  };
updateDisplay();
