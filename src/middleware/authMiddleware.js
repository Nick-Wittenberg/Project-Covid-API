import jwt from "jsonwebtoken";

const authMiddleware = (UserModel) => {
  const requireAuth = async (req, res, next) => {
    /** TODO */
  };

  return requireAuth;
};

export default authMiddleware;
