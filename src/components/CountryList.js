const CountryList = ({ sortByAscending, filteredData, resetSorting }) => (
    <ul className="list">
        <span>Sort By {!sortByAscending ? "A-Z" : "Z-A"}</span>
        {filteredData.map(({ name, region, area }, index) => (
            <li key={`${index}${area}`}>
                <p>{`Name - ${name}`}</p>
                <p>{`Region - ${region}`}</p>
                <p>{`Area - ${area}`}</p>
            </li>
        ))}
    </ul>
);

export default CountryList;
