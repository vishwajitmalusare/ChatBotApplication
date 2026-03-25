import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const ThemeSwitch = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-all
        ${isDark
          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
    >
      {/* Label */}
      <div className="flex items-center gap-2">
        {isDark
          ? <BsMoonStarsFill className="text-purple-400 text-base" />
          : <BsSunFill className="text-yellow-500 text-base" />
        }
        <span className="font-medium">{isDark ? "Dark Mode" : "Light Mode"}</span>
      </div>

      {/* Switch */}
      <div className={`relative w-14 h-7 rounded-full transition-all duration-500
        ${isDark
          ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
          : "bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg shadow-yellow-500/30"}`}>

        {/* Circle */}
        <div className={`absolute top-1 w-5 h-5 rounded-full shadow-md transition-all duration-500 flex items-center justify-center
          ${isDark
            ? "left-8 bg-gray-900"
            : "left-1 bg-white"}`}>
          {isDark
            ? <BsMoonStarsFill className="text-purple-400 text-xs" />
            : <BsSunFill className="text-yellow-500 text-xs" />
          }
        </div>
      </div>
    </button>
  );
};

export default ThemeSwitch;