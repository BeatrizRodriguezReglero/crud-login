const uploadController = {};
const path = require('path');
const { v4 } = require('uuid');
const UserModel = require('../models/users.model');

uploadController.uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ message: 'No files were uploaded.' });
  }
  const file = req.files.image;
  const id = v4();
  const extension = path.extname(file.name);
  const baseName = path.basename(file.name, extension);
  let newFileName = baseName + '-' + id + extension;
  newFileName = newFileName.replaceAll(/\s/g, '');

  const uploadPath = path.resolve(__dirname, '../uploads', newFileName);

  file.mv(uploadPath, async err => {
    if (err) return res.status(500).send(err);
    const userId = req.params.id;
    const fileUrl = `${req.protocol}://${req.get(
      'host'
    )}/uploads/${newFileName}`;
    await UserModel.updateOne({ _id: userId }, { $set: { image: fileUrl } });
    return res.status(200).send({ url: fileUrl });
  });
};
module.exports = uploadController;
