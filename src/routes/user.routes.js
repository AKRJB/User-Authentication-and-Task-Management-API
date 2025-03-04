import { Router } from "express";
import { signUp, login } from "../controllers/user.controller.js";
import { body, validationResult } from "express-validator";


const router = Router();

const validateFields = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

router.route("/signup").post(validateFields, signUp)
router.route("/login").post(validateFields, login)

export default router;