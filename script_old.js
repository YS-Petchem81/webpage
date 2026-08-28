// 현재 표시할 주 (1-4)
let currentWeek = 1;

// 4주치 시간표 데이터 생성 함수
function generateWeeksData() {
    const weeks = [1, 2, 3, 4];
    const allClasses = [];
    let id = 1;

    // 각 주마다 다른 클래스 조합
    const weekSchedules = [
        // 1주차
        { day: '월', name: '용접 실습', time: '09:00-11:00' },
        { day: '화', name: '선반 실습', time: '11:00-13:00' },
        { day: '수', name: '목공 실습', time: '14:00-16:00' },
        { day: '목', name: '전기 실습', time: '13:00-15:00' },
        { day: '금', name: '자동차 실습', time: '10:00-12:00' },
        { day: '토', name: '금속 가공 실습', time: '09:00-11:00' },
        { day: '일', name: '페인팅 실습', time: '14:00-16:00' },
    ];

    // 각 주마다 일정 생성
    weeks.forEach(week => {
        weekSchedules.forEach(schedule => {
            const classData = {
                id: id++,
                name: schedule.name,
                time: schedule.time,
                day: schedule.day,
                week: week,
                preparation: getPreparation(schedule.name),
                safety: getSafety(schedule.name),
                emergency: getEmergency(schedule.name)
            };
            allClasses.push(classData);
        });
    });

    return allClasses;
}

// 준비물 데이터 (이름으로 분류)
function getPreparation(className) {
    const prep = {
        '용접 실습': [
            { item: '용접모', category: '개인 준비물' },
            { item: '장갑(내열)', category: '개인 준비물' },
            { item: '앞치마', category: '개인 준비물' },
            { item: '용접봉', category: '학교 제공' },
            { item: '보호판', category: '학교 제공' }
        ],
        '선반 실습': [
            { item: '안경', category: '개인 준비물' },
            { item: '장갑', category: '개인 준비물' },
            { item: '앞치마', category: '학교 제공' },
            { item: '장비 청소 도구', category: '학교 제공' }
        ],
        '목공 실습': [
            { item: '안경', category: '개인 준비물' },
            { item: '장갑', category: '개인 준비물' },
            { item: '나무재료', category: '학교 제공' },
            { item: '각종 공구', category: '학교 제공' }
        ],
        '전기 실습': [
            { item: '정전기 팔찌', category: '개인 준비물' },
            { item: '드라이버', category: '개인 준비물' },
            { item: '전자부품', category: '학교 제공' },
            { item: '멀티미터', category: '학교 제공' }
        ],
        '자동차 실습': [
            { item: '작업복', category: '개인 준비물' },
            { item: '안전화', category: '개인 준비물' },
            { item: '헬멧', category: '학교 제공' },
            { item: '공구 세트', category: '학교 제공' }
        ],
        '금속 가공 실습': [
            { item: '안전모', category: '개인 준비물' },
            { item: '보안경', category: '개인 준비물' },
            { item: '장갑(두꺼운)', category: '개인 준비물' },
            { item: '앞치마', category: '개인 준비물' },
            { item: '금속재료', category: '학교 제공' },
            { item: '금속 가공 공구', category: '학교 제공' }
        ],
        '페인팅 실습': [
            { item: '색안경', category: '개인 준비물' },
            { item: '장갑', category: '개인 준비물' },
            { item: '앞치마', category: '개인 준비물' },
            { item: '도료', category: '학교 제공' },
            { item: '페인팅 도구', category: '학교 제공' }
        ]
    };
    return prep[className] || [];
}

// 안전수칙 데이터
function getSafety(className) {
    const safety = {
        '용접 실습': [
            { type: 'do', title: 'DO', content: '용접봉은 건조한 상태에서 사용' },
            { type: 'do', title: 'DO', content: '환풍기를 반드시 켜고 작업' },
            { type: 'do', title: 'DO', content: '작업 전 안전검사 완료' },
            { type: 'dont', title: 'DON\'T', content: '젖은 손으로 용접기 조작' },
            { type: 'dont', title: 'DON\'T', content: '보호 장비 없이 용접' }
        ],
        '선반 실습': [
            { type: 'do', title: 'DO', content: '장비 시작 전 안경 착용 필수' },
            { type: 'do', title: 'DO', content: '긴머리는 묶기' },
            { type: 'do', title: 'DO', content: '느슨한 옷은 피하기' },
            { type: 'dont', title: 'DON\'T', content: '회전 중인 장비에 손 집어넣기' },
            { type: 'dont', title: 'DON\'T', content: '한손 작업' }
        ],
        '목공 실습': [
            { type: 'do', title: 'DO', content: '안전안경 항상 착용' },
            { type: 'do', title: 'DO', content: '공구 날 확인 후 사용' },
            { type: 'do', title: 'DO', content: '작업 후 공구 정리' },
            { type: 'dont', title: 'DON\'T', content: '예리한 도구 다른 사람에게 건네기' },
            { type: 'dont', title: 'DON\'T', content: '집중력 흐린 상태에서 작업' }
        ],
        '전기 실습': [
            { type: 'do', title: 'DO', content: '정전기 방지용품 착용' },
            { type: 'do', title: 'DO', content: '전원 차단 후 작업' },
            { type: 'do', title: 'DO', content: '부품 극성 확인 후 납땜' },
            { type: 'dont', title: 'DON\'T', content: '습기 있는 상태에서 전기 작업' },
            { type: 'dont', title: 'DON\'T', content: '무단 220V 접근' }
        ],
        '자동차 실습': [
            { type: 'do', title: 'DO', content: '엔진 시작 전 브레이크 확인' },
            { type: 'do', title: 'DO', content: '안전 장비 완전 착용' },
            { type: 'do', title: 'DO', content: '인부 복수 체크' },
            { type: 'dont', title: 'DON\'T', content: '무단 시동 시작' },
            { type: 'dont', title: 'DON\'T', content: '회전 중 장비 접촉' }
        ],
        '금속 가공 실습': [
            { type: 'do', title: 'DO', content: '안전모와 보안경 필수 착용' },
            { type: 'do', title: 'DO', content: '귀보호대 착용' },
            { type: 'do', title: 'DO', content: '기계 시작 전 안전 확인' },
            { type: 'dont', title: 'DON\'T', content: '장시간 소음에 노출' },
            { type: 'dont', title: 'DON\'T', content: '회전 중 기계에 접근' }
        ],
        '페인팅 실습': [
            { type: 'do', title: 'DO', content: '환기를 충분히 하기' },
            { type: 'do', title: 'DO', content: '마스크 착용' },
            { type: 'do', title: 'DO', content: '도료 성분 확인' },
            { type: 'dont', title: 'DON\'T', content: '피부에 직접 도료 접촉' },
            { type: 'dont', title: 'DON\'T', content: '도료 흡입' }
        ]
    };
    return safety[className] || [];
}

// 사고 대처 데이터
function getEmergency(className) {
    const emergency = {
        '용접 실습': [
            { title: '화상', description: '즉시 냉수에 10-20분 담그고 119 신고' },
            { title: '감전', description: '전원 차단 후 심폐소생술 준비' },
            { title: '화염', description: '소화기로 즉시 소화 후 119 신고' }
        ],
        '선반 실습': [
            { title: '베임', description: '출혈 시 지혈 후 병원 이송' },
            { title: '끼임', description: '즉시 기계 정지, 119 신고' }
        ],
        '목공 실습': [
            { title: '절상', description: '출혈 시 깨끗한 천으로 압박 후 병원' },
            { title: '눈 자극', description: '깨끗한 물로 충분히 세척' }
        ],
        '전기 실습': [
            { title: '감전', description: '전원 즉시 차단, 119 신고' },
            { title: '화상', description: '냉수에 식힌 후 의료진 호출' }
        ],
        '자동차 실습': [
            { title: '낙상', description: '부상 확인 후 119 신고' },
            { title: '압박', description: '즉시 기계 정지, 응급처치' }
        ],
        '금속 가공 실습': [
            { title: '타박상', description: '냉찜질 후 부종 관찰' },
            { title: '절단', description: '지혈 후 즉시 119 신고' },
            { title: '소음성 난청', description: '귀보호대 착용으로 예방' }
        ],
        '페인팅 실습': [
            { title: '피부 접촉', description: '물로 충분히 씻기' },
            { title: '도료 흡입', description: '신선한 공기로 이동 후 휴식' }
        ]
    };
    return emergency[className] || [];
}

// 더미 데이터 (4주치)
const classesData = generateWeeksData();

// 4주차 이후엔 1주차로 순환하도록 설정
function getWeekClasses(week) {
    return classesData.filter(cls => cls.week === week);
}

// 시간표에 표시될 실습 id (각 주의 1-7번 id에 해당)
const timetableClassIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

// 페이지 초기화 (기본 코드)
function initPage() {
    renderTimetable();
    setupTabListeners();
            { item: '용접모', category: '개인 준비물' },
            { item: '장갑(내열)', category: '개인 준비물' },
            { item: '앞치마', category: '개인 준비물' },
            { item: '용접봉', category: '학교 제공' },
            { item: '보호판', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '용접봉은 건조한 상태에서 사용' },
            { type: 'do', title: 'DO', content: '환풍기를 반드시 켜고 작업' },
            { type: 'do', title: 'DO', content: '작업 전 안전검사 완료' },
            { type: 'dont', title: 'DON\'T', content: '젖은 손으로 용접기 조작' },
            { type: 'dont', title: 'DON\'T', content: '보호 장비 없이 용접' }
        ],
        emergency: [
            { title: '화상', description: '즉시 냉수에 10-20분 담그고 119 신고' },
            { title: '감전', description: '전원 차단 후 심폐소생술 준비' },
            { title: '화염', description: '소화기로 즉시 소화 후 119 신고' }
        ]
    },
    {
        id: 2,
        name: '선반 실습',
        time: '11:00-13:00',
        day: '화',
        preparation: [
            { item: '안경', category: '개인 준비물' },
            { item: '장갑', category: '개인 준비물' },
            { item: '앞치마', category: '학교 제공' },
            { item: '장비 청소 도구', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '장비 시작 전 안경 착용 필수' },
            { type: 'do', title: 'DO', content: '긴머리는 묶기' },
            { type: 'do', title: 'DO', content: '느슨한 옷은 피하기' },
            { type: 'dont', title: 'DON\'T', content: '회전 중인 장비에 손 집어넣기' },
            { type: 'dont', title: 'DON\'T', content: '한손 작업' }
        ],
        emergency: [
            { title: '베임', description: '출혈 시 지혈 후 병원 이송' },
            { title: '끼임', description: '즉시 기계 정지, 119 신고' }
        ]
    },
    {
        id: 3,
        name: '목공 실습',
        time: '14:00-16:00',
        day: '수',
        preparation: [
            { item: '안경', category: '개인 준비물' },
            { item: '장갑', category: '개인 준비물' },
            { item: '나무재료', category: '학교 제공' },
            { item: '각종 공구', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '안전안경 항상 착용' },
            { type: 'do', title: 'DO', content: '공구 날 확인 후 사용' },
            { type: 'do', title: 'DO', content: '작업 후 공구 정리' },
            { type: 'dont', title: 'DON\'T', content: '예리한 도구 다른 사람에게 건네기' },
            { type: 'dont', title: 'DON\'T', content: '집중력 흐린 상태에서 작업' }
        ],
        emergency: [
            { title: '절상', description: '출혈 시 깨끗한 천으로 압박 후 병원' },
            { title: '눈 자극', description: '깨끗한 물로 충분히 세척' }
        ]
    },
    {
        id: 4,
        name: '전기 실습',
        time: '13:00-15:00',
        day: '목',
        preparation: [
            { item: '정전기 팔찌', category: '개인 준비물' },
            { item: '드라이버', category: '개인 준비물' },
            { item: '전자부품', category: '학교 제공' },
            { item: '멀티미터', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '정전기 방지용품 착용' },
            { type: 'do', title: 'DO', content: '전원 차단 후 작업' },
            { type: 'do', title: 'DO', content: '부품 극성 확인 후 납땜' },
            { type: 'dont', title: 'DON\'T', content: '습기 있는 상태에서 전기 작업' },
            { type: 'dont', title: 'DON\'T', content: '무단 220V 접근' }
        ],
        emergency: [
            { title: '감전', description: '전원 즉시 차단, 119 신고' },
            { title: '화상', description: '냉수에 식힌 후 의료진 호출' }
        ]
    },
    {
        id: 5,
        name: '자동차 실습',
        time: '10:00-12:00',
        day: '금',
        preparation: [
            { item: '작업복', category: '개인 준비물' },
            { item: '안전화', category: '개인 준비물' },
            { item: '헬멧', category: '학교 제공' },
            { item: '공구 세트', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '엔진 시작 전 브레이크 확인' },
            { type: 'do', title: 'DO', content: '안전 장비 완전 착용' },
            { type: 'do', title: 'DO', content: '인부 복수 체크' },
            { type: 'dont', title: 'DON\'T', content: '무단 시동 시작' },
            { type: 'dont', title: 'DON\'T', content: '회전 중 장비 접촉' }
        ],
        emergency: [
            { title: '낙상', description: '부상 확인 후 119 신고' },
            { title: '압박', description: '즉시 기계 정지, 응급처치' }
        ]
    },
    {
        id: 6,
        name: '금속 가공 실습',
        time: '09:00-11:00',
        day: '토',
        preparation: [
            { item: '안전모', category: '개인 준비물' },
            { item: '보안경', category: '개인 준비물' },
            { item: '장갑(두꺼운)', category: '개인 준비물' },
            { item: '앞치마', category: '개인 준비물' },
            { item: '금속재료', category: '학교 제공' },
            { item: '금속 가공 공구', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '안전모와 보안경 필수 착용' },
            { type: 'do', title: 'DO', content: '귀보호대 착용' },
            { type: 'do', title: 'DO', content: '기계 시작 전 안전 확인' },
            { type: 'dont', title: 'DON\'T', content: '장시간 소음에 노출' },
            { type: 'dont', title: 'DON\'T', content: '회전 중 기계에 접근' }
        ],
        emergency: [
            { title: '타박상', description: '냉찜질 후 부종 관찰' },
            { title: '절단', description: '지혈 후 즉시 119 신고' },
            { title: '소음성 난청', description: '귀보호대 착용으로 예방' }
        ]
    },
    {
        id: 7,
        name: '페인팅 실습',
        time: '14:00-16:00',
        day: '일',
        preparation: [
            { item: '색안경', category: '개인 준비물' },
            { item: '장갑', category: '개인 준비물' },
            { item: '앞치마', category: '개인 준비물' },
            { item: '도료', category: '학교 제공' },
            { item: '페인팅 도구', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '환기를 충분히 하기' },
            { type: 'do', title: 'DO', content: '마스크 착용' },
            { type: 'do', title: 'DO', content: '도료 성분 확인' },
            { type: 'dont', title: 'DON\'T', content: '피부에 직접 도료 접촉' },
            { type: 'dont', title: 'DON\'T', content: '도료 흡입' }
        ],
        emergency: [
            { title: '피부 접촉', description: '물로 충분히 씻기' },
            { title: '도료 흡입', description: '신선한 공기로 이동 후 휴식' }
        ]
    },
    {
        id: 8,
        name: '세라믹 실습',
        time: '10:00-12:00',
        day: '평일',
        preparation: [
            { item: '앞치마', category: '개인 준비물' },
            { item: '타올', category: '개인 준비물' },
            { item: '도자기 흙', category: '학교 제공' },
            { item: '작업 도구', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '적절한 습도 유지' },
            { type: 'do', title: 'DO', content: '손을 깨끗이 씻기' },
            { type: 'do', title: 'DO', content: '천천히 작업 진행' },
            { type: 'dont', title: 'DON\'T', content: '빠른 작업으로 손 다치기' },
            { type: 'dont', title: 'DON\'T', content: '흙 먹기' }
        ],
        emergency: [
            { title: '손 베임', description: '깨끗한 물로 씻고 지혈' },
            { title: '스트레스', description: '천천히 호흡하며 쉬기' }
        ]
    },
    {
        id: 9,
        name: '목재 마감 실습',
        time: '11:00-13:00',
        day: '평일',
        preparation: [
            { item: '장갑', category: '개인 준비물' },
            { item: '앞치마', category: '개인 준비물' },
            { item: '목재', category: '학교 제공' },
            { item: '마감재', category: '학교 제공' },
            { item: '붓', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '마감재 성분 확인' },
            { type: 'do', title: 'DO', content: '환기 충분히' },
            { type: 'do', title: 'DO', content: '화기 주의' },
            { type: 'dont', title: 'DON\'T', content: '마감재 흡입' },
            { type: 'dont', title: 'DON\'T', content: '피부에 묻음' }
        ],
        emergency: [
            { title: '가려움', description: '물로 씻고 의료진 상담' },
            { title: '화상', description: '냉수에 식힌 후 병원' }
        ]
    },
    {
        id: 10,
        name: '환기 시스템 실습',
        time: '13:00-15:00',
        day: '평일',
        preparation: [
            { item: '작업복', category: '개인 준비물' },
            { item: '안전화', category: '개인 준비물' },
            { item: '장갑', category: '개인 준비물' },
            { item: '측정 도구', category: '학교 제공' },
            { item: '부품', category: '학교 제공' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '전원 차단 후 작업' },
            { type: 'do', title: 'DO', content: '안전 검사 완료' },
            { type: 'do', title: 'DO', content: '높이 작업시 안전대 착용' },
            { type: 'dont', title: 'DON\'T', content: '전원이 켜진 상태에서 접근' },
            { type: 'dont', title: 'DON\'T', content: '혼자 높이 작업' }
        ],
        emergency: [
            { title: '감전', description: '전원 차단 후 119 신고' },
            { title: '낙상', description: '부상 확인 후 의료진 호출' }
        ]
    },
    {
        id: 11,
        name: '안전 교육 실습',
        time: '09:00-11:00',
        day: '평일',
        preparation: [
            { item: '교재', category: '학교 제공' },
            { item: '필기구', category: '개인 준비물' },
            { item: '노트', category: '개인 준비물' }
        ],
        safety: [
            { type: 'do', title: 'DO', content: '성실하게 참여' },
            { type: 'do', title: 'DO', content: '집중력 유지' },
            { type: 'do', title: 'DO', content: '질문 하기' },
            { type: 'dont', title: 'DON\'T', content: '졸기' },
            { type: 'dont', title: 'DON\'T', content: '휴대폰 사용' }
        ],
        emergency: [
            { title: '응급상황', description: '교사에게 신고' }
        ]
    }
];

// 시간표에 표시될 실습 id (월~일 시간표에 표시)
const timetableClassIds = [1, 2, 3, 4, 5, 6, 7];

// 페이지 초기화
function initPage() {
    renderTimetable();
    setupTabListeners();
    setupSearchListener();
}

// 시간표 렌더링
function renderTimetable() {
    const timetable = document.getElementById('timetable');
    const daysGroup1 = ['월', '화', '수', '목'];
    const daysGroup2 = ['금', '토', '일'];
    
    let html = '<div>';
    
    // 첫 번째 그룹 (월-목)
    html += '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-bottom: 20px;">';
    
    daysGroup1.forEach(day => {
        html += `<div class="day-column">
            <div class="day-header ${day === '월' ? 'today' : ''}">${day}</div>`;
        
        // 시간표에 포함되는 실습들만 필터링
        const dayClasses = classesData.filter(c => c.day === day && timetableClassIds.includes(c.id));
        dayClasses.forEach(cls => {
            html += `<div class="class-item" onclick="showDetail(${cls.id})">
                <div class="class-name">${cls.name}</div>
                <div class="class-time">${cls.time}</div>
            </div>`;
        });
        
        html += '</div>';
    });
    
    html += '</div>';
    
    // 두 번째 그룹 (금-일)
    html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;">';
    
    daysGroup2.forEach(day => {
        html += `<div class="day-column">
            <div class="day-header ${day === '월' ? 'today' : ''}">${day}</div>`;
        
        // 시간표에 포함되는 실습들만 필터링
        const dayClasses = classesData.filter(c => c.day === day && timetableClassIds.includes(c.id));
        dayClasses.forEach(cls => {
            html += `<div class="class-item" onclick="showDetail(${cls.id})">
                <div class="class-name">${cls.name}</div>
                <div class="class-time">${cls.time}</div>
            </div>`;
        });
        
        html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    
    timetable.innerHTML = html;
}

// 상세 페이지 표시
function showDetail(classId) {
    const classData = classesData.find(c => c.id === classId);
    if (!classData) return;
    
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('detailPage').classList.add('active');
    
    document.getElementById('detailTitle').textContent = classData.name;
    document.getElementById('detailTime').textContent = `${classData.day}요일 ${classData.time}`;
    
    // 준비물 렌더링
    let prepHtml = '';
    classData.preparation.forEach(item => {
        prepHtml += `<div class="checklist-item">
            <input type="checkbox" id="prep-${item.item}">
            <label for="prep-${item.item}">${item.item}<span class="item-category">${item.category}</span></label>
        </div>`;
    });
    document.getElementById('preparationContent').innerHTML = prepHtml;
    
    // 안전수칙 렌더링
    let safeHtml = '';
    classData.safety.forEach(rule => {
        safeHtml += `<div class="rule-box ${rule.type}-box">
            <div class="rule-title">✓ ${rule.title}</div>
            <div class="rule-content">${rule.content}</div>
        </div>`;
    });
    document.getElementById('safetyContent').innerHTML = safeHtml;
    
    // 사고 대처 렌더링
    let emergencyHtml = '';
    classData.emergency.forEach(item => {
        emergencyHtml += `<div class="emergency-box">
            <div class="emergency-title">🚨 ${item.title}</div>
            <div class="emergency-content">${item.description}</div>
        </div>`;
    });
    document.getElementById('emergencyContent').innerHTML = emergencyHtml;
}

// 뒤로가기
function goBack() {
    document.getElementById('detailPage').classList.remove('active');
    document.getElementById('mainPage').style.display = 'block';
}

// 탭 기능
function setupTabListeners() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// 검색 기능
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        
        // 입력창에 텍스트가 있으면 X 버튼 표시
        if (keyword.length > 0) {
            searchClearBtn.classList.add('active');
        } else {
            searchClearBtn.classList.remove('active');
        }
        
        if (keyword.length === 0) {
            renderTimetable();
            return;
        }
        
        // 검색 결과를 저장할 배열
        const searchResults = [];
        
        // 각 실습을 순회하면서 매칭되는 항목 찾기
        classesData.forEach(cls => {
            // 준비물 검색 (모든 실습)
            cls.preparation.forEach(item => {
                if (item.item.toLowerCase().includes(keyword)) {
                    searchResults.push({
                        classId: cls.id,
                        className: cls.name,
                        dayTime: `${cls.day}요일 ${cls.time}`,
                        type: '준비물',
                        content: item.item,
                        tab: 'preparation'
                    });
                }
            });
            
            // 안전수칙 검색 (모든 실습)
            cls.safety.forEach(item => {
                if (item.content.toLowerCase().includes(keyword)) {
                    searchResults.push({
                        classId: cls.id,
                        className: cls.name,
                        dayTime: `${cls.day}요일 ${cls.time}`,
                        type: '안전수칙',
                        content: item.content,
                        tab: 'safety'
                    });
                }
            });
            
            // 사고 대처법 검색 (모든 실습)
            cls.emergency.forEach(item => {
                if (item.title.toLowerCase().includes(keyword) || 
                    item.description.toLowerCase().includes(keyword)) {
                    searchResults.push({
                        classId: cls.id,
                        className: cls.name,
                        dayTime: `${cls.day}요일 ${cls.time}`,
                        type: '사고 대처',
                        content: `${item.title} - ${item.description}`,
                        tab: 'emergency'
                    });
                }
            });
            
            // 실습명 검색 (시간표에 없는 실습만 검색 결과에 포함)
            if (cls.name.toLowerCase().includes(keyword)) {
                // 시간표에 있는 실습은 제외
                if (!timetableClassIds.includes(cls.id)) {
                    searchResults.push({
                        classId: cls.id,
                        className: cls.name,
                        dayTime: `${cls.day}요일 ${cls.time}`,
                        type: '실습',
                        content: cls.name,
                        tab: 'preparation'
                    });
                }
            }
        });
        
        if (searchResults.length > 0) {
            showDetailedSearchResults(searchResults);
        } else {
            const timetable = document.getElementById('timetable');
            timetable.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">검색 결과가 없습니다.</div>';
        }
    });
}

// 검색 취소 함수
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    
    searchInput.value = '';
    searchClearBtn.classList.remove('active');
    renderTimetable();
}

// 상세 검색 결과 표시
function showDetailedSearchResults(results) {
    const timetable = document.getElementById('timetable');
    
    // 카테고리별로 결과 그룹화
    const grouped = {
        '실습': [],
        '준비물': [],
        '안전수칙': [],
        '사고 대처': []
    };
    
    results.forEach(result => {
        grouped[result.type].push(result);
    });
    
    let html = '';
    const categoryOrder = ['사고 대처', '안전수칙', '준비물', '실습'];
    const categoryColors = {
        '실습': '#667eea',
        '준비물': '#2ecc71',
        '안전수칙': '#f39c12',
        '사고 대처': '#e74c3c'
    };
    
    categoryOrder.forEach(category => {
        if (grouped[category].length > 0) {
            // 카테고리 헤더
            html += `<div style="margin-top: 20px; margin-bottom: 12px; padding: 0 5px;">
                <div style="font-size: 14px; font-weight: 700; color: ${categoryColors[category]}; text-transform: uppercase; letter-spacing: 0.5px;">
                    📌 ${category}
                </div>
                <div style="height: 2px; background: ${categoryColors[category]}; margin-top: 6px; border-radius: 1px;"></div>
            </div>`;
            
            // 해당 카테고리의 항목들
            grouped[category].forEach(result => {
                html += `<div class="search-result-item" onclick="showDetailWithTab(${result.classId}, '${result.tab}')" style="margin-bottom: 12px; padding: 12px; border-radius: 8px; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.05); cursor: pointer; border-left: 4px solid ${categoryColors[category]}; transition: all 0.2s;">
                    <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px;">${result.className}</div>
                    <div style="font-size: 12px; color: #999; margin-bottom: 6px;">${result.dayTime}</div>
                    <div style="background: #f5f5f5; padding: 8px; border-radius: 6px; font-size: 13px; color: #333; line-height: 1.4;">
                        ${result.content}
                    </div>
                </div>`;
            });
        }
    });
    
    timetable.innerHTML = html || '<div style="padding: 20px; text-align: center; color: #999;">검색 결과가 없습니다.</div>';
}

// 특정 탭과 함께 상세 페이지 표시
function showDetailWithTab(classId, tabName) {
    showDetail(classId);
    
    // 약간의 딜레이 후 탭 전환
    setTimeout(() => {
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        const targetTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
        const targetContent = document.getElementById(tabName);
        
        if (targetTab) targetTab.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }, 100);
}

// SOS 모달
function openSOSModal() {
    document.getElementById('sosModal').classList.add('active');
}

function closeSOSModal() {
    document.getElementById('sosModal').classList.remove('active');
}

// 전화 걸기 시뮬레이션
function makeCall(number) {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    alert(`📞 ${number}으로 전화를 연결하시겠습니까?\n\n(실제 전화 걸기는 tel: 링크를 사용합니다)`);
    // 실제 환경에서는: window.location.href = `tel:${cleanNumber}`;
}

// 모달 바깥 클릭 시 닫기
document.addEventListener('click', (e) => {
    const modal = document.getElementById('sosModal');
    if (e.target === modal) {
        closeSOSModal();
    }
});

// 페이지 로드
initPage();