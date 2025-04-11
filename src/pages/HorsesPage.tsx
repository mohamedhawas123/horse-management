import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getHorses } from "../features/horses/horsesSlice";
import { HorseCard } from "../components/horseCard";
import { getAgeFromDOB } from "../utils/date";
import FullScreenLoader from "../components/loader";
import FullScreenError from "../components/error";
import BreedFilter from "../components/breedFilter";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";

const HorsesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { horses, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.horses
  );

  const [page, setPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    dispatch(getHorses(page));
  }, [dispatch, page]);

  const filteredHorses = useMemo(() => {
    return horses.filter((horse) => {
      const matchName = horse.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchBreed = selectedBreed ? horse.breed === selectedBreed : true;
      return matchName && matchBreed;
    });
  }, [horses, searchTerm, selectedBreed]);

  const uniqueBreeds = useMemo(() => {
    return [...new Set(horses.map((horse) => horse.breed).filter(Boolean))];
  }, [horses]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="mb-5">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading */}
        {loading && <FullScreenLoader loading={loading} />}
        {/* Error */}
        {error && <FullScreenError showError={error} />}

        {/* Filters */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <BreedFilter
              breeds={uniqueBreeds}
              selected={selectedBreed}
              onChange={setSelectedBreed}
            />
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredHorses.map((horse) => {
              const age = getAgeFromDOB(horse.date_of_birth);
              return (
                <HorseCard
                  key={horse.id}
                  id={horse.id.toString()}
                  name={horse.name}
                  age={age}
                  breed={horse.breed}
                  imageUrl={horse.image}
                />
              );
            })}
          </div>
        )}

        {/* pagination */}
        {!loading && !error && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => page > 1 && setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => page < totalPages && setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorsesPage;
