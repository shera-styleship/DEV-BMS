// src/components/feature/ProjectView.jsx
import "@components/feature/ProjectView.css";
import { useState, useRef, useEffect } from "react";
import Select from "@components/common/Select";
import CommentTask from "@components/feature/CommentTask";
import FileTask from "@components/feature/FileTask";
import TimeTask from "@components/feature/TimeTask";
import { STATUS_OPTIONS_STYLESHIP } from "@/utils/constants";

const ProjectView = ({ project }) => {
  const [status, setStatus] = useState(project?.projectStatus);
  const [activeTab, setActiveTab] = useState("comment");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 36 });
  const [isDetailVisible, setIsDetailVisible] = useState(true);

  const controlRef = useRef(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleExpand = () => {
    setIsDetailVisible((prev) => !prev);
  };

  useEffect(() => {
    const container = controlRef.current;
    const activeBtn = container?.querySelector(`.control__btn.on`);
    if (activeBtn) {
      const span = activeBtn.querySelector("span");
      setIndicatorStyle({
        left:
          activeBtn.offsetLeft +
          activeBtn.clientWidth / 2 -
          span.offsetWidth / 2,
        width: span.offsetWidth,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    setStatus(project?.projectStatus);
  }, [project]);

  // 🔹 URL 복사 (projectNo 기준)
  const handleCopyURL = () => {
    if (!project) return;

    // ✅ 라우터가 /project/:projectNo 기준이니까 projectNo 우선
    const id = project.workNo ?? project.projectNo;

    if (!id) {
      alert("프로젝트 번호가 없습니다.");
      return;
    }

    const url = `${window.location.origin}/project/${id}`;
    navigator.clipboard.writeText(url);
    alert("URL이 복사되었습니다!");
    // showToast("URL이 복사되었습니다!");
  };

  // 🔹 날짜/시간 포맷터: 2025-08-06 오후 1:20:47
  const formatDateTime = (raw) => {
    if (!raw) return "";
    const d = new Date(raw);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = d.getHours();
    const ampm = hh >= 12 ? "오후" : "오전";
    const hour12 = hh % 12 || 12;
    const min = String(d.getMinutes()).padStart(2, "0");
    const sec = String(d.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${ampm} ${hour12}:${min}:${sec}`;
  };

  // 🔹 등록일로 쓸 필드 우선순위 (work 리스트 기준)
  const regDate =
    project?.workRegdate ||
    project?.projectDate ||
    project?.regDate ||
    project?.createdAt ||
    null;

  if (!project)
    return (
      <div className="ProjectView">
        <p className="no-txt">목록에서 프로젝트를 선택하세요.</p>
      </div>
    );

  return (
    <div className="ProjectView">
      <div className="project-info">
        <div className="hd">
          <div>
            <p className="number">{project.workNo}</p>
            <p className="brand">{project.projectName}</p>
          </div>
          <div>
            <button type="button" className="url__btn" onClick={handleCopyURL}>
              url 복사
            </button>

            <Select
              name="status"
              value={status}
              options={STATUS_OPTIONS_STYLESHIP}
              onChange={handleStatusChange}
              className={`_status _${status}`}
            />
          </div>
        </div>

        <p className="title">{project.workTitle}</p>

        <div className="bt">
          <div>
            <dl>
              <dt>작성자</dt>
              <dd>{project.writer}</dd>
            </dl>
          </div>
          <div>
            <dl>
              <dt>등록일</dt>
              <dd>{formatDateTime(regDate)}</dd>
            </dl>
            <dl>
              <dt>마감일</dt>
              <dd>{project.projectDeadline}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className={`project-detail ${!isDetailVisible ? "_close" : ""}`}>
        <div className="con">
          <p>{project.projectContent}</p>
        </div>
      </div>

      <div className="project-control" ref={controlRef}>
        <button
          type="button"
          className={`control__btn ${activeTab === "comment" ? "on" : ""}`}
          onClick={() => handleTabClick("comment")}
        >
          <span>코멘트</span>
        </button>
        <button
          type="button"
          className={`control__btn ${activeTab === "file" ? "on" : ""}`}
          onClick={() => handleTabClick("file")}
        >
          <span>파일 모아보기</span>
        </button>
        <button
          type="button"
          className={`control__btn ${activeTab === "time" ? "on" : ""}`}
          onClick={() => handleTabClick("time")}
        >
          <span>작업시간</span>
        </button>

        <button
          type="button"
          className="expand__btn"
          onClick={handleExpand}
        ></button>
        <div
          className="indicator-bar"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        ></div>
      </div>

      <div className="project-task">
        {activeTab === "comment" && (
          <CommentTask
            projectId={project.projectNo}
            projectCompany={project.projectCompany}
            projectTitle={project.projectTitle}
          />
        )}
        {activeTab === "file" && <FileTask projectId={project.projectNo} />}
        {activeTab === "time" && <TimeTask projectId={project.projectNo} />}
      </div>
    </div>
  );
};

export default ProjectView;
