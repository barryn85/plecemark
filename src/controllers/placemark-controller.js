import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const placemarkController = {

  index: {
    handler: async function (request, h) {

      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);

      const viewData = {
        title: "Placemark Details",
        placemark: placemark,
      };

      return h.view("placemark-view", viewData);
    },
  },


  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
    },

    handler: async function (request, h) {

      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);

      const newPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        category: request.payload.category,
        lat: Number(request.payload.lat),
        lng: Number(request.payload.lng),
        attendance: Number(request.payload.attendance),
      };

      await db.placemarkStore.addPlacemark(placemark._id, newPlacemark);

      return h.redirect(`/placemark/${placemark._id}`);
    },
  },


  deletePlacemark: {
    handler: async function (request, h) {

      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);

      await db.placemarkStore.deletePlacemark(request.params.placemarkid);

      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

};