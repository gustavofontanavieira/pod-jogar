import axios from "axios";
import Config from "../util/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UserService {
  async getAllUsers() {
    return await axios({
      url: `${Config.API_URL}/user/getAllUsers`,
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }

  async create(data) {
    return await axios({
      url: `${Config.API_URL}/user/create`,
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
      data: data,
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }

  async login(data) {
    return await axios({
      url: `${Config.API_URL}/user/login`,
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
      data: data,
    })
      .then(async (response) => {
        if (response === false) {
          return Promise.resolve(response.data);
        } else if (response !== Boolean) {
          AsyncStorage.setItem("userId", JSON.stringify(response.data));
          return Promise.resolve(response.data);
        }
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }

  async getUserById(userId) {
    return await axios({
      url: `${Config.API_URL}/user/getUserById/${userId}`,
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
    })
      .then(async (response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }

  async updateUserById(userId, data) {
    return await axios({
      url: `${Config.API_URL}/user/updateById/${userId}`,
      method: "PUT",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
      data: data,
    })
      .then(async (response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }
}

const userService = new UserService();
export default userService;
