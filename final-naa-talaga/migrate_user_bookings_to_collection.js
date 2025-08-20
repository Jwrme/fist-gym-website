require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/Senjitsu_Users';

const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  bookings: Array
});
const bookingSchema = new mongoose.Schema({
  coachId: mongoose.Schema.Types.ObjectId,
  coachName: String,
  classId: mongoose.Schema.Types.ObjectId,
  className: String,
  clientId: mongoose.Schema.Types.ObjectId,
  clientName: String,
  date: Date,
  amount: Number
});
const User = mongoose.model('User', userSchema, 'users');
const Booking = mongoose.model('Booking', bookingSchema, 'bookings');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  const users = await User.find({});
  let migrated = 0;
  for (const user of users) {
    if (!user.bookings || !Array.isArray(user.bookings)) continue;
    for (const b of user.bookings) {
      // Check if booking already exists in bookings collection
      const exists = await Booking.findOne({
        coachId: b.coachId,
        clientId: user._id,
        date: b.date
      });
      if (!exists) {
        await Booking.create({
          coachId: b.coachId,
          coachName: b.coachName || '',
          classId: b.classId || null,
          className: b.className || '',
          clientId: user._id,
          clientName: user.firstname + ' ' + user.lastname,
          date: b.date,
          amount: b.amount || 0
        });
        migrated++;
      }
    }
  }
  console.log(`Migration complete. Migrated ${migrated} bookings.`);
  await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); }); 