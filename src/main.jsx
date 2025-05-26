import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from './pages/layouts/MainLayout.jsx';

const Homepage = React.lazy(() => import("./pages/home/HomePage.jsx"));
const CreatePage = React.lazy(() => import("./pages/create/CreatePage.jsx"));
const PostPage = React.lazy(() => import("./pages/post/PostPage.jsx"));
const ProfilePage = React.lazy(() => import("./pages/profile/ProfilePage.jsx"));
const SearchPage = React.lazy(() => import("./pages/search/SearchPage.jsx"));
const AuthPage = React.lazy(() => import("./pages/auth/AuthPage.jsx"));

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "./utils/ThemeContext.jsx";
import Settings from "./pages/settings/Settings.jsx";



const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider> {/* ✅ Wrap app here */}
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/pin/:id" element={<PostPage />} />
              <Route path="/:username" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
