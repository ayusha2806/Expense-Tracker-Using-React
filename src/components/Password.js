import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        requestType: "PASSWORD_RESET",
        email: email,
      };
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCz5GQw9rpsQ_WeKR1Qj0-CkRUvQUEmogI",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      alert(
        "Reset Link has been sent to your mail id, kindly reset the password and login again"
      );
      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Reset Your Password</h2>

      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            required
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default Password;