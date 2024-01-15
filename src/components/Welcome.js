// Welcome.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h2 className="text-center">Welcome</h2>
            </div>
            <div className="card-body">
              <p className="text-center">Welcome to Expense Tracker</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
