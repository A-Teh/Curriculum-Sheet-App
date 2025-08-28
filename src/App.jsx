import Header from "./Header/Header.jsx"
import Sidebar from "./Sidebar/Sidebar.jsx"
import ClassSheet from "./ClassSheet/ClassSheet.jsx";
import ClassSelection from "./ClassSelection/ClassSelection.jsx";
import React, {useState, useEffect} from "react"
import './App.css';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 500);
  const [classSelectionOpen, setClassSelectionOpen] = useState(true);

    function toggleSidebar(){
        if(window.innerWidth <= 500){
            setSidebarOpen(!sidebarOpen);
        } 
    }

    function toggleClassSelection(){
        setClassSelectionOpen(!classSelectionOpen);
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
        <Sidebar isOpen={sidebarOpen}/>
        <div className="class-sheet-container">
          <ClassSheet major="CS-BS" toggleClassSelection={toggleClassSelection}/>
          <ClassSheet major="Gen-Ed" toggleClassSelection={toggleClassSelection}/>
        </div>
      </div>
      {classSelectionOpen && <ClassSelection toggleClassSelection={toggleClassSelection} />} 
    </>
    

  )
}

/*

*/

export default App
