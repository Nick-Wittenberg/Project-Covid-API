import express from "express";

const profileRouter = (UserModel, requireAuth) => {
  const router = express.Router();
  /**
   * Get a user profile.
   */
  router.get("/:userId", async (req, res) => {
    /** TODO */
  });

  /**
   * Update a users email address or email opt-in option.
   */
  router.patch("/:userId", async (req, res) => {
    /** TODO */
  });

  return router;
};

export default profileRouter;
