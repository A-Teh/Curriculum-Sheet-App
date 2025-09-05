import { useState, useEffect } from "react";
import "./ClassSheet.css"

function ClassSheet({ major, toggleClassSelection}){

    const [courses, setCourses] = useState([]);
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        fetch(`/Curriculum-Sheet-App/majors/${major}.json`)
        .then(res => res.json())
        .then(data => setCourses(data));

        fetch(`/Curriculum-Sheet-App/student-data.json`)
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
                        <td>{getSemesterTaken(course.codes[0])}</td>
                        <td>{getCreditsTaken(course.codes[0])}</td>
                        <td>{getGrade(course.codes[0])}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ClassSheet