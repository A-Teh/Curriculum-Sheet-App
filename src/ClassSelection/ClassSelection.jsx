import { useState, useEffect } from "react";
import "./ClassSelection.css"

function ClassSelection({toggleClassSelection}){
    const desc = "Two CSC or CSF courses at the 300-level or above. CSC 392, 491, and 492 may only be used with department";
    const course = {
        "codes": [, "CSC310", "CSC372", "CSC402", "CSC406", "CSC415", "CSC436", "CSC450", "CSC461", "CSC462", "CSC481", "CSC493", "CSC310", "CSC372", "CSC402", "CSC406", "CSC415", "CSC436", "CSC450", "CSC461", "CSC462", "CSC481", "CSC493"],
        "min_level": null,
        "notes": "One course from this list is required."
    }
    const classDesc = "Programming for Data Science"
    return(
        <div className="class-selection-container">
            
            <div className="description">
                    <button className="exit-button" onClick={toggleClassSelection}>X</button>
                    <h1>{desc}</h1>
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
                        {course.codes.map(c => (
                            <tr >
                                <td>{c}</td>
                                <td>{classDesc}</td>
                                <td>4</td>
                                <td>A</td>
                                <td>Taken</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default ClassSelection