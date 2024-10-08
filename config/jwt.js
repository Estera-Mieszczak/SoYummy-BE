const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");

require("dotenv").config();

const secret = process.env.SECRET;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new Strategy(params, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.id }).lean();
    if (!user) {
      return done(new Error("User not found"));
    }
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = strategy;
