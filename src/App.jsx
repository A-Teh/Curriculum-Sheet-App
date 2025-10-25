import Header from "./Header/Header.jsx"
import Sidebar from "./Sidebar/Sidebar.jsx"
import ClassSheet from "./ClassSheet/ClassSheet.jsx";
import ClassList from "./ClassList/ClassList.jsx";
import ClassSelection from "./ClassSelection/ClassSelection.jsx";
import SemesterView from "./SemesterView/SemesterView.jsx";
import React, {useState, useEffect} from "react"
import './App.css';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 500);
  const [classSelectionOpen, setClassSelectionOpen] = useState(false);
  const [majorViewOpen, setMajorViewOpen] = useState(true);
  const [classListOpen, setClassListOpen] = useState(false);
  const [semesterViewOpen, setSemesterViewOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(false);
  

    function toggleSidebar(){
        if(window.innerWidth <= 500){
            setSidebarOpen(!sidebarOpen);
        } 
    }

    function toggleClassSelection(course){
        setClassSelectionOpen(!classSelectionOpen);
        setSelectedRequirement(course);
    }

    function toggleMajorView(){
      setMajorViewOpen(true);
      setSemesterViewOpen(false);
      setClassListOpen(false);
    }

    function toggleSemesterView(){
      setMajorViewOpen(false);
      setSemesterViewOpen(true);
      setClassListOpen(false);
    }

    function toggleClassList(){
      setMajorViewOpen(false);
      setSemesterViewOpen(false);
      setClassListOpen(true);
    }

    // Adjust window size
    useEffect(() => {
      function handleResize() {
        if (window.innerWidth > 500) {
          setSidebarOpen(true);   
        } else {
          setSidebarOpen(false);
        }
      }

      window.addEventListener("resize", handleResize);

      // cleanup 
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  return (
    <>
      <Header toggleSidebar={toggleSidebar}/>
      <div className={`app-body ${classSelectionOpen ? "blurred" : ""}`}>
        <Sidebar isOpen={sidebarOpen} toggleMajorView={toggleMajorView} toggleSemesterView={toggleSemesterView} toggleClassList={toggleClassList}/>
        {majorViewOpen && <div className={`class-sheet-container ${sidebarOpen && window.innerWidth <= 500? "blurred" : ""}`}>
          <ClassSheet major="CS-BS" toggleClassSelection={toggleClassSelection}/>
          <ClassSheet major="Gen-Ed" toggleClassSelection={toggleClassSelection}/>
        </div> }
        {semesterViewOpen && <SemesterView sidebarOpen={sidebarOpen}/>}
        {classListOpen && <ClassList sidebarOpen={sidebarOpen}/>}
      </div>
      {classSelectionOpen && <ClassSelection toggleClassSelection={toggleClassSelection} selectedRequirement={selectedRequirement}/>}
      
    </>
    

  )
}

/*

*/

export default App
