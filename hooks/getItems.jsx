import { comments } from "../api/api";
import { useState, useEffect } from "react";

export function customhook(itemsPerPage = 10) {
  const [isLoading, setIsLoading] = useState(false);
  const [comm, setComments] = useState([]);
  const [error, setError] = useState("error");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    comments()
      .then((result) => setComments(result))
      .catch((err) => {
        setError(err);
        console.error("Error fetching weather data:", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = comm.slice(startIndex, endIndex);
  const totalPages = Math.ceil(comm.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    isLoading,
    currentItems,
    error,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
  };
}
