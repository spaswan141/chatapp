// mongodb/connection.js
const mongoose = require('mongoose');

class Database {
  constructor(uri) {
    this.uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, {
        useNewUrlParser: true, // This option is no longer necessary but harmless for now
        useUnifiedTopology: true, // This option is no longer necessary but harmless for now
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      throw error;
    }
  }
}

module.exports = Database;
