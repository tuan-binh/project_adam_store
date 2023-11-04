function Banner({ title }) {
  return (
    <div
      className="relative mt-10 banner bg-fixed bg-no-repeat bg-cover h-80 overflow-auto p-8 bg-center"
      style={{ backgroundImage: 'url("banner.webp")' }}
    >
      <div
        style={{ background: "rgba(0,0,0,0.6)" }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <h1 className="text-white text-8xl">{title}</h1>
      </div>
    </div>
  );
}

export default Banner;
