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
