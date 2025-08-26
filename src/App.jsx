import Header from "./Header/Header.jsx"
import Sidebar from "./Sidebar/Sidebar.jsx"
import React, {useState, useEffect} from "react"

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 500);

    function toggleSidebar(){
        if(window.innerWidth <= 500){
            setSidebarOpen(!sidebarOpen);
            console.log("toggle: " + sidebarOpen);
        } 
    }

    // Watch for window resize
    useEffect(() => {
      function handleResize() {
        if (window.innerWidth > 500) {
          setSidebarOpen(true);   // force open if wider than 500px
        } else {
          setSidebarOpen(false);
        }
      }

      window.addEventListener("resize", handleResize);

      // cleanup when component unmounts
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  return (
    <>
      <Header toggleSidebar={toggleSidebar}/>
      <Sidebar isOpen={sidebarOpen}/>
    </>
  )
}

export default App
