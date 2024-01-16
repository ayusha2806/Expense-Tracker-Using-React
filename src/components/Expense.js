import React, { useState, useEffect } from 'react';

function Expense() {
  const [expenseList, setExpenseList] = useState([]);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Fetch existing data from Firebase when the component mounts
    fetchDataFromFirebase();
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  const fetchDataFromFirebase = async () => {
    try {
      const apiKey = 'https://react-https-45286-default-rtdb.firebaseio.com/expenses.json'; // Replace with your actual Firebase API key
      const response = await fetch(`https://react-https-45286-default-rtdb.firebaseio.com/expenses.json?apiKey=${apiKey}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from Firebase');
      }
  
      const data = await response.json();
  
      if (data) {
        // If there is data in Firebase, update expenseList with that data
        const expensesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setExpenseList(expensesArray);
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error.message);
    }
  };
  

  const handleAddExpense = () => {
    const newExpense = {
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

    // Post data to Firebase
    postDataToFirebase(newExpense);
  };

  const postDataToFirebase = async (newExpense) => {
    try {
      const response = await fetch('https://react-https-45286-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to post data to Firebase');
      }

      console.log('Data posted to Firebase successfully');
    } catch (error) {
      console.error('Error posting data to Firebase:', error.message);
    }
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
