const BaseService = require("./base.service");
const AppleProducts = require("../models/appleProducts.model");
const UserTransactions = require("./userTransactions.service");
// const { AppStoreServerAPI, Environment, decodeRenewalInfo, decodeTransaction, decodeTransactions } = require("app-store-server-api");

const UserTransactionsService = new UserTransactions();

// const KEY = `-----BEGIN PRIVATE KEY-----
// MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgNRje5r0x6gM198H+
// KSsNxxX+h97WE8+a1oHoVSo8l8CgCgYIKoZIzj0DAQehRANCAATxu5zSU54PrBMW
// KIUrXmPZ/5So9hu6/GJm8UWANfeZel00iR9f1Lr7MPaY5n0z6SUgKZHTXfOMJLaf
// HdBydeQC
// -----END PRIVATE KEY-----`;

// const KEY_ID = "342Y2SC768";
// const ISSUER_ID = "abeab11c-fb78-4188-9007-ab841e095b99";
// const APP_BUNDLE_ID = "com.sdlpro.sdl";

// const api = new AppStoreServerAPI(KEY, KEY_ID, ISSUER_ID, APP_BUNDLE_ID, Environment.Sandbox);

class AppleProductsService extends BaseService {
  constructor() {
    super(AppleProducts);
  }
}

module.exports = AppleProductsService;
