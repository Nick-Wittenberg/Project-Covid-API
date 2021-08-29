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
      // Verify req.params is the same as req.verifiedUser
      console.log(req.jwtPayload);
      if (!(req.jwtPayload.sub === req.params.userId)) {
        return res.status(400).json({ error: "Incorrect URL" });
      }

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
