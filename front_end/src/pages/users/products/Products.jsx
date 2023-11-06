import Banner from "../../../components/banner/Banner";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import ItemProduct from "./item/ItemProduct";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function Products() {
  // handle filter by price
  const [priceValue, setPriceValue] = useState("ALL");
  const handleChangePriceValue = (event) => {
    setPriceValue(event.target.value);
  };
  // handle filter by category
  const [categoryValue, setCategoryValue] = useState("ALL");

  const handleChangeCategoryValue = (event) => {
    setCategoryValue(event.target.value);
  };

  return (
    <div>
      <Banner title={"PRODUCTS"} />
      <main className="mx-60 flex gap-10 py-10">
        {/* handle filter */}
        <div className="w-1/4 relative">
          <div className="px-5 py-3 flex flex-col gap-5 sticky top-10">
            <div
              className="p-5 rounded-md shadow-md"
              style={{ background: "#f1f2f6" }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                size="small"
              />
            </div>
            <div
              className="p-5 rounded-md shadow-md"
              style={{ background: "#f1f2f6" }}
            >
              <h2 className="uppercase font-semibold text-xl">
                Filter by category
              </h2>
              <div className="filter py-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryValue}
                    label="Age"
                    onChange={handleChangeCategoryValue}
                  >
                    <MenuItem value={"ALL"}>ALL</MenuItem>
                    <MenuItem value={"QUẦN"}>PANTS</MenuItem>
                    <MenuItem value={"SUIT"}>SUIT</MenuItem>
                    <MenuItem value={"SHOE"}>SHOE</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div
              className="p-5 rounded-md shadow-md"
              style={{ background: "#f1f2f6" }}
            >
              <h2 className="uppercase font-semibold text-xl">
                Filter by price
              </h2>
              <div className="filter">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={priceValue}
                    onChange={handleChangePriceValue}
                  >
                    <FormControlLabel
                      value="ALL"
                      control={<Radio />}
                      label="ALL"
                    />
                    <FormControlLabel
                      value="100-200"
                      control={<Radio />}
                      label="100$ - 200$"
                    />
                    <FormControlLabel
                      value="200-300"
                      control={<Radio />}
                      label="200$ - 300$"
                    />
                    <FormControlLabel
                      value="300-400"
                      control={<Radio />}
                      label="300$ - 400$"
                    />
                    <FormControlLabel
                      value="400-500"
                      control={<Radio />}
                      label="400$ - 500$"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        {/* handle show products */}
        <div className="flex-1 pt-20 px-3">
          <div className=" flex gap-x-5 gap-y-20 flex-wrap">
            <ItemProduct />
            <ItemProduct />
            <ItemProduct />
            <ItemProduct />
            <ItemProduct />
            <ItemProduct />
          </div>
          <div className="pagination py-10 flex justify-end">
            <Pagination count={10} color="primary" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;
