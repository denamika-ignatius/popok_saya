import { 
   SELECT_POPOK
} from '../actions/types';

const INITIAL_STATE = { id: 0, nama: '', harga: 0, img: '', description: '', merk: ''};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECT_POPOK :
            return action.payload;
        default :
            return state;
    }
}