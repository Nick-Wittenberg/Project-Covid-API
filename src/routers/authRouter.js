import argon2 from "argon2";
import jwt from "jsonwebtoken";
import registerSchema from "../validation/authRegisterUser";
import loginSchema from "../validation/authLoginUser";
import express from "express";

const authRouter = (UserModel, privateKey) => {
  const router = express.Router();

  /**
   * Create a new user in the database,
   * using the Argon2 hashing algorithm to encrypt the password.
   */
  router.post("/register", async (req, res) => {
    try {
      const { body } = req;

      // check to see if req has required properties - unnecessary with Joi being implemented

      // if (
      //   !body.hasOwnProperty("username") ||
      //   !body.hasOwnProperty("password") ||
      //   !body.hasOwnProperty("email")
      // ) {
      //   return res
      //     .status(400)
      //     .json({ error: "Username, Email, Password required" });
      // }

      // validate username, password and email using Joi
      const validValues = await registerSchema.validateAsync(body);
      console.log(validValues);
      const { username, password, email } = validValues;

      // check to see if username already exists
      const checkUsername = await UserModel.findOne({ username });
      if (checkUsername) {
        return res.status(400).json({ error: "Username taken" });
      }

      // check to see if email already exists
      const checkEmail = await UserModel.findOne({ email });
      if (checkEmail) {
        return res.status(400).json({ error: "Email address already in use!" });
      }

      // hash password
      const hash = await argon2.hash(password);

      // create new user and save
      const user = new UserModel({ ...body, password: hash });
      console.log(user);
      await user.save();

      // should be 201??? Description asks for 200
      return res.status(201).json({ success: "New user registered" });
    } catch (e) {
      // catch custom validation errors
      if (e.message.startsWith("Invalid")) {
        return res.status(400).json({ error: e.message });
      }

      return res.status(500).json(e);
    }
  });

  /**
   * Authenticate on the server using the `username` and `password`.
   * This route returns a signed JWT token.
   */
  router.post("/login", async (req, res) => {
    try {
      const { body } = req;

      // check to make sure username and password have been entered
      if (
        !body.hasOwnProperty("username") ||
        !body.hasOwnProperty("password")
      ) {
        return res
          .status(400)
          .json({ error: "Username and password required" });
      }
      const validValues = await loginSchema.validateAsync(body);
      console.log(validValues);
      const { username, password, emailOptIn } = validValues;

      // check to see if username exists in database
      const checkUser = await UserModel.findOne({ username });
      if (!checkUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // check password matches
      if (!(await argon2.verify(checkUser.password, password))) {
        // password does not match
        return res.status(401).json({ error: "Incorrect password" });
      }

      // Create JWT

      const opts = { algorithm: "RS256" };

      const payload = {
        sub: username,
        iss: "covid-api-server",
        optIn: emailOptIn,
      };

      const jwtToken = jwt.sign(payload, privateKey, opts);

      return res.status(200).json({ success: true, token: jwtToken });
    } catch (e) {
      if (e.message.startsWith("Invalid")) {
        return res.status(400).json({ error: e.message });
      }
      console.log(e);
      res.status(500).json(e);
    }
  });

  return router;
};

export default authRouter;
