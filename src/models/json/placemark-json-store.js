import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkJsonStore = {

  async getAllPlacemarks() {
    await db.read();
    db.data.placemarks = db.data.placemarks || [];
    return db.data.placemarks;
  },

  async addPlacemark(placemark) {
    await db.read();
    db.data.placemarks = db.data.placemarks || [];
    placemark._id = v4();
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarkById(id) {
    await db.read();
    db.data.placemarks = db.data.placemarks || [];
    return db.data.placemarks.find((placemark) => placemark._id === id);
  },

  async getUserPlacemarks(userid) {
    await db.read();
    db.data.placemarks = db.data.placemarks || [];
    return db.data.placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deletePlacemark(id) {
    await db.read();
    db.data.placemarks = db.data.placemarks || [];
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);

    if (index !== -1) {
      db.data.placemarks.splice(index, 1);
      await db.write();
    }
  },

  async deleteAllPlacemarks() {
    await db.read();
    db.data.placemarks = [];
    await db.write();
  },

};