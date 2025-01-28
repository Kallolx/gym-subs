import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'));
const Courses = lazy(() => import('./pages/Courses'));
const Blog = lazy(() => import('./pages/Blog'));
const Shop = lazy(() => import('./pages/Shop'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const SubscriptionPage = lazy(() => import('./pages/Subscription'));
const ExerciseLogPage = lazy(() => import('./pages/ExerciseLog'));
const ProgressPhotosPage = lazy(() => import('./pages/ProgressPhotos'));

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/profile" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/profile" />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/signin" />} />
            <Route
              path="/exercise-log"
              element={
                <ProtectedRoute>
                  <ExerciseLogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress-photos"
              element={
                <ProtectedRoute>
                  <ProgressPhotosPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;

