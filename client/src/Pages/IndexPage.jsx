import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const getPlaces = async () => {
      const { data } = await axios.get("/places");
      setPlaces(data);
    };
    getPlaces();
  }, []);

  return (
    <div className="mt-4 grid gap-y-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {places.map((place) => {
        return (
          <Link to={"/place/" + place._id} key={place._id} className="">
            <div className="bg-gray-500 rounded-2xl flex">
              <img
                className="rounded-2xl object-cover aspect-square"
                src={"http://localhost:3000/uploads/" + place?.photos?.[0]}
                alt=""
              />
            </div>
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm truncate ">{place.title}</h2>

            <div className="mt-1">
              <span className="font-bold">₹. {place.price}</span> per night.
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Index;
