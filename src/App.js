import { useCallback, useEffect, useState } from "react";
import Loader from "react-js-loader";

import useApi from "hooks/useApi";
import Filters from "components/Filters";
import CountryList from "components/CountryList";
import PaginatedItems from "components/Pagination";
import { sortAscending, sortDescending } from "helpers";
import { NAME, FIRST_PAGE, REGION_NAME, AREA_NAME } from "./constants";


import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [filteredData, setFilteredData] = useState([]);
  const [initSorting, setInitSorting] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const [paginationData, setPaginationData] = useState([]);
  const [sortByAscending, setSortByAscending] = useState(true);

  const { initCountriesData, isLoading } = useApi();

  const handleSorting = useCallback(() => {
    const countryList = initSorting ? initCountriesData : filteredData;
    const resultSorting = sortByAscending
      ? sortAscending(countryList, NAME)
      : sortDescending(countryList, NAME);
    setFilteredData(resultSorting);
    setSortByAscending((prevState) => !prevState);
  }, [initCountriesData, sortByAscending, filteredData, initSorting]);

  const filterByArea = useCallback(() => {
    const { area: getArea } =
      initCountriesData.find(({ name }) => name === AREA_NAME) || {};
    const getFilteredArea = initCountriesData.filter(
      ({ area }) => area <= getArea
    );
    setFilteredData(getFilteredArea);
    setCurrentPage(FIRST_PAGE);
    setFilterByName(AREA_NAME);
  }, [initCountriesData]);

  const filterByRegion = useCallback(() => {
    const getFilteredRegion = initCountriesData.filter(
      ({ region }) => region === REGION_NAME
    );
    setFilteredData(getFilteredRegion);
    setCurrentPage(FIRST_PAGE);
    setFilterByName(REGION_NAME);
  }, [initCountriesData]);

  const resetFilters = useCallback(() => {
    setFilteredData(initCountriesData);
    setCurrentPage(FIRST_PAGE);
  }, [initCountriesData]);

  useEffect(() => {
    const sliceData = filteredData.slice(
      (currentPage - 1) * 10,
      currentPage * 10
    );
    setPaginationData(sliceData);
  }, [currentPage, filteredData, sortByAscending]);

  useEffect(() => {
    if (initCountriesData.length && initSorting) {
      setInitSorting((prevState) => !prevState);
      handleSorting();
    }
  }, [initCountriesData, initSorting, handleSorting]);

  if (!isLoading) {
    return (
      <div className="App">
        <Filters
          sortBy={handleSorting}
          filterByName={filterByName}
          filterByArea={filterByArea}
          resetFilters={resetFilters}
          filterByRegion={filterByRegion}
        />
        <CountryList
          filteredData={paginationData}
          sortByAscending={sortByAscending}
        />
        <PaginatedItems
          currentPage={currentPage}
          filteredData={filteredData}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  } else {
    return (
      <div className={"loading"}>
        <Loader
          size={200}
          color={"#c77a7a"}
          type="bubble-loop"
          bgColor={"#c77a7a"}
          title={"Waiting Countries Data"}
        />
      </div>
    );
  }
};

export default App;
