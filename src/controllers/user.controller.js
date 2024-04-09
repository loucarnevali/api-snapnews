import userService from '../services/user.service.js';

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    //Check if all required fields are provided
    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send({ message: 'Submit all fields for registration' });
    }

    //Create User
    const user = await userService.createService(req.body);

    //User Verification
    if (!user) {
      return res.status(400).send({ message: 'Error Creating User' });
    }

    res.status(201).send({
      message: 'User Created Successfully',
      user: { id: user._id, name, username, email, avatar, background },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllService();

    //Verification - if there are users
    if (users.length === 0) {
      return res.status(400).send({ message: 'No Registered Users' });
    }

    // Send response with found users
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    // The user comes from the middleware
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    //Check if at least one field is provided for update
    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({ message: 'Submit at least one field for update' });
    }

    // The user and id come from the middleware
    const { id, user } = req;

    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background,
    );

    res.send({ message: 'User Successfully Updated!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAllUsers, findById, update };
