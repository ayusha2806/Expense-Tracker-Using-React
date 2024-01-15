import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const idToken = localStorage.getItem("token");
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCz5GQw9rpsQ_WeKR1Qj0-CkRUvQUEmogI`,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: idToken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          // Assuming user data is available in userData.users[0].providerUserInfo[0]
          const { displayName, photoUrl } = userData.users[0].providerUserInfo[0];
          setFullName(displayName || ""); // Set display name if available
          setPhotoURL(photoUrl || ""); // Set photo URL if available
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        console.log(err);
        setError("An error occurred while fetching user data");
      }
    };

    fetchData();
  }, []); // Run this effect only on component mount

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const idToken = localStorage.getItem("token");
      const obj = {
        idToken: idToken,
        displayName: fullName,
        photoUrl: photoURL,
        deleteAttribute: [],
        returnSecureToken: false,
      };

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCz5GQw9rpsQ_WeKR1Qj0-CkRUvQUEmogI",
        {
          body: JSON.stringify(obj),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log('User signed up:', response);
        setSuccess(true);
        setError(null);
        // Clear the input boxes after successful update
        setFullName("");
        setPhotoURL("");
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
        setSuccess(false);
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <>
      <div className="container-fluid px-0">
        <div className="row m-0">
          <div className="col-md-8">
            <p className="m-0" style={{ fontStyle: "italic" }}>
              Winners never quit, Quitters never win.
            </p>
          </div>
          <div className="col-md-4 text-md-right">
            <p className="m-0" style={{ fontStyle: "italic" }}>
              Your profile is 64% completed. A complete profile has higher chances of
              landing a job. <Link to="/complete">Complete now</Link>
            </p>
          </div>
        </div>
        <hr className="m-0" />
      </div>

      <div className="container">
        <h3>Contact Details</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profilePhotoURL" className="form-label">
              Profile Photo URL:
            </label>
            <input
              type="text"
              className="form-control"
              id="profilePhotoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>Successfully updated the user details</p>}
        <hr />
      </div>
    </>
  );
};

export default Profile;
