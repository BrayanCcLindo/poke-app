// src/components/PokemonList.jsx
import ReactPaginate from "react-paginate";
import { PokemonType } from "../type/type";

interface PokemonListProps {
  pokemonList: PokemonType[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  onPokemonSelect: (pokemonName: string) => void;
  selectedPokemon: string | null;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonList,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onPokemonSelect,
  selectedPokemon
}: PokemonListProps) => {
  if (loading && pokemonList.length === 0) {
    return <div className="text-center p-6">Cargando pokémon...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white rounded-xl">
        {/* Pokeball con animación simple usando solo Tailwind */}
        <div className="relative mb-6">
          <div className="animate-bounce hover:animate-none duration-1000">
            <div className="animate-pulse hover:animate-none">
              <img
                src="/pokebola.png"
                alt="Pokeball"
                className="animate-[wiggle_1s_ease-in-out_infinite] hover:animate-none"
              />
            </div>
          </div>
        </div>

        {/* Mensaje de Pokémon no encontrado */}
        <div className="text-center space-y-2">
          <p className="text-xl font-bold text-red-500 animate-pulse">
            ¡Pokémon no encontrado!
          </p>
          <p className="text-sm text-gray-600">
            El Pokémon que buscas no está en la Pokédex
          </p>
        </div>

        {/* Puntos decorativos */}
        <div className="mt-4 flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-xl">
        {/* Pokeball con animación simple usando solo Tailwind */}
        <div className="relative mb-6">
          <div className="animate-bounce hover:animate-none duration-1000">
            <div className="animate-pulse hover:animate-none">
              <img
                src="/pokebola.png"
                alt="Pokeball"
                className="animate-[wiggle_1s_ease-in-out_infinite] hover:animate-none w-16 h-16"
              />
            </div>
          </div>
        </div>

        {/* Mensaje de Pokémon no encontrado */}
        <div className="text-center space-y-2">
          <p className="text-xl font-bold text-red-500 animate-pulse">
            ¡Pokémon no encontrado!
          </p>
          <p className="text-sm text-gray-600">
            El Pokémon que buscas no está en la Pokédex
          </p>
        </div>

        {/* Puntos decorativos */}
        <div className="mt-4 flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  const getIdFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };
  function speech(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en";
    speechSynthesis.speak(utterance);
  }
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).onerror = null;
    (e.target as HTMLImageElement).src = "/pokebola.png";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Listado de Pokémon
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {pokemonList.map(pokemon => {
          const id = getIdFromUrl(pokemon.url);
          const isSelected = selectedPokemon === pokemon.name;

          return (
            <div
              key={pokemon.name}
              className={`p-3 rounded-lg cursor-pointer transition-all border ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => {
                onPokemonSelect(pokemon.name);
                speech(pokemon.name);
              }}
            >
              <div className="flex items-center">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  onError={handleImageError}
                  className="w-16 h-16"
                />
                <div className="ml-3">
                  <p className="font-medium capitalize text-black">
                    {pokemon.name}
                  </p>
                  <p className="text-gray-500 text-sm">#{id}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={onPageChange}
        forcePage={currentPage}
        containerClassName={
          "text-white gap-2 mt-6 flex flex-wrap justify-center"
        }
        pageClassName={
          "px-3 py-1 rounded bg-gray-100 cursor-pointer text-gray-800 hover:bg-gray-200"
        }
        previousClassName={
          "px-3 py-1 rounded bg-gray-100 cursor-pointer text-gray-800 hover:bg-gray-200"
        }
        nextClassName={
          "px-3 py-1 cursor-pointer rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
        breakClassName={"px-3 py-1 text-black"}
        activeClassName={"text-white !bg-blue-500"}
        disabledClassName={"text-gray-400 cursor-not-allowed"}
      />
    </div>
  );
};

export default PokemonList;
