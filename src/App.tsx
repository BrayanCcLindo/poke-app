// src/App.jsx
import { useState } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import AlphabetSummary from "./components/AlphabetSummary";
import SearchBar from "./components/SearchBar";
import usePokemonData from "./hooks/usePokemon";

function App() {
  const {
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    getCurrentPagePokemon,
    fetchPokemonDetails,
    pokemonDetails,
    pokemonList,
    alphabetCount,
    setFilteredPokemon
  } = usePokemonData();
  // console.log(getCurrentPagePokemon(), fetchPokemonDetails, "acacaca");

  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  const handlePokemonSelect = async (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    await fetchPokemonDetails(pokemonName);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">Pokédex</h1>

      <div className="mb-6">
        <SearchBar
          pokemonList={pokemonList}
          setFilteredPokemon={setFilteredPokemon}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PokemonList
            pokemonList={getCurrentPagePokemon()}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPokemonSelect={handlePokemonSelect}
            selectedPokemon={selectedPokemon}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 h-fit">
          <PokemonDetails pokemonDetails={pokemonDetails} loading={loading} />
        </div>
      </div>

      <div className="mt-8">
        <AlphabetSummary alphabetCount={alphabetCount} />
      </div>
    </div>
  );
}

export default App;
