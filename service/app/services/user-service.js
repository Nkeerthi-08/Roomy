import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const res = await User.create(user);

  if (!res) {
    throw new Error("User not created");
  }

  return { message: "User created", success: true };
};

export const login = async (user) => {
  console.log(user);
  const userFromDb = await User.findOne({ email: user.email });
  if (!userFromDb) {
    throw new Error("User not found");
  }

  console.log(userFromDb);
  const isPasswordValid = await bcrypt.compare(
    user.password,
    userFromDb.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: userFromDb._id, email: userFromDb.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return { success: true, message: "User logged in", token: "Bearer " + token };
};

export const update = async (user, updatedFields) => {
  const res = await User.updateOne({ email: user.email }, updatedFields);

  if (!res) {
    throw new Error("User not updated");
  }

  return { message: "User updated", success: true };
};

export const deleteUser = async (user) => {
  const res = await User.deleteOne({ email: user.email });

  if (!res) {
    throw new Error("User not deleted");
  }

  return { message: "User deleted", success: true };
};

export const getUserById = async (id) => {
  const res = await User.findById(id);

  if (!res) {
    throw new Error("User not found");
  }

  return res;
};
