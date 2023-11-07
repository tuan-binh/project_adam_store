import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { post_register } from "../../../redux/thunk/authThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateBlank } from "../../../utils/ValidateForm";

function UserRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorFullName, setErrorFullName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // form register
    const formRegister = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // validate
    if (validateBlank(formRegister.fullName)) {
      setErrorFullName("You can't blank fullName");
      return;
    }
    if (validateBlank(formRegister.email)) {
      setErrorEmail("You can't blank email");
      return;
    }
    if (validateBlank(formRegister.password)) {
      setErrorPassword("You can't blank password");
      return;
    }
    if (formRegister.password !== e.target.confirmPassword.value) {
      setErrorPassword("passwords are not the same");
      return;
    }
    dispatch(post_register(formRegister)).then((resp) => {
      if (resp === true) {
        navigate("/login");
      } else {
        setErrorEmail(resp);
      }
    });
  };

  useEffect(() => {
    setErrorFullName("");
    setErrorEmail("");
    setErrorPassword("");
  }, []);

  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://theme.hstatic.net/1000333436/1001040510/14/slideshow_3_master.jpg?v=142")',
      }}
    >
      <div
        className="flex items-center"
        style={{
          width: "calc(100vw - 350px)",
          height: "100vh",
          marginLeft: "350px",
        }}
      >
        <form
          onSubmit={handleRegister}
          action=""
          className="bg-white shadow-2xl p-5 rounded-lg flex flex-col gap-4"
          style={{ width: "400px" }}
        >
          <h1 className="text-center text-2xl">SIGN UP</h1>
          <TextField
            error={errorFullName}
            name="fullName"
            label={errorFullName ? errorFullName : "FullName"}
            variant="filled"
            size="small"
            fullWidth
          />
          <TextField
            error={errorEmail}
            name="email"
            label={errorEmail ? errorEmail : "Email"}
            variant="filled"
            size="small"
            fullWidth
          />
          <TextField
            error={errorPassword}
            name="password"
            label={errorPassword ? errorPassword : "Password"}
            variant="filled"
            size="small"
            type="password"
            fullWidth
          />
          <TextField
            error={errorPassword}
            name="confirmPassword"
            label={errorPassword ? errorPassword : "Confirm Password"}
            variant="filled"
            size="small"
            type="password"
            fullWidth
          />
          <div className="flex justify-between">
            <span
              className="hover:underline hover:cursor-pointer hover:text-blue-500"
              onClick={() => navigate("/login")}
            >
              Sign in?
            </span>
            <span className="hover:underline hover:cursor-pointer hover:text-blue-500"></span>
          </div>
          <Button type="submit" variant="contained" fullWidth>
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
