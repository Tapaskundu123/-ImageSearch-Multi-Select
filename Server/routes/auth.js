import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"]  // ✅ NEW: Forces account picker/consent screen
   }),
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get("/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider
      }
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

export default router;
