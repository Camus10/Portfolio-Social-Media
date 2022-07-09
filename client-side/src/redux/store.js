import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index'


const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
const DataProvider = ({children}) => {
  return(
    <Provider store={Store}>
      {children}
    </Provider>
  )
}


export default DataProvider;