import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

//API data
import getAPIData from './api/getData'

//Components
import NavBar from './components/NavBar';
import Grid from './components/Grid';
import HistoryNavigation from './components/HistoryNavigation';
import LoadingSpinner from './components/LoadingSpinner';
import Errors from './components/Error';

const App = () => {
    //Error handling
    const [errors, setErrors] = useState([]);

    //Menu browsing data
    const [selectedMenu, setSelectedMenu] = useState('main');
    const [mainMenu, setMainMenu] = useState([]);
    const [menuHistory, setMenuHistory] = useState(['main']);
    const [menuHistoryPosition, setMenuHistoryPosition] = useState(0);

    //Data coming from API
    const [sections, setSections] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //Language (we'll use only en)
    const [language, setLanguage] = useState('');

    //Getting needed data for building main menu
    const getMainMenu = (sections, menu, language) => {
        const menuLayout = [];

        menu.forEach(data => {
            const menuItemData = {}

            //Check if menu id is avaiable on sections data
            if (data._ref in sections) {
                menuItemData['image'] = "http://localhost:3000/images/" + sections[data._ref].image.asset._ref;
                menuItemData['name'] = sections[data._ref].name[language];
                menuItemData['key'] = sections[data._ref]._id;

                menuLayout.push(menuItemData);
            }
        })

        setMainMenu(menuLayout);
    }

    useEffect(() => {
        setIsLoading(true);

        async function fetchApi(apiData) {
            apiData = await getAPIData();
            return apiData;
        }

        fetchApi().then(result => {
            setErrors(result.error);
            setSections(result.sections);
            setItems(result.items);
            setLanguage('en');

            if (result.error.length <= 0 && result.sections && result.menu) {
                getMainMenu(result.sections, result.menu, 'en')
            }

            setIsLoading(false);
        });
    }, [])

    //Handler for selecting menu from navbar
    const handleSelectedMenu = (menuId) => {
        //When clicking on navbar menu, we reset history position to the last menu
        setMenuHistoryPosition(menuHistory.length);

        setMenuHistory(menuHistory => [...menuHistory, menuId])
        setSelectedMenu(menuId);
    }

    //Handler for browsing menus history
    const handleBrowseHistory = (menuId, position) => {
        setMenuHistoryPosition(position);
        setSelectedMenu(menuId);
    }

    return (
        <React.StrictMode>
            {
                isLoading && errors.length <= 0 ? <LoadingSpinner /> :
                    <div id='App'>
                        <NavBar
                            selectedMenu={selectedMenu}
                            onMenuSelect={handleSelectedMenu}
                            mainMenu={mainMenu}
                            language={language}
                        />
                        <Grid
                            selectedMenu={selectedMenu}
                            mainMenu={mainMenu}
                            sections={sections}
                            items={items}
                            language={language}
                        />
                        <HistoryNavigation
                            menuHistoryPosition={menuHistoryPosition}
                            menuHistory={menuHistory}
                            onBrowseHistory={handleBrowseHistory}
                        />
                    </div>
            }
            {
                errors.length > 0 ? <Errors errors={errors} /> : ''
            }
        </React.StrictMode>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
