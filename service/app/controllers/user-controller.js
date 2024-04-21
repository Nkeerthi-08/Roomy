import { setResponse, setResponseWithError } from './response-handler.js';
import * as UserService from '../services/user-service.js';

export const register = async (req, res) => {
  try {
    const user = {};
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    const response = await UserService.register(user);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const user = {};
    user.email = req.body.email;
    user.password = req.body.password;

    const response = await UserService.login(user);

    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, password } = req.body;

    const response = await UserService.update(user, {
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
    const user = req.user;

    const response = await UserService.deleteUser(user);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getUserContext = async (req, res) => {
  try {
    const user = req.user;
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setResponse(res, user);
  } catch (error) {
    setResponseWithError(res, error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const queryParams = req.query;
    const response = await UserService.getAllUsers(queryParams);
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};
