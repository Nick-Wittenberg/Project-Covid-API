import jwt from "jsonwebtoken";

const authMiddleware = (UserModel, publicKey) => {
  const requireAuth = async (req, res, next) => {
    try {
      // 1. check for authorization header
      const { authorization } = req.headers;
      if (!authorization) {
        return res
          .status(400)
          .json({ error: "Authorization header required." });
      }

      // 2. check Bearer string format
      if (!authorization.startsWith("Bearer ")) {
        return res
          .status(400)
          .json({ error: "Invallid authorization bearer string." });
      }
      // 3. grab the token
      const token = authorization.split(" ")[1];

      // 4. verify token
      const payload = jwt.verify(token, publicKey);

      // 5. verify user exists in database
      const verifiedUser = UserModel.findById(payload.sub);

      if (!verifiedUser) {
        return res.status(404).json({ error: "User not found." });
      }

      // add user and jwt payload to req object
      req.verifiedUser = verifiedUser;
      req.jwtPayload = payload;

      // continue on to next step
      next();
    } catch (e) {
      next(e);
    }
  };
  return requireAuth;
};

export default authMiddleware;
