// 기준 날짜: 8월 24일 (1주차 월요일)
const baseDate = new Date(2026, 7, 24); // 2026년 8월 24일

// 사용 가능한 실습 목록
const availableClasses = [
    '용접 실습',
    '선반 실습',
    '목공 실습',
    '전기 실습',
    '자동차 실습',
    '금속 가공 실습',
    '페인팅 실습'
];

// 등록된 사용자 초기화
function initializeRegisteredUsers() {
    if (!localStorage.getItem('registeredUsers')) {
        const registeredUsers = {
            'teacher': [
                { email: 'qwe@rty.com', password: '1234' }
            ],
            'student': [
                { email: 'ㅁㄴㅇ@ㅋㅌㅊ.com', password: '1234' }
            ]
        };
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
}

// 선생-학생 그룹 초기화
function initializeTeacherGroups() {
    if (!localStorage.getItem('teacherGroups')) {
        const teacherGroups = {};
        localStorage.setItem('teacherGroups', JSON.stringify(teacherGroups));
    }
}

// 선생의 그룹에 학생 추가
function assignStudentToTeacher(teacherEmail, studentEmail) {
    initializeTeacherGroups();
    const teacherGroups = JSON.parse(localStorage.getItem('teacherGroups') || '{}');
    
    if (!teacherGroups[teacherEmail]) {
        teacherGroups[teacherEmail] = [];
    }
    
    // 중복 추가 방지
    if (!teacherGroups[teacherEmail].includes(studentEmail)) {
        teacherGroups[teacherEmail].push(studentEmail);
    }
    
    localStorage.setItem('teacherGroups', JSON.stringify(teacherGroups));
}

// 학생이 속한 선생 조회
function getStudentTeacher(studentEmail) {
    initializeTeacherGroups();
    const teacherGroups = JSON.parse(localStorage.getItem('teacherGroups') || '{}');
    
    for (const [teacherEmail, students] of Object.entries(teacherGroups)) {
        if (students.includes(studentEmail)) {
            return teacherEmail;
        }
    }
    return null;
}

// 현재 표시할 주 (1-4)
let currentWeek = calculateCurrentWeek();

// 현재 날짜 기반으로 주차 계산
function calculateCurrentWeek() {
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const diffTime = todayDate - baseDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // 주차 계산 (0일차 = 1주차)
    const week = Math.floor(diffDays / 7) + 1;
    
    // 1-4주 범위 내로 제한
    if (week < 1) return 1;
    if (week > 4) return 4;
    return week;
}

// 주어진 주차의 시작 날짜와 끝 날짜 반환
function getWeekDateRange(week) {
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() + (week - 1) * 7);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();
    const endMonth = endDate.getMonth() + 1;
    const endDay = endDate.getDate();
    
    return { 
        startMonth, 
        startDay, 
        endMonth, 
        endDay,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
    };
}

// 4주치 시간표 데이터 생성 함수
function generateWeeksData() {
    const weeks = [1, 2, 3, 4];
    const allClasses = [];
    let id = 1;

    // 각 주마다 같은 클래스 조합 (토일까지 포함)
    const weekSchedules = [
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

// 시간표에 표시될 실습 id (모든 실습 포함)
const timetableClassIds = classesData.map(c => c.id);

// 페이지 초기화
function initPage() {
    // 등록된 사용자 초기화
    initializeRegisteredUsers();
    
    // 로그인 상태 확인
    const userRole = localStorage.getItem('userRole');
    
    if (userRole) {
        // 로그인 되어있음 - 메인 페이지 표시
        showMainPage();
    } else {
        // 로그인 안 됨 - 로그인 페이지 표시
        showLoginPage();
    }
}

// 로그인 페이지 표시
function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('teacherPage').style.display = 'none';
    document.getElementById('sosModal').classList.remove('active');
}

// 메인 페이지 표시
function showMainPage() {
    document.getElementById('loginPage').style.display = 'none';
    
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'teacher') {
        // 선생 화면 표시
        document.getElementById('mainPage').style.display = 'none';
        document.getElementById('teacherPage').style.display = 'block';
        
        // 선생 페이지 초기화
        renderTimetableTeacher();
    } else {
        // 학생 화면 표시
        document.getElementById('mainPage').style.display = 'block';
        document.getElementById('teacherPage').style.display = 'none';
        
        // 메인 페이지 초기화
        renderTimetable();
        renderTodaySchedule();
        setupTabListeners();
        setupSearchListener();
        updateLoginButton();
    }
}

// 시간표 렌더링
function renderTimetable() {
    const timetable = document.getElementById('timetable');
    const weekTitle = document.getElementById('weekTitle');
    
    // 학생이 속한 선생의 시간표 가져오기
    const userEmail = localStorage.getItem('userEmail');
    const teacherEmail = getStudentTeacher(userEmail);
    
    let currentWeekClasses = [];
    
    if (teacherEmail) {
        // 학생이 선생에게 할당된 경우: 선생의 시간표를 표시
        initializeTeacherSchedule();
        const teacherSchedule = JSON.parse(localStorage.getItem('teacherSchedule') || '{}');
        const weekClasses = teacherSchedule[String(currentWeek)] || [];
        
        // 선생 시간표 데이터 구성 (선생이 배정한 강의들)
        currentWeekClasses = weekClasses.map(cls => ({
            id: cls.id,
            name: cls.name,
            time: cls.time,
            day: cls.day,
            week: currentWeek,
            preparation: getPreparation(cls.name),
            safety: getSafety(cls.name),
            emergency: getEmergency(cls.name)
        }));
    }
    
    // 주차별 날짜 범위 가져오기
    const dateRange = getWeekDateRange(currentWeek);
    
    // 주 제목 업데이트 (날짜 포함)
    const dateRangeText = dateRange.startMonth === dateRange.endMonth 
        ? dateRange.startMonth + '/' + dateRange.startDay + '~' + dateRange.endDay
        : dateRange.startMonth + '/' + dateRange.startDay + '~' + dateRange.endMonth + '/' + dateRange.endDay;
    
    weekTitle.textContent = '📅 ' + currentWeek + '주차 시간표 (' + dateRangeText + ')';
    
    const daysGroup1 = ['월', '화', '수', '목'];
    const daysGroup2 = ['금', '토', '일'];
    
    let html = '<div>';
    
    // 첫 번째 그룹 (월-목)
    html += '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-bottom: 20px;">';
    
    daysGroup1.forEach(day => {
        html += '<div class="day-column"><div class="day-header ' + (day === '월' ? 'today' : '') + '">' + day + '</div>';
        
        // 현재 주에 해당하는 실습들만 표시
        const dayClasses = currentWeekClasses.filter(c => c.day === day);
        dayClasses.forEach(cls => {
            html += '<div class="class-item" onclick="showDetail(' + cls.id + ')"><div class="class-name">' + cls.name + '</div><div class="class-time">' + cls.time + '</div></div>';
        });
        
        html += '</div>';
    });
    
    html += '</div>';
    
    // 두 번째 그룹 (금-일)
    html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;">';
    
    daysGroup2.forEach(day => {
        html += '<div class="day-column"><div class="day-header">' + day + '</div>';
        
        // 현재 주에 해당하는 실습들만 표시
        const dayClasses = currentWeekClasses.filter(c => c.day === day);
        dayClasses.forEach(cls => {
            html += '<div class="class-item" onclick="showDetail(' + cls.id + ')"><div class="class-name">' + cls.name + '</div><div class="class-time">' + cls.time + '</div></div>';
        });
        
        html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    
    timetable.innerHTML = html;
}

// 오늘의 시간표 렌더링
function renderTodaySchedule() {
    const container = document.getElementById('todaySchedule');
    if (!container) return;
    
    // 오늘 날짜 구하기
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // 오늘이 몇 주차인지 계산
    const diffTime = todayDate - baseDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const todayWeek = Math.floor(diffDays / 7) + 1;
    
    // 오늘의 요일 구하기
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const todayDay = daysOfWeek[today.getDay()];
    
    // 1-4주 범위 내인지 확인
    if (todayWeek < 1 || todayWeek > 4) {
        container.innerHTML = '<div class="today-schedule-empty">현재 학사일정 범위 밖입니다.</div>';
        return;
    }
    
    // 학생이 속한 선생의 시간표 가져오기
    const userEmail = localStorage.getItem('userEmail');
    const teacherEmail = getStudentTeacher(userEmail);
    
    let todayClasses = [];
    
    if (teacherEmail) {
        initializeTeacherSchedule();
        const teacherSchedule = JSON.parse(localStorage.getItem('teacherSchedule') || '{}');
        const weekClasses = teacherSchedule[String(todayWeek)] || [];
        
        // 오늘 요일의 강의만 필터링
        todayClasses = weekClasses
            .filter(cls => cls.day === todayDay)
            .map(cls => ({
                id: cls.id,
                name: cls.name,
                time: cls.time,
                day: cls.day,
                week: todayWeek,
                preparation: getPreparation(cls.name),
                safety: getSafety(cls.name),
                emergency: getEmergency(cls.name)
            }));
    }
    
    if (todayClasses.length === 0) {
        container.innerHTML = '<div class="today-schedule-empty">오늘 일정이 없습니다.</div>';
    } else {
        let html = '';
        todayClasses.forEach(cls => {
            html += '<div class="today-schedule-item" onclick="showDetail(' + cls.id + ')"><div class="today-schedule-item-name">🕐 ' + cls.name + '</div><div class="today-schedule-item-time">' + cls.time + '</div></div>';
        });
        container.innerHTML = html;
    }
}

// 다음 주로 이동
function nextWeek() {
    if (currentWeek < 4) {
        currentWeek++;
        renderTimetable();
        renderTodaySchedule();
    } else {
        currentWeek = 1;
        renderTimetable();
        renderTodaySchedule();
    }
}

// 이전 주로 이동
function prevWeek() {
    if (currentWeek > 1) {
        currentWeek--;
        renderTimetable();
        renderTodaySchedule();
    } else {
        currentWeek = 4;
        renderTimetable();
        renderTodaySchedule();
    }
}

// 상세 페이지 표시
function showDetail(classId) {
    let classData = classesData.find(c => c.id === classId);
    
    // classesData에서 찾지 못했으면, ID 형식으로 된 문자열인 경우 처리
    if (!classData) {
        // 선생이 추가한 강의일 수 있으므로, 모든 주차에서 검색
        const userEmail = localStorage.getItem('userEmail');
        const teacherEmail = getStudentTeacher(userEmail);
        
        if (teacherEmail) {
            initializeTeacherSchedule();
            const teacherSchedule = JSON.parse(localStorage.getItem('teacherSchedule') || '{}');
            const weeks = ['1', '2', '3', '4'];
            
            for (let i = 0; i < weeks.length; i++) {
                const weekClasses = teacherSchedule[weeks[i]] || [];
                const found = weekClasses.find(c => c.id === classId || (c.name + c.time + c.day === classId));
                if (found) {
                    classData = {
                        id: found.id || (found.name + found.time + found.day),
                        name: found.name,
                        day: found.day,
                        time: found.time,
                        preparation: getPreparation(found.name),
                        safety: getSafety(found.name),
                        emergency: getEmergency(found.name)
                    };
                    break;
                }
            }
        }
    }
    
    if (!classData) return;
    
    // preparation, safety, emergency가 없으면 실습명에서 가져오기
    if (!classData.preparation) {
        classData.preparation = getPreparation(classData.name);
    }
    if (!classData.safety) {
        classData.safety = getSafety(classData.name);
    }
    if (!classData.emergency) {
        classData.emergency = getEmergency(classData.name);
    }
    
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('detailPage').classList.add('active');
    
    document.getElementById('detailTitle').textContent = classData.name;
    document.getElementById('detailTime').textContent = classData.day + '요일 ' + classData.time;
    
    // 준비물
    let prepHtml = '<div class="checklist-container">';
    classData.preparation.forEach(item => {
        prepHtml += '<div class="checklist-item"><input type="checkbox" id="prep-' + classId + '-' + item.item + '"><label for="prep-' + classId + '-' + item.item + '"><strong>' + item.item + '</strong><span class="category-badge">' + item.category + '</span></label></div>';
    });
    prepHtml += '</div>';
    document.getElementById('preparationContent').innerHTML = prepHtml;
    
    // 안전수칙
    let safetyHtml = '';
    classData.safety.forEach(rule => {
        const bgColor = rule.type === 'do' ? '#e8f5e9' : '#ffebee';
        const borderColor = rule.type === 'do' ? '#4caf50' : '#f44336';
        safetyHtml += '<div class="rule-box" style="border-left-color: ' + borderColor + '; background-color: ' + bgColor + ';"><strong>' + rule.title + '</strong><p>' + rule.content + '</p></div>';
    });
    document.getElementById('safetyContent').innerHTML = safetyHtml;
    
    // 사고 대처
    let emergencyHtml = '';
    classData.emergency.forEach(emg => {
        emergencyHtml += '<div class="emergency-box"><strong>' + emg.title + '</strong><p>' + emg.description + '</p></div>';
    });
    document.getElementById('emergencyContent').innerHTML = emergencyHtml;
}

// 돌아가기
function goBack() {
    document.getElementById('detailPage').classList.remove('active');
    document.getElementById('mainPage').style.display = 'block';
}

// 탭 리스너
function setupTabListeners() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // 모든 탭의 active 제거
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // 선택된 탭에 active 추가
            tab.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// 검색 리스너
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        
        // 검색 버튼 표시/숨김
        if (keyword.length > 0) {
            searchClearBtn.classList.add('active');
        } else {
            searchClearBtn.classList.remove('active');
        }
        
        if (keyword.length === 0) {
            renderTimetable();
            renderTodaySchedule();
            return;
        }
        
        const searchResults = [];
        const searchedClasses = new Set(); // 중복 제거용
        
        // 학생이 선생에 할당된 경우와 아닌 경우 구분
        const userEmail = localStorage.getItem('userEmail');
        const teacherEmail = getStudentTeacher(userEmail);
        
        // 선생의 1주차 시간표에 있는 실습명들을 파악 (현재 주차만)
        let assignedClassNamesInCurrentWeek = new Set();
        if (teacherEmail) {
            initializeTeacherSchedule();
            const teacherSchedule = JSON.parse(localStorage.getItem('teacherSchedule') || '{}');
            const currentWeekClasses = teacherSchedule['1'] || []; // 1주차만 확인
            
            currentWeekClasses.forEach(cls => {
                assignedClassNamesInCurrentWeek.add(cls.name);
            });
        } else {
        }
        
        classesData.forEach(cls => {
            const classKey = cls.name + '|' + cls.time + '|' + cls.day; // 중복 제거용 키 (week 제외)
            // 1주차에 배정된 실습은 모든 주차에서 "실습" 카테고리에서 제외
            const isAssignedInCurrentWeek = assignedClassNamesInCurrentWeek.has(cls.name);
            
            // 실습명이 키워드를 포함하는지 확인
            const classNameMatches = cls.name.toLowerCase().includes(keyword);
            
            // 준비물 검색
            cls.preparation.forEach(item => {
                const itemMatches = item.item.toLowerCase().includes(keyword);
                
                // 준비물 항목이 매칭되거나, 실습명이 매칭되면 추가
                if (itemMatches || classNameMatches) {
                    const resultKey = 'prep|' + classKey + '|' + item.item;
                    if (!searchedClasses.has(resultKey)) {
                        searchedClasses.add(resultKey);
                        searchResults.push({
                            classId: cls.id,
                            className: cls.name,
                            dayTime: cls.day + '요일 ' + cls.time,
                            type: '준비물',
                            content: item.item,
                            tab: 'preparation'
                        });
                    }
                }
            });
            
            // 안전수칙 검색
            cls.safety.forEach(rule => {
                const ruleMatches = rule.content.toLowerCase().includes(keyword);
                
                // 안전수칙이 매칭되거나, 실습명이 매칭되면 추가
                if (ruleMatches || classNameMatches) {
                    const resultKey = 'safe|' + classKey + '|' + rule.content;
                    if (!searchedClasses.has(resultKey)) {
                        searchedClasses.add(resultKey);
                        searchResults.push({
                            classId: cls.id,
                            className: cls.name,
                            dayTime: cls.day + '요일 ' + cls.time,
                            type: '안전수칙',
                            content: rule.content,
                            tab: 'safety'
                        });
                    }
                }
            });
            
            // 사고 대처 검색
            cls.emergency.forEach(emg => {
                const emergencyMatches = emg.title.toLowerCase().includes(keyword) || emg.description.toLowerCase().includes(keyword);
                
                // 사고 대처가 매칭되거나, 실습명이 매칭되면 추가
                if (emergencyMatches || classNameMatches) {
                    const resultKey = 'emg|' + classKey + '|' + emg.title;
                    if (!searchedClasses.has(resultKey)) {
                        searchedClasses.add(resultKey);
                        searchResults.push({
                            classId: cls.id,
                            className: cls.name,
                            dayTime: cls.day + '요일 ' + cls.time,
                            type: '사고 대처',
                            content: emg.title + ': ' + emg.description,
                            tab: 'emergency'
                        });
                    }
                }
            });
            
            // 실습명 검색: 1주차에 배정된 실습만 제외
            if (classNameMatches) {
                if (!isAssignedInCurrentWeek) {
                    const resultKey = 'class|' + classKey;
                    if (!searchedClasses.has(resultKey)) {
                        searchedClasses.add(resultKey);
                        searchResults.push({
                            classId: cls.id,
                            className: cls.name,
                            dayTime: cls.day + '요일 ' + cls.time + '(W' + cls.week + ')',
                            type: '실습',
                            content: cls.name,
                            tab: 'preparation'
                        });
                    }
                }
            }
        });
        
        if (searchResults.length > 0) {
            showDetailedSearchResults(searchResults);
        } else {
            document.getElementById('timetable').innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">검색 결과가 없습니다</div>';
        }
    });
}

// 검색 결과 표시
function showDetailedSearchResults(results) {
    const timetable = document.getElementById('timetable');
    const categoryOrder = ['사고 대처', '안전수칙', '준비물', '실습'];
    const categoryColors = {
        '사고 대처': '#e74c3c',
        '안전수칙': '#f39c12',
        '준비물': '#2ecc71',
        '실습': '#667eea'
    };
    
    const categorized = {};
    categoryOrder.forEach(cat => { categorized[cat] = []; });
    
    results.forEach(result => {
        if (categorized[result.type] !== undefined) {
            categorized[result.type].push(result);
        }
    });
    
    let html = '<div>';
    categoryOrder.forEach(category => {
        if (categorized[category].length > 0) {
            html += '<div style="margin-top: 20px;"><div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;"><div style="width: 4px; height: 20px; background: ' + categoryColors[category] + '; border-radius: 2px;"></div><span style="font-weight: 600; color: ' + categoryColors[category] + '; font-size: 14px;">📌 ' + category + '</span></div>';
            
            categorized[category].forEach(result => {
                html += '<div style="background: white; padding: 12px; margin-bottom: 8px; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.08);" onclick="showDetailWithTab(' + result.classId + ', \'' + result.tab + '\')"><strong style="color: #333;">' + result.className + '</strong><div style="font-size: 12px; color: #999; margin-top: 2px;">' + result.dayTime + '</div><div style="font-size: 13px; color: #666; margin-top: 6px;">' + result.content + '</div></div>';
            });
            
            html += '</div>';
        }
    });
    html += '</div>';
    
    timetable.innerHTML = html;
}

// 특정 탭과 함께 상세 페이지 표시
function showDetailWithTab(classId, tabName) {
    showDetail(classId);
    setTimeout(() => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        document.querySelector('[data-tab="' + tabName + '"]').classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }, 100);
}

// 검색 지우기
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClearBtn').classList.remove('active');
    renderTimetable();
    renderTodaySchedule();
}

// 로그인 모달 열기
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

// 로그인 모달 닫기
function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    resetLoginForm();
}

// 로그인 버튼 업데이트
function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.textContent = '로그아웃';
        loginBtn.onclick = handleLogout;
    }
}

// 로그아웃 처리
function handleLogout() {
    if (confirm('로그아웃하시겠습니까?')) {
        // localStorage에서 사용자 정보 삭제
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        
        alert('로그아웃되었습니다.');
        
        // 로그인 페이지로 전환
        showLoginPage();
    }
}

// 회원가입 모달 열기
function openSignupModal() {
    initializeRegisteredUsers();
    document.getElementById('signupModal').classList.add('active');
}

// 회원가입 모달 닫기
function closeSignupModal() {
    document.getElementById('signupModal').classList.remove('active');
    resetSignupForm();
}

// 회원가입 역할 선택
function selectSignupRole(role) {
    const roleSelection = document.getElementById('signupRoleSelection');
    const signupForm = document.getElementById('signupForm');
    
    roleSelection.style.display = 'none';
    signupForm.style.display = 'block';
    
    // 역할 저장
    document.getElementById('signupForm').dataset.role = role;
}

// 역할 선택으로 돌아가기
function backToSignupRoleSelection() {
    document.getElementById('signupRoleSelection').style.display = 'flex';
    document.getElementById('signupForm').style.display = 'none';
    resetSignupForm();
}

// 회원가입 폼 초기화
function resetSignupForm() {
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('signupRoleSelection').style.display = 'flex';
}

// 회원가입 처리
function handleSignup() {
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const role = document.getElementById('signupForm').dataset.role;
    
    // 입력값 검증
    if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
    }
    
    // 비밀번호 최소 길이 검증 (4자 이상)
    if (password.length < 4) {
        alert('비밀번호는 4자 이상이어야 합니다.');
        return;
    }
    
    // 등록된 사용자 데이터 조회
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    const users = registeredUsers[role] || [];
    
    // 중복 이메일 검사
    if (users.some(u => u.email === email)) {
        alert('이미 가입된 이메일입니다.');
        return;
    }
    
    // 새 사용자 추가
    users.push({ email, password });
    registeredUsers[role] = users;
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // 회원가입 성공
    const roleText = role === 'teacher' ? '선생' : '학생';
    alert(roleText + ' 회원가입을 완료했습니다!\n로그인하실 수 있습니다.');
    
    // 모달 닫기
    closeSignupModal();
}

// 로그인 역할 선택
function selectLoginRole(role) {
    const roleSelection = document.getElementById('loginRoleSelection');
    const loginForm = document.getElementById('loginForm');
    
    roleSelection.style.display = 'none';
    loginForm.style.display = 'block';
    
    // 역할 저장
    document.getElementById('loginForm').dataset.role = role;
}

// 역할 선택으로 돌아가기
function backToRoleSelection() {
    document.getElementById('loginRoleSelection').style.display = 'flex';
    document.getElementById('loginForm').style.display = 'none';
    resetLoginForm();
}

// 로그인 폼 초기화
function resetLoginForm() {
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('loginRoleSelection').style.display = 'flex';
}

// 로그인 처리
function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const role = document.getElementById('loginForm').dataset.role;
    
    // 입력값 검증
    if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
    }
    
    // 등록된 사용자인지 여부 확인
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    const users = registeredUsers[role] || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('등록되지 않은 사용자이거나 비밀번호가 다릅니다.');
        return;
    }
    
    // 로그인 성공
    const roleText = role === 'teacher' ? '선생' : '학생';
    alert(roleText + ' 로그인 성공!\n이메일: ' + email);
    
    // localStorage에 사용자 정보 저장
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    
    // 로그인 성공 후 모달 닫기
    closeLoginModal();
    
    // 메인 페이지로 전환
    showMainPage();
}

// SOS 모달 열기
function openSOSModal() {
    document.getElementById('sosModal').classList.add('active');
}

// SOS 모달 닫기
function closeSOSModal() {
    document.getElementById('sosModal').classList.remove('active');
}

// ==================== 선생 전용 기능 ====================

// 선생 시간표 데이터 초기화
function initializeTeacherSchedule() {
    if (!localStorage.getItem('teacherSchedule')) {
        const teacherSchedule = {
            '1': [],
            '2': [],
            '3': [],
            '4': []
        };
        localStorage.setItem('teacherSchedule', JSON.stringify(teacherSchedule));
    }
}

// 학생 할당 모달 열기
function openAssignStudentModal() {
    const modal = document.getElementById('assignStudentModal');
    if (modal) {
        modal.classList.add('active');
        
        // 학생 목록 로드
        loadAvailableStudents();
        
        // 현재 선생의 할당된 학생 목록 표시
        displayAssignedStudents();
    }
}

// 학생 할당 모달 닫기
function closeAssignStudentModal() {
    const modal = document.getElementById('assignStudentModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.getElementById('studentEmail').value = '';
}

// 사용 가능한 학생 목록 로드
function loadAvailableStudents() {
    initializeRegisteredUsers();
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    const students = registeredUsers.student || [];
    
    const studentEmailSelect = document.getElementById('studentEmail');
    // 첫 번째 옵션 제외하고 모두 제거
    while (studentEmailSelect.options.length > 1) {
        studentEmailSelect.remove(1);
    }
    
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.email;
        option.textContent = student.email;
        studentEmailSelect.appendChild(option);
    });
}

// 할당된 학생 목록 표시
function displayAssignedStudents() {
    initializeTeacherGroups();
    const teacherEmail = localStorage.getItem('userEmail');
    const teacherGroups = JSON.parse(localStorage.getItem('teacherGroups') || '{}');
    const assignedStudents = teacherGroups[teacherEmail] || [];
    
    const studentListContainer = document.getElementById('studentListContainer');
    
    if (assignedStudents.length === 0) {
        studentListContainer.innerHTML = '<div style="color: #999; font-size: 12px;">할당된 학생이 없습니다.</div>';
        return;
    }
    
    let html = '';
    assignedStudents.forEach(studentEmail => {
        html += '<div style="background: #f0f0f0; padding: 10px; margin-bottom: 8px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">';
        html += '<span style="font-size: 13px;">' + studentEmail + '</span>';
        html += '<button onclick="removeStudentAssignment(\'' + studentEmail.replace(/'/g, "\\'") + '\')" style="background: #ff6b6b; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 11px;">제거</button>';
        html += '</div>';
    });
    
    studentListContainer.innerHTML = html;
}

// 학생 할당 처리
function handleAssignStudent() {
    const studentEmail = document.getElementById('studentEmail').value;
    
    if (!studentEmail) {
        alert('학생을 선택해주세요.');
        return;
    }
    
    const teacherEmail = localStorage.getItem('userEmail');
    assignStudentToTeacher(teacherEmail, studentEmail);
    
    alert(studentEmail + ' 학생이 배정되었습니다!');
    
    // 목록 새로고침
    loadAvailableStudents();
    displayAssignedStudents();
    document.getElementById('studentEmail').value = '';
}

// 학생 할당 제거
function removeStudentAssignment(studentEmail) {
    if (!confirm(studentEmail + ' 학생의 배정을 해제하시겠습니까?')) {
        return;
    }
    
    initializeTeacherGroups();
    const teacherEmail = localStorage.getItem('userEmail');
    const teacherGroups = JSON.parse(localStorage.getItem('teacherGroups') || '{}');
    
    if (teacherGroups[teacherEmail]) {
        teacherGroups[teacherEmail] = teacherGroups[teacherEmail].filter(email => email !== studentEmail);
    }
    
    localStorage.setItem('teacherGroups', JSON.stringify(teacherGroups));
    
    alert(studentEmail + ' 학생의 배정이 해제되었습니다.');
    displayAssignedStudents();
}

// 선생 현재 주차
let currentWeekTeacher = calculateCurrentWeek();

// 선생용 시간표 렌더링
function renderTimetableTeacher() {
    initializeTeacherSchedule();
    
    const timetableTeacher = document.getElementById('timetableTeacher');
    const weekTitleTeacher = document.getElementById('weekTitleTeacher');
    
    // 선생이 배정한 강의 데이터 불러오기
    const teacherSchedule = JSON.parse(localStorage.getItem('teacherSchedule') || '{}');
    const weekClasses = teacherSchedule[String(currentWeekTeacher)] || [];
    
    // 주차 날짜 범위 계산
    const dateRange = getWeekDateRange(currentWeekTeacher);
    const dateRangeText = dateRange.startMonth + '/' + dateRange.startDay + '~' + dateRange.endMonth + '/' + dateRange.endDay;
    weekTitleTeacher.textContent = '📅 ' + currentWeekTeacher + '주차 시간표 (' + dateRangeText + ')';
    
    // 시간표 초기화
    timetableTeacher.innerHTML = '';
    
    // 월-목 그리드
    const topGrid = document.createElement('div');
    topGrid.style.display = 'grid';
    topGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    topGrid.style.gap = '0';
    topGrid.style.marginBottom = '20px';
    
    // 금-토-일 그리드
    const bottomGrid = document.createElement('div');
    bottomGrid.style.display = 'grid';
    bottomGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    bottomGrid.style.gap = '0';
    
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    
    // 월-목 렌더링
    for (let i = 0; i < 4; i++) {
        const day = days[i];
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.style.borderRight = i < 3 ? '1px solid #ddd' : 'none';
        dayHeader.textContent = day;
        
        const classList = weekClasses.filter(c => c.day === day);
        const classBox = document.createElement('div');
        classBox.style.padding = '16px';
        classBox.style.borderRight = i < 3 ? '1px solid #ddd' : 'none';
        classBox.style.borderBottom = '1px solid #ddd';
        classBox.style.minHeight = '100px';
        classBox.style.cursor = 'pointer';
        classBox.style.backgroundColor = '#f9f9f9';
        classBox.onclick = (function(dayVal) {
            return function() { openAddClassModal(dayVal); };
        })(day);
        
        if (classList.length > 0) {
            classList.forEach(function(cls) {
                const classItem = document.createElement('div');
                classItem.style.padding = '8px';
                classItem.style.marginBottom = '8px';
                classItem.style.backgroundColor = '#667eea';
                classItem.style.color = 'white';
                classItem.style.borderRadius = '4px';
                classItem.style.fontSize = '12px';
                classItem.style.textAlign = 'center';
                classItem.style.position = 'relative';
                classItem.style.wordWrap = 'break-word';
                
                const textContent = document.createElement('div');
                textContent.style.fontSize = '11px';
                textContent.innerHTML = cls.name + '<br>' + cls.time;
                classItem.appendChild(textContent);
                
                // 삭제 버튼
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '×';
                deleteBtn.style.position = 'absolute';
                deleteBtn.style.top = '0';
                deleteBtn.style.right = '2px';
                deleteBtn.style.background = 'rgba(0,0,0,0.3)';
                deleteBtn.style.border = 'none';
                deleteBtn.style.color = 'white';
                deleteBtn.style.width = '20px';
                deleteBtn.style.height = '20px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.fontSize = '16px';
                deleteBtn.style.padding = '0';
                deleteBtn.onclick = (function(weekVal, dayVal, classId) {
                    return function(e) {
                        e.stopPropagation();
                        deleteClass(weekVal, dayVal, classId);
                    };
                })(currentWeekTeacher, day, cls.id);
                classItem.appendChild(deleteBtn);
                
                classBox.appendChild(classItem);
            });
        } else {
            const emptyText = document.createElement('div');
            emptyText.style.color = '#999';
            emptyText.style.fontSize = '12px';
            emptyText.style.textAlign = 'center';
            emptyText.style.lineHeight = '100px';
            emptyText.textContent = '강의 추가';
            classBox.appendChild(emptyText);
        }
        
        topGrid.appendChild(dayHeader);
        topGrid.appendChild(classBox);
    }
    
    // 금-토-일 렌더링
    for (let i = 4; i < 7; i++) {
        const day = days[i];
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.style.borderRight = i < 6 ? '1px solid #ddd' : 'none';
        dayHeader.textContent = day;
        
        const classList = weekClasses.filter(c => c.day === day);
        const classBox = document.createElement('div');
        classBox.style.padding = '16px';
        classBox.style.borderRight = i < 6 ? '1px solid #ddd' : 'none';
        classBox.style.borderBottom = '1px solid #ddd';
        classBox.style.minHeight = '100px';
        classBox.style.cursor = 'pointer';
        classBox.style.backgroundColor = '#f9f9f9';
        classBox.onclick = (function(dayVal) {
            return function() { openAddClassModal(dayVal); };
        })(day);
        
        if (classList.length > 0) {
            classList.forEach(function(cls) {
                const classItem = document.createElement('div');
                classItem.style.padding = '8px';
                classItem.style.marginBottom = '8px';
                classItem.style.backgroundColor = '#667eea';
                classItem.style.color = 'white';
                classItem.style.borderRadius = '4px';
                classItem.style.fontSize = '12px';
                classItem.style.textAlign = 'center';
                classItem.style.position = 'relative';
                classItem.style.wordWrap = 'break-word';
                
                const textContent = document.createElement('div');
                textContent.style.fontSize = '11px';
                textContent.innerHTML = cls.name + '<br>' + cls.time;
                classItem.appendChild(textContent);
                
                // 삭제 버튼
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '×';
                deleteBtn.style.position = 'absolute';
                deleteBtn.style.top = '0';
                deleteBtn.style.right = '2px';
                deleteBtn.style.background = 'rgba(0,0,0,0.3)';
                deleteBtn.style.border = 'none';
                deleteBtn.style.color = 'white';
                deleteBtn.style.width = '20px';
                deleteBtn.style.height = '20px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.fontSize = '16px';
                deleteBtn.style.padding = '0';
                deleteBtn.onclick = (function(weekVal, dayVal, classId) {
                    return function(e) {
                        e.stopPropagation();
                        deleteClass(weekVal, dayVal, classId);
                    };
                })(currentWeekTeacher, day, cls.id);
                classItem.appendChild(deleteBtn);
                
                classBox.appendChild(classItem);
            });
        } else {
            const emptyText = document.createElement('div');
            emptyText.style.color = '#999';
            emptyText.style.fontSize = '12px';
            emptyText.style.textAlign = 'center';
            emptyText.style.lineHeight = '100px';
            emptyText.textContent = '강의 추가';
            classBox.appendChild(emptyText);
        }
        
        bottomGrid.appendChild(dayHeader);
        bottomGrid.appendChild(classBox);
    }
    
    timetableTeacher.appendChild(topGrid);
    timetableTeacher.appendChild(bottomGrid);
}

// 선생 다음 주로 이동
function nextWeekTeacher() {
    if (currentWeekTeacher < 4) {
        currentWeekTeacher++;
    } else {
        currentWeekTeacher = 1;
    }
    renderTimetableTeacher();
}

// 선생 이전 주로 이동
function prevWeekTeacher() {
    if (currentWeekTeacher > 1) {
        currentWeekTeacher--;
    } else {
        currentWeekTeacher = 4;
    }
    renderTimetableTeacher();
}

// 강의 추가 모달 열기
function openAddClassModal(day) {
    const modal = document.getElementById('addClassModal');
    if (modal) {
        modal.classList.add('active');
        
        // 현재 주차로 초기화
        const weekSelect = document.getElementById('classWeek');
        if (weekSelect) {
            weekSelect.value = String(currentWeekTeacher);
        }
        
        // 선택된 요일로 초기화
        if (day) {
            const daySelect = document.getElementById('classDay');
            if (daySelect) {
                daySelect.value = day;
            }
        }
    }
}

// 강의 추가 모달 닫기
function closeAddClassModal() {
    const modal = document.getElementById('addClassModal');
    if (modal) {
        modal.classList.remove('active');
    }
    resetAddClassForm();
}

// 강의 추가 폼 초기화
function resetAddClassForm() {
    document.getElementById('className').value = '';
    document.getElementById('classWeek').value = '1';
    document.getElementById('classDay').value = '월';
    document.getElementById('classStartHour').value = '';
    document.getElementById('classStartMin').value = '';
    document.getElementById('classEndHour').value = '';
    document.getElementById('classEndMin').value = '';
}

// 강의 추가 처리
function handleAddClass() {
    const className = document.getElementById('className').value.trim();
    const classWeek = document.getElementById('classWeek').value;
    const classDay = document.getElementById('classDay').value;
    const startHour = document.getElementById('classStartHour').value;
    const startMin = document.getElementById('classStartMin').value;
    const endHour = document.getElementById('classEndHour').value;
    const endMin = document.getElementById('classEndMin').value;
    
    // 입력값 검증
    if (!className || !classWeek || !classDay || !startHour || !startMin || !endHour || !endMin) {
        alert('모든 정보를 입력해주세요.');
        return;
    }
    
    if (!className.match(/실습$/)) {
        alert('올바른 실습명을 선택해주세요.');
        return;
    }
    
    // 시간 형식으로 변환 (HH:MM-HH:MM)
    const classTime = `${startHour}:${startMin}-${endHour}:${endMin}`;
    
    // 선생 시간표 데이터 불러오기
    const teacherSchedule = JSON.parse(localStorage.getItem('teacherSchedule') || '{}');
    
    // 새 강의 객체 생성
    const newClass = {
        id: Date.now(),
        name: className,
        day: classDay,
        time: classTime
    };
    
    // 해당 주차에 강의 추가
    if (!teacherSchedule[classWeek]) {
        teacherSchedule[classWeek] = [];
    }
    teacherSchedule[classWeek].push(newClass);
    
    // localStorage에 저장
    localStorage.setItem('teacherSchedule', JSON.stringify(teacherSchedule));
    
    // 성공 메시지
    alert('강의가 추가되었습니다.');
    
    // 모달 닫기
    closeAddClassModal();
    
    // 현재 주의 강의를 추가한 경우에만 화면 업데이트
    if (String(currentWeekTeacher) === classWeek) {
        renderTimetableTeacher();
    }
}

// 강의 삭제 처리
function deleteClass(week, day, classId) {
    if (!confirm('강의를 삭제하시겠습니까?')) {
        return;
    }
    
    // 선생 시간표 데이터 불러오기
    const teacherSchedule = JSON.parse(localStorage.getItem('teacherSchedule') || '{}');
    
    // 해당 주차의 강의 중 삭제할 강의 제거
    if (teacherSchedule[String(week)]) {
        teacherSchedule[String(week)] = teacherSchedule[String(week)].filter(c => c.id !== classId);
    }
    
    // localStorage에 저장
    localStorage.setItem('teacherSchedule', JSON.stringify(teacherSchedule));
    
    // 화면 업데이트
    renderTimetableTeacher();
}

// 전화 걸기
function makeCall(number) {
    alert('전화 번호: ' + number);
}

// 모달 오버레이 클릭 시 닫기
document.addEventListener('DOMContentLoaded', () => {
    const sosModal = document.getElementById('sosModal');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const addClassModal = document.getElementById('addClassModal');
    const assignStudentModal = document.getElementById('assignStudentModal');
    
    if (sosModal) {
        sosModal.addEventListener('click', (e) => {
            if (e.target === sosModal) {
                closeSOSModal();
            }
        });
    }
    
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }
    
    if (signupModal) {
        signupModal.addEventListener('click', (e) => {
            if (e.target === signupModal) {
                closeSignupModal();
            }
        });
    }
    
    if (addClassModal) {
        addClassModal.addEventListener('click', (e) => {
            if (e.target === addClassModal) {
                closeAddClassModal();
            }
        });
    }
    
    if (assignStudentModal) {
        assignStudentModal.addEventListener('click', (e) => {
            if (e.target === assignStudentModal) {
                closeAssignStudentModal();
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', initPage);
