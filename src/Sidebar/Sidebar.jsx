import './Sidebar.css'

function Sidebar({ isOpen }){

    return(
        <div className={isOpen ? "sidebar" : "sidebar-closed"}>
            <ul className='view-list'>
                <li><a>Major View</a></li>
                <li><a>Semester View</a></li>
                <li><a>Class List</a></li>
            </ul>
            <ul className='import-classes'>
                <li><a>Import Classes</a></li>
            </ul>
        </div>
    )
}

export default Sidebar