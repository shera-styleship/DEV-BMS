import "@components/feature/ProjectList.css";
import { useState, useEffect } from "react";
import ProjectFilterBar from "@components/feature/ProjectFilterBar";
import ProjectItem from "@components/feature/ProjectItem";

const ProjectList = ({ projects, onSelect }) => {
  const [filters, setFilters] = useState({
    company: "",
    brand: "",
    team: "",
    keyword: "",
    status: "active",
    startDate: "",
    endDate: "",
  });

  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const init = projects
      .filter(
        (p) =>
          p.projectStatus === "receipt" ||
          p.projectStatus === "progress" ||
          p.projectStatus === "hold"
      )
      // 최신순 정렬 추가
      .sort((a, b) => b.projectNo - a.projectNo);
    setFilteredProjects(init);
  }, [projects]);

  const handleFilter = (newFilters, isDateSearch = false) => {
    setFilters(newFilters); // 필터 상태 갱신

    let result = [...projects];

    // 회사별
    if (newFilters.company && newFilters.company !== "all") {
      result = result.filter((p) => p.projectCompany === newFilters.company);
    }

    // 브랜드별
    if (newFilters.brand && newFilters.brand !== "all") {
      result = result.filter((p) => p.projectBrand === newFilters.brand);
    }

    // 팀별
    if (newFilters.team && newFilters.team !== "all") {
      result = result.filter(
        (p) => p.projectTeam.toLowerCase() === newFilters.team.toLowerCase()
      );
    }

    // 키워드 검색
    if (newFilters.keyword && newFilters.keyword.trim() !== "") {
      const keyword = newFilters.keyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.projectTitle.toLowerCase().includes(keyword) ||
          p.writer.toLowerCase().includes(keyword)
      );
    }

    // 진행 상태
    if (newFilters.status === "active") {
      result = result.filter(
        (p) =>
          p.projectStatus === "receipt" ||
          p.projectStatus === "progress" ||
          p.projectStatus === "hold"
      );
    } else if (newFilters.status === "done") {
      result = result.filter(
        (p) => p.projectStatus === "completion" || p.projectStatus === "cancel"
      );
    }

    // 날짜 필터
    if (isDateSearch && newFilters.startDate && newFilters.endDate) {
      const start = new Date(newFilters.startDate);
      const end = new Date(newFilters.endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter((p) => {
        const date = new Date(p.projectDate);
        return date >= start && date <= end;
      });
    }
    result.sort((a, b) => b.projectNo - a.projectNo);
    setFilteredProjects(result);
  };

  // 브랜드 클릭 시 필터 상태 변경
  const handleBrandClick = (brandName) => {
    const updated = { ...filters, brand: brandName };
    handleFilter(updated);
  };

  return (
    <div className="ProjectList">
      <ProjectFilterBar
        filters={filters}
        setFilters={setFilters}
        onFilter={handleFilter}
      />

      <div className="item-list-bar">
        <p className="date">등록일</p>
        <p className="number">번호</p>
        <p className="brand">브랜드</p>
        <p className="type">분류</p>
        <p className="title">제목</p>
        <p className="status">상태</p>
      </div>

      <div className="item__list">
        {filteredProjects.map((p) => (
          <ProjectItem
            key={p.projectNo}
            project={p}
            onClick={() => onSelect(p)}
            onBrandClick={() => handleBrandClick(p.projectBrand)}
          />
        ))}
        {filteredProjects.length === 0 && (
          <p className="no-txt">조건에 맞는 프로젝트가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
