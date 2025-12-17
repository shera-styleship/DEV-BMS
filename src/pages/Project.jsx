// src/pages/Project.jsx
import "@/pages/Project.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserDataContext } from "@/App";
import ProjectList from "@/components/feature/ProjectList";
import ProjectView from "@/components/feature/ProjectView";
import axios from "axios";

const TOKEN_KEY = "bms_token";
const WORKLIST_API = "https://bmsapi.styleship.com/api/WorkLists/search";

const Project = () => {
  const { projectRefresh } = useContext(UserDataContext);

  const nav = useNavigate();
  const { projectNo } = useParams(); // /project/:projectNo

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [companyOptions, setCompanyOptions] = useState([
    { value: "all", label: "전체 회사", companyNo: null },
  ]);

  // 회사 목록
  const fetchCompanies = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      console.error("토큰 없음 - 로그인 필요(회사 목록)");
      return;
    }

    try {
      const res = await axios.get(
        "https://bmsapi.styleship.com/api/Common/companies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );

      const apiCompanies = res.data || [];
      const options = [
        { value: "all", label: "전체 회사", companyNo: null },
        ...apiCompanies.map((c) => ({
          value: c.clientCompanyName,
          label: c.clientCompanyName,
          companyNo: c.clientCompanyNo,
        })),
      ];

      setCompanyOptions(options);
    } catch (err) {
      console.error("회사 목록 조회 실패:", err);
    }
  };

  // Work 리스트
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);

      const res = await axios.get(WORKLIST_API, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            }
          : { Accept: "*/*" },
      });

      const data = res.data || [];
      const list = Array.isArray(data) ? data : [];

      setProjects(list);
    } catch (err) {
      console.error("프로젝트(Work) 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 최초 로드
  useEffect(() => {
    fetchCompanies();
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 새로고침 시 리스트 다시
  useEffect(() => {
    if (!projectRefresh) return;
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectRefresh]);

  // URL projectNo + projects 로 선택 동기화
  useEffect(() => {
    if (!projects.length) {
      setSelectedProject(null);
      return;
    }

    if (!projectNo) {
      setSelectedProject(null);
      return;
    }

    const found = projects.find((p) => {
      const id =
        p.workNo ?? p.projectNo ?? p.id ?? p.workListNo ?? p.workID ?? null;
      return id != null && String(id) === String(projectNo);
    });

    setSelectedProject(found || null);
  }, [projects, projectNo]);

  // 리스트에서 클릭 시
  const handleSelect = (project) => {
    setSelectedProject(project);

    const id = project.workNo ?? project.projectNo;
    if (id != null) {
      nav(`/project/${id}`); // ⬅ 여기도 소문자 /project
    }
  };

  return (
    <div className="Project">
      <div className="project-wrap">
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ProjectList
              projects={projects}
              onSelect={handleSelect}
              companyOptions={companyOptions}
            />
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
