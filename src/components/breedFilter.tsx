interface BreedFilterProps {
  breeds: string[];
  selected: string;
  onChange: (value: string) => void;
}

const BreedFilter = ({ breeds, selected, onChange }: BreedFilterProps) => {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded transition-colors duration-300"
    >
      <option value="">All Breeds</option>
      {breeds.map((breed, idx) => (
        <option key={idx} value={breed}>
          {breed}
        </option>
      ))}
    </select>
  );
};

export default BreedFilter;
