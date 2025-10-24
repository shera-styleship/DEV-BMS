// src/pages/Project.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../App";
import ProjectList from "../components/feature/ProjectList";
import ProjectView from "../components/feature/ProjectView";

// (파일 상단)
const API_BASE = "https://my-json-server.typicode.com/kjssong/mock-api";

const Project = () => {
  const { projectRefresh } = useContext(UserDataContext); // ✅ Context로부터 신호 감지
  const { projectNo } = useParams();
  const nav = useNavigate();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projectList`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 최초 로드
  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ 프로젝트 등록 등으로 projectRefresh 값이 바뀌면 다시 불러오기
  useEffect(() => {
    fetchProjects();
  }, [projectRefresh]);

  useEffect(() => {
    if (projectNo && projects.length > 0) {
      const found = projects.find((p) => p.projectNo === Number(projectNo));
      setSelectedProject(found || null);
    } else {
      setSelectedProject(null);
    }
  }, [projectNo, projects]);

  const handleSelect = (project) => {
    nav(`/project/${project.projectNo}`);
  };

  return (
    <div className="Project">
      <div className="project-wrap">
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ProjectList projects={projects} onSelect={handleSelect} />
          )}
        </div>
        <div>
          <ProjectView project={selectedProject} />
        </div>
      </div>
    </div>
  );
};

export default Project;

