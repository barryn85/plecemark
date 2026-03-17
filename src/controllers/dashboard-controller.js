import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const dashboardController = {

  index: {
    handler: async function (request, h) {

      const loggedInUser = request.auth.credentials;

      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);

      const totalAttendance = placemarks.reduce(
        (sum, placemark) => sum + Number(placemark.attendance || 0),
        0
      );

      const viewData = {
        title: "Metallica Stadium Tracker",
        user: loggedInUser,
        placemarks: placemarks,
        totalAttendance: totalAttendance
      };

      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false }
    },

    handler: async function (request, h) {

      const loggedInUser = request.auth.credentials;

      const newPlacemark = {
        userid: loggedInUser._id,
        name: request.payload.name,
        description: request.payload.description,
        category: request.payload.category,
        lat: Number(request.payload.lat),
        lng: Number(request.payload.lng),
        attendance: Number(request.payload.attendance),
      };

      await db.placemarkStore.addPlacemark(newPlacemark);

      return h.redirect("/dashboard");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {

      await db.placemarkStore.deletePlacemark(request.params.placemarkid);

      return h.redirect("/dashboard");
    },
  },

};