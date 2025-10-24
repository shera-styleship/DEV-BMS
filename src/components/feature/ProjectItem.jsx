import Select from "../common/Select";
import { useState, useEffect } from "react";
import {PROJECT_STATUS_OPTIONS} from "../../utils/constants"

const ProjectItem = ({ project, onClick, onBrandClick })=>{
    const [status, setStatus] = useState("receipt");

    useEffect(() => {
        setStatus(project.projectStatus || "receipt");
    }, [project]);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        // ✅ 선택 시 DB에 반영하고 싶다면 여기에 fetch/axios로 PATCH 요청 추가 가능
        // fetch(`http://localhost:4000/projectList/${project.id}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ projectStatus: newStatus }),
        // });
    }; 

    return (
        <div className="ProjectItem" >
            <p className="date">{project.projectDate?.slice(5)}</p>
            <p className="number">{project.projectNo}</p>
            <p className="brand" onClick={onBrandClick}>{project.projectBrand}</p>
            <p className="type">{project.projectSort}</p> 
            <p className="title" onClick={onClick}>
                {project.projectTitle}
                <span className="tag">{project.projectTeam}</span> <span className="tag">@</span> <span className="tag new">N</span>
            </p>
            <Select 
                name="status"
                value={status}
                options={PROJECT_STATUS_OPTIONS}
                onChange={handleStatusChange}
                className={`_status _${status}`}
            />
        </div>
    )
}

export default ProjectItem;