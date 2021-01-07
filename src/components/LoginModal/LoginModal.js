import { Dialog } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import "./LoginModal.css";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../Reducer";

const LoginModal = () => {
  const [{ userIdentification }, dispatch] = useStateValue();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [userId, setUserId] = useState(null);

  const handleOTP = () => {
    axios
      .post("http://13.235.90.125:8000/user/login", {
        phone: inputValue,
      })
      .then((res) => setUserId(res.data.payload._id))
      .catch((err) => {
        setUserId(null);
        alert(err);
      });
  };

  const handleRegister = () => {
    axios
      .get(`http://13.235.90.125:8000/user/${userId}/verify-otp?otp=${OTP}`)
      .then((res) => {
        setOpen(false);
        setOTP("");
        setUserId(null);
        localStorage.setItem("authToken", `bearer ${res.headers["x-auth"]}`);
        dispatch({
          type: actionTypes.SET_USER,
          userIdentification: res.data.payload._id,
          phone: res.data.payload.phone,
        });
        alert(res.data.description);
      })
      .catch((err) => {
        setUserId(null);
        alert(err);
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} className="modal">
        <div className="modal__conatiner">
          <h1>Login with Phone Number</h1>
          {userId ? (
            <div>
              <input
                autoFocus
                placeholder="OTP"
                value={OTP}
                type="number"
                onChange={(e) => setOTP(e.target.value)}
              />
              <button onClick={handleRegister}>VERIFY OTP</button>
            </div>
          ) : (
            <div>
              <input
                autoFocus
                placeholder="Phone Number"
                value={inputValue}
                type="number"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button onClick={handleOTP}>GET OTP</button>
            </div>
          )}
        </div>
      </Dialog>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="modal__btn"
      >
        {userIdentification ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default LoginModal;
