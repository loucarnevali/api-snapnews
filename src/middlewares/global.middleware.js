import mongoose from 'mongoose';

//To validate MongoDB ObjectId
export function validId(req, res, next) {
  let idParam;

  if (!req.params.id) {
    req.params.id = req.userId;
    idParam = req.params.id;
  } else {
    idParam = req.params.id;
  }

  // Check if the ID parameter is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    return res.status(400).send({ message: 'Invalid id!' });
  }
  next();
}
