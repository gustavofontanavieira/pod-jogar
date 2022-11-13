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
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const podcastService = new PodcastService();
export default podcastService;
