import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { configureStore } from '@reduxjs/toolkit';

console.log('account reducer', accountReducer);

const store = configureStore({
	reducer: {
		account: accountReducer,
		customer: customerReducer,
	},
});
export default store;
