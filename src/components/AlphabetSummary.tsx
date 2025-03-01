import { AlphabetCount } from "../type/type";

const AlphabetSummary = ({
  alphabetCount
}: {
  alphabetCount: AlphabetCount;
}) => {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-black">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Resumen Alfabético de Pokémon
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {alphabet.map(letter => (
                <th
                  key={letter}
                  scope="col"
                  className="px-2 py-3 text-center text-xs font-medium  uppercase tracking-wider"
                >
                  {letter}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              {alphabet.map((letter, index) => {
                const count = alphabetCount[letter] || 0;
                return (
                  <td
                    key={letter}
                    className={`px-2 py-4 whitespace-nowrap text-center text-sm text-black ${
                      index % 2 === 1 ? "bg-green-200" : "bg-green-100"
                    }`}
                  >
                    {count}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlphabetSummary;
