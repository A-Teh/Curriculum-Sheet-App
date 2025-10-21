import { useState, useEffect } from "react";
import "./ClassSelection.css"

function PlanClass({togglePlanClass, planClass}){
    const currentYear = new Date().getFullYear();
    const [season, setSeason] = useState("Fall");
    const [year, setYear] = useState(currentYear);

    const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

    function updatePlannedClass(){
        
    }
    
    // Set year options to current and next 4 year
    return(
        <div className="plan-class-container">
            <div className="title">
                <h1>{`Plan to take ${planClass}`}</h1>
                 <button className="exit-button" onClick={() => togglePlanClass(null)}>X</button>
            </div>
            <div className="plan-class">
                <select value={season} onChange={(e) => {setSeason(e.target.value)}}>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                </select>
                <select value={year} onChange={(e) => {setYear(Number(e.target.value))}}>
                    {years.map((y) => (
                        <option key={y} value={y}>
                        {y}
                        </option>
                    ))}   
                </select>
                <button className="done-button" onClick={() => togglePlanClass(null)}>Done</button>
            </div>
            
        </div>
    )
}

export default PlanClass