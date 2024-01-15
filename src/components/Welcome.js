// Welcome.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState(null);

  const sendVerificationEmail = async () => {
    try {
      const idToken = localStorage.getItem('token');
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

  return (
    <>
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
    </>
  );
}

export default Welcome;
