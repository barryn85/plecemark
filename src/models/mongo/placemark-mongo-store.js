import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {

  async getUserPlacemarks(userid) {
    return await Placemark.find({ userid: userid }).lean();
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    return await newPlacemark.save();
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

};