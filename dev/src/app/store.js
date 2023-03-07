import { configureStore } from '@reduxjs/toolkit'
import { swaggerApi } from './swagger/swagger.api'
import switchReducer from '../components/Node/switchSlice'

export default configureStore({
  reducer: {
    [swaggerApi.reducerPath]: swaggerApi.reducer,
    switch: switchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swaggerApi.middleware),
})