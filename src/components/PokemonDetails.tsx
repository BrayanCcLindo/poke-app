// src/components/PokemonDetails.jsx
type HabilityType = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type TypeType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type StatType = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};
const PokemonDetails = ({
  pokemonDetails,
  loading
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pokemonDetails: any;
  loading: boolean;
}) => {
  if (loading) {
    return <div className="text-center p-6">Cargando detalles...</div>;
  }

  if (!pokemonDetails) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold mb-4">Detalle del Pokémon</h2>
        <p className="text-gray-500">
          Selecciona un pokémon para ver sus detalles.
        </p>
      </div>
    );
  }

  return (
    <div className="text-black">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Detalle del Pokémon
      </h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={pokemonDetails.sprites.front_default || "/pokebola.png"}
          alt={pokemonDetails.name}
          className="w-40 h-40 object-contain"
        />
        <h3 className="text-lg font-medium capitalize mt-2">
          {pokemonDetails.name}
        </h3>
        <p className="text-gray-500">#{pokemonDetails.id}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-medium text-sm text-gray-600">Altura</p>
          <p>{(pokemonDetails.height / 10).toFixed(1)} m</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-medium text-sm text-gray-600">Peso</p>
          <p>{(pokemonDetails.weight / 10).toFixed(1)} kg</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Tipos</h4>
        <div className="flex flex-wrap gap-2">
          {pokemonDetails.types.map((typeInfo: TypeType) => {
            const type = typeInfo.type.name;
            return (
              <span
                key={type}
                className={`border-gray-200 border rounded-full text-black px-3 py-1  text-sm capitalize`}
              >
                {type}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Habilidades</h4>
        <ul className="list-disc list-inside">
          {pokemonDetails.abilities.map((abilityInfo: HabilityType) => (
            <li key={abilityInfo.ability.name} className="capitalize">
              {abilityInfo.ability.name.replace("-", " ")}
              {abilityInfo.is_hidden && (
                <span className="text-sm text-gray-500 ml-2">(oculta)</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-2">Estadísticas</h4>
        {pokemonDetails.stats.map((statInfo: StatType) => {
          const statName = statInfo.stat.name;
          const value = statInfo.base_stat;
          let statLabel;

          switch (statName) {
            case "hp":
              statLabel = "HP";
              break;
            case "attack":
              statLabel = "Ataque";
              break;
            case "defense":
              statLabel = "Defensa";
              break;
            case "special-attack":
              statLabel = "Atq. Esp.";
              break;
            case "special-defense":
              statLabel = "Def. Esp.";
              break;
            case "speed":
              statLabel = "Velocidad";
              break;
            default:
              statLabel = statName;
          }

          return (
            <div key={statName} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{statLabel}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 rounded bg-blue-500"
                  style={{ width: `${Math.min(value, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonDetails;
