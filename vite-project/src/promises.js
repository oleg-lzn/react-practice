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

const form = document.querySelector("#userinfo");

async function sendData() {
  // Associate the FormData object with the form element
  const formData = new FormData(form);

  try {
    const response = await fetch("https://example.org/post", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});
