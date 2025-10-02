import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RouteHandler from './components/routing/RouteHandler';

// Main App Component with AuthProvider and Router
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteHandler />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
