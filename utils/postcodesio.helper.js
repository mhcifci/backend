const axios = require("axios");

class PostCodesIO {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.POSTCODES_SERVICE_URL || "https://api.postcodes.io",
    });
  }

  // Belirli bir posta kodunu sorgula
  async lookup(postcode) {
    try {
      const response = await this.client.get(`/postcodes/${postcode}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Birden fazla posta kodunu toplu olarak sorgula
  async lookupBulk(postcodes) {
    try {
      const response = await this.client.post("/postcodes", { postcodes });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Belirli bir boylam ve enlem için en yakın posta kodlarını getir
  async nearestPostcodesForLocation(longitude, latitude) {
    try {
      const response = await this.client.get(`/postcodes?lon=${longitude}&lat=${latitude}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Birden fazla boylam ve enlem için toplu ters coğrafi kodlama yap
  async bulkReverseGeocoding(geolocations) {
    try {
      const response = await this.client.post("/postcodes", { geolocations });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Rastgele bir posta kodu getir
  async random() {
    try {
      const response = await this.client.get("/random/postcodes");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Bir posta kodunun geçerliliğini doğrula
  async validate(postcode) {
    try {
      const response = await this.client.get(`/postcodes/${postcode}/validate`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Belirli bir posta kodu için en yakın posta kodlarını getir
  async nearestPostcodesForPostcode(postcode) {
    try {
      const response = await this.client.get(`/postcodes/${postcode}/nearest`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Bir posta kodu parçasını otomatik tamamla
  async autocompletePostcode(postcode) {
    try {
      const response = await this.client.get(`/postcodes/${postcode}/autocomplete`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Bir posta kodu sorgula
  async queryPostcode(postcode) {
    try {
      const response = await this.client.get(`/postcodes?q=${postcode}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Kullanımdan kaldırılmış bir posta kodunu sorgula
  async lookupTerminatedPostcode(postcode) {
    try {
      const response = await this.client.get(`/terminated_postcodes/${postcode}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Belirli bir dış kodu sorgula
  async lookupOutwardCode(outcode) {
    try {
      const response = await this.client.get(`/outcodes/${outcode}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Belirli bir dış kod için en yakın dış kodları getir
  async nearestOutwardCodesForOutwardCode(outcode) {
    try {
      const response = await this.client.get(`/outcodes/${outcode}/nearest`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Belirli bir boylam ve enlem için en yakın dış kodları getir
  async nearestOutwardCodesForLocation(longitude, latitude) {
    try {
      const response = await this.client.get(`/outcodes?lon=${longitude}&lat=${latitude}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async nearestOutwardCodesForLocationWithMeters(longitude, latitude, radius) {
    try {
      const response = await this.client.get(`/outcodes?lon=${longitude}&lat=${latitude}&radius=${radius}&limit=25`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = PostCodesIO;
