import './Sidebar.css'

function Sidebar({ isOpen, toggleMajorView, toggleSemesterView, toggleClassList  }){

    return(
        <div className={`sidebar ${isOpen ? "" : "closed"}`}>
            <ul className='view-list'>
                <li><a onClick={toggleMajorView}>Major View</a></li>
                <li><a onClick={toggleSemesterView}> Semester View</a></li>
                <li><a onClick={toggleClassList}>Class List</a></li>
            </ul>
            <ul className='import-classes'>
                <li><a>Import Classes</a></li>
            </ul>
        </div>
    )
}

export default Sidebar