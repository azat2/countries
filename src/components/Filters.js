import { memo } from "react";

import Button from "./Button";
import { REGION_NAME, AREA_NAME } from "../constants/index";

const Filters = ({
  sortBy,
  filterByName,
  filterByArea,
  resetFilters,
  filterByRegion,
}) => (
  <header className="App-header">
    <Button onClick={resetFilters} text="Reset Filters" className="reset" />
    <Button onClick={sortBy} text="Sorting Alphabetically" className="filter" />
    <Button
      className="filter"
      onClick={filterByArea}
      text="Filter by Lithuania area."
      selected={filterByName === AREA_NAME}
    />
    <Button
      className="filter"
      onClick={filterByRegion}
      text="Filter by Oceania region."
      selected={filterByName === REGION_NAME}
    />
  </header>
);

export default memo(Filters);
