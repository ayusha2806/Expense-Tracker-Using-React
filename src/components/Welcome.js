// Welcome.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch} from 'react-redux';
import { logout } from '../store/Store';

function Welcome() {
  const dispatch = useDispatch();
  const idToken = useSelector((state)=>state.auth.token)
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState(null);

  const sendVerificationEmail = async () => {
    try {
      // const idToken = localStorage.getItem('token');
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCz5GQw9rpsQ_WeKR1Qj0-CkRUvQUEmogI`,
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: idToken,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setVerificationSent(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
        setVerificationSent(false);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred while sending the verification email.');
      setVerificationSent(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    // Clear the idToken from local storage
    // localStorage.removeItem('token');

    
    // Navigate the user to the login page
    navigate('/login');
  };

  function submitHandle(){
    navigate('/expense')
  }

  return (
    <>
      <div className="mb-3">
        {/* Logout button */}
        <button onClick={handleLogout} className="btn btn-outline-primary">
          Logout
        </button>
      </div>
      <p style={{ display: 'inline' }}>Welcome To Expense Tracker!!</p>
      {!verificationSent && (
        <p style={{ display: 'inline', marginLeft: '150px' }}>
          Your profile is incomplete.<Link to="/profile">Complete now</Link>{' '}
          <button onClick={sendVerificationEmail} className="btn btn-link">
            Send verification email
          </button>
        </p>
      )}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <hr />
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <button onClick={submitHandle} className="btn btn-primary btn-lg">
          Explore Expense Tracker
        </button>
      </div>
    </>
  );
}

export default Welcome;