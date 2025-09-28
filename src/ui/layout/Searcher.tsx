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
        <div className="flex gap-2 flex-col lg:flex-row shadow-2xl">
          <div className="flex flex-1">
            <input
              type="text"
              placeholder={placeholder}
              className="flex-grow px-3 h-9 rounded inset-shadow-2xs border-0 border-r-0 border-green-600 focus:outline-none focus:border-green-600 bg-white text-black"
              onChange={(e) => onChangeSearch(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
