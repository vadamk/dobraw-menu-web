import { Button } from '@chakra-ui/button';
import ReactPaginate from 'react-paginate';

const Pagination = ({ count, onChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel={<Button>Назад</Button>}
      nextLabel={<Button>Дальше</Button>}
      onPageChange={onChange}
      pageRangeDisplayed={5}
      pageCount={count}
      renderOnZeroPageCount={null}
      pageLabelBuilder={(page) => <Button>{page}</Button>}

      // pageClassName="page-item"
      // pageLinkClassName="page-link"
      // previousClassName="page-item"
      // previousLinkClassName="page-link"
      // nextClassName="page-item"
      // nextLinkClassName="page-link"
      // breakClassName="page-item"
      // breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
    />
  )
}

export default Pagination
