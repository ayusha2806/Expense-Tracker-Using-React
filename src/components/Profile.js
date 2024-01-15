import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

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

      const data = await response.json();
      console.log("data=", data);
      alert("Successfully updated the user details");
    } catch (err) {
      console.log(err);
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
            <label htmlFor="fullName" className="-col-sm-2 col-form-label">
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
        <hr />
      </div>
    </>
  );
};

export default Profile;
