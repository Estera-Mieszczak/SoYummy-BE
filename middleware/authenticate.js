const passport = require("passport");
const strategy = require("../config/jwt");

passport.use(strategy);

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || user.token === null || err) {
      console.log(user);
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
module.exports = auth;

// || user.token === null
