// generate the auth url for google and redirect the client to that url
router.get("/auth/google", startGoogleOauthFlow);

// handle the callback url request from google when a user finishes a flow
// then generate a JWT then redirect to the dashboard
router.get("/auth/google/callback", async (req, res) => {
  // Create or find user from Google profile
  const user = await findOrCreateUser({
    email: req.user.email,
    googleId: req.user.id,
    firstName: req.user.given_name,
    lastName: req.user.family_name,
  });

  const token = await generateToken(user);
  res.redirect(`/dashboard?token=${token}`);
});
