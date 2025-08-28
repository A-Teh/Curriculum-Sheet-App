import Header from "./Header/Header.jsx"
import Sidebar from "./Sidebar/Sidebar.jsx"
import ClassSheet from "./ClassSheet/ClassSheet.jsx";
import React, {useState, useEffect} from "react"
import './App.css';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 500);

    function toggleSidebar(){
        if(window.innerWidth <= 500){
            setSidebarOpen(!sidebarOpen);
        } 
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
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen}/>
        <div className="class-sheet-container">
          <ClassSheet major="CS-BS"/>
          <ClassSheet major="Gen-Ed"/>
        </div>
      </div>
      
    </>
  )
}

export default App
