import {initializeApp} from "firebase-admin/app";
import {
  getSquareBookingUrlHttp,
  getAvailableBookingSlotsHttp,
} from "./square/booking";

initializeApp();

export {
  getSquareBookingUrlHttp,
  getAvailableBookingSlotsHttp,
};
