import { useState, useEffect } from "react";
import "./ClassSelection.css"

function ClassSelection({toggleClassSelection, selectedRequirement}){

    const [majorCourses, setMajorCourses] = useState(null);
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        const uniqueMajorCodes = [...new Set(selectedRequirement.codes.map(code => code.slice(0, 3)))];
        let majorData = {}
        for (const majorCode of uniqueMajorCodes){
            fetch(`/Curriculum-Sheet-App/class-data/${majorCode}_courses.json`)
            .then(res => res.json())
            .then(data => majorData[majorCode] = data)
        }
        setMajorCourses(majorData)

        fetch(`/Curriculum-Sheet-App/student-data/student-data.json`)
        .then(res => res.json())
        .then(data => setStudentData(data));
    }, []);

    if (!majorCourses || Object.keys(majorCourses).length === 0) {
        return <p>Loading courses...</p>;
    }


    function displayClassData(code){
        const majorCode = code.slice(0,3)
        const currCourses = majorCourses[majorCode];

        if (!currCourses) {
            return <td>Loading course...</td>;
        }

        const course = currCourses.find(c => c.code === code);
        const studentDatum = studentData.find(c => c.code === code);

        let title = ""
        let credits = ""
        let grade = ""
        
        if (course){
            title = course.title;
            credits = typeof course.credits === "object" ?  `${course.credits.min}-${course.credits.max}` : course.credits;  //Account for classes with varible credits
        }

        if (studentDatum){
            grade = studentDatum.grade;
        }
        
        const status = grade ? "Taken" : "Not Taken"
        
        return (
            <>
                <td>{code}</td>
                <td>{title}</td>
                <td>{credits}</td>
                <td>{grade}</td>
                <td>{status}</td>
            </>
        )
    }
    
    return(
        <div className="class-selection-container">
            
            <div className="description">
                    <button className="exit-button" onClick={() => toggleClassSelection(null)}>X</button>
                    <h1>{selectedRequirement.notes || "One course from this list is required."}</h1>
                </div>
            <div className="class-selection">
                <table className="class-table">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Description</th>
                            <th>Credits</th>
                            <th>Grade</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedRequirement.codes.map(c => (
                            <tr key={c}>
                                {displayClassData(c)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default ClassSelection