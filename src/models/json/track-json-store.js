import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const locationdataJsonStore = {
  async getAllLocationData() {
    await db.read();
    return db.data.locationdata;
  },

  async addLocationData(locationData) {
    await db.read();
    locationData._id = v4();
    db.data.locationdata.push(locationData);
    await db.write();
    return locationData;
  },

  async getLocationDataByPlaylistId(id) {
    await db.read();
    return db.data.locationdata.filter((locationData) => locationData.playlistid === id);
  },

  async getLocationDataById(id) {
    await db.read();
    return db.data.locationdata.find((locationData) => locationData._id === id);
  },

  async deleteLocationData(id) {
    await db.read();
    const index = db.data.locationdata.findIndex((locationData) => locationData._id === id);
    db.data.locationdata.splice(index, 1);
    await db.write();
  },

  async deleteAllLocationData() {
    db.data.locationdata = [];
    await db.write();
  },

  async updateLocationData(locationData, updatedLocationData) {
    locationData.title = updatedLocationData.title;
    locationData.artist = updatedLocationData.artist;
    locationData.duration = updatedLocationData.duration;
    await db.write();
  },
};
