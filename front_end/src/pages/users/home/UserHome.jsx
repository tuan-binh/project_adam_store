import Banner from "../../../components/banner/Banner";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

function UserHome() {
  return (
    <div>
      <Banner />
      <main className="mx-48 my-20">
        {/* search */}
        <section className="search flex justify-center">
          <div className="relative" style={{ width: "70%" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
            <SearchIcon sx={{ fontSize: '35px' }} className="absolute right-3 bottom-1/2 translate-y-1/2 hover:cursor-pointer" />
          </div>
        </section>
        {/* grid category */}\
        <section>
          <h2 className="text-center text-3xl pt-3">Categories</h2>
          <div className="flex gap-5 py-20">
            <div className="relative">
              <div className="bg-orange-600 w-52 h-96 overflow-hidden">
                <img src="banner_left.webp" alt="" className="hover:scale-110 transition-all duration-500 h-full object-cover" />
              </div>
              <div className="absolute -rotate-90 text-white right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-7xl">ADAM</div>
            </div>
            <div className="flex-1 py-5">
              {/* content category */}
              <div className="grid grid-cols-3 gap-4">
                <div className="h-40 relative rounded-lg bg-fixed bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("banner.webp")' }}>
                  <div className="absolute bottom-2 right-4 text-4xl font-semibold text-white">NỘI DUNG</div>
                </div>
                <div className="h-40 relative rounded-lg bg-fixed bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("banner.webp")' }}>
                  <div className="absolute bottom-2 right-4 text-4xl font-semibold text-white">NỘI DUNG</div>
                </div>
                <div className="h-40 relative rounded-lg bg-fixed bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("banner.webp")' }}>
                  <div className="absolute bottom-2 right-4 text-4xl font-semibold text-white">NỘI DUNG</div>
                </div>
                <div className="h-40 relative rounded-lg bg-fixed bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("banner.webp")' }}>
                  <div className="absolute bottom-2 right-4 text-4xl font-semibold text-white">NỘI DUNG</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-orange-600 w-52 h-96 overflow-hidden">
                <img src="banner_right.webp" alt="" className="hover:scale-125 transition-all duration-500 h-full object-cover" />
              </div>
              <div className="absolute rotate-90 text-white right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-7xl">STORE</div>
            </div>
          </div>
        </section>


        {/* nội dung những người nổi tiếng */}
        <section>
          <h2 className="text-center text-3xl">NGƯỜI NỔI TIẾNG</h2>
          <div className="idol flex gap-5 p-20">
            <div>
              <img src="https://theme.hstatic.net/1000333436/1001040510/14/htesti_img_1_large.jpg?v=142" style={{ filter: 'blur(0px) grayscale(100%) sepia(0)' }} alt="" />
              <h3 className="text-center py-3 uppercase text-lg font-semibold">Ca Sĩ Lý Hải</h3>
            </div>
            <div>
              <img src="https://theme.hstatic.net/1000333436/1001040510/14/htesti_img_2_large.jpg?v=142" style={{ filter: 'blur(0px) grayscale(100%) sepia(0)' }} alt="" />
              <h3 className="text-center py-3 uppercase text-lg font-semibold">Ca Sĩ Ngô Kiến Huy</h3>
            </div>
            <div>
              <img src="https://theme.hstatic.net/1000333436/1001040510/14/htesti_img_3_large.jpg?v=142" style={{ filter: 'blur(0px) grayscale(100%) sepia(0)' }} alt="" />
              <h3 className="text-center py-3 uppercase text-lg font-semibold">Nghệ Sĩ Xuân Bắc</h3>
            </div>
            <div>
              <img src="https://theme.hstatic.net/1000333436/1001040510/14/htesti_img_4_large.jpg?v=142" style={{ filter: 'blur(0px) grayscale(100%) sepia(0)' }} alt="" />
              <h3 className="text-center py-3 uppercase text-lg font-semibold">Ca Sĩ Quân AP</h3>
            </div>
          </div>
        </section>
        {/* đặt làm */}
        <section className="flex justify-center ">
          <div className="w-1/2">
            <h2 className="text-center text-3xl py-5">CONTACT</h2>
            <div className="flex flex-col gap-5">
              <TextField fullWidth id="outlined-basic" label="EMAIL" variant="outlined" />
              <TextField fullWidth id="outlined-basic" label="PHONE" variant="outlined" />
            </div>
            <div className="action flex justify-center py-5">
              <Button variant="contained" sx={{ minWidth: '200px' }}>SEND</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserHome;
