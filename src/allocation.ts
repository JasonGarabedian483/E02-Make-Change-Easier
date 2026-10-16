export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let producersVar = 2;

function updateDisplay() {
  const result = calculationShift();
  const productionVar = result.production;
  const consumptionVar = result.consumption;
  const balanceVar = result.balance;
  const rows: displayRow[] = [
    { label: "Production", value: productionVar, barColor: "#27766b" },
    { label: "Consumption", value: consumptionVar, barColor: "#a44d23" },
  ];
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
  rows.forEach((row, index) => {
    ctx.fillStyle = "#233e43";
    ctx.fillText(`${row.label}: ${row.value}`, 18, 102 + index * 54);
    ctx.fillStyle = row.barColor;
    ctx.fillRect(18, 110 + index * 54, row.value * 14, 20);
  });
  readout.textContent =
    `Assigned: ${producersVar}/6 · Production: ${productionVar} · Consumption: ${consumptionVar} · Balance: ${
      balanceVar > 0 ? "+" : ""
    }${balanceVar}`;
}

type shiftResult = {
  production: number;
  consumption: number;
  balance: number;
};

type displayRow = {
  label: string;
  value: number;
  barColor: string;
};

function calculationShift(): shiftResult {
  const production = producersVar * 3;
  const consumption = 6;
  const balance = production - consumption;
  return { production, consumption, balance };
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
