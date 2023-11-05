import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const navigate = useNavigate();

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
          action=""
          className="bg-white shadow-2xl p-5 rounded-lg flex flex-col gap-4"
          style={{ width: "400px" }}
        >
          <h1 className="text-center text-2xl">SIGN Up</h1>
          <TextField
            id="filled-basic"
            label="FullName"
            variant="filled"
            size="small"
            fullWidth
          />
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
              onClick={() => navigate("/login")}
            >
              Sign in?
            </span>
            <span className="hover:underline hover:cursor-pointer hover:text-blue-500"></span>
          </div>
          <Button variant="contained" fullWidth>
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
