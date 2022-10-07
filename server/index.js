const express = require("express");
const passport = require("passport");
const { googleClientID, googleClientSecret } = require("./config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

// app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("profile: ", profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
