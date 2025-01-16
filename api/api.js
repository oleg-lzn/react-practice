export async function comments() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
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
    headers.append("auth-token", this.token);
    const fetchOptions = { headers, ...restOptions };

    return fetch(path, fetchOptions).then((res) => res.json());
  }

  checkApiResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Sorry, the ${res} is not valid`);
    }
  }
}

// const BASE_URL =
//   process.env.BASE_URL || "https://jsonplaceholder.typicode.com/";
// export const apiRequester = new ApiRequester(BASE_URL);
