import{combineReducers} from "redux";
import authReducer from './authReducer';
import crudTemplate from './crudTemplate';
import crudUser from './crudUser';

const rootReducers=combineReducers({
    authReducer,
    crudTemplate,
    crudUser
});

export default rootReducers;