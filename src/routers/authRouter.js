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
    /** TODO */
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
