import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Page404, PageGame, PageHome, PageInstructions } from '../pages';

export const router = createBrowserRouter([
    { path: '/', element: <PageHome /> },
    { path: '/game/:id', element: <PageGame /> },
    { path: '/instructions/:id', element: <PageInstructions /> },
    { path: '*', element: <Page404 /> },
]);
