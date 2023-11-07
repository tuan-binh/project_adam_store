import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import ForgetPassword from "../../../components/modal/ForgetPassword";
import TextField from "@mui/material/TextField";
import { post_login } from "../../../redux/thunk/authThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateBlank } from "../../../utils/ValidateForm";

function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle forget password
  const [openForgetPassword, setOpenForgetPassword] = useState(false);
  const handleOpenForgetPassword = () => setOpenForgetPassword(true);
  const handleCloseForgetPassword = () => setOpenForgetPassword(false);

  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // form login
    const formLogin = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // validate
    if (validateBlank(formLogin.email)) {
      setErrorEmail("you can't blank email");
      return;
    }
    if (validateBlank(formLogin.password)) {
      setErrorPassword("you can't blank password");
      return;
    }
    // dispatch form login
    dispatch(post_login(formLogin)).then((resp) => {
      if (resp === true) {
        navigate("/");
      } else {
        setError(resp);
      }
    });
  };

  useEffect(() => {
    setError("");
    setErrorEmail("");
    setErrorPassword("");
  }, []);

  return (
    <>
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
            onSubmit={handleLogin}
            action=""
            className="bg-white shadow-2xl p-5 rounded-lg flex flex-col gap-4"
            style={{ width: "400px" }}
          >
            <h1 className="text-center text-2xl">SIGN IN</h1>
            {error && (
              <p className="text-center text-red-600 text-lg font-semibold">
                {error}
              </p>
            )}
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
            <div className="flex justify-between">
              <span
                className="hover:underline hover:cursor-pointer hover:text-blue-500"
                onClick={() => navigate("/register")}
              >
                Sign up?
              </span>
              <span
                className="hover:underline hover:cursor-pointer hover:text-blue-500"
                onClick={handleOpenForgetPassword}
              >
                forget your password?
              </span>
            </div>
            <Button type="submit" variant="contained" fullWidth>
              SIGN IN
            </Button>
          </form>
        </div>
      </div>
      {openForgetPassword && (
        <ForgetPassword
          openForgetPassword={openForgetPassword}
          handleCloseForgetPassword={handleCloseForgetPassword}
        />
      )}
    </>
  );
}

export default UserLogin;
