// Conceptual implementation (not in course)
export const registerWithVerification = async (req: Request, res: Response) => {
  // 1. Create user with unverified status
  const newUser = await db.insert(users).values({
    ...userData,
    emailVerified: false,
    verificationToken: generateRandomToken(),
    verificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });

  // 2. Send verification email
  await sendEmail({
    to: newUser.email,
    subject: "Verify your email",
    html: `
      <h1>Welcome!</h1>
      <p>Please verify your email by clicking:</p>
      <a href="${API_URL}/auth/verify?token=${verificationToken}">
        Verify Email
      </a>
      <p>This link expires in 24 hours.</p>
    `,
  });

  // 3. Restrict access until verified
  res.status(201).json({
    message: "Account created. Please check your email to verify.",
    requiresVerification: true,
  });
};

// Verification endpoint
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  const user = await db.query.users.findFirst({
    where: and(
      eq(users.verificationToken, token),
      gt(users.verificationExpires, new Date())
    ),
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  await db
    .update(users)
    .set({
      emailVerified: true,
      verificationToken: null,
      verificationExpires: null,
    })
    .where(eq(users.id, user.id));

  res.json({ message: "Email verified successfully" });
};
