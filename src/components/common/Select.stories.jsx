import { useState } from "react";
import Select from "./Select";

const meta = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
    value: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;

// 💡 상태 변화가 있는 기본 셀렉트
export const Default = {
  render: () => {
    const [value, setValue] = useState("receipt");

    const options = [
      { value: "receipt", label: "접수" },
      { value: "progress", label: "진행" },
      { value: "hold", label: "보류" },
      { value: "completion", label: "완료" },
      { value: "cancel", label: "취소" },
    ];

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <div style={{ padding: "20px", background: "#fff" }}>
        <Select
          name="status"
          value={value}
          options={options}
          onChange={handleChange}
        />
      </div>
    );
  },
};

// 💡 ProjectItem 스타일 버전
export const UsedInProjectStyle = {
  render: () => {
    const [status, setStatus] = useState("progress");

    const statusOptions = [
      { value: "receipt", label: "접수" },
      { value: "progress", label: "진행" },
      { value: "hold", label: "보류" },
      { value: "completion", label: "완료" },
      { value: "cancel", label: "취소" },
    ];

    const handleChange = (e) => {
      setStatus(e.target.value);
    };

    return (
        <Select
          name="status"
          value={status}
          options={statusOptions}
          onChange={handleChange}
          className={`_status _${status}`}
        />
    );
  },
};
