import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PageHome } from '../pages';
import { PageCreateGame } from '../pages/page-create-game/page-create-game';
import { PageEditGame } from '../pages/page-edit-game/page-edit-game';

export const router = createBrowserRouter([
    { path: '/', element: <PageHome /> },
    { path: '/new', element: <PageCreateGame /> },
    { path: '/game/:id', element: <PageEditGame /> },
]);
