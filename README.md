# Mortgage Repayment Calculator 🏠

A user-friendly mortgage repayment calculator that estimates monthly payments and total payment amounts based on loan details and mortgage type.

---

## 📋 Features

- Input fields for:
  - Loan Amount
  - Interest Rate (%)
  - Loan Term (Years)
  - Mortgage Type (e.g., Interest Only, Principal & Interest)
- Calculates and displays:
  - Monthly Payment
  - Total Payment over the loan term
- Supports different mortgage types:
  - Interest Only
  - Principal & Interest (standard amortizing loan)
- Clean, simple UI with easy-to-use form and clear results section

---

## 🧮 How It Works

### Inputs:
- **Loan Amount:** Total loan principal in currency units.
- **Interest Rate (%):** Annual interest rate as a percentage.
- **Loan Term (Years):** Duration of the loan in years.
- **Mortgage Type:**  
  - *Interest Only*: Pay only the interest each month (principal remains unchanged).  
  - *Principal & Interest*: Standard loan repayment where each payment includes interest and part of the principal.

### Calculations:

#### 1. For **Principal & Interest** mortgage:

\[
M = P \times \frac{r(1 + r)^n}{(1 + r)^n - 1}
\]

Where:  
- \(M\) = Monthly payment  
- \(P\) = Loan amount (principal)  
- \(r\) = Monthly interest rate = \(\frac{\text{Annual Interest Rate}}{12 \times 100}\)  
- \(n\) = Total number of monthly payments = Loan Term (Years) × 12

**Total Payment** = \(M \times n\)

#### 2. For **Interest Only** mortgage:

\[
M = P \times r
\]

**Total Payment** = \(M \times n\)

---

## ▶️ Usage

1. Enter the **Loan Amount**.
2. Enter the **Interest Rate (%)**.
3. Enter the **Loan Term (Years)**.
4. Select the **Mortgage Type** from the dropdown.
5. Click **Calculate**.
6. The **Monthly Payment** and **Total Payment** will be displayed below.

---

## 💡 Example

**Input:**

- Loan Amount: $8,768,767  
- Interest Rate: 4%  
- Loan Term: 10 years  
- Mortgage Type: Interest Only

**Calculation:**

- Monthly interest rate: \( \frac{4}{12 \times 100} = 0.003333 \)  
- Monthly payment (Interest Only): \( 8,768,767 \times 0.003333 = 29,229.22 \)  
- Total payment: \( 29,229.22 \times 120 = 3,507,506.40 \)

**Output:**

- Monthly Payment: $29,229.22  
- Total Payment: $3,507,506.40

---

