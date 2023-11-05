import Button from "@mui/material/Button";
import ForgetPassword from "../../../components/modal/ForgetPassword";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserLogin() {
  const navigate = useNavigate();

  // handle forget password
  const [openForgetPassword, setOpenForgetPassword] = useState(false);
  const handleOpenForgetPassword = () => setOpenForgetPassword(true);
  const handleCloseForgetPassword = () => setOpenForgetPassword(false);

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
            action=""
            className="bg-white shadow-2xl p-5 rounded-lg flex flex-col gap-4"
            style={{ width: "400px" }}
          >
            <h1 className="text-center text-2xl">SIGN IN</h1>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              size="small"
              fullWidth
            />
            <TextField
              id="filled-basic"
              label="Password"
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
            <Button variant="contained" fullWidth>
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
