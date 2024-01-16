import React, { useState } from 'react';

function Expense() {
  const [expenseList, setExpenseList] = useState([]);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = () => {
    const newExpense = {
      id: new Date().getTime(), // Unique ID for each expense (using timestamp)
      moneySpent,
      description,
      category,
    };

    // Update expenseList with the new expense
    setExpenseList((prevExpenseList) => [...prevExpenseList, newExpense]);

    // Clear input fields
    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="container mt-4">
      {/* Form for entering daily expenses */}
      <div className="mb-4 p-3 border rounded">
        <h2 className="text-center mb-3">Enter Daily Expenses</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="moneySpent" className="form-label">
              Money Spent
            </label>
            <input
              type="number"
              className="form-control"
              id="moneySpent"
              value={moneySpent}
              onChange={(e) => setMoneySpent(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddExpense}
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Display added expenses */}
      <div className="p-3 border rounded">
        <h2 className="mb-3">Added Expenses</h2>
        <ul className="list-group">
          {expenseList.map((expense) => (
            <li key={expense.id} className="list-group-item">
              <strong>Money Spent:</strong> {expense.moneySpent},{' '}
              <strong>Description:</strong> {expense.description},{' '}
              <strong>Category:</strong> {expense.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Expense;
