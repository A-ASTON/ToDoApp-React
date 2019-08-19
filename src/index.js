import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import '../src/style.css';

const App = () => (
    <div>
    React
    <Header />
    <MainContent />
    <Footer />    
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));