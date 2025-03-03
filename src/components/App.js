import {lazy, Suspense} from 'react';
import '../scss/App.scss';
import Header from "./Header";
import VideoDashboard from "./VideoDashboard";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import {AppProvider} from '../context/AppContext';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const Shorts = lazy(() => import("./Shorts"));
const Subscription = lazy(() => import("./Subscription"));
const Account = lazy(() => import("./Account"));
const WatchVideo = lazy(() => import("./WatchVideo"));

function App() {
    return (
        <>
            <AppProvider>
                <Router>
                    <Header/>
                    <Loader></Loader>
                    <div className="container">
                        <Sidebar/>
                        <Suspense fallback={<main className="content">Loading...</main>}>
                            <Routes>
                                <Route path="/" element={<VideoDashboard/>}/>
                                <Route path="/shorts" element={<Shorts/>}/>
                                <Route path="/subscriptions" element={<Subscription/>}/>
                                <Route path="/account" element={<Account/>}/>
                                <Route path="/watch/:videoId/:title" element={<WatchVideo/>}/>
                                <Route path="*"
                                       element={<main className="content"><h1>404 - Page Not Found</h1></main>}/>
                            </Routes>
                        </Suspense>
                    </div>
                </Router>
            </AppProvider>
        </>
    );
}

export default App;
