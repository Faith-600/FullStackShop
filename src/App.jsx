import React, { useState, useEffect } from 'react';
import Welcome from './assets/Components/Welcome';
import Signup from './assets/Components/Signup';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignIn from './assets/Components/SignIn';
import NotFound from './assets/Components/404';
import Chats from './assets/Components/Chats';
import Layout from './assets/Components/Layout';
import axios from 'axios';
import Market from './Redux/Market';
import Checkout from './Redux/Checkout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorFallback from './assets/Components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import Message from './assets/ChatApp/Message';
import ItemsDetail from './Redux/ItemsDetail';
import About from './assets/About/About';

export const UserContext = React.createContext();
export const PostsContext = React.createContext();

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const queryClient = new QueryClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://full-stack-shop-backend.vercel.app', { withCredentials: true })
      .then((res) => {
        if (res.data.valid) {
          setUsername(res.data.name);
          sessionStorage.setItem('username', res.data.name); // Using sessionStorage here
        } else {
          setUsername('Guest');
          sessionStorage.removeItem('username');
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []); 

  if (loading) {
    return <p className="Loading">Loading...</p>;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<SignIn />} errorElement={<ErrorFallback />} />
        <Route path="/login" element={<Signup />} errorElement={<ErrorFallback />} />
        <Route element={<Layout posts={posts} setPosts={setPosts} />} errorElement={<ErrorFallback />}>
          <Route path="/welcome" element={<Welcome posts={posts} setPosts={setPosts} />} errorElement={<ErrorFallback />} />
          <Route path="/thoughts" element={<Chats posts={posts} />} errorElement={<ErrorFallback />} />
          <Route path="/marketplace" element={<Market />} errorElement={<ErrorFallback />} />
          <Route path="/marketplace/product/:id" element={<ItemsDetail />} />
          <Route path="/checkout" element={<Checkout />} errorElement={<ErrorFallback />} />
          <Route path="/message" element={<Message />} errorElement={<ErrorFallback />} />
          <Route path="/about" element={<About />} errorElement={<ErrorFallback />} />
         
         

        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          console.log('Error boundary reset');
        }}
      >
        <UserContext.Provider value={{ username, setUsername }}>
          <QueryClientProvider client={queryClient}>
            <PostsContext.Provider value={{ posts, setPosts }}>
              <RouterProvider router={router} />
            </PostsContext.Provider>
          </QueryClientProvider>
        </UserContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
