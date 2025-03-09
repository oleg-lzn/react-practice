export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Прошло ${ms / 1000} секунды`);
      resolve();
    }, ms);
  });
};

export const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return reject(`Ошибка ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          resolve(data);
        }
      })
      .catch((error) => reject(`Ошибка ${error.message || error}`));
  });
};

export const delayResult = (ms, result) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), ms);
  });
};

async function sendData(e) {
  // Associate the FormData object with the form element
  const formData = new FormData(e.target);

  try {
    const response = await fetch("https://example.org/post", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

const getData = async (result, ms) => {
  return new Promise((resolve, reject) => {
    if (ms > 5000) {
      reject("Too much time passed");
    }
    setTimeout(() => resolve(result), ms);
  });
};

const main = async () => {
  try {
    console.log("Wait...");
    const data = await getData("Bear in the Zoo", 1000);
    console.log("Got Data...", data);
    return data;
  } catch (error) {
    console.error("Error in Main", error);
  }
};

main().then((data) => console.log(data));

const getFruits = async () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
