import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../assets/styles/containers/App.scss';
import Layout from '../components/Static/Layout';
import TaskMenu from '../components/Body/TaskMenu/TaskMenu';
import Signin from '../components/Body/Signin';
import Login from '../components/Body/Login';
import Home from '../components/Body/Home';
import { getUserIsLog } from '../Redux/User/Selectors';

const App = () => {

    const isLog = useSelector(getUserIsLog);

    return (
        <>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/taskmenu" component={isLog ? TaskMenu : Login} />
                    <Route exact path="/signin" component={isLog ? TaskMenu : Signin} />
                    <Route exact path="/login" component={isLog ? TaskMenu : Login} />
                </Switch>
            </Layout>
        </>
    );
}

export default App;