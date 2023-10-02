import { Link } from "react-router-dom";
import shoeImage from "../assets/Nike.png";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-full max-w-[1800px]">
        <div className="md:w-[60%] md:h-[90vh]">
          <div className="flex flex-col justify-center items-start h-full w-[80%] mx-auto md:w-auto md:ml-24 xl:ml-44">
            <p className="font-medium font-heading sm:text-xl md:text-lg lg:text-2xl">
              Elevate Your Style
            </p>
            <h2 className="text-4xl lg:text-5xl xl:text-7xl font-heading font-semibold my-3">
              Discover the latest trends in fashion
            </h2>
            <p className="font-light text-md lg:text-lg">
              Experience the difference with our carefully curated collection of{" "}
              <br /> unique and stylish pieces that showcase the latest trends{" "}
              <br /> and timeless classics
            </p>
            <Link
              to={"/shop"}
              className="p-4 lg:p-5 mt-3 bg-black text-white rounded-xl text-lg lg:text-xl"
            >
              Shop now
            </Link>
          </div>
        </div>
        <div className="md:w-[70%] md:h-[90vh] mt-10 md:mt-0 md:relative">
          <div className="flex justify-center items-center h-full md:absolute md:right-10">
            <div className="relative">
              <img
                src={shoeImage}
                alt="Image of the show"
                className="w-[80%] sm:w-[60%] mx-auto md:mx-0 md:w-[700px] h-auto relative"
              />
              {/* <span className="absolute top-0 left-40 md:left-10 text-[70px] lg:text-[100px] xl:text-[170px] font-bold tracking-widest leading-none uppercase w-full text-left text-gray-200 z-[-1]">
                nike <br />
                air
              </span> */}
            </div>
          </div>
        </div>
      </div>
     <section id="about" className="bg-slate-900 w-full">
     <div className="flex flex-col md:flex-row m-7 sm:m-10 h-full">
          <div className=" h-1/2 sm:h-[40%] md:h-auto md:w-1/2 text-white md:my-10 xl:mx-32 flex flex-col justify-center items-start">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading font-semibold my-3">About Us</h2>
            <p className="font-medium text-sm">Located in the vibrant heart of Toronto, APL has been a fashion landmark since 2015. Our brand's journey is intertwined with the city's own evolution. We've witnessed Toronto's style transformation and played a role in shaping it. Our store offers a unique blend of classic and contemporary fashion, reflecting the city's dynamic spirit. Visit us to explore the fusion of tradition and modernity in the world of fashion.</p>
          </div>
          <div className="h-1/2 sm:h-[60%] md:h-auto md:w-1/2 my-10 sm:m-10 flex justify-center items-center">
            <iframe
              className="border-none rounded-xl md:h-1/2 w-full lg:w-full h-full max-h-[600px] max-w-[600px]"
              loading="lazy"
              src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBEIp5yGJI6G3jzxNvKU8vrvBGpbFpW49I&zoom=17&center=43.6700%2C-79.3917"
            ></iframe>
            ;
          </div>
      </div>
     </section>
    </>
  );
}
