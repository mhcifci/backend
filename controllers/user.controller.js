// const User = require("../models/user.model");
const response = require("../interceptors/response.interceptor");

const users = [
  {
    name: "John",
    surname: "Doe",
    email: "john@example.com",
  },
];

exports.getAllUsers = (req, res) => {
  // Tüm kullanıcıları al ve döndür
  return response.success(res, users, "Tüm kullanıcılar başarıyla alındı.");
};

exports.getUserById = (req, res) => {
  // Belirli bir kullanıcıyı ID'ye göre al ve döndür
};

exports.createUser = (req, res) => {
  // Yeni bir kullanıcı oluştur ve döndür
};

exports.updateUser = (req, res) => {
  // Belirli bir kullanıcıyı güncelle ve döndür
};

exports.deleteUser = (req, res) => {
  // Belirli bir kullanıcıyı sil
};
