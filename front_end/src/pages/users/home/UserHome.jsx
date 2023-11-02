import Banner from "../../../components/banner/Banner";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

function UserHome() {
  return (
    <div>
      <Banner />
      <main className="mx-48 my-20">
        {/* search */}
        <div className="search flex justify-center">
          <div className="relative" style={{ width: "70%" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
            <SearchIcon sx={{ fontSize: '35px' }} className="absolute right-3 bottom-1/2 translate-y-1/2 hover:cursor-pointer" />
          </div>

        </div>
        {/* grid category */}
        <div className="grid grid-rows-2 grid-cols-3 gap-4 p-20">
          <div className="row-span-2 bg-red-600">suit</div>
          <div className="col-span-1 bg-orange-600">T shirt</div>
          <div className="col-span-1 bg-cyan-600">shirt</div>
          <div className="row-span-1 col-span-2 bg-blue-600">shoe</div>
        </div>
      </main>
    </div>
  );
}

export default UserHome;
