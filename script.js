
const form = document.querySelector("#budget-form");
const incomeInput = document.querySelector("#income");
const results = document.querySelector("#results");
const breakdown = document.querySelector("#budget-breakdown");
const total = document.querySelector("#total");

const budgetCategories = [
  { name: "Housing", percentage: 0.25 },
  { name: "Car & transportation", percentage: 0.10 },
  { name: "Groceries", percentage: 0.12 },
  { name: "Utilities", percentage: 0.05 },
  { name: "Savings", percentage: 0.20 },
  { name: "Debt payments", percentage: 0.10 },
  { name: "Fun money", percentage: 0.05 },
  { name: "Other / buffer", percentage: 0.13 }
];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const income = Number(incomeInput.value);

  if (income <= 0 || !Number.isFinite(income)) {
    alert("Please enter a valid monthly income.");
    return;
  }

  breakdown.innerHTML = "";

  let allocatedTotal = 0;

  budgetCategories.forEach(function (category) {
    const amount = income * category.percentage;
    allocatedTotal += amount;

    const row = document.createElement("p");
    row.textContent =
      `${category.name}: ${amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })}`;

    breakdown.appendChild(row);
  });

  total.textContent =
    `Total allocated: ${allocatedTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })}`;

  results.hidden = false;
});