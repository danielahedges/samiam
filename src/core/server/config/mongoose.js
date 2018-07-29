import { CONFIG } from './config';
import mongoose from 'mongoose';
import '../models/user.server.core.model';
import '../models/peh.server.core.model';
import '../models/document.server.model';

export class MongooseConfig {
  static init() {
    const db = mongoose.connect(CONFIG.db);
    return db;
  }
}
