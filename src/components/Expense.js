import React, { useState, useEffect } from "react";

function Expense() {
  const [expenseList, setExpenseList] = useState([]);
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  useEffect(() => {
    // Fetch existing data from Firebase when the component mounts
    fetchDataFromFirebase();
  }, []);

  const fetchDataFromFirebase = async () => {
    try {
      const apiKey =
        "https://react-https-45286-default-rtdb.firebaseio.com/expenses.json"; // Replace with your actual Firebase API key
      const response = await fetch(
        `https://react-https-45286-default-rtdb.firebaseio.com/expenses.json?apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from Firebase");
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
      console.error("Error fetching data from Firebase:", error.message);
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
    setMoneySpent("");
    setDescription("");
    setCategory("");

    // Post data to Firebase
    postDataToFirebase(newExpense);
  };

  const postDataToFirebase = async (newExpense) => {
    try {
      const response = await fetch(
        "https://react-https-45286-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post data to Firebase");
      }

      console.log("Data posted to Firebase successfully");
    } catch (error) {
      console.error("Error posting data to Firebase:", error.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(
        `https://react-https-45286-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense from Firebase");
      }

      // Remove the expense from the local state
      setExpenseList((prevExpenseList) =>
        prevExpenseList.filter((expense) => expense.id !== id)
      );

      console.log("Expense successfully deleted");
    } catch (error) {
      console.error("Error deleting expense:", error.message);
    }
  };

  const handleEditExpense = (id) => {
    // Set the id of the expense to be edited
    setEditingExpenseId(id);

    // Find the expense to be edited and set its values in the input fields
    const editedExpense = expenseList.find((expense) => expense.id === id);
    setMoneySpent(editedExpense.moneySpent);
    setDescription(editedExpense.description);
    setCategory(editedExpense.category);
  };

  const handleUpdateExpense = async () => {
    try {
      const updatedExpense = {
        moneySpent,
        description,
        category,
      };

      const response = await fetch(
        `https://react-https-45286-default-rtdb.firebaseio.com/expenses/${editingExpenseId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update expense in Firebase");
      }

      // Update the local state with the edited expense
      setExpenseList((prevExpenseList) =>
        prevExpenseList.map((expense) =>
          expense.id === editingExpenseId
            ? { id: editingExpenseId, ...updatedExpense }
            : expense
        )
      );

      // Clear editing state and input fields
      setEditingExpenseId(null);
      setMoneySpent("");
      setDescription("");
      setCategory("");

      console.log("Expense successfully updated");
    } catch (error) {
      console.error("Error updating expense:", error.message);
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
          {editingExpenseId ? (
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={handleUpdateExpense}
            >
              Update Expense
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
          )}
        </form>
      </div>

      {/* Display added expenses */}
      <div className="p-3 border rounded">
        <h2 className="mb-3">Added Expenses</h2>
        <ul className="list-group">
          {expenseList.map((expense) => (
            <li key={expense.id} className="list-group-item">
              <strong>Money Spent:</strong> {expense.moneySpent},{" "}
              <strong>Description:</strong> {expense.description},{" "}
              <strong>Category:</strong> {expense.category}
              <button
                type="button"
                className="btn btn-warning btn-sm mx-2"
                onClick={() => handleEditExpense(expense.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteExpense(expense.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Expense;
