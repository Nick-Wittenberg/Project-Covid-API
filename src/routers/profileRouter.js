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
      try {
        // Verify req.params is the same as req.verifiedUser
        console.log("GET - /api/profile/:userId jwt payload", req.jwtPayload);
        if (!(req.jwtPayload.sub === req.params.userId)) {
          return res.status(400).json({ error: "Incorrect URL" });
        }
        const user = await UserModel.findOne({username: req.jwtPayload.sub});

        // **** should probably config the user return not to include password ****

        console.log(user);
        return res.status(200).json(user);
      } catch (e) {
        console.log(e);
        return res.json({error: e});
      }
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
      try{
        console.log("Patch - /api/profile/:userId jwt payload", req.jwtPayload);
        if (!(req.jwtPayload.sub === req.params.userId)) {
          return res.status(400).json({ error: "Incorrect URL" });
        }
        console.log("opt in?", req.body.emailOptIn)
        const updatedUser = await UserModel.findOneAndUpdate({username: req.jwtPayload.sub }, { $set: { emailOptIn: req.body.emailOptIn }})
        console.log("UPDATED DATABASE", updatedUser);
        res.status(200).json(updatedUser)


      }catch(e){
        console.log(e);
        res.status(400).json({error: e});
      }

    }
  );

  return router;
};

export default profileRouter;
