import SearchBar from "./layout/SearchBar";

export default function NavBar({ title }) {
  return (
    <nav className="w-full p-3 bg-white border-b border-gray-200 flex justify-between h-[65px]">
      <div className="w-px flex items-center">
        <h1 className="text-2xl font-header font-medium whitespace-nowrap">
          {title}&nbsp;
        </h1>
      </div>

      <SearchBar />
    </nav>
  );
}
