import { IconSearch } from "@tabler/icons-react";

export default function Input() {
  return (
    <div>
      <div className="relative flex justify-center items-center">
        <input
          className="px-4 text-sm md:text-lg w-full text-gray-700 bg-white outline-none ring-gray-200 focus:ring-1 drop-shadow-md rounded-full py-2"
          type="text"
          placeholder="Search something..."
        />
        <button className=" text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-700">
          <IconSearch
            className="absolute text-xs md:text-lg top-2 md:top-3 right-4 bg-white"
            size={20}
          />
        </button>
      </div>
    </div>
  );
}
