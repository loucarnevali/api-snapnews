import User from '../models/User.js';

const createService = (body) => User.create(body);

//Function to find all users on the mongoose
const findAllService = () => User.find();

//Function to find users by id on the mongoose
const findByIdService = (id) => User.findById(id);

//Function to update the data by id
const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background,
) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background },
  );

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
};
