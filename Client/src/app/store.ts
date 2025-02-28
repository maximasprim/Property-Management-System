import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '../features/Login/loginApi';
import authReducer from '../features/Login/loginSlice';
// import registerSlice from '../features/Register/RegisterSlice';
import { registerApi } from '../features/Register/RegisterApi';
import { vehiclesApi } from '../features/Vehicles/VehicleApi';
import {landsApi} from '../features/Lands/LandsApi';
import { HousesApi } from '../features/Houses/HousesApi';
import {usersApi} from '../features/users/usersApi';
import {locationsApi} from '../features/Location/LocationApi';
import {propertiesApi} from '../features/All_PropertyTypes/PropertyApi';
import {reviewApi} from '../features/Reviews/ReviewApi';


const rootReducer = combineReducers({
    // users: usersReducer,
    auth: authReducer,
    [authApi.reducerPath]:authApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [landsApi.reducerPath]: landsApi.reducer,
    [HousesApi.reducerPath]: HousesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,

});

const persistConfig = {
  key: 'root',
  
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware).concat(registerApi.middleware).concat(vehiclesApi.middleware)
    .concat(landsApi.middleware).concat(HousesApi.middleware).concat(usersApi.middleware).concat(locationsApi.middleware)
    .concat(propertiesApi.middleware).concat(reviewApi.middleware),

}) as any;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;