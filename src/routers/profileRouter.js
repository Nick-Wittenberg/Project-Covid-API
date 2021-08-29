import express from "express";

const profileRouter = (UserModel, requireAuth, publicKey) => {
  const router = express.Router();
  /**
   * Get a user profile.
   */
  router.get(
    "/:userId",
    requireAuth(UserModel, publicKey),
    async (req, res) => {
      console.log(req.verifiedUser);
      console.log(req.jwtPayload);
      res.send("success");
      /** TODO */
    }
  );

  /**
   * Update a users email address or email opt-in option.
   */
  router.patch(
    "/:userId",
    requireAuth(UserModel, publicKey),
    async (req, res) => {
      /** TODO */
    }
  );

  return router;
};

export default profileRouter;
