import AlarmItem from './AlarmItem';
import './Alarm.css';
import { useEffect, useState, useMemo } from 'react';

const mockAlarms = [
	{
		id: 1,
		projectName: '○ 8월 수배송 공지',
		projectCompany: 'NPLUS(네파)',
		writer: '홍길동',
		message: '수배송 공지 시안 제작 부탁드립니다~! 시안 확정 시 psd 공유 부탁드립니다.',
		createdAt: '2025-10-24T09:34:00+09:00',
		deleted: false,
	},
	{
		id: 2,
		projectName: '10/16 EFW-헤리티지 자켓',
		projectCompany: 'COLUMBIA',
		writer: '장임시',
		message: '기획전 링크 선공유 부탁드립니다~',
		createdAt: '2025-10-23T20:10:00+09:00',
		deleted: false,
	},
	{
		id: 3,
		projectName: '[요청] FILA MATCH 기획전 요청',
		projectCompany: 'FILA',
		writer: '장길산',
		message: '안녕하세요, 휠라 매치 기획전 제작 요청드립니다. https://filahds-my.sharepoint.com/:x:/g/pers...',
		createdAt: '2025-10-22T12:00:00+09:00',
	},
	{
		id: 4,
		projectName: '[자사몰] 멤버십 등급별 알림톡 발송',
		projectCompany: 'PXG',
		writer: '김임시',
		message: '넵 내일 10시 발송 부탁드립니다.',
		createdAt: '2025-10-24T14:00:00+09:00',
	},
	{
		id: 5,
		projectName: '메인 배너 제작 요청',
		projectCompany: '롯데홈쇼핑-AIGLE',
		writer: '박임시',
		message: '새로운 프로젝트가 생성되었습니다.',
		createdAt: '2025-10-23T18:00:00+09:00',
	},
	{
		id: 6,
		projectName: '기획전 일부 문구 삭제',
		projectCompany: '롯데홈쇼핑-APTE',
		writer: '윤임시',
		message: '추가로 해당 기획전은 금주 주말까지로만 적용 부탁드리겠습니다',
		createdAt: '2025-10-24T10:00:00+09:00',
	},
];

const Alarm = () => {
	const [alarms, setAlarms] = useState(mockAlarms);

	const onAlarmDelete = (targetId) => {
		setAlarms((prev) => prev.filter((item) => item.id !== targetId));
	};
	const onAllAlarmDelete = () => {
		setAlarms([]);
	};
	const isToday = (isoString) => {
		const d = new Date(isoString);
		const now = new Date();
		return d.toDateString() === now.toDateString();
	};
	const { recent, previous } = useMemo(() => {
		const active = alarms.filter((a) => !a.deleted);
		const recentList = active.filter((a) => isToday(a.createdAt));
		const previousList = active.filter((a) => !isToday(a.createdAt));
		// 최신순 정렬 (선택)
		recentList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		previousList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		return { recent: recentList, previous: previousList };
	}, [alarms]);

	return (
		<div className='Alarm_wrap'>
			<div className='Alarm_top'>
				<div className='Alarm_top_contents'>
					<p className='Alarm_top_title'>최근 받은 알림</p>
					{recent.length ? (
						recent.map((item) => <AlarmItem key={item.id} item={item} onAlarmDelete={onAlarmDelete} />)
					) : (
						<p>오늘 받은 알림이 없습니다.</p>
					)}
					<p className='Alarm_top_title'>이전 알림</p>
					{previous.length ? (
						previous.map((item) => <AlarmItem key={item.id} item={item} onAlarmDelete={onAlarmDelete} />)
					) : (
						<p>이전 알림이 없습니다.</p>
					)}
				</div>
			</div>
			<div className='Alarm_bottom'>
				<button onClick={onAllAlarmDelete}>알림 삭제</button>
			</div>
		</div>
	);
};

export default Alarm;
