import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getHorseById,
  clearSelectedHorse,
} from "../features/horses/horsesSlice";
import { AppDispatch, RootState } from "../store";
import placeHolder from "../assets/holderplace.jpeg";
import { getAgeFromDOB } from "../utils/date";
import FullScreenLoader from "../components/loader";
import FullScreenError from "../components/error";
import Navbar from "../components/navbar";

const HorseDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { selectedHorse, loading, error } = useSelector(
    (state: RootState) => state.horses
  );

  useEffect(() => {
    if (id) dispatch(getHorseById(Number(id)));
    return () => {
      dispatch(clearSelectedHorse());
    };
  }, [dispatch, id]);

  if (loading) return <FullScreenLoader loading={loading} />;
  if (error) return <FullScreenError showError={error} />;
  if (!selectedHorse) return null;

  const age = getAgeFromDOB(selectedHorse.date_of_birth);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 py-6">
      <div className="mb-5">
        <Navbar />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-8 md:justify-between items-start">
          <div className="md:w-1/2">
            <img
              src={selectedHorse.image}
              onError={(e) =>
                ((e.target as HTMLImageElement).src = placeHolder)
              }
              alt={selectedHorse.name}
              className="w-full h-auto object-cover rounded shadow"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 dark:text-white">
              {selectedHorse.name}
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold">Breed: </span>
                {selectedHorse.breed}
              </p>
              <p>
                <span className="font-semibold">Gender: </span>
                {selectedHorse.gender.name_en}
              </p>
              <p>
                <span className="font-semibold">Age: </span>
                {age.years} {age.years === 1 ? "year" : "years"}
                {age.months > 0 &&
                  ` & ${age.months} ${age.months === 1 ? "month" : "months"}`}
              </p>
              <p>
                <span className="font-semibold">Horse Number: </span>
                {selectedHorse.horse_number}
              </p>
              <p>
                <span className="font-semibold">Father: </span>
                {selectedHorse.father_name}
              </p>
              <p>
                <span className="font-semibold">Mother: </span>
                {selectedHorse.mother_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorseDetailsPage;
