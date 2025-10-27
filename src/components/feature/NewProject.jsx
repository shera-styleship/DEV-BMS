import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button";
import Select from "@components/common/Select";
import Input from "@components/common/Input";
import Alert from "@components/common/Alert";
import { UserDataContext } from "@/App";
import "./NewProject.css";

const NewProject = ({ alertType = true, onClose }) => {
  const { userData, auth, refreshProjects } = useContext(UserDataContext);
  const nav = useNavigate();

  // Alert 관련 로컬 상태 (전역 alertState와 분리)
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const openAlert = (msg) => {
    setErrorMsg(msg);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const [form, setForm] = useState({
    company: "",
    brand: "",
    writer: "",
    title: "",
    endDate: "",
    type: "",
    description: "",
  });

  // 회사별 브랜드 매핑
  const brandOptionsByCompany = {
    "NPLUS(네파)": [
      { value: "NEPA", label: "NEPA" },
      { value: "NEKI", label: "NEKI" },
    ],
    "미스토코리아(주)": [
      { value: "FILA", label: "FILA" },
      { value: "KEDS", label: "KEDS" },
    ],
    STYLESHIP: [
      { value: "NEPA", label: "NEPA" },
      { value: "NEKI", label: "NEKI" },
      { value: "FILA", label: "FILA" },
      { value: "KEDS", label: "KEDS" },
    ],
  };

  const companyOptions = [
    { value: "NPLUS(네파)", label: "NPLUS(네파)" },
    { value: "미스토코리아(주)", label: "미스토코리아(주)" },
    { value: "STYLESHIP", label: "STYLESHIP" },
  ];

  const loginUser = userData.find((u) => u.id === auth.userId);
  const isStyleShipUser = loginUser?.userCompany === "STYLESHIP";

  // 로그인된 사용자 기준 기본값 세팅
  useEffect(() => {
    if (loginUser) {
      const defaultCompany = loginUser.userCompany || "";
      const defaultBrand =
        brandOptionsByCompany[defaultCompany]?.[0]?.value || "";
      setForm((prev) => ({
        ...prev,
        company: defaultCompany,
        writer: loginUser.userName || "",
        brand: defaultBrand,
      }));
    }
  }, [loginUser]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "company") {
        const firstBrand = brandOptionsByCompany[value]?.[0]?.value || "";
        return { ...prev, company: value, brand: firstBrand };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const availableBrandOptions = brandOptionsByCompany[form.company] || [];

  // 프로젝트 번호 자동 증가
  const getNextProjectNo = async () => {
    try {
      const res = await fetch("http://localhost:4000/projectList");
      const data = await res.json();
      if (data.length === 0) return 10001;
      const maxNo = Math.max(...data.map((p) => Number(p.projectNo)));
      return maxNo + 1;
    } catch {
      return Math.floor(Math.random() * 90000) + 10000;
    }
  };

  const handleSubmit = async () => {
    // 입력 검증 시 Alert 표시
    if (!form.title.trim()) return openAlert("프로젝트 제목을 입력하세요.");
    if (form.title.length > 30)
      return openAlert("제목은 30자까지 입력할 수 있습니다.");
    if (!form.type) return openAlert("작업 종류를 선택하세요.");
    if (!form.description.trim())
      return openAlert("프로젝트 내용을 입력하세요.");
    if (form.description.length > 500)
      return openAlert("내용은 500자까지 입력할 수 있습니다.");

    try {
      const nextNo = await getNextProjectNo();

      const newProject = {
        id: String(Date.now()),
        projectNo: nextNo,
        projectDate: new Date().toISOString().split("T")[0],
        projectStatus: "receipt",
        projectTeam: "CR",
        writer: form.writer,
        projectCompany: form.company,
        projectBrand: form.brand || availableBrandOptions[0]?.value || "",
        projectSort: form.type,
        projectTitle: form.title,
        projectContent: form.description,
        projectDeadline: form.endDate,
      };

      const res = await fetch("http://localhost:4000/projectList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (!res.ok) throw new Error("등록 실패");

      refreshProjects();
      onClose();

      setTimeout(() => {
        nav(`/project/${newProject.projectNo}`);
      }, 200);
    } catch (err) {
      console.error("프로젝트 등록 오류:", err);
      openAlert("등록 실패. 콘솔을 확인하세요.");
    }
  };

  return (
    <>
      <div className="alert_modal _project on">
        <div className="alert_wrap on">
          <div className="alert_box">
            <div className="alert_title">프로젝트 생성</div>

            <div className="new-box">
              {/* 회사/브랜드/작성자 */}
              <div className="select-box">
                <div>
                  <p className="txt">회사</p>
                  {isStyleShipUser ? (
                    <Select
                      name="company"
                      value={form.company}
                      options={companyOptions}
                      onChange={handleSelectChange}
                    />
                  ) : (
                    <Select
                      name="company"
                      value={form.company}
                      options={companyOptions.filter(
                        (opt) => opt.value === loginUser?.userCompany
                      )}
                      onChange={() => {}}
                      className="disabled"
                    />
                  )}
                </div>

                <div>
                  <p className="txt">브랜드</p>
                  <Select
                    name="brand"
                    value={form.brand}
                    options={
                      availableBrandOptions.length > 0
                        ? availableBrandOptions
                        : [{ value: "", label: "회사를 먼저 선택하세요" }]
                    }
                    onChange={handleSelectChange}
                  />
                </div>

                <div>
                  <p className="txt">작성자</p>
                  <Input
                    inputType="text"
                    inputValue={form.writer}
                    setValue={(val) =>
                      setForm((prev) => ({ ...prev, writer: val }))
                    }
                    inputAble={false}
                  />
                </div>
              </div>

              {/* 제목 / 마감일 */}
              <div className="select-box">
                <div className="_title">
                  <p className="txt">
                    프로젝트 제목 <span>*</span>
                  </p>
                  <Input
                    inputType="text"
                    inputValue={form.title}
                    setValue={(val) =>
                      setForm((prev) => ({ ...prev, title: val }))
                    }
                    inputPlaceholder={"프로젝트 제목을 입력하세요"}
                  />
                  <span className="limit-txt"> {form.title.length}/30자</span>
                </div>
                <div className="_deadline">
                  <p className="txt">마감일</p>
                  <div>
                    <p className="date">
                      {form.endDate
                        ? new Date(form.endDate).toLocaleDateString("ko-KR")
                        : "기한 없음"}
                    </p>
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* 작업 종류 */}
              <div className="select-box">
                <div className="_type">
                  <p className="txt">
                    작업 종류 <span>*</span>
                  </p>
                  <div>
                    {[
                      "프로모션",
                      "기획전",
                      "이벤트",
                      "외부몰",
                      "오류 수정",
                      "기능 수정/추가",
                    ].map((type, idx) => {
                      const id = `type_${idx + 1}`;
                      return (
                        <div className="chk" key={id}>
                          <input
                            id={id}
                            type="radio"
                            name="type"
                            value={type}
                            checked={form.type === type}
                            onChange={handleChange}
                            className="rd__style1"
                          />
                          <label htmlFor={id}>{type}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 프로젝트 내용 */}
              <div className="select-box">
                <div className="_content">
                  <p className="txt">
                    프로젝트 내용 <span>*</span>
                  </p>
                  <div>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="작업 내용을 입력하세요"
                    />
                    <span className="limit-txt">
                      {form.description.length}/500자
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="notice-box">
              <ul>
                <li>
                  작업일정 : 자료 접수후 5일 (영업일 기준, 주말 및 공휴일 제외)
                </li>
                <li>기타 일정시 담당자와 꼭 협의해 주시기 바랍니다.</li>
                <li>
                  페이지 수정 및 변경을 요청시에는 첨부양식 사용바랍니다.{" "}
                  <a href="">양식다운받기</a>
                </li>
              </ul>
            </div>

            <div className="alert_btn">
              <Button onClick={handleSubmit} btnSize="small" btnChar="orange">
                등록
              </Button>
              {alertType && (
                <Button onClick={onClose} btnSize="small" btnChar="white">
                  취소
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 알럿  */}
      {isAlertOpen && (
        <div className="alert_modal on">
          <div className="alert_wrap on">
            <div className="alert_box">
              <div className="alert_title">프로젝트 생성</div>
              <div className="alert_txt">{errorMsg}</div>
              <div className="alert_btn">
                <Button onClick={closeAlert} btnSize="small" btnChar="orange">
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewProject;
