import { useState, useEffect, useOptimistic, useTransition } from "react";

export default function useOptim() {
  const [isPending, startTransition] = useTransition();
  const [thought, setThought] = useState("");
  const [thoughts, setThoughts] = useState([]);
  const [optimisticThoughts, addOptimisticThought] = useOptimistic(
    thoughts,
    (oldThoughts, newThought) => [newThought, ...oldThoughts]
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/thoughts");
        if (!response.ok) throw new Error("Failed to fetch! Try betta");
        const data = await response.json();
        setThoughts(data);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const postNewThough = async () => {
    startTransition(async () => {
      addOptimisticThought(`${thought} (Loading...)`);
      setThought("");
      try {
        const response = await fetch("/thoughts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ thought }),
        });
        if (!response.ok) {
          alert("Oooops no way!");
          return;
        }
        const { thoughts: newThoughts } = await response.json();
        setThoughts(newThoughts);
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <div className="app">
      <h1>Deep Thoughts</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          postNewThough();
        }}
      >
        <label htmlFor="thougth"> What's on your mind?</label>
        <textarea
          id="thought"
          name="thought"
          value={thought}
          rows="5"
          cols="33"
          onChange={e => setThought(e.target.value)}
        ></textarea>
        <button type="submit">Direct my thoughts</button>
      </form>
      <ul>
        {optimisticThoughts.map((th, index) => (
          <li key={index}>{th}</li>
        ))}
      </ul>
    </div>
  );
}
