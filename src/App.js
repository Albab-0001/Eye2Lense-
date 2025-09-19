import './utils/consoleCleanup';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkStatus from './components/NetworkStatus';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NetworkStatus />
        {/* Your existing app content */}
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
