const UserModel = require('../models/users.model.js');

const userController = {};

userController.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

userController.patchUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);

    if (!user) return res.status(409).json({ error: 'User not found' });

    await UserModel.updateOne({ _id: id }, { $set: req.body });

    const users = await UserModel.find();
    res.status(202).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error updating the user' });
  }
};

userController.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);

    if (!user) return res.status(404).send({ error: 'User not found' });

    await UserModel.deleteOne({ _id: id });

    const allUsers = await UserModel.find();
    res.status(202).send(allUsers);
  } catch (err) {}
};

module.exports = userController;
