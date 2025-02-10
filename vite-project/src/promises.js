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
