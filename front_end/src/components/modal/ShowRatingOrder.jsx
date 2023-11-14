import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -70%)",
};

function ShowRatingOrder({ openShowRating, handleCloseShowRating, rating }) {
  if (rating && openShowRating) {
    return (
      <Modal
        open={openShowRating}
        onClose={handleCloseShowRating}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action="">
            <div className="form-container">
              <div className="form">
                <div className="flex justify-between items-center py-5">
                  <span className="heading">Rating Order</span>
                </div>
                <div className="rating pb-5">
                  <input
                    type="radio"
                    id="star-1"
                    name="rate"
                    value="5"
                    checked={rating.rate === 5}
                  />
                  <label htmlFor="star-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        pathLength="360"
                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      ></path>
                    </svg>
                  </label>
                  <input
                    type="radio"
                    id="star-2"
                    name="rate"
                    value="4"
                    checked={rating.rate === 4}
                  />
                  <label htmlFor="star-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        pathLength="360"
                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      ></path>
                    </svg>
                  </label>
                  <input
                    type="radio"
                    id="star-3"
                    name="rate"
                    value="3"
                    checked={rating.rate === 3}
                  />
                  <label htmlFor="star-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        pathLength="360"
                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      ></path>
                    </svg>
                  </label>
                  <input
                    type="radio"
                    id="star-4"
                    name="rate"
                    value="2"
                    checked={rating.rate === 2}
                  />
                  <label htmlFor="star-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        pathLength="360"
                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      ></path>
                    </svg>
                  </label>
                  <input
                    type="radio"
                    id="star-5"
                    name="rate"
                    value="1"
                    checked={rating.rate === 1}
                  />
                  <label htmlFor="star-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        pathLength="360"
                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                      ></path>
                    </svg>
                  </label>
                </div>
                <textarea
                  placeholder="Comments"
                  rows="10"
                  cols="30"
                  id="message"
                  name="message"
                  className="textarea"
                  readOnly
                >
                  {rating.content}
                </textarea>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    );
  }
  if (openShowRating && !rating) {
    Swal.fire({
      title: "Good job!",
      text: "Order chưa được đánh giá!",
      icon: "error",
      showCloseButton: true,
      cancelButtonColor: "#27ae60",
      cancelButtonText: "OK",
    }).then(() => {
      handleCloseShowRating();
    });
  }
}

export default ShowRatingOrder;
