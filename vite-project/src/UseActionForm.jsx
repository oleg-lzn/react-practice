import { useActionState } from "react";
import { signUpNewUser } from "./api";

export default function Search() {
  function publish(formData) {
    const content = formData.get("content");
    const button = formData.get("button");
    alert(`'${content}' was published with the '${button}' button`);
  }

  function save(formData) {
    const content = formData.get("content");
    alert(`Your draft of '${content}' has been saved!`);
  }

  return (
    <form action={publish}>
      <textarea name="content" rows={4} cols={40} />
      <br />
      <button type="submit" name="button" value="submit">
        Publish
      </button>
      <button formAction={save}>Save draft</button>
    </form>
  );
}

// Email Subscription

export default function Page() {
  async function signup(prevState, formData) {
    "use server";
    const email = formData.get("email");
    
    try {
      await signUpNewUser(email);
      alert(`Added "${email}"`);
    } catch (err) {
      return err.toString();
    }
  }
  const [message, signupAction] = useActionState(signup, null);
  return (
    <>
      <h1>Signup for my newsletter</h1>
      <p>Signup with the same email twice to see an error</p>
      <form action={signupAction} id="signup-form">
        <label htmlFor="email">Email: </label>
        <input name="email" id="email" placeholder="react@example.com" />
        <button>Sign up</button>
        {!!message && <p>{message}</p>}
      </form>
    </>
  );
}
