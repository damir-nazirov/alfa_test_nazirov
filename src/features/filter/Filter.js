import { Button } from "react-bootstrap"
import { filtersChanged } from "../../reducers/cardsFiltersSlice"
import { useDispatch, useSelector } from "react-redux"


const Filter = () => {

    const {liked} = useSelector(state => state.filters);

    const dispatch = useDispatch()

    return (
        <div className="pt-4 d-flex justify-content-center">
            <Button
                onClick={() => {dispatch(filtersChanged())}}
                variant="outline-danger">
                {liked ? <i className="fa-solid fa-heart"></i> : <span><i className="fa-regular fa-heart"></i><i className="fa-solid fa-heart"></i></span>}
            </Button>

        </div>
    )
}

export default Filter