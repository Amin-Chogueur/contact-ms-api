import mongoose from "mongoose";

const PersonModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model("Person", PersonModel);

export default Person;
