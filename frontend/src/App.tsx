import React from "react";
import { SideBar, Menu, MenuItem, Submenus } from './components/layout/NavBar/index';
import './components/layout/NavBar/scss/sytle.scss';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
            <SideBar>
                <Menu iconShape='square'>
                    <MenuItem>Home</MenuItem>
                    <MenuItem>Explore</MenuItem>
                    <MenuItem>Notifications</MenuItem>
                    <MenuItem>Messages</MenuItem>
                    <MenuItem>Bookmarks</MenuItem>
                    <MenuItem>Lists</MenuItem>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>More</MenuItem>
                </Menu>
            </SideBar>
            </header>
        </div>
    );
}

export default App;