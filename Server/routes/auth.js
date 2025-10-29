import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// ✅ GOOGLE LOGIN
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", (req, res, next) => {
  if (req.query.error) {
    return res.redirect(`${process.env.CLIENT_URL}/login`);
  }
  next();
},
passport.authenticate("google", {
  failureRedirect: `${process.env.CLIENT_URL}/login`
}),
(req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

// ✅ FACEBOOK LOGIN
router.get("/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get("/facebook/callback", (req, res, next) => {
  if (req.query.error || req.query.error_reason === "user_denied") {
    return res.redirect(`${process.env.CLIENT_URL}/login`);
  }
  next();
},
passport.authenticate("facebook", {
  failureRedirect: `${process.env.CLIENT_URL}/login`
}),
(req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

// ✅ GITHUB LOGIN
router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github/callback", (req, res, next) => {
  if (req.query.error) {
    return res.redirect(`${process.env.CLIENT_URL}/login`);
  }
  next();
},
passport.authenticate("github", {
  failureRedirect: `${process.env.CLIENT_URL}/login`
}),
(req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

// ✅ LOGOUT ROUTE
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

// ✅ CHECK USER AUTH STATUS
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider
      }
    });
  }
  
  res.status(401).json({ error: "Not authenticated" });
});

export default router;