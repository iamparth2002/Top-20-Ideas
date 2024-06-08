import { useState } from 'react';
import './App.css';
import { ThemeContext } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateScreen from './screens/CreateScreen';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/create',
    element: <CreateScreen />,
  },
]);

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme} className="flex items-center justify-center">
        <RouterProvider router={router} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
