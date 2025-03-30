import { useState, useEffect } from "react";

export default function DogPics() {
  const [dog, setDog] = useState("");
  const url = "https://dog.ceo/api/breeds/image/random";

  async function fetchDogPic(link) {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error("Error with fetching");
    } else {
      const result = await response.json();
      return result.message;
    }
  }

  useEffect(() => {
    fetchDogPic(url)
      .then((res) => {
        console.log(res);
        setDog(res);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dog-pics">
      <img src={dog} />
      <button onClick={async () => setDog(await fetchDogPic(url))}>🐶</button>
    </div>
  );
}
