import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    userpassword: { type: String, required: true },
    username: { type: String, required: true },
    age: { type: Number, required: true },
    phnumber: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
},{
    collection: 'user_information'
  });

const User = mongoose.model('bob', userSchema);

export { User };

export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  const newUser = new User(user);
  await newUser.save();
  return newUser._id.toString();
}

export async function updateUser(id, updateData) {
  const result = await User.updateOne({ _id: id }, { $set: updateData });
  return result.modifiedCount === 1;
}

export async function findByUsernamephnumber(username, phnumber) {
  return User.findOne({ username, phnumber });
}

export async function updatePassword(userid, hashedNewPassword) {
  const result = await User.updateOne({ _id: userid }, { $set: { userpassword: hashedNewPassword } });
  return result.modifiedCount === 1;
}