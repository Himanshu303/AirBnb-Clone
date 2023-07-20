import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(
          (booking) => booking._id === id
        );
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return " ";
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white  min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h2 className="text-3xl mr-36 text-white">
              Photos of: {booking.place.title}
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
          {booking.place?.photos?.length > 0 &&
            booking.place.photos.map((photo) => (
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
    <div className="mt-4 py-8 -mx-8 px-8 ">
      <h1 className="text-3xl">{booking.place?.title}</h1>
      <a
        target="blank"
        className=" my-2 font-semibold underline flex gap-1"
        href={"https://maps.google.com/?q=" + booking.place?.address}
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

        {booking.place?.address}
      </a>

      <div className="bg-gray-200 p-8 mb-4 rounded-2xl  md:flex-row md:justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl">Your Booking Information</h2>
          <div className="border-t border-gray-300 mt-2 py-2 flex gap-1 text-xl">
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            {format(new Date(booking.checkIn), "dd-MM-yyyy")}
            &rarr;
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            {format(new Date(booking.checkOut), "dd-MM-yyyy")}
          </div>
          <div className="text-xl flex gap-1 items-center">
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
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}{" "}
            nights
          </div>
        </div>
        <br />
        <span className="rounded-2xl bg-primary p-4">
          <span className="text-white text-xl">Total Price: </span>
          <span className="text-white text-xl">Rs.{booking.price}</span>
        </span>
      </div>
      <div>
        <div className="relative">
          <div className="grid gap-2 grid-cols-3">
            <div className="col-span-2">
              {booking.place?.photos?.[0] && (
                <div className="aspect-w-2 aspect-h-1">
                  <img
                    className="aspect-square object-cover h-full w-full max-h-[800px] rounded-2xl"
                    src={
                      "http://localhost:3000/uploads/" + booking.place.photos[0]
                    }
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="grid ">
              {booking.place?.photos?.[1] && (
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    className="aspect-square object-cover h-full w-full max-h-[400px] rounded-2xl"
                    src={
                      "http://localhost:3000/uploads/" + booking.place.photos[1]
                    }
                    alt=""
                  />
                </div>
              )}
              {booking.place?.photos?.[2] && (
                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                  <img
                    className="aspect-square object-cover top-2 relative h-full w-full max-h-[400px] rounded-2xl"
                    src={
                      "http://localhost:3000/uploads/" + booking.place.photos[2]
                    }
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
      </div>
    </div>
  );
};

export default BookingPage;
