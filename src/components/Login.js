// Login.js
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
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
                <input type="text" className="form-control" placeholder="Enter Your Email" />
              </div>

              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" placeholder="Enter Your Password" />
              </div>

              <div>
                <button className="btn btn-primary">Login</button>
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
