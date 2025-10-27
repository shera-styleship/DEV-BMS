import "@components/feature/ProjectView.css";
import { useState, useRef, useEffect } from "react";
import Select from "@components/common/Select";
import CommentTask from "@components/feature/CommentTask";
import FileTask from "@components/feature/FileTask";
import TimeTask from "@components/feature/TimeTask";
import { PROJECT_STATUS_OPTIONS } from "@/utils/constants";

const ProjectView = ({ project }) => {
  const [status, setStatus] = useState(project?.projectStatus);
  const [activeTab, setActiveTab] = useState("comment");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
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

  const handleCopyURL = () => {
    const url = `${window.location.origin}/project/${project.projectNo}`;
    navigator.clipboard.writeText(url);
    alert("URL이 복사되었습니다!");
    //showToast("URL이 복사되었습니다!");
  };

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
            <p className="number">{project.projectNo}</p>
            <p className="brand">{project.projectBrand}</p>
          </div>
          <div>
            <button type="button" className="url__btn" onClick={handleCopyURL}>
              url 복사
            </button>

            <Select
              name="status"
              value={status}
              options={PROJECT_STATUS_OPTIONS}
              onChange={handleStatusChange}
              className={`_status _${status}`}
            />
          </div>
        </div>

        <p className="title">{project.projectTitle}</p>

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
              <dd>{project.projectDate}</dd>
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
          />
        )}
        {activeTab === "file" && <FileTask projectId={project.projectNo} />}
        {activeTab === "time" && <TimeTask projectId={project.projectNo} />}
      </div>
    </div>
  );
};

export default ProjectView;
