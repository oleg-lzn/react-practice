import { useState } from "react";

export default function FormValidator() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [valid, setIsValid] = useState(false);

  function validator(event) {
    event.preventDefault();
    let errors = [];

    if (!email.includes("@")) {
      errors.push("An email must have exactly one @ sign");
    }
    if (password.length < 8) {
      errors.push("Passwords must be 8 characters or longer");
    }

    if (password !== passwordConfirm) {
      errors.push("Passwords must match");
    }

    if (errors.length > 0) {
      setError(errors.join(". "));
      setIsValid(false);
    } else {
      setError("Form submitted successfully!");
      setIsValid(true);
    }
  }

  return (
    <form onSubmit={validator}>
      <h2>Sign Up!</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="password-confirm">Confirm Password </label>
      <input
        type="password"
        value={passwordConfirm}
        name="password-confirm"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
      />
      <span>{error}</span>
      <input type="submit" value="Submit" />
    </form>
  );
}
