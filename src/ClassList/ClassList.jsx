import { useState, useEffect } from "react";
import "./ClassList.css"

function ClassList({sidebarOpen}){

    const [studentData, setStudentData] = useState([]);

    useEffect(() => {

        fetch(`/Curriculum-Sheet-App/student-data/student-data.json`)
        .then(res => res.json())
        .then(data => setStudentData(data));

     }, []);

     // Returns the code, semester, credits, and grade of a each class taken by the student
    function displayRequirementData(course){
        
        const code = course.code
        const semester = course.semester
        const credits = course.credits
        const grade = course.grade

        // Display grade only if class is taken
        return(
            <tr key={code}>
                <td>{code}</td>
                <td>{semester}</td>
                <td>{credits}</td>
                <td>{grade && !(grade === "Planned") ? grade : null}</td> 
            </tr>
        )
    }


    return(
        <table className={`class-list ${sidebarOpen && window.innerWidth <= 500? "blurred" : ""}`}>
            <thead>
                <tr>
                    <th>Class</th>
                    <th>Semester</th>
                    <th>Credits</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {studentData.map(course => (
                    displayRequirementData(course)
                ))}
            </tbody>
        </table>
    )
}

export default ClassList