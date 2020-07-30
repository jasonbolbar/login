import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from 'lodash';

const GridPagination = ({total,offset, onPageChange, maxItemsSize}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const getLastPage = () => Math.ceil(total/offset);

    const generatePageSet = () => {
        const currentSet = Math.ceil(currentPage/maxItemsSize);
        const initialItem = maxItemsSize*(currentSet - 1) + 1;
        let finalItem = maxItemsSize*(currentSet - 1) + maxItemsSize;
        if (finalItem > getLastPage())
        {
            finalItem = getLastPage();
        }
        return _.range(initialItem, finalItem + 1)
    };

    const setPage = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <Pagination className="float-right pr-2" aria-label="Page navigation example">
            <PaginationItem disabled={currentPage <= maxItemsSize}>
                <PaginationLink
                    first
                    href="#"
                    onClick={() => setPage(1)}
                />
            </PaginationItem>
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                    previous
                    onClick={() => setPage(currentPage - 1)}
                />
            </PaginationItem>
            {
                generatePageSet().map(page => (
                    <PaginationItem key={page} active={page === currentPage}>
                        <PaginationLink
                            onClick={()=> setPage(page)}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))
            }
            <PaginationItem disabled={getLastPage() < maxItemsSize || currentPage === getLastPage() }>
                <PaginationLink
                    next
                    onClick={() => setPage(currentPage + 1)}
                />
            </PaginationItem>
            <PaginationItem disabled={getLastPage() < maxItemsSize || currentPage === getLastPage()}>
                <PaginationLink
                    last
                    onClick={() => setPage(getLastPage())}
                />
            </PaginationItem>
        </Pagination>
    )
};

GridPagination.propTypes = {
    total: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    maxItemsSize: PropTypes.number,
}

GridPagination.defaultProps = {
  maxItemsSize: 5
};

export default GridPagination