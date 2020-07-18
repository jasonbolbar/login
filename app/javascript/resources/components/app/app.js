import React from 'react'
import { Container } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from "../app-router/AppRouter";

const App = () => (
    <Router>
        <AppRouter />
    </Router>
);

export default App