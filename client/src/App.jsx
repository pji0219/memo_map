import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// 페이지
import MainPage from './pages/MainPage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/upload" exact component={UploadPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
