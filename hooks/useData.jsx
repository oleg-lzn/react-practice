import { useState } from "react";

export const useData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = (promise) => {
    if (!promise) {
      return;
    }
    setLoading(true);
    promise
      .then((response) => {
        setLoading(false);
        setData(response);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  return { loading, data, error, fetchData };
};
