// Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <>
      <p style={{ display: 'inline' }}>Welcome To Expense Tracker!!</p>
      <p style={{ display: 'inline', marginLeft: '150px' }}>Your profile is incomplete. <Link to="/profile">Complete now</Link></p>
      <hr />
    </>
  );
}

export default Welcome;
