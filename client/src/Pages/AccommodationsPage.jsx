import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

const AccommodationsPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getAccommodations = async () => {
      const { data } = await axios.get("/places/user-places");
      console.log(data);
      setPlaces(data);
    };
    getAccommodations();
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <br />
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/accommodations/new"}
        >
          Add new accommodation
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>
      <div>
        <div className="mt-4">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/accommodations/" + place._id}
                className="bg-gray-200 gap-4 p-4 rounded-2xl flex cursor-pointer"
                key={place._id}
              >
                <div className="w-32 h-32 bg-gray-100 shrink-0">
                  {place.photos.length > 0 && (
                    <img
                      className="object-cover"
                      src={
                        "http://localhost:3000/uploads/" + place?.photos?.[0]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl "> {place.title}</h2>
                  <p className="text-sm mt-2 ">{place?.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AccommodationsPage;
