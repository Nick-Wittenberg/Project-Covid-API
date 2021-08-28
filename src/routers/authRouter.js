import argon2 from "argon2";
import jwt from "jsonwebtoken";
import express from "express";

const authRouter = (UserModel) => {
  const router = express.Router();

  /**
   * Create a new user in the database,
   * using the Argon2 hashing algorithm to encrypt the password.
   */
  router.post("/register", async (req, res) => {
    try {
      const { body } = req;
      console.log(body);

      // check to see if req has required properties
      if (
        !body.hasOwnProperty("username") ||
        !body.hasOwnProperty("password") ||
        !body.hasOwnProperty("email")
      ) {
        return res
          .status(400)
          .json({ error: "Username, Email, Password required" });
      }
      const { username, password, email } = body;
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

      const hash = await argon2.hash(password);

      const user = new UserModel({ ...body, password: hash });
      console.log(user);
      await user.save();

      // should be 201???
      return res.status(200).json({ success: "New user registered" });
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  });

  /**
   * Authenticate on the server using the `username` and `password`.
   * This route returns a signed JWT token.
   */
  router.post("/login", async (req, res) => {
    /** TODO */
  });

  return router;
};

export default authRouter;
