import { useEffect, useState } from "react";

const useTest = (year = 0) => {
  const [data, setData] = useState(0);
  useEffect(() => {
    const userAge = new Date().getFullYear() - year;
    setData(userAge);
  }, []);

  return [data];
};

export default useTest;
