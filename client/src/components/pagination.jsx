import { Pagination as BootPagination } from "react-bootstrap";

const Pagination = ({ num, active, onPageChange }) => {
  let items = [];
  for (let i = 1; i <= num; i++) {
    items.push(
      <BootPagination.Item
        onClick={(e) => onPageChange(+e.target.text)}
        key={i}
        active={i === active}
      >
        {i}
      </BootPagination.Item>
    );
  }
  return (
    <BootPagination className="d-flex justify-content-center">
      {items}
    </BootPagination>
  );
};

export default Pagination;
