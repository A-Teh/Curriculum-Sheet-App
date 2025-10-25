import './Header.css';

function Header({ toggleSidebar, toggleSemesterView, toggleClassList }){

    const hamburgerIconLight = 'src/assets/hamburger_icon_light.png'
    const hamburgerIconDark = 'src/assets/hamburger_icon_dark.png'

    return(
        <div className='header'>
            
            <div className='mobile-sidebar-toggle'>
                <img className='light-icon' src= {hamburgerIconLight}  onClick={toggleSidebar}/>
                <img className='dark-icon' src= {hamburgerIconDark} onClick={toggleSidebar}/>
            </div>
            <div className="title">
                <h1>URI Curriculum Sheet</h1>
            </div>
            <nav>
                <div  className='desktop-nav'>
                    <ul>
                        <li><a href=''>About</a></li>
                        <li><a href=''>FAQ</a></li>
                        <li><a href=''>...</a></li>
                    </ul>
                </div>
                <div className='mobile-nav'>
                    <ul className='mobile-nav'>
                        <li><a href=''>...</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header