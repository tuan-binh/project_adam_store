import Banner from "../../../components/banner/Banner";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TextField from "@mui/material/TextField";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Contact() {
  return (
    <div>
      <Banner title={"CONTACT"} />
      <div className="body_contact mx-60 py-20">
        <div className="flex gap-10">
          <div className="flex-1 bg-white shadow-2xl p-10">
            <h2 className="uppercase text-2xl border-b-2 border-black border-dashed pb-2">
              Contact Us
            </h2>
            <div className="form py-5 flex flex-col gap-5">
              <TextField
                id="filled-basic"
                fullWidth
                label="Your Name"
                variant="filled"
              />
              <TextField
                id="filled-basic"
                fullWidth
                label="Email"
                variant="filled"
              />
              <TextField
                id="filled-basic"
                fullWidth
                label="Subject"
                variant="filled"
              />
              <TextField
                id="filled-multiline-static"
                label="Message"
                multiline
                rows={4}
                variant="filled"
              />
              <div className="action">
                <Button variant="contained" className="flex items-center">
                  <span className="pr-2">SEND</span> <TrendingUpIcon />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10" style={{ width: "648px" }}>
            <div className="bg-white p-6 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251637.4997506123!2d105.61821718085284!3d9.779946367607167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0881fa67d2fb1%3A0xe3497cf03b988391!2sAdam%20Store!5e0!3m2!1svi!2s!4v1699188752858!5m2!1svi!2s"
                width="600"
                height="350"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="bg-white p-6 shadow-2xl flex flex-col gap-2">
              <p>
                <LocationOnIcon />
                <span>
                  187 Đ. Nguyễn Văn Cừ, An Bình, Ninh Kiều, Cần Thơ, Việt Nam{" "}
                </span>
              </p>
              <p>
                <EmailIcon /> <span>example@gmail.com</span>
              </p>
              <p>
                <LocalPhoneIcon /> <span>+84 688.321.333</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
