class Balances {
  constructor() {
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenses = document.getElementById("expenses-amount");
    this.balance = document.getElementById("balance-amount");
  }
  updateBudgetAmount(budget, expense) {
    this.budgetAmount.innerHTML = budget;
    this.expenses.innerHTML = expense;
    this.balance.innerHTML = budget;
  }
  updateExpenseBalance(expense) {
    this.expenses.innerHTML = expense;
    this.balance.innerHTML = +this.budgetAmount.innerHTML.toString() - +expense;
  }
  deleteExpense(delAmount) {
    const expense = (this.expenses.innerHTML =
      +this.expenses.innerHTML.toString() - +delAmount);
    this.updateExpenseBalance(expense);
  }
}
class expenseItem {
  parentList = [];
  constructor(pL) {
    this.parentList = pL;
    this.updateBalances();
    this.renderExpensesItem(this.parentList);
  }
  updateBalances() {
    let expenseAmount = 0;
    for (const item of this.parentList) {
      expenseAmount += +item.amount;
    }
    const balObj = new Balances();
    balObj.updateExpenseBalance(expenseAmount);
  }
  deleteExpenseItem(eid) {
    let itemIndex = 0;
    const balObj = new Balances();
    for (const item of this.parentList) {
      if (item.id == eid) {
        balObj.deleteExpense(item.amount);
        break;
      }
      itemIndex++;
    }
    this.parentList.splice(itemIndex, 1);
    this.renderExpensesItem(this.parentList);
  }
  renderExpensesItem(expenseList) {
    const expense_list = document.getElementById("expense-list");
    expense_list.innerHTML = "";
    const getcurrency = document.getElementById("currency");
    if (expenseList && expenseList.length > 0) {
      for (const expenseItem of expenseList) {
        const ItemRow = document.createElement("tr");
        ItemRow.innerHTML = `
      <td>${expenseItem.title}</td>
      <td><span id="">${getcurrency.value}</span> ${expenseItem.amount}</td>        
      <td><button class="del-btn">&times;</button></td>
      `;
        const delBtn = ItemRow.querySelector(".del-btn");
        delBtn.addEventListener(
          "click",
          this.deleteExpenseItem.bind(this, expenseItem.id)
        );
        expense_list.append(ItemRow);
      }
    }
  }
}
class App {
  constructor() {}
  static init() {
    this.enterBudget();
    this.addItem();
    document.getElementById("reset-app-btn").addEventListener("click", () => {
      location.reload();
    });
  }
  static enterBudget() {
    const add_budget_btn = document.getElementById("add-budget-btn");
    const getBudgetAmount = document.getElementById("budget");
    const getcurrency = document.getElementById("currency");
    const currency = document.querySelectorAll("#currency-symbol");
    add_budget_btn.addEventListener("click", () => {
      if (
        getBudgetAmount.value.trim() === "" ||
        +getBudgetAmount.value < 1 ||
        !+getBudgetAmount.value
      ) {
        alert("Invalid input!  Enter integer value.");
        getBudgetAmount.value = "";
        return;
      } else if (getcurrency.value.trim() === "") {
        alert("Select currency symbol!");
        return;
      }
      const balUp = new Balances();
      balUp.updateBudgetAmount(getBudgetAmount.value, 0);
      for (const c of currency) {
        c.innerHTML = getcurrency.value;
      }
      getBudgetAmount.value = "";
      add_budget_btn.disabled = true;
      document.querySelector(".add-expense-box").classList.add("visible");
    });
  }
  static addItem() {
    const expenseList = [];
    let expAmount = 0;
    const add_expense_btn = document.getElementById("add-expense-btn");
    const budgetAmount = document.getElementById("budget-amount");
    const balance = document.getElementById("balance-amount");
    let expenseTitle = document.getElementById("expense-title");
    let expenseAmount = document.getElementById("expense-amount");
    add_expense_btn.addEventListener("click", () => {
      if (
        expenseTitle.value.trim() === "" ||
        +expenseTitle.value ||
        !+expenseAmount.value ||
        +expenseAmount.value.trim() === "" ||
        +expenseAmount.value < 1
      ) {
        alert("Inavalid input.");
        expenseTitle.value = "";
        expenseAmount.value = "";
        return;
      } else if (expenseAmount.value > +budgetAmount.innerHTML.toString()) {
        alert("Budget Exceeded!");
        return;
      } else if (expenseAmount.value > +balance.innerHTML.toString()) {
        alert("Not enough money!");
        return;
      }
      const newexpenseItem = {
        id: Math.random().toString(),
        title: expenseTitle.value,
        amount: expenseAmount.value,
      };
      // expAmount += +expenseAmount.value;
      // console.log(expAmount);
      // const balObj = new Balances();
      // balObj.updateExpenseBalance(expAmount);
      expenseTitle.value = "";
      expenseAmount.value = "";
      expenseList.push(newexpenseItem);
      new expenseItem(expenseList);
    });
  }
}
App.init();
