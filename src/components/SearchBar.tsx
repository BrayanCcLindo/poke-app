// src/components/SearchBar.jsx
import { useState, useEffect, useRef } from "react";
import { PokemonType } from "../type/type";

type searchType = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  pokemonList: PokemonType[];
  setFilteredPokemon: (filteredPokemon: PokemonType[]) => void;
};

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  pokemonList,
  setFilteredPokemon
}: searchType) => {
  console.log(searchTerm, "searchTerm");

  const [suggestions, setSuggestions] = useState<PokemonType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Manejador para cerrar sugerencias al hacer clic fuera
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const allPokemon = data.results;

        const matches = allPokemon
          .filter((pokemon: PokemonType) =>
            pokemon.name.includes(searchTerm.toLowerCase())
          )
          .slice(0, 7);

        setSuggestions(matches);
        setShowSuggestions(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPokemon(filtered);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={suggestionRef}>
      <div className="relative">
        <form action="" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar pokémon..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onFocus={() =>
              searchTerm.trim().length >= 2 && setShowSuggestions(true)
            }
          />
        </form>
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        {!loading && searchTerm && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setSearchTerm("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {searchTerm && showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-200 mt-1 border border-gray-200 rounded-md shadow-lg max-h-60 text-black overflow-auto">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.name}
              onClick={() => handleSuggestionClick(suggestion.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}

      {showSuggestions &&
        searchTerm.trim().length >= 2 &&
        suggestions.length === 0 && (
          <div className="absolute z-10 w-full bg-white mt-1 border border-gray-200 rounded-md shadow-lg p-4 text-center text-gray-500">
            No se encontraron coincidencias
          </div>
        )}
    </div>
  );
};

export default SearchBar;
