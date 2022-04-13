import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                'Welcome to React': 'Welcome to React and react-i18next',
                'Sign Up': 'Sign Up',
                'Passwords do not match': 'Passwords do not match',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Repeat Password': 'Repeat Password',
                'Login': 'Login',
            },
        },
        tr: {
            translation: {
                'Welcome to React': 'React ve react-i18next\'e hoş geldiniz',
                'Sign Up': 'Kayıt Ol',
                'Passwords do not match': 'Parolalar eş değil',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Görünüm Adı',
                'Password': 'Parola',
                'Repeat Password': 'Tekrar Parola',
                'Login': 'Giriş Yap',
            },
        },
    },
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;