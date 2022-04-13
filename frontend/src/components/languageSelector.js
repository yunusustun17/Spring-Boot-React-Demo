import React from "react";
import {changeLanguage} from "../api/apiClass";
import {withTranslation} from "react-i18next";

const LanguageSelector = (props) => {
    const onChangeLanguage = language => {
        const {i18n} = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    return (
        <div className="container">
            <a href="#" onClick={() => onChangeLanguage('tr')}>turkish </a>
            <a href="#" onClick={() => onChangeLanguage('en')}>english </a>
        </div>
    );
}

export default withTranslation()(LanguageSelector);