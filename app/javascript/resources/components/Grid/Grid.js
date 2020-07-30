import React, {useState,useEffect} from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import GridPagination from '../grid-pagination/GridPagination';

const Grid = ({ promise, body, offset, className, reload }) => {

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [dataFetched, setDataFetched] = useState(false);
    const [previousReload, setPreviousReload] = useState(reload);
    const [actualPage, setActualPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchDataSet = (currentPage) => promise(((currentPage - 1) * offset), offset, searchTerm)
        .then((response) => {
            setData(response.data);
            setTotal(parseInt(response.headers['pagination-total'],10))
            setActualPage(currentPage)
            return response;
        });

    useEffect(()=>{
        if (_.isEmpty(data) && !dataFetched) {
            fetchDataSet(actualPage)
                .finally(() => setDataFetched(true));
        }
        if (previousReload !== reload) {
            fetchDataSet(actualPage);
            setPreviousReload(reload)
        }
    }, [reload]);

    return <div>
        <div>
            <input
                type="text"
                name="q"
                placeholder="Search"
                className="mr-4 ml-2 w-25"
                onChange={(event) => setSearchTerm(event.target.value) }
            />
            <Button color="primary" className="mb-1" onClick={()=> fetchDataSet(actualPage)}>Search</Button>
        </div>
        {total !== 0 ? (
            <div>
                <div className={className}>
                    {data.map(body)}
                </div>
                <GridPagination total={total} offset={offset} onPageChange={fetchDataSet}/>
            </div>
        ) : (<h4 className="text-center">No Records Found</h4>)}
    </div>
};

Grid.propTypes = {
    body: PropTypes.func.isRequired,
    promise: PropTypes.func.isRequired,
    offset: PropTypes.number,
    className: PropTypes.string,
    reload: PropTypes.bool,
};

Grid.defaultProps = {
    offset: 6,
    className: 'grid-container',
    reload: false
};

export default Grid