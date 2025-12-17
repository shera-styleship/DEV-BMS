import '@components/feature/AssignManager.css';
import Checkbox from '@components/common/Checkbox';
import Button from '@components/common/Button';
import { createPortal } from 'react-dom';
import { UserDataContext } from '@/App';
import { useEffect, useMemo, useState, useContext, useRef } from 'react';
import { API_BASE } from '@/utils/env';

const AssignManager = ({ onClose, projectTitle, brand, projectId }) => {
	const [activeTab, setActiveTab] = useState('styleship');
	const { userData, refreshProjects, auth } = useContext(UserDataContext);
	const [currentRecord, setCurrentRecord] = useState(null);
	const [selectedManagers, setSelectedManagers] = useState([]);
	const [recordId, setRecordId] = useState(projectId ?? null);

	// 현재 탭과 브랜드에 따라 사용자 목록 필터링
	const filtered = useMemo(() => {
		if (activeTab === 'styleship') {
			return userData.filter((u) => u.userCompany === 'STYLESHIP');
		}
		// brand 탭
		return userData.filter((u) => u.userCompany === brand);
	}, [activeTab, brand, userData]);

	// projectId를 이용해서 프로젝트 조회
	useEffect(() => {
		let ignore = false;

		async function loadById(id) {
			try {
				let res = await fetch(`${API_BASE}/projectList/${id}`);
				let data = null;

				if (res.status === 404) {
					const q1 = await fetch(`${API_BASE}/projectList?projectNo=${encodeURIComponent(id)}`);
					const arr1 = await q1.json();
					data = Array.isArray(arr1) ? arr1[0] : arr1;

					if (!data) {
						const q2 = await fetch(`${API_BASE}/projectList?id=${encodeURIComponent(id)}`);
						const arr2 = await q2.json();
						data = Array.isArray(arr2) ? arr2[0] : arr2;
					}
				} else {
					const item = await res.json();
					data = Array.isArray(item) ? item[0] : item;
				}

				if (!ignore && data) {
					setRecordId(data.id);
					setSelectedManagers(Array.isArray(data.projectManager) ? data.projectManager : []);
					setCurrentRecord(data);
				}
			} catch (err) {
				console.error('loadById error:', err);
			}
		}

		if (projectId != null) loadById(projectId);
		return () => {
			ignore = true;
		};
	}, [projectId]);

	// 체크 토글: 있으면 제거, 없으면 추가
	const toggleManager = (userId) => {
		setSelectedManagers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
	};

	// 레거시 토큰 감지
	const validUserIds = useMemo(() => new Set((userData || []).map((u) => u.userId)), [userData]);
	const isLegacyToken = (x) => /^\d+$/.test(String(x)) && !validUserIds.has(x);

	const hasLegacy = useMemo(() => (selectedManagers || []).some(isLegacyToken), [selectedManagers, validUserIds]);

	const resolveIsChecked = (u) => {
		if (!u) return false;
		return selectedManagers.includes(u.userId);
	};

	// 선택된 담당자들의 팀 모음
	const selectedTeams = useMemo(() => {
		const norm = (t) => ((t || '').toString().trim().toUpperCase() === 'UXI' ? 'UIX' : t || '');
		const set = new Set();
		for (const u of userData || []) {
			if (u.userCompany !== 'STYLESHIP') continue;
			if (resolveIsChecked(u)) set.add(norm(u.userTeam));
		}
		return Array.from(set).filter(Boolean);
	}, [selectedManagers, userData, currentRecord, auth]);

	// 저장: 서버 값과 병합(PATCH) 후 새로고침
	const handleAssign = async () => {
		if (!recordId) return alert('프로젝트 식별자를 찾지 못했어요.');
		try {
			const currentRes = await fetch(`${API_BASE}/projectList/${recordId}`);
			const current = await currentRes.json();

			const body = {
				projectManager: Array.from(new Set(selectedManagers)),
				projectTeam: Array.from(new Set(selectedTeams)),
			};
			const res = await fetch(`${API_BASE}/projectList/${recordId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (!res.ok) throw new Error('patch failed');
			refreshProjects();
			onClose?.();
		} catch (e) {
			console.error(e);
			alert('위임 저장 실패');
		}
	};

	// 정렬
	const collator = useMemo(() => new Intl.Collator('ko'), []);
	const sorted = useMemo(() => {
		if (activeTab === 'styleship') {
			return [...filtered].sort((a, b) => {
				const aUXI = a.userTeam === 'UXI' ? 0 : 1;
				const bUXI = b.userTeam === 'UXI' ? 0 : 1;
				if (aUXI !== bUXI) return aUXI - bUXI; // UXI 우선
				const teamCmp = collator.compare(a.userTeam || '', b.userTeam || '');
				if (teamCmp !== 0) return teamCmp; // 팀별 정렬
				return collator.compare(a.userName || '', b.userName || ''); // 이름 정렬
			});
		}
		// brand 탭
		return [...filtered].sort((a, b) => collator.compare(a.userName || '', b.userName || ''));
	}, [activeTab, filtered, collator]);

	// 팀 섹션 순서
	const TEAM_ORDER = ['CR', 'DV', 'UIX', 'O2O', '스마트라이즈'];
	const SHOW_EMPTY_SECTIONS = false;

	// 팀별 그룹화
	const groupedByTeam = useMemo(() => {
		// 브랜드 탭: 팀 묶음 없이 한 섹션으로 (타이틀 = 브랜드명)
		if (activeTab === 'brand') {
			return [{ team: brand, members: sorted }];
		}
		const map = new Map();
		for (const u of sorted) {
			const raw = u.userTeam || '미지정';
			const key = raw.toUpperCase() === 'UXI' ? 'UIX' : raw;
			if (!map.has(key)) map.set(key, []);
			map.get(key).push(u);
		}

		const getRank = (team) => {
			const idx = TEAM_ORDER.indexOf(team);
			return idx === -1 ? TEAM_ORDER.length + 1 : idx;
		};

		const presentKeys = [...map.keys()];
		const keys = SHOW_EMPTY_SECTIONS ? [...new Set([...TEAM_ORDER, ...presentKeys])] : presentKeys;

		keys.sort((a, b) => {
			const ra = getRank(a);
			const rb = getRank(b);
			if (ra !== rb) return ra - rb;
			return collator.compare(a, b);
		});

		return keys
			.map((k) => ({ team: k, members: map.get(k) || [] }))
			.filter((sec) => (SHOW_EMPTY_SECTIONS ? true : sec.members.length > 0));
	}, [activeTab, brand, sorted, collator]);

	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, []);

	// 밑줄 스타일 상태
	const [underline, setUnderline] = useState({ left: 0, width: 0 });
	const tabsRef = useRef(null);

	// 처음 한 번: 초기 밑줄 위치 세팅
	useEffect(() => {
		const root = tabsRef.current;
		if (!root) return;
		const active = root.querySelector('button.on') || root.querySelector('button');
		if (!active) return;
		setUnderline({ left: active.offsetLeft, width: active.offsetWidth });
	}, []);

	const handleTab = (key, e) => {
		setActiveTab(key);
		const btn = e.currentTarget;
		setUnderline({ left: btn.offsetLeft, width: btn.offsetWidth });
	};

	const assignModal = (
		<div className='assign_backdrop' onClick={onClose}>
			<div className='assign_dialog' onClick={(e) => e.stopPropagation()}>
				<div className='assign_title'>
					<p>작업 위임</p>
					<button type='button' className='assign_close' onClick={onClose} aria-label='닫기'>
						×
					</button>
				</div>
				<div className='assign_contents'>
					<dl>
						<dt>브랜드</dt>
						<dd>{brand}</dd>
					</dl>
					<dl>
						<dt>프로젝트 제목</dt>
						<dd>{projectTitle}</dd>
					</dl>
				</div>

				{/* 탭 */}
				<div className='assign_tabs'>
					<button className={activeTab === 'styleship' ? 'on' : ''} onClick={(e) => handleTab('styleship', e)}>
						스타일쉽
					</button>
					<button className={activeTab === 'brand' ? 'on' : ''} onClick={(e) => handleTab('brand', e)}>
						{brand}
					</button>
					<span
						className='assign_underline'
						style={{ left: underline.left, width: underline.width ? underline.width : '55px' }}
					/>
				</div>

				{/* 리스트 */}
				<main className='assign_users'>
					{groupedByTeam.length === 0 ? (
						<p className='empty'>해당 조건의 유저가 없습니다.</p>
					) : (
						groupedByTeam.map((section) => (
							<section className='team_section' key={section.team}>
								<h4 className='team_title'>
									{section.team} <span className='count'>({section.members.length})</span>
								</h4>
								<ul className='user_list'>
									{section.members.map((u) => (
										<Checkbox
											key={u.userId}
											checked={resolveIsChecked(u)}
											onChange={() => toggleManager(u.userId)}
										>{`${u.userName} ${u.jobTitle}`}</Checkbox>
									))}
								</ul>
							</section>
						))
					)}
				</main>

				<div className='assign_footer'>
					<Button btnSize='small' btnChar='white' onClick={onClose}>
						취소
					</Button>
					<Button btnSize='small' btnChar='orange' onClick={handleAssign}>
						위임
					</Button>
				</div>
			</div>
		</div>
	);
	return createPortal(assignModal, document.body);
};

export default AssignManager;
