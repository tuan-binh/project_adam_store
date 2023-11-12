import "./style.css";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { POST_ADD_RATING_ORDER } from "../../../redux/api/service/ratingService";
import { validateBlank } from "../../../utils/ValidateForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -70%)",
  // boxShadow: 24,
};

function FormAddRating({
  openAddRating,
  handleCloseAddRating,
  orderId,
  handleLoadOrder,
}) {
  // handle change rate
  const [rate, setRate] = useState(null);
  const handleChangeRate = (e) => setRate(Number.parseInt(e.target.value));

  // handle change content
  const [content, setContent] = useState("");
  const handleChangeContent = (e) => setContent(e.target.value);

  const [error, setError] = useState("");

  // handle add rating
  const handleRatingOrder = async (e) => {
    e.preventDefault();
    // validate
    if (rate === null || validateBlank(content)) {
      setError("Vui lòng điên đầy đủ thông tin");
      return;
    }
    await POST_ADD_RATING_ORDER({
      formRating: {
        rate,
        content,
      },
      idOrder: orderId,
    })
      .then(() => {
        handleLoadOrder();
        handleCloseAddRating();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setError("");
    setRate(null);
    setContent("");
  }, []);

  return (
    <Modal
      open={openAddRating}
      onClose={handleCloseAddRating}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form action="" onSubmit={handleRatingOrder}>
          <div className="form-container">
            <h2 className="text-red-500 text-center">{error && error}</h2>
            <div className="form">
              <div className="flex justify-between items-center py-5">
                <span className="heading">Rating for order</span>
              </div>
              <div className="rating pb-5">
                <input
                  type="radio"
                  id="star-1"
                  name="rate"
                  value="5"
                  onClick={handleChangeRate}
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
                  onClick={handleChangeRate}
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
                  onClick={handleChangeRate}
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
                  onClick={handleChangeRate}
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
                  onClick={handleChangeRate}
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
                value={content}
                onChange={handleChangeContent}
              ></textarea>
              <div className="button-container">
                <div className="reset-button-container">
                  <button type="submit" id="reset-btn" className="reset-button">
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default FormAddRating;
