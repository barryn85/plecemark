import Mongoose from "mongoose";

const placemarkSchema = new Mongoose.Schema({
  userid: String,
  name: String,
  description: String,
  category: String,
  lat: Number,
  lng: Number,
  attendance: Number,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);