const BaseService = require("./base.service");
const postCodesIO = require("../utils/postcodesio.helper");

// Start Class
const postCodesIOService = new postCodesIO();

class PostCodesService extends BaseService {
  constructor() {
    super();
  }

  async validatePostcode(postcode) {
    try {
      const result = await postCodesIOService.validate(postcode);
      return result.result;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  }

  async autoCompletePostcode(text) {
    try {
      const result = await postCodesIOService.autocompletePostcode(text);
      return result.result;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  }

  // Super Logic Helpers

  async getPostcodesWithinRadius(postcode, miles) {
    try {
      // Belirtilen posta kodunun enlem ve boylamını bul
      const { result } = await postCodesIOService.lookup(postcode);
      const { latitude, longitude } = result;

      // Belirtilen mesafe içindeki posta kodlarını bul
      const radius = miles * 1609.34;
      const nearby = await postCodesIOService.nearestOutwardCodesForLocationWithMeters(longitude, latitude, radius);

      let nearbyResults = [];
      nearby.result.map((item) => {
        nearbyResults.push({
          longitude: item.longitude,
          latitude: item.latitude,
        });
      });
      return nearbyResults;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  }

  async getLatLongFromPostcode(postcode) {
    try {
      // Belirtilen posta kodunun enlem ve boylamını bul
      const { result } = await postCodesIOService.lookup(postcode);
      return result;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  }
}

module.exports = PostCodesService;
