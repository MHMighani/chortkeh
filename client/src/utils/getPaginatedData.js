// returns paginated data
function getPaginatedData(data, currentPage, pageSize) {
  return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}

export default getPaginatedData;
