import { useState, useEffect } from "react";

const useSelect = (list, field, key, search) => {
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    const filtered = list?.filter((item) => {
      let filteredResult;
      if (item[field][key]?.toLowerCase().includes(search.toLowerCase())) {
        filteredResult = item;
      }

      return filteredResult;
    });
    setFilteredArray(filtered);
  }, [list, field, search, key, setFilteredArray]);

  return filteredArray;
};

export default useSelect;
