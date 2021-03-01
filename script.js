const totalCost = document.getElementById("total-cost"),
  anInitialFree = document.getElementById("initial-fee"),
  creaditTerm = document.getElementById("credit-term");

const totalCostRange = document.getElementById("total-cost-range"),
  anInitialFreeRange = document.getElementById("an-initial-free-range"),
  creaditTermRange = document.getElementById("credit-term-range");

const totalAmountOfCredit = document.getElementById("amount-of-credit"),
  totalMonthlyPayment = document.getElementById("monthly-payment"),
  totalRecommendedIncome = document.getElementById("recommended-income");

const inputsRange = document.querySelectorAll(".input-range");

const bankBtns = document.querySelectorAll(".bank");

const assingValue = () => {
  totalCost.value = totalCostRange.value;
  anInitialFree.value = anInitialFreeRange.value;
  creaditTerm.value = creaditTermRange.value;
};

assingValue();

const banks = [
  {
    name: "bcr",
    procents: 8.7,
  },
  {
    name: "brd",
    procents: 8.4,
  },
  {
    name: "trans",
    procents: 7.9,
  },
  {
    name: "raif",
    procents: 9.2,
  },
];

let currentProcent = banks[0].procents;

for (let bank of bankBtns) {
  bank.addEventListener("click", () => {
    for (let item of bankBtns) {
      item.classList.remove("active");
    }
    bank.classList.add("active");
    takeActiveBank(bank);
  });
}

const takeActiveBank = (currentActive) => {
  const dataAttrValue = currentActive.dataset.name;
  const curentBank = banks.find((bank) => bank.name === dataAttrValue);
  currentProcent = curentBank.procents;
  calcuation(totalCost.value, anInitialFree.value, creaditTerm.value);
};

for (let input of inputsRange) {
  input.addEventListener("input", () => {
    assingValue();
    calcuation(totalCost.value, anInitialFree.value, creaditTerm.value);
  });
}

const calcuation = (totalCost = 0, anInitialFree = 2000, creditTerm = 1) => {
  let monthlyPayment;
  let lounAmount = totalCost - anInitialFree;
  let interestRate = currentProcent;
  let numberOfYears = creditTerm;
  let numberOfYearsMonths = 12 * numberOfYears;

  monthlyPayment =
    (lounAmount +
      (((lounAmount / 100) * interestRate) / 12) * numberOfYearsMonths) /
    numberOfYearsMonths;

  const monthlyPaymentArounded = Math.round(monthlyPayment);
  if (monthlyPaymentArounded < 0) {
    return false;
  } else {
    totalAmountOfCredit.innerHTML = `${lounAmount} RON`;
    totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} RON`;
    totalRecommendedIncome.innerHTML = `${
      monthlyPaymentArounded + (monthlyPaymentArounded / 100) * 35
    } RON`;
  }
};
