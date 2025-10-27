import "@components/common/AlarmItem.css";
import { useState } from "react";
const formatRelative = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;

  if (diffMs < 0) return "방금 전"; // 미래 대비

  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "방금 전";

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;

  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}시간 전`;

  const day = Math.floor(hour / 24);
  if (day < 7) return `${day}일 전`;

  // 7일 넘으면 날짜로
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${mm}-${dd} ${hh}:${mi}`;
};
const AlarmItem = ({ item, onAlarmDelete }) => {
  const { projectName, id, writer, message, createdAt, projectCompany } = item;
  return (
    <div className="AlarmItem">
      <section>
        <div className="AlarmItem_info">
          <img src="/images/default.jpg" className="AlarmItem_info_img" />
          <p className="AlarmItem_info_name">{`${writer}`}</p>
          <p className="AlarmItem_info_time">{formatRelative(createdAt)}</p>
        </div>
        <div>
          <button
            className="AlarmItem_close_btn"
            onClick={() => onAlarmDelete(id)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </section>
      <section className="AlarmItem_title">
        <p>{`[${projectCompany}-${id}] ${projectName}`}</p>
      </section>
      <section className="AlarmItem_contents">
        <p>{`${message}`}</p>
      </section>
    </div>
  );
};

export default AlarmItem;
