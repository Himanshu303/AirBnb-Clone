import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { Navigate, useParams } from "react-router-dom";

import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../Context/UseContext";

const AccommodationPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [dateError, setDateError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [numberOfDays, setNumberOfDays] = useState(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);

  const bookPlace = async () => {
    if (!user) {
      setLoginError(true);
      return;
    }
    const { data } = await axios.post("/bookings", {
      checkIn,
      checkOut,
      place,
      guests,
      numberOfDays,
      name,
      mobile,
      price: numberOfDays * place.price,
    });

    const bookingId = data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => setPlace(res.data));
  }, [id]);

  useEffect(() => {
    let days = 0;
    if (checkIn && checkOut) {
      days = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
      setNumberOfDays(days);
    }

    if (numberOfDays < 0) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }, [checkIn, checkOut, numberOfDays]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white  min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h2 className="text-3xl mr-36 text-white">
              Photos of: {place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex right-12 top-8 gap-1 py-2 px-2 rounded-2xl bg-white border border-black fixed shadow shadow-black"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img
                  className="h-min-100 w-full"
                  src={"http://localhost:3000/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 py-8 -mx-8 px-8 ">
      <h1 className="text-3xl">{place?.title}</h1>
      <a
        target="blank"
        className=" my-2 font-semibold underline flex gap-1"
        href={"https://maps.google.com/?q=" + place?.address}
      >
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place?.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-3">
          <div className="col-span-2">
            {place?.photos?.[0] && (
              <div className="aspect-w-2 aspect-h-1">
                <img
                  className="aspect-square object-cover h-full w-full max-h-[800px] rounded-2xl"
                  src={"http://localhost:3000/uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {place?.photos?.[1] && (
              <div className="aspect-w-1 aspect-h-1">
                <img
                  className="aspect-square object-cover h-full w-full max-h-[400px] rounded-2xl"
                  src={"http://localhost:3000/uploads/" + place.photos[1]}
                  alt=""
                />
              </div>
            )}
            {place?.photos?.[2] && (
              <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                <img
                  className="aspect-square object-cover top-2 relative h-full w-full max-h-[400px] rounded-2xl"
                  src={"http://localhost:3000/uploads/" + place.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className=" flex gap-1 absolute bottom-4 right-10 rounded-2xl border border-black bg-white py-2 px-4"
        >
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          More photos
        </button>
      </div>

      <div className="grid grid-cols-1 mt-8 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="semi-bold text-2xl">Details</h2>
            {place?.description}
          </div>
          <b>Check In:</b> {place?.checkIn} <br />
          <b>Check Out:</b> {place?.checkOut} <br />
          <b>Mx Guests: </b> {place?.maxGuests}
        </div>
        <div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="text-2xl text-center">
              Price: INR {place?.price} / night.
            </div>

            <div className="border rounded-2xl mt-4">
              <div className="flex">
                <div className="py-3 px-4">
                  <label>Check In: </label>
                  <input
                    type="date"
                    name=""
                    id=""
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="py-2 px-4  border-l">
                  <label>Check Out: </label>
                  <input
                    type="date"
                    name=""
                    id=""
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className="py-3 px-4 border-t">
                <label>Number of Guests: </label>
                <input
                  type="number"
                  name=""
                  id=""
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
              {numberOfDays > 0 && (
                <>
                  <div className="py-3 px-4 border-t">
                    <label>Your Name: </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="py-3 px-4 border-t">
                    <label>Your Mobile: </label>
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            <button className="primary mt-4" onClick={bookPlace}>
              Book this place
              {numberOfDays > 0 && (
                <>
                  <span> INR: {numberOfDays * place.price}</span>
                </>
              )}
            </button>

            {dateError && (
              <span className=" text-red-700">
                Check In date cannot be before the checkout date{" "}
              </span>
            )}
            {loginError && (
              <span className=" text-red-700">
                You must login before booking.
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white -mx-5 px-8 py-6 mt-5 border-t">
        <h2 className="semi-bold text-2xl"> Extra Info</h2>
        <div className="text-sm text-gray-800 first-letter leading-4 mt-2">
          {place?.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default AccommodationPage;
