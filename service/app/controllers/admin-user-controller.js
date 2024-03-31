import { setResponse, setResponseWithError } from "./response-handler.js";
import * as AdminUserService from "../services/admin-user-service.js";

export const register = async (req, res) => {
  try {
    const adminUser = {};
    adminUser.name = req.body.name;
    adminUser.email = req.body.email;
    adminUser.password = req.body.password;

    const response = await AdminUserService.register(adminUser);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const adminUser = {};
    adminUser.email = req.body.email;
    adminUser.password = req.body.password;

    const response = await AdminUserService.login(adminUser);

    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    const adminUser = req.adminUser;
    const { name, email, password } = req.body;

    const response = await AdminUserService.update(adminUser, {
      name,
      email,
      password,
    });

    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const adminUser = req.adminUser;

    const response = await AdminUserService.deleteAdminUser(adminUser);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};
