const cards = document.querySelectorAll(".type");
const calcText = document.getElementById("calcText");

const emptyState = document.getElementById("emptyState");
const resultState = document.getElementById("resultState");

/* =============================== */
/* FORMAT NUMBER WITH COMMAS (£)   */
/* =============================== */
function formatCurrency(value) {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* =============================== */
/* INPUT RESTRICTIONS              */
/* =============================== */
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");

/* Block negative, +, -, e */
function blockInvalidKeys(input) {
  input.addEventListener("keydown", (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  });
}

/* Mortgage Amount: digits only, max 11 */
amountInput.addEventListener("input", () => {
  amountInput.value = amountInput.value.replace(/\D/g, "");
  if (amountInput.value.length > 11) {
    amountInput.value = amountInput.value.slice(0, 11);
  }
});

/* Mortgage Term: digits only, max 2 */
termInput.addEventListener("input", () => {
  termInput.value = termInput.value.replace(/\D/g, "");
  if (termInput.value.length > 2) {
    termInput.value = termInput.value.slice(0, 2);
  }
});

/* Interest Rate: digits only, max 2 */
rateInput.addEventListener("input", () => {
  rateInput.value = rateInput.value.replace(/\D/g, "");
  if (rateInput.value.length > 2) {
    rateInput.value = rateInput.value.slice(0, 2);
  }
});

blockInvalidKeys(amountInput);
blockInvalidKeys(termInput);
blockInvalidKeys(rateInput);

/* =============================== */
/* Mortgage type selection         */
/* =============================== */
cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    card.querySelector("input").checked = true;

    document.getElementById("typeError").style.display = "none";

    calcText.innerText =
      card.querySelector("input").value === "interest"
        ? "Calculate Interest Only"
        : "Calculate Repayments";
  });
});

/* =============================== */
/* Calculate Function              */
/* =============================== */
function calculate() {
  const amountVal = Number(amountInput.value);
  const termVal = Number(termInput.value);
  const rateVal = Number(rateInput.value);
  const type = document.querySelector('input[name="type"]:checked');

  clearErrors();
  let error = false;

  // Mortgage Amount (0 < amount ≤ 1 trillion)
  if (!amountVal || amountVal <= 0 || amountVal > 1_000_000_000_000) {
    showError("amountBox", "amountError");
    error = true;
  }

  // Mortgage Term (1–70 years)
  if (!termVal || termVal <= 0 || termVal > 70) {
    showError("termBox", "termError");
    error = true;
  }

  // Interest Rate (0–30%)
  if (!rateVal || rateVal <= 0 || rateVal > 30) {
    showError("rateBox", "rateError");
    error = true;
  }

  // Mortgage Type
  if (!type) {
    document.getElementById("typeError").style.display = "block";
    error = true;
  }

  if (error) {
    emptyState.classList.add("active");
    resultState.classList.remove("active");
    return;
  }

  /* =============================== */
  /* Calculation                    */
  /* =============================== */
  const monthlyRate = rateVal / 100 / 12;
  const months = termVal * 12;

  let monthly;
  const label = document.getElementById("monthlyLabel");

  if (type.value === "repayment") {
    monthly =
      amountVal *
      monthlyRate *
      Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);

    label.innerText = "Your monthly repayments";
  } else {
    monthly = amountVal * monthlyRate;
    label.innerText = "Your monthly interest only";
  }

  /* =============================== */
  /* OUTPUT                         */
  /* =============================== */
  document.getElementById("monthly").innerText =
    `£${formatCurrency(monthly)}`;

  document.getElementById("total").innerText =
    `£${formatCurrency(monthly * months)}`;

  emptyState.classList.remove("active");
  resultState.classList.add("active");
}

/* =============================== */
/* Error Helpers                   */
/* =============================== */
function showError(boxId, errorId) {
  document.getElementById(boxId).classList.add("error");
  document.getElementById(errorId).style.display = "block";
}

function clearErrors() {
  document.querySelectorAll(".input-box").forEach(box =>
    box.classList.remove("error")
  );

  document.querySelectorAll(".error-text").forEach(err =>
    err.style.display = "none"
  );
}

/* =============================== */
/* Reset                           */
/* =============================== */
function resetAll() {
  amountInput.value = "";
  termInput.value = "";
  rateInput.value = "";

  document.querySelectorAll('input[name="type"]').forEach(r => r.checked = false);
  cards.forEach(c => c.classList.remove("active"));

  clearErrors();

  emptyState.classList.add("active");
  resultState.classList.remove("active");

  document.getElementById("monthly").innerText = "£0.00";
  document.getElementById("total").innerText = "£0.00";
}
