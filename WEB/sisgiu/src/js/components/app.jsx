import React from 'react';
import Header from './header'
import Login from './login'
import Footer from './footer'
// import UserList from '../containers/user-list';
// import UserDetails from '../containers/user-detail';
require('../../css/App.css');

const App = () => (
    <div>
        <Header />
        <hr />
        <Login />
        <hr/>
        <Footer />
    </div>
);

export default App;