import { Button } from '@chakra-ui/button';
import ReactPaginate from 'react-paginate';

const Pagination = ({ count, page, onChange }) => {
  return (
    <ReactPaginate
      forcePage={page}
      breakLabel="..."
      previousLabel={null}
      nextLabel={null}
      onPageChange={onChange}
      pageRangeDisplayed={5}
      pageCount={count}
      renderOnZeroPageCount={null}
      pageLabelBuilder={(page) => <Button>{page}</Button>}
      containerClassName="pagination"
      activeClassName="active"
    />
  )
}

export default Pagination
