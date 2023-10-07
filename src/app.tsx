import { useEffect } from 'react';
import Cookies from 'js-cookie';

const App = () => {
    useEffect(() => {
        Cookies.set('CASTGC', 'TGT-156575-EPpahj50cy3FUyM72ZgHe9coNswJIrZBler1ygWw1fI9WByKmk-portal.supcon.com;');
        Cookies.set('JSESSIONID', 'D1CC5C171623D3474E986E4A79DC7AE1;');
        fetch('/portal/cas-web/login', {
            method: 'GET',
            redirect: 'manual',
            credentials: 'include',
        }).then((res) => {
            console.log(res);
        });
    }, []);

    return <>App</>;
};

export default App;
