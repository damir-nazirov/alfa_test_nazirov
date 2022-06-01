import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../hooks/http.hook';

const initialState = {
    cards: '',
    cardsLoadingStatus: 'start',
}

export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async () => {
        const {request} = useHttp();
        return await request("https://picsum.photos/v2/list?page=2&limit=16");
    }
);

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        onDeleteCard: (state, action) => {
            state.cards = state.cards.filter(item => 
                 item.id !== action.payload
            )
        },
        onLikeCard: (state, action) => {
            state.cards = state.cards.map((item) => {
                if (item.id === action.payload) {
                    return {...item, liked: !item.liked}
                }

                else {return item}
            } )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.pending, state => {state.cardsLoadingStatus = 'loading'})
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.cardsLoadingStatus = 'idle';
                state.cards = action.payload.map((item) => {
                   return {...item, liked: false}
                });
            })
            .addCase(fetchCards.rejected, state => {
                state.cardsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});


const {actions, reducer} = cardsSlice;

export default reducer;
export const {
    onDeleteCard,
    onLikeCard,
} = actions;


export const filteredCardsSelector = createSelector(
    (state) => state.filters.liked,
    (state) => state.cards.cards,
    (filter, cards) => {
        if (filter === false) {
            return cards;
        } else {
            return cards.filter(item => item.liked === filter);
        }
    }
);
