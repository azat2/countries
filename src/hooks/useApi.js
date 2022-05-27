import { useEffect, useState } from "react";

import { SUCCESS } from "../constants";
import { configs } from "config";

const {
  apiParams: { type, params, version },
} = configs;

const useApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initCountriesData, setInitCountriesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(
          `https://restcountries.com/${version}/${type}${params}`
        );
        const result = await data.json();

        if (data.status === SUCCESS) {
          setInitCountriesData(result);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return { initCountriesData, isLoading };
};

export default useApi;
