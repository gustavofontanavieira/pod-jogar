import axios from "axios";
import Config from "../util/Config";

class CategoriesService {
  async getAllCategories() {
    return await axios({
      url: `${Config.API_URL}/categories/list`,
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      headers: Config.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const categorieService = new CategoriesService();
export default categorieService;
