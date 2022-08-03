import React from 'react';
import '../styles/navBar.css'

const NavBar = (props) => {
    
    //Setting styles for selected menu
    let ifSelected = document.getElementsByClassName("selected");

    if (ifSelected.length > 0){
        ifSelected[0].classList.remove('selected');
    }

    let current = document.getElementById(props.selectedMenu);
    if (current) current.classList.add('selected');
    
    
    //Handler for setting the menu clicked 
    const handleSelectedMenu = (e) => {
        let menuId = e.target.dataset.menuid;

        props.onMenuSelect(menuId);
    }

    let mainMenu = props.mainMenu;

    const renderNavBar = () => {
        return mainMenu.map(menuOption => {
            return (
                <div className='p-2 imageContainer' key={menuOption.key} onClick={handleSelectedMenu} data-menuid={menuOption.key} id={menuOption.key}>
                    <img width="125" height="125" className="image-fluid" src={menuOption.image} alt={menuOption.name} data-menuid={menuOption.key} />
                    <span data-menuid={menuOption.key}>{menuOption.name}</span>
                </div>)
        })
    }

    return (
        <div className="d-flex flex-row menu">
            <div className='p-2 imageContainer' key='bk_logo' id='main' onClick={handleSelectedMenu} data-menuid='main'>
                <img data-menuid='main' width="125" height="125" className="image-fluid" src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/User_BK_Logo.svg/1200px-User_BK_Logo.svg.png' alt='Burguer King logo' />
                <span data-menuid='main'>MENU</span>
            </div>
            {renderNavBar()}
        </div>
    )
}


export default NavBar;

