export const sortAscending = (sortedData, key = "") =>{
  return  [...sortedData].sort((a, b) => a[key].localeCompare(b[key]));
}

export const sortDescending = (sortedData, key = "") =>{
  return  [...sortedData].sort((a, b) => b[key].localeCompare(a[key]));
}

