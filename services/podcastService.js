import axios from "axios";
import Config from "../util/Config";

class PodcastService {
  async getAll(userId) {
    return await axios({
      url: `${Config.API_URL}/podcast/getAll/${userId}`,
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
    })
      .then(async (response) => {
        return await Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async create(userId, data) {
    return await axios({
      url: `${Config.API_URL}/podcast/create/${userId}`,
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
      data: data,
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async delete(podcastId) {
    return await axios({
      url: `${Config.API_URL}/podcast/delete/${podcastId}`,
      method: "DELETE",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async userPodcasts(userId) {
    return await axios({
      url: `${Config.API_URL}/podcast/userPodcasts/${userId}`,
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
    })
      .then(async (response) => {
        return await Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getPodcastByCategorie(categorie, userId) {
    return await axios({
      url: `${Config.API_URL}/podcast/getByCategorie/${categorie}/${userId}`,
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
    })
      .then(async (response) => {
        return await Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const podcastService = new PodcastService();
export default podcastService;
