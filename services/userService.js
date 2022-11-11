import axios from "axios";
import Config from "../util/Config";

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
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }
}

const userService = new UserService();
export default userService;
