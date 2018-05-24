import mongoose from 'mongoose';

var User;

export class UserController {
  static init() {
    User = mongoose.model('User');
  }
  static create(req, res, next) {
    const user = new User(req.body);
    user.save(err => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(user);
      }
    });
  }
  static list(req, res, next) {
    User.find({}, (err, users) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(users);
      }
    });
  }
}
