import { useState, useEffect } from "react";
import "./ClassSheet.css"

function ClassSheet({ major, toggleClassSelection}){

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`/Curriculum-Sheet-App/majors/${major}.json`)
        .then(res => res.json())
        .then(data => setCourses(data));
  }, []);

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
                    <tr key={course.codes[0]}>
                        <td>{course.codes[0]}
                            {(course.codes.length !== 1)&&(<button className="selection-button" onClick={toggleClassSelection}>&gt;</button>)}
                        </td>
                        <td></td>
                        <td>{course.credits}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ClassSheet