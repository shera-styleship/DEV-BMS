import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import LogoStyleship from "../../assets/images/common/logo_styleship.png";
import NewProject from "../feature/NewProject";
import { UserDataContext } from "../../App";

function Lnb() {
  const [showNewProject, setShowNewProject] = useState(false);
  const { alertState, handleAlertBtn } = useContext(UserDataContext);

  return (
    <nav className="Lnb">
      <ul className="button-list">
        <li className="project-write">
          <button onClick={() => {
              setShowNewProject(true);
              handleAlertBtn(); 
            }}
          >
            <span className="button-icon icon-pencil"></span>
            <span className="button-name">프로젝트 생성</span>
          </button>
        </li>
        <li>
          <NavLink
            to="/Project"
            className={({ isActive }) => (isActive ? "lnb-on" : "")}
          >
            <span className="button-icon icon-project"></span>
            <span className="button-name">프로젝트</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/MyProject"
            className={({ isActive }) => (isActive ? "lnb-on" : "")}
          >
            <span className="button-icon icon-myProject"></span>
            <span className="button-name">나의 프로젝트</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Schedule"
            className={({ isActive }) =>
              `arrow-right ${isActive ? "lnb-on" : ""}`
            }
          >
            <span className="button-icon icon-schedule"></span>
            <span className="button-name">일정 관리</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Knowledge"
            className={({ isActive }) =>
              `arrow-right ${isActive ? "lnb-on" : ""}`
            }
          >
            <span className="button-icon icon-knowledge"></span>
            <span className="button-name">사내 지식</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Hr"
            className={({ isActive }) => (isActive ? "lnb-on" : "")}
          >
            <span className="button-icon icon-hr"></span>
            <span className="button-name">인사 정보</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Setting"
            className={({ isActive }) => (isActive ? "lnb-on" : "")}
          >
            <span className="button-icon icon-setting"></span>
            <span className="button-name">설정</span>
          </NavLink>
        </li>
      </ul>

      <div className="logo-styleship">
        <NavLink to="/">
          <img src={LogoStyleship} alt="logo" />
        </NavLink>
      </div>


      {showNewProject && alertState === "on" && (
        <NewProject
          onClose={() => {
            setShowNewProject(false);
            handleAlertBtn(); // 닫을 때도 상태 초기화
          }}
        />
      )}
    </nav>
  );
}

export default Lnb;
