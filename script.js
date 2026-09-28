
const form = document.querySelector("#budget-form");
const incomeInput = document.querySelector("#income");
const results = document.querySelector("#results");
const breakdown = document.querySelector("#budget-breakdown");
const total = document.querySelector("#total");

const planButtons = document.querySelectorAll(".plan-button");

let selectedPlan = "balanced";

const budgetPlans = {
  fun: {
    name: "Maximum Fun",
    categories: [
      { name: "Housing", percentage: 0.30 },
      { name: "Car & transportation", percentage: 0.15 },
      { name: "Groceries", percentage: 0.15 },
      { name: "Utilities", percentage: 0.07 },
      { name: "Savings", percentage: 0.05 },
      { name: "Debt payments", percentage: 0.05 },
      { name: "Fun money", percentage: 0.15 },
      { name: "Other / buffer", percentage: 0.08 }
    ]
  },

  balanced: {
    name: "Balanced",
    categories: [
      { name: "Housing", percentage: 0.25 },
      { name: "Car & transportation", percentage: 0.10 },
      { name: "Groceries", percentage: 0.12 },
      { name: "Utilities", percentage: 0.05 },
      { name: "Savings", percentage: 0.20 },
      { name: "Debt payments", percentage: 0.10 },
      { name: "Fun money", percentage: 0.08 },
      { name: "Other / buffer", percentage: 0.10 }
    ]
  },

  responsible: {
    name: "Financially Responsible",
    categories: [
      { name: "Housing", percentage: 0.25 },
      { name: "Car & transportation", percentage: 0.08 },
      { name: "Groceries", percentage: 0.12 },
      { name: "Utilities", percentage: 0.05 },
      { name: "Savings", percentage: 0.30 },
      { name: "Debt payments", percentage: 0.12 },
      { name: "Fun money", percentage: 0.03 },
      { name: "Other / buffer", percentage: 0.05 }
    ]
  }
};

// Handle clicks on the three plan buttons
planButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedPlan = button.dataset.plan;

    planButtons.forEach(function (otherButton) {
      otherButton.classList.remove("selected");
    });

    button.classList.add("selected");
  });
});

// Generate the budget when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const income = Number(incomeInput.value);

  if (!Number.isFinite(income) || income <= 0) {
    alert("Please enter a valid monthly income.");
    return;
  }

  const plan = budgetPlans[selectedPlan];

  breakdown.innerHTML = "";

  let allocatedTotal = 0;

  plan.categories.forEach(function (category) {
    const amount = income * category.percentage;
    allocatedTotal += amount;

    const row = document.createElement("p");

    row.textContent =
      `${category.name} (${category.percentage * 100}%): ` +
      amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });

    breakdown.appendChild(row);
  });

  total.textContent =
    `${plan.name} plan — Total allocated: ` +
    allocatedTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

  results.hidden = false;
});