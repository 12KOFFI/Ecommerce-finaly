import { Link } from "react-router-dom";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex justify-between items-center py-2 px-[4%] ">
     <Link to="/">
          <span className="text-2xl font-bold text-orange-600">TechMarket</span>
          <hr className="w-full h-1 bg-orange-600" />
        </Link>
      <button
        onClick={() => setToken("")}
        className="px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm bg-red-700 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
