require("dotenv").config();
const admin = require("firebase-admin");

class firebaseHelper {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(require("../config/sdl-pro-487e5-firebase-adminsdk-ggmd5-f6dce2ff5a.json")),
      });
    }
  }

  // messaging operations
  async sendNotificationUser(title, body, image = null, token, data) {
    const payload = await this.createNotificationPayload({
      title: title,
      body: body,
      imageUrl: image || null,
      data,
      token: token,
    });
    return admin.messaging().send(payload);
  }

  async sendNotificationtoTopic(title, body, image = null, topic, data) {
    const payload = await this.createNotificationPayload({
      title: title,
      body: body,
      imageUrl: image || null,
      data,
      topic: topic,
    });
    return admin.messaging().send(payload);
  }

  // topic operations
  async subscribeToTopic(token, topic) {
    return await admin.messaging().subscribeToTopic(token, topic);
  }

  async subscribeUserAllowedNotifications(token) {
    return await admin.messaging().subscribeToTopic(token, "allowedNotifications");
  }

  async createNotificationPayload({ title, body, imageUrl, data = { default: 1 }, topic = null, token = null, sound = "default" }) {
    const notificationPayload = {
      notification: {
        title,
        body,
        image: imageUrl || null,
      },
      data,
      // 'topic' ve 'token' kontrolü
      ...(topic ? { topic } : {}),
      ...(token ? { token } : {}),
    };

    notificationPayload.android = {
      notification: {
        sound,
      },
    };
    notificationPayload.apns = {
      payload: {
        aps: {
          sound,
        },
      },
    };

    return notificationPayload;
  }
}

module.exports = firebaseHelper;
