import mongoose from 'mongoose';
import crypto from 'crypto';
import { PehSchema } from './peh.server.core.model';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  role: {
    // valid values: ['admin', 'case', 'service', 'audit', 'peh']
    type: String,
    required: true
  },
  peh: PehSchema,
  agents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = Buffer.from(
      crypto.randomBytes(16).toString('base64'),
      'base64'
    );
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, 'SHA1')
    .toString('base64');
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var possibleUsername = username + (suffix || '');
  this.findOne(
    {
      username: possibleUsername
    },
    (err, user) => {
      if (!err) {
        if (!user) {
          callback(possibleUsername);
        } else {
          return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
        }
      } else {
        callback(null);
      }
    }
  );
};
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', UserSchema);
