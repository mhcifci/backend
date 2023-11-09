const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

class bunnyHelper {
  storageZoneName;
  accessKey;
  storageZoneRegion;
  constructor() {
    this.storageZoneName = process.env.BUNNY_STORAGE_NAME;
    this.accessKey = process.env.BUNNY_STORAGE_ACCESS_KEY;
    this.storageZoneRegion = process.env.BUNNY_STORAGE_ZONE;
    this.apiBaseUrl = `https://storage.bunnycdn.com/${this.storageZoneName}/`;
    this.axiosInstance = axios.create({
      baseURL: this.apiBaseUrl,
      headers: {
        AccessKey: this.accessKey,
      },
    });
  }

  async createDirectory(path) {
    try {
      const response = await this.axiosInstance.put(path, null, {
        headers: {
          "Content-Length": 0, // Must be set to 0 for directory creation
        },
      });
      console.log("Directory created successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating directory", error);
      throw new Error(error);
    }
  }

  async deleteDirectory(path) {
    try {
      const response = await this.axiosInstance.delete(path);
      console.log("Directory deleted successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting directory", error);
      throw new Error(error);
    }
  }

  async uploadFile(filePath, destinationPath) {
    try {
      const fileContent = fs.readFileSync(filePath);
      const response = await this.axiosInstance.put(destinationPath, fileContent, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      console.log("File uploaded successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading file", error);
      throw new Error(error);
    }
  }
}

module.exports = new bunnyHelper();
