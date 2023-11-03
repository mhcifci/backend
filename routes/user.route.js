const express = require("express");
const router = express.Router();
const users = require("../controllers/admin/user.controller");
const response = require("../interceptors/response.interceptor");
const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return response.badRequest(res, "Required fields could not be verified.");
};
const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("surname").notEmpty().withMessage("Surname is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("country_code").notEmpty().withMessage("Country code is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("email").isEmail().withMessage("Invalid email format"),
];
const userUpdateValidationRules = [
  body("name").optional(),
  body("surname").optional(),
  body("phone").optional(),
  body("country_code").optional(),
  body("password").optional(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Geçersiz e-posta formatı")
    .custom(async (value, { req }) => {
      // E-posta adresi benzersiz mi kontrol et
      const existingUser = await users.getUserByEmail(value);
      if (existingUser && existingUser.id !== req.params.id) {
        throw new Error("Bu e-posta adresi zaten kullanılıyor");
      }
    }),
  body("phone")
    .optional()
    .custom(async (value, { req }) => {
      // Telefon numarası benzersiz mi kontrol et
      const existingUser = await users.getUserByPhone(value);
      if (existingUser && existingUser.id !== req.params.id) {
        throw new Error("Bu telefon numarası zaten kullanılıyor");
      }
    }),
];

router.get("/", users.getAllUsers);
router.get("/:id", users.getUserById);
router.post("/", userValidationRules, validate, users.createUser);
router.put("/:id", userUpdateValidationRules, validate, users.updateUser);
router.delete("/:id", users.deleteUser);

module.exports = router;
