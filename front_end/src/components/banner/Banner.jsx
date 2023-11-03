function Banner() {
  return (
    <div
      className="relative mt-10 banner bg-fixed bg-no-repeat bg-cover h-80 overflow-auto p-8 bg-center"
      style={{ backgroundImage: 'url("banner.webp")' }}
    >
      <img src="logo_adam.png" alt="" className="absolute right-1/2 bottom-1/2 translate-y-1/2 translate-x-1/2 w-72" />
    </div>
  );
}

export default Banner;
