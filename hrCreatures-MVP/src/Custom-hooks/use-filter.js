import { useState, useEffect } from "react";

const useFilter = (array, searchTerm, key1, key2, key3, key4, key5) => {
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    const filtered = array?.filter((item) => {
      let filteredResult;
      if (searchTerm === "") {
        filteredResult = item;
      } else if (
        item[key1]?.toLowerCase()?.includes(searchTerm.toLowerCase())
      ) {
        filteredResult = item;
      } else if (
        item[key2]?.toLowerCase()?.includes(searchTerm.toLowerCase())
      ) {
        filteredResult = item;
      } else if (
        item[key3]?.toLowerCase()?.includes(searchTerm.toLowerCase())
      ) {
        filteredResult = item;
      } else if (
        item[key4]?.toLowerCase()?.includes(searchTerm.toLowerCase())
      ) {
        filteredResult = item;
      } else if (
        item[key5]?.toLowerCase()?.includes(searchTerm.toLowerCase())
      ) {
        filteredResult = item;
      }

      return filteredResult;
    });
    setFilteredArray(filtered);
  }, [array, searchTerm, key1, key2, key3, key4, key5, setFilteredArray]);

  return filteredArray;
};

export default useFilter;
