import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });

  useEffect(() => {
    // Check if a token exists in localStorage on page load
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Redirect to the Welcome page if the user is already logged in
      navigate('/welcome');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCz5GQw9rpsQ_WeKR1Qj0-CkRUvQUEmogI',
        {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.pass,
            returnSecureToken: true,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.ok) {
        const userCredential = await response.json();
        console.log('User logged in:', userCredential);

        // Store the token in localStorage
        localStorage.setItem('token', userCredential.idToken);

        setValues({
          email: '',
          pass: '',
        });

        // Redirect to the Welcome page after successful login
        navigate('/Welcome');
      } else {
        const errorData = await response.json();
        alert('Incorrect credentials. Please try again.');
        console.log('Error logging in:', errorData.error.message);
      }
    } catch (error) {
      console.log('Error logging in:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Email"
                  value={values.email}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                  value={values.pass}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                  }
                />
              </div>

              <div>
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
                <p className="mt-3 text-center">Don't have an account?</p>
                <p className="text-center">
                  <Link to="/">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
