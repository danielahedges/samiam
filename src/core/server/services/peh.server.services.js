import mongoose from 'mongoose';
import { Util } from '../util/util.server';

var User;

export class PehService {
  static init() {
    User = mongoose.model('User');
  }
  static create(body, creator) {
    var peh = {
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: body.birthDate,
      code: Util.generateRandomCode(8)
    };
    var user = new User({
      username: body.username,
      password: body.password,
      provider: 'local',
      role: 'peh',
      peh: peh
    });
    if (creator) {
      user.agents = [creator._id];
    }
    return user.save().exec();
  }
}
