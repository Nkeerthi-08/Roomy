import AdminUser from "../models/admin-user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (adminUser) => {
  const salt = await bcrypt.genSalt(10);
  adminUser.password = await bcrypt.hash(adminUser.password, salt);

  const res = await AdminUser.create(adminUser);

  if (!res) {
    throw new Error("Admin User not created");
  }

  return { message: "User created", success: true };
};

export const login = async (adminUser) => {
  const user = await AdminUser.findOne({ email: adminUser.email });
  if (!user) {
    throw new Error("Admin User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    adminUser.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    success: true,
    message: "Admin user logged in",
    token: "Bearer " + token,
  };
};

export const update = async (adminUser, updatedFields) => {
  const res = await AdminUser.updateOne(
    { email: adminUser.email },
    updatedFields
  );

  if (!res) {
    throw new Error("Admin User not updated");
  }

  return { message: "Admin User updated", success: true };
};

export const deleteAdminUser = async (adminUser) => {
  const res = await AdminUser.deleteOne({ email: adminUser.email });

  if (!res) {
    throw new Error("Admin User not deleted");
  }

  return { message: "Admin User deleted", success: true };
};

export const getAdminUserById = async (id) => {
  const res = await AdminUser.findById(id);

  if (!res) {
    throw new Error("Admin User not found");
  }

  return res;
};
