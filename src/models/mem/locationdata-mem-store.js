import { v4 } from "uuid";

let locationdata = [];

export const locationdataMemStore = {

  async getAllLocationData() {
    return locationdata;
  },


  async addLocationData(placemarkId, locationData) {
    locationData._id = v4();
    locationData.placemarkid = placemarkId;
    locationdata.push(locationData);
    return locationData;
  },


  async getLocationDataByPlacemarkId(id) {
    return locationdata.filter(
      (locationData) => locationData.placemarkid === id
    );
  },


  async getLocationDataById(id) {
    return locationdata.find(
      (locationData) => locationData._id === id
    );
  },


  async deleteLocationData(id) {
    const index = locationdata.findIndex(
      (locationData) => locationData._id === id
    );

    if (index !== -1) {
      locationdata.splice(index, 1);
    }
  },


  async deleteAllLocationData() {
    locationdata = [];
  },


  async updateLocationData(locationData, updatedLocationData) {
    locationData.year = updatedLocationData.year;
    locationData.venue = updatedLocationData.venue;
    locationData.attendance = updatedLocationData.attendance;
  },

};
