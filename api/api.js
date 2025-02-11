export async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
  if (!response.ok) {
    throw new Error(`Error during request ${response.status}`);
  }
  const result = await response.json();
  return result;
}

//Singleton for API requests

class ApiRequester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setToken(token) {
    this.token = token;
  }

  request(path, options) {
    const { headers: initHeaders, ...restOptions } = options || {};
    const headers = new Headers(initHeaders);

    headers.append("Content-Type", "application/json");
    // headers.append("auth-token", this.token);
    const fetchOptions = { headers, ...restOptions };
    return Promise.race([
      fetch(this.baseUrl + path, fetchOptions).then((res) => res.json()),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Promise got rejected")), 3000)
      ),
    ]);
  }

  checkApiResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Sorry, the ${res} is not valid`);
    }
  }
}

const BASE_URL = "https://jsonplaceholder.typicode.com/";
export const apiRequester = new ApiRequester(BASE_URL);
