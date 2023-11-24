const BaseService = require("./base.service");
const postCodesIO = require("../utils/postcodesio.helper");

// Start Class
const postCodesIOService = new postCodesIO();

class PostCodesService extends BaseService {
  constructor() {
    super();
  }

  // CRUD

  // Super Logic Helpers

  // TODO ! : DEvam et buradan.
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
}

module.exports = PostCodesService;
