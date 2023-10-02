import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 w-full h-[200px] sm:h-[170px] flex justify-center items-center text-white">
      <div className="w-[90%] sm:w-[80%] mx-auto flex-col">
        <div className="flex flex-row items-center w-[150px] sm:w-[190px] justify-between mb-[20px]">
          <Link to="/" className="font-logo text-4xl">
            APL <span className="text-[#C8815F]">.</span>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center border-t-[3px] border-gray-200">
          <p className="mt-[20px] sm:mt-[10px] text-sm sm:text-lg">
            Copyright 2023 | All right reserved
          </p>
            <Link to={"/privacy-policy"} className="my-2 sm:my-0 text-sm sm:text-lg">
              Privacy Policy
            </Link>
        </div>
      </div>
    </footer>
  );
}
