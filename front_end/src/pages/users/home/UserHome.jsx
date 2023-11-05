import Banner from "../../../components/banner/Banner";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import UserReviews from "../../../components/user_reviews/UserReviews";

function UserHome() {
  return (
    <div>
      <Banner title={"ADAM STORE"} />
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
            <SearchIcon
              sx={{ fontSize: "35px" }}
              className="absolute right-3 bottom-1/2 translate-y-1/2 hover:cursor-pointer"
            />
          </div>
        </section>
        {/* grid category */}
        <section>
          <h2 className="text-center text-3xl pt-10">Categories</h2>
          <div className="flex gap-5 py-20">
            <div className="relative">
              <div className="bg-orange-600 w-52 h-96 overflow-hidden">
                <img
                  src="banner_left.webp"
                  alt=""
                  className="hover:scale-110 transition-all duration-500 h-full object-cover"
                />
              </div>
              <div className="absolute -rotate-90 text-white right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-7xl">
                ADAM
              </div>
            </div>
            <div className="flex-1 py-5">
              {/* content category */}
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="h-40 relative rounded-lg bg-fixed bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: 'url("banner.webp")' }}
                >
                  <div className="absolute bottom-2 right-4 text-4xl font-semibold text-white hover:cursor-pointer hover:underline transition-all">
                    NỘI DUNG
                  </div>
                </div>
                <div
                  className="h-40 relative rounded-lg bg-fixed bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: 'url("banner.webp")' }}
                >
                  <div className="absolute bottom-2 right-4 text-4xl font-semibold text-white hover:cursor-pointer hover:underline transition-all">
                    NỘI DUNG
                  </div>
                </div>
                <div
                  className="h-40 relative rounded-lg bg-fixed bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: 'url("banner.webp")' }}
                >
                  <div className="absolute bottom-2 right-4 text-4xl font-semibold text-white hover:cursor-pointer hover:underline transition-all">
                    NỘI DUNG
                  </div>
                </div>
                <div
                  className="h-40 relative rounded-lg bg-fixed bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: 'url("banner.webp")' }}
                >
                  <div className="absolute bottom-2 right-4 text-4xl font-semibold text-white hover:cursor-pointer hover:underline transition-all">
                    NỘI DUNG
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-orange-600 w-52 h-96 overflow-hidden">
                <img
                  src="banner_right.webp"
                  alt=""
                  className="hover:scale-125 transition-all duration-500 h-full object-cover"
                />
              </div>
              <div className="absolute rotate-90 text-white right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-7xl">
                STORE
              </div>
            </div>
          </div>
        </section>
        {/* nội dung những người nổi tiếng */}
        <UserReviews />
        {/* đặt làm */}
        <section className="flex justify-center ">
          <div className="w-1/2">
            <h2 className="text-center text-3xl py-5">CONTACT</h2>
            <div className="flex flex-col gap-5">
              <TextField
                fullWidth
                id="outlined-basic"
                label="EMAIL"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="PHONE"
                variant="outlined"
              />
            </div>
            <div className="action flex justify-center py-5">
              <Button variant="contained" sx={{ minWidth: "200px" }}>
                SEND
              </Button>
            </div>
          </div>
        </section>
        {/* những bộ suit mới */}
        <section className="px-20 mt-20">
          <h2 className="text-center text-3xl py-5">NEW SUIT</h2>
          <div className="flex gap-5 justify-between">
            <div className="overflow-hidden">
              <img
                src="https://theme.hstatic.net/1000333436/1001040510/14/hnc1_img_1_grande.jpg?v=142"
                className="hover:scale-125 hover:rotate-6 transition-all duration-500 rounded-lg"
                alt=""
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="https://theme.hstatic.net/1000333436/1001040510/14/hnc1_img_2_grande.jpg?v=142"
                className="hover:scale-125 hover:rotate-6 transition-all duration-500 rounded-lg"
                alt=""
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="https://theme.hstatic.net/1000333436/1001040510/14/hnc1_img_3_grande.jpg?v=142"
                className="hover:scale-125 hover:rotate-6 transition-all duration-500 rounded-lg"
                alt=""
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="https://theme.hstatic.net/1000333436/1001040510/14/hnc1_img_4_grande.jpg?v=142"
                className="hover:scale-125 hover:rotate-6 transition-all duration-500 rounded-lg"
                alt=""
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserHome;
