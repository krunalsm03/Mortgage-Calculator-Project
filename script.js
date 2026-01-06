const cards = document.querySelectorAll(".type");
const calcText = document.getElementById("calcText");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    card.querySelector("input").checked = true;

    const type = card.querySelector("input").value;

    if (type === "interest") {
      calcText.innerText = "Calculate Interest Only";
    } else {
      calcText.innerText = "Calculate Repayments";
    }
  });
});

function calculate() {
  const amount = +document.getElementById("amount").value;
  const years = +document.getElementById("term").value;
  const rate = +document.getElementById("rate").value / 100 / 12;
  const months = years * 12;

  const type = document.querySelector('input[name="type"]:checked').value;

  let monthly;
  let label = document.getElementById("monthlyLabel");

  if (type === "repayment") {
    monthly =
      amount * rate * Math.pow(1 + rate, months) /
      (Math.pow(1 + rate, months) - 1);

    label.innerText = "Your monthly repayments";
  } else {
    monthly = amount * rate;
    label.innerText = "Your monthly Interest Only";
  }

  const total = monthly * months;

  document.getElementById("monthly").innerText =
    "£" + monthly.toFixed(2);

  document.getElementById("total").innerText =
    "£" + total.toFixed(2);
}

function resetAll() {
  document.getElementById("amount").value = "";
  document.getElementById("term").value = "";
  document.getElementById("rate").value = "";
  document.getElementById("monthly").innerText = "£0.00";
  document.getElementById("total").innerText = "£0.00";
}


