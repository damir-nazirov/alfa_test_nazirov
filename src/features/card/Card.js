import {Card, Row, Col} from 'react-bootstrap'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards, filteredCardsSelector, onDeleteCard, onLikeCard } from '../../reducers/cardsSlice';

import Spinner from '../spinner/Spinner'

import './card.css'

const MyCard = () => {

    const {cardsLoadingStatus} = useSelector(state => state.cards);
    const filteredCards = useSelector(filteredCardsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCards());
        // eslint-disable-next-line
    }, []);


      if (cardsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (cardsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderCards = (arr) => {
        if (arr.length === 0) {
            return (
                    <h5 className="text-center mt-5">Запрашиваемая информация отсутствует </h5>
            )
        }

        const onDelete = (id) => {
          console.log('render');
            dispatch(onDeleteCard(id));
        }

        const onLike = (id) => {
          dispatch(onLikeCard(id))
        }

        return arr.map((item) => (
            <Col key={item.id}>
              <Card>
                  <div className="wrapper-image d-flex justify-content-end pe-1">
               
                      <button 
                          onClick={() => {onDelete(item.id)}}
                          type="button"
                          className="btn p-0"
                          data-toggle="increase">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                  </div>
                  <Card.Img variant="top" src={item.download_url} />
                  <Card.Body>
                     <Card.Title><span className='author'>Автор: </span>{item.author}
                        <div className='d-flex justify-content-end align-items-center'>
                          <button
                              onClick={() => onLike(item.id)}
                              type="button"
                              className="btn p-0"
                              data-toggle="increase">
                             {!item.liked ? <i className="fa-regular fa-heart like"></i> :
                            <i className="fa-solid fa-heart like"></i> }
                          </button>
                        </div>
  
                     </Card.Title>
                  </Card.Body>
              </Card>
            </Col>
          ))

        }
        
        const elements = renderCards(filteredCards);
    
    return (
            <div className="cardGroup">
              <Row xs={1} md={4} className="g-4">
                  {elements}
              </Row>
          </div>
         
          )
}

export default MyCard




