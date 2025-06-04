require("dotenv").config();
const passport = require('passport');
const { Strategy } = require('passport-jwt');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const verifyToken = async (jwtPayload, done) => {
  if(!jwtPayload) return done(null, false);
  return done(null, jwtPayload);
}

passport.use('current', new Strategy(opts, verifyToken));

module.exports = passport;