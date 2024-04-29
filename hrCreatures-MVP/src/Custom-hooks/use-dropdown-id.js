const useDropdownId = (apiData) => {
  return (
    apiData &&
    apiData?.data?.map((d) => {
      const data = { ...d };
      const { name, _id, userName } = data;
      const updatedData = { name: name || userName, _id };
      return updatedData;
    })
  );
};

export default useDropdownId;
