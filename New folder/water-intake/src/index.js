import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Assuming you have your Redux store configured
import router from './router'; // Import your router configuration
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<React.StrictMode>
    <Provider store={store}>
    
        <RouterProvider router={router}/>
    
    </Provider>
  </React.StrictMode> 
);

reportWebVitals();
