interface MySearcherProps {
  date?: boolean; // opcional si das valor por defecto
  onChangeSearch: any;
  placeholder?: string;
}

export function Searcher({
  placeholder = "Buscar ...",
  date = true,
  onChangeSearch,
}: MySearcherProps) {
  return (
    <div>
      {date && (
        <div className="flex gap-2 flex-col lg:flex-row rounded-full">
          <div className="flex flex-1">
            <input
              type="text"
              placeholder={placeholder}
              className="flex-grow px-5 h-12 rounded-2xl border-0 border-r-0 focus:outline-none text-lg bg-gray-100 text-black"
              onChange={(e) => onChangeSearch(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
