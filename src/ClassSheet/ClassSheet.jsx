import { useState, useEffect } from "react";
import "./ClassSheet.css"

function ClassSheet({ major, toggleClassSelection}){

    const [courses, setCourses] = useState([]);
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        fetch(`/Curriculum-Sheet-App/majors/${major}.json`)
        .then(res => res.json())
        .then(data => setCourses(data));

        fetch(`/Curriculum-Sheet-App/student-data/student-data.json`)
        .then(res => res.json())
        .then(data => setStudentData(data));

    }, []);

    function getSemesterTaken(code){
        const course = studentData.find(c => c.code === code);
        return course ? course.semester : null;
    }

    function getCreditsTaken(code){
        const course = studentData.find(c => c.code === code);
        return course ? course.credits : null;
    }

    function getGrade(code){
        const course = studentData.find(c => c.code === code);
        return course ? course.grade : null;
    }

    // Returns the code, semester, credits, and grade of a given requirement for a major
    function displayRequirementData(course){
        
        const code = course.codes[0] // For now always display the first class, in the future this can be modified and stored in local memory
        const semester = getSemesterTaken(code)
        const credits = getCreditsTaken(code)
        const grade = getGrade(code)

        // Add aterisk if class is only planned (will color code later)
        // Displays button only if there are multiple options for the class to select from
        // Display grade only if class is taken
        return(
            <tr key={code}>
                <td>{course.codes[0]}
                    {grade === "Planned" ? "*" : ""}
                    {(course.codes.length !== 1)&&(<button className="selection-button" onClick={() => toggleClassSelection(course)}>&gt;</button>)}
                </td>
                <td>{semester}</td>
                <td>{credits}</td>
                <td>{grade && !(grade === "Planned") ? grade : null}</td> 
            </tr>
        )
    }

    return(
        <table className="class-sheet">
            <thead>
                <tr>
                    <th colSpan="4" className="major-title">{major}</th>
                </tr>
                <tr>
                    <th>Class</th>
                    <th>Semester</th>
                    <th>Credits</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(course => (
                    displayRequirementData(course)
                ))}
            </tbody>
        </table>
    )
}

export default ClassSheet