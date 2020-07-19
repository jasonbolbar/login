import React, {useState,useEffect} from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';
import GridPagination from '../grid-pagination/GridPagination';

const Grid = ({ promise, body, offset }) => {

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [dataFetched, setDataFetched] = useState(false);

    const fetchDataSet = (currentPage) => promise(((currentPage - 1) * offset), offset)
        .then((response) => {
            setData(response.data);
            return response;
        });

    useEffect(()=>{
        if (_.isEmpty(data) && !dataFetched) {
            fetchDataSet(1).then(({headers}) => (setTotal(parseInt(headers['pagination-total'],10))))
                .finally(() => setDataFetched(true));
        }
    }, []);

    return (
        <div>
            <div className="grid-container">
                {data.map(body)}
            </div>
            <GridPagination total={total} offset={offset} onPageChange={fetchDataSet}/>
        </div>
    )
};

Grid.propTypes = {
    body: PropTypes.func.isRequired,
    promise: PropTypes.func.isRequired,
    offset: PropTypes.number
};

Grid.defaultProps = {
    offset: 6
};

export default Grid