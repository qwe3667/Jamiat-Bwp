// Initialize empty data arrays
let messages = [];
let programs = [];
let members = [];
let attendance = [];

// Save empty data to localStorage
function saveData() {
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('programs', JSON.stringify(programs));
    localStorage.setItem('members', JSON.stringify(members));
    localStorage.setItem('attendance', JSON.stringify(attendance));
}

// Clear old data on first load
localStorage.clear();
saveData();

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        document.getElementById(tab).classList.add('active');
    });
});

// Render Messages
function renderMessages() {
    const list = document.getElementById('messagesList');
    list.innerHTML = '';
    messages.forEach((msg, idx) => {
        const div = document.createElement('div');
        div.className = 'message-card';
        div.innerHTML = `<strong>${msg.name}</strong><p>${msg.text}</p>`;
        list.appendChild(div);
    });
}

// Render Programs
function renderPrograms() {
    const list = document.getElementById('programsList');
    list.innerHTML = '';
    programs.forEach((prog, idx) => {
        const div = document.createElement('div');
        div.className = 'program-card';
        div.innerHTML = `<strong>${prog.title}</strong><p>${prog.date}</p><p>${prog.desc}</p>`;
        list.appendChild(div);
    });
    updateProgramSelect();
}

// Render Members
function renderMembers() {
    const list = document.getElementById('membersList');
    list.innerHTML = '';
    members.forEach((mem, idx) => {
        const div = document.createElement('div');
        div.className = 'member-card';
        div.textContent = mem.name;
        list.appendChild(div);
    });
    document.getElementById('totalMembers').textContent = members.length;
    updateMemberCheckboxes();
}

// Update Program Select in Attendance Modal
function updateProgramSelect() {
    const select = document.getElementById('attendanceProgram');
    select.innerHTML = '';
    programs.forEach((prog, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = `${prog.title} (${prog.date})`;
        select.appendChild(option);
    });
    document.getElementById('totalPrograms').textContent = programs.length;
}

// Update Member Checkboxes in Attendance Modal
function updateMemberCheckboxes() {
    const container = document.getElementById('memberCheckboxes');
    container.innerHTML = '';
    members.forEach((mem, idx) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${idx}"> ${mem.name}`;
        container.appendChild(label);
    });
}

// Render Attendance Stats
function updateAttendanceStats() {
    document.getElementById('totalAttendance').textContent = attendance.length;
}

// --- Modal Functions ---
function openMessageModal(){ document.getElementById('messageModal').style.display='block'; }
function closeMessageModal(){ document.getElementById('messageModal').style.display='none'; }
function openProgramModal(){ document.getElementById('programModal').style.display='block'; }
function closeProgramModal(){ document.getElementById('programModal').style.display='none'; }
function openMemberModal(){ document.getElementById('memberModal').style.display='block'; }
function closeMemberModal(){ document.getElementById('memberModal').style.display='none'; }
function openAttendanceModal(){ document.getElementById('attendanceModal').style.display='block'; }
function closeAttendanceModal(){ document.getElementById('attendanceModal').style.display='none'; }

// --- Submit Functions ---
function submitMessage(e){
    e.preventDefault();
    const name=document.getElementById('messageName').value;
    const text=document.getElementById('messageText').value;
    messages.push({name,text});
    saveData(); renderMessages(); closeMessageModal(); document.getElementById('messageForm').reset();
}

function submitProgram(e){
    e.preventDefault();
    const title=document.getElementById('programTitle').value;
    const date=document.getElementById('programDate').value;
    const desc=document.getElementById('programDesc').value;
    programs.push({title,date,desc});
    saveData(); renderPrograms(); closeProgramModal(); document.getElementById('programForm').reset();
}

function submitMember(e){
    e.preventDefault();
    const name=document.getElementById('memberName').value;
    members.push({name});
    saveData(); renderMembers(); closeMemberModal(); document.getElementById('memberForm').reset();
}

function submitAttendance(e){
    e.preventDefault();
    const progIdx=document.getElementById('attendanceProgram').value;
    const checkedBoxes=[...document.querySelectorAll('#memberCheckboxes input:checked')].map(cb=>parseInt(cb.value));
    attendance.push({program:progIdx,members:checkedBoxes});
    saveData(); updateAttendanceStats(); closeAttendanceModal(); document.getElementById('attendanceForm').reset();
}

// Initial render
renderMessages(); renderPrograms(); renderMembers(); updateAttendanceStats();
