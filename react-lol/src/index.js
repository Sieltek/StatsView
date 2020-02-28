import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import NavBar from './component/nav-bar';

const Accueil = lazy(() => import('./view/accueil'));
const SummonerInfo = lazy(() => import('./view/summonerInfo'));
// const Notfound = lazy(() => import('./component/not-found'));

const routing = (
    <Router>
        <Suspense fallback={
            <div>
                <NavBar />
                <Spinner animation="border" role="status" variant="secondary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }>
            <div>
                <NavBar />
                <Route exact path="/" component={Accueil} />
                <Route path="/summoner/:pseudo" component={SummonerInfo} />
            </div>
        </Suspense>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
