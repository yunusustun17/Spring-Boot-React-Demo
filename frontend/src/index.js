import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap-override.scss';
import App from './App';
import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage';
import LanguageSelector from "./components/languageSelector";
import reportWebVitals from './reportWebVitals';
import './i18n';
import ApiProgress from "./common/ApiProgress";

ReactDOM.render(
  <React.StrictMode>
    <div>
        <ApiProgress>
        </ApiProgress>
        <LoginPage />
        <LanguageSelector />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
