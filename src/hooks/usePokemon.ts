// src/hooks/usePokemonData.js
import { useState, useEffect, useCallback } from "react";
import { AlphabetCount, PokemonType } from "../type/type";

const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonType[]>([]);
  const [alphabetCount, setAlphabetCount] = useState({});
  const itemsPerPage = 20;
  console.log(pokemonList, "pokemonList", filteredPokemon, "filteredPokemon");

  // Obtener la lista completa de Pokémon
  const fetchPokemonList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=2000"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results;

      setPokemonList(results);
      setFilteredPokemon(results);

      // Calcular cuántos Pokémon comienzan con cada letra
      const countByLetter: AlphabetCount = {};
      results.forEach((pokemon: PokemonType) => {
        const firstLetter = pokemon.name.charAt(0).toUpperCase();
        countByLetter[firstLetter] = (countByLetter[firstLetter] || 0) + 1;
      });
      setAlphabetCount(countByLetter);
      setTotalPages(Math.ceil(results.length / itemsPerPage));
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);

      setLoading(false);
    }
  }, []);
  // Cargar lista inicial de Pokémon
  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  // Obtener detalles de un Pokémon específico
  const fetchPokemonDetails = useCallback(async (pokemonName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPokemonDetails(data);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);

      setLoading(false);
    }
  }, []);

  // Filtrar Pokémon por término de búsqueda
  const filterPokemon = useCallback(() => {
    if (!searchTerm.trim()) {
      // setFilteredPokemon(pokemonList);
      setTotalPages(Math.ceil(pokemonList.length / itemsPerPage));
    } else {
      const filtered = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // setFilteredPokemon(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setCurrentPage(0);
    }
  }, [searchTerm, pokemonList]);

  // Actualizar filtros cuando cambia el término de búsqueda
  useEffect(() => {
    filterPokemon();
  }, [filterPokemon]);

  // Obtener pokémon para la página actual
  const getCurrentPagePokemon = (): PokemonType[] => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPokemon.slice(startIndex, endIndex);
  };

  return {
    pokemonList,
    pokemonDetails,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    filteredPokemon,
    setCurrentPage,
    getCurrentPagePokemon,
    fetchPokemonDetails,
    alphabetCount,
    itemsPerPage,
    setFilteredPokemon
  };
};

export default usePokemonData;
