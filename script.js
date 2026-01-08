const cards = document.querySelectorAll(".type");
const calcText = document.getElementById("calcText");

const emptyState = document.getElementById("emptyState");
const resultState = document.getElementById("resultState");

/* FORMAT CURRENCY                 */
function formatCurrency(value) {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* INPUT REFERENCES                */
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");

/* BLOCK INVALID KEYS              */
function blockInvalidKeys(input) {
  input.addEventListener("keydown", (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  });
}

blockInvalidKeys(amountInput);
blockInvalidKeys(termInput);
blockInvalidKeys(rateInput);

/* INPUT VALIDATION (LIVE) */
/* Mortgage Amount */
amountInput.addEventListener("input", () => {
  amountInput.value = amountInput.value.replace(/\D/g, "");
  if (amountInput.value.length > 11) {
    amountInput.value = amountInput.value.slice(0, 13);
  }
});

/* Mortgage Term (1–70) */
termInput.addEventListener("input", () => {
  termInput.value = termInput.value.replace(/\D/g, "");
  if (termInput.value.length > 2) {
    termInput.value = termInput.value.slice(0, 2);
  }

  if (termInput.value === "") {
    resetField("termBox", "termError");
    return;
  }

  const value = Number(termInput.value);
  if (value > 70) {
    showError("termBox", "termError");
    document.getElementById("termError").innerText = "Limit is up to 70 years";
  } else {
    resetField("termBox", "termError");
  }
});

/* Interest Rate (1–30) */
rateInput.addEventListener("input", () => {
  rateInput.value = rateInput.value.replace(/\D/g, "");
  if (rateInput.value.length > 2) {
    rateInput.value = rateInput.value.slice(0, 2);
  }

  if (rateInput.value === "") {
    resetField("rateBox", "rateError");
    return;
  }

  const value = Number(rateInput.value);
  if (value > 30) {
    showError("rateBox", "rateError");
    document.getElementById("rateError").innerText = "Limit is up to 30%";
  } else {
    resetField("rateBox", "rateError");
  }
});

/* MORTGAGE TYPE  */

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

function calculate() {
  const amountVal = Number(amountInput.value);
  const termVal = termInput.value === "" ? null : Number(termInput.value);
  const rateVal = rateInput.value === "" ? null : Number(rateInput.value);
  const type = document.querySelector('input[name="type"]:checked');

  clearErrors();
  let error = false;

  /* Mortgage Amount */
  if (!amountVal || amountVal <= 0) {
    showError("amountBox", "amountError");
    error = true;
  }

  /* Mortgage Term */
  if (termVal === null) {
    showError("termBox", "termError");
    document.getElementById("termError").innerText = "This field is required";
    error = true;
  } else if (termVal > 70) {
    showError("termBox", "termError");
    document.getElementById("termError").innerText = "Limit is up to 70 years";
    error = true;
  }

  /* Interest Rate */
  if (rateVal === null) {
    showError("rateBox", "rateError");
    document.getElementById("rateError").innerText = "This field is required";
    error = true;
  } else if (rateVal > 30) {
    showError("rateBox", "rateError");
    document.getElementById("rateError").innerText = "Limit is up to 30%";
    error = true;
  }

  /* Mortgage Type */
  if (!type) {
    document.getElementById("typeError").style.display = "block";
    error = true;
  }

  /* Stop on error */
  if (error) {
    emptyState.classList.add("active");
    resultState.classList.remove("active");
    return;
  }

  /* ================= Calculation ================= */
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

  document.getElementById("monthly").innerText = `£${formatCurrency(monthly)}`;
  document.getElementById("total").innerText = `£${formatCurrency(monthly * months)}`;

  emptyState.classList.remove("active");
  resultState.classList.add("active");
}

/* ERROR HELPERS                   */
function showError(boxId, errorId) {
  document.getElementById(boxId).classList.add("error");
  document.getElementById(errorId).style.display = "block";
}

function resetField(boxId, errorId) {
  document.getElementById(boxId).classList.remove("error");
  document.getElementById(errorId).style.display = "none";
  document.getElementById(errorId).innerText = "This field is required";
}

function clearErrors() {
  document.querySelectorAll(".input-box").forEach(box =>
    box.classList.remove("error")
  );
  document.querySelectorAll(".error-text").forEach(err =>
    err.style.display = "none"
  );
}

/* RESET ALL                       */
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
