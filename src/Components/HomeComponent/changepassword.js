import "./profile.css";

const Changepassword = () => {
  return (
    <div className="profile-section">
      <h1>Profile</h1>
      <form id="form-profile-section2">
        <label htmlFor="oldpassword">Old Password</label>
        <input id="oldpassword" type="password" />
        <label htmlFor="newpassword">New Password</label>
        <input id="newpassword" type="password" />
        <label htmlFor="confirm">Confirm Password</label>
        <input id="confirm" type="password" />
      </form>
      <button id="submit-button" type="button">
        Submit
      </button>
      <button id="cancle-button" type="button">
        Cancle
      </button>
    </div>
  );
};

export default Changepassword;
