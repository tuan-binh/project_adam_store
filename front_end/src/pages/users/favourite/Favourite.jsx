import ItemProduct from "../products/item/ItemProduct";

function Favourite() {
  return (
    <div className="mx-60 py-10">
      <h2 className="py-20 text-center text-5xl">Your Favourites</h2>
      <div className="favourite_products flex justify-center flex-wrap gap-x-5 gap-y-20">
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
      </div>
    </div>
  );
}

export default Favourite;
