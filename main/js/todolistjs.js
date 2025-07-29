function changepage(url) {
    window.location.href = url;
}
const calendar = document.getElementById("calendar");
const modal = document.getElementById("taskModal");
const overlay = document.getElementById("modalOverlay");
const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const taskType = document.getElementById("taskType");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

let selectedDayBox = null;
let editingTask = null; // لتتبع المهمة التي نعدلها

// تحميل المهام من localStorage
function loadTasks() {
  const data = localStorage.getItem('tasksData');
  if (!data) return;
  const tasksData = JSON.parse(data);

  for (const day in tasksData) {
    const dayBox = calendar.querySelector(`.daybox[data-day='${day}']`);
    if (!dayBox) continue;
    dayBox.innerHTML = `<strong>${day}</strong>`; // تنظيف القديم

    tasksData[day].forEach(task => {
      createTaskElement(dayBox, task);
    });
  }
}

// حفظ المهام في localStorage
function saveTasksData() {
  const tasksData = {};
  calendar.querySelectorAll('.daybox').forEach(dayBox => {
    const day = dayBox.getAttribute('data-day');
    tasksData[day] = [];
    dayBox.querySelectorAll('.task').forEach(taskEl => {
      tasksData[day].push({
        text: taskEl.getAttribute('data-text'),
        time: taskEl.getAttribute('data-time'),
        type: taskEl.getAttribute('data-type')
      });
    });
  });
  localStorage.setItem('tasksData', JSON.stringify(tasksData));
}

// إنشاء عنصر مهمة
function createTaskElement(dayBox, task) {
  const taskEl = document.createElement('div');
  taskEl.className = 'task ' + (task.type || 'normal');
  taskEl.textContent = `${task.time} - ${task.text}`;
  taskEl.setAttribute('data-text', task.text);
  taskEl.setAttribute('data-time', task.time);
  taskEl.setAttribute('data-type', task.type || 'normal');

  // عند النقر على مهمة لفتح نافذة التعديل
  taskEl.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(dayBox, taskEl);
  });

  dayBox.appendChild(taskEl);
}

// إنشاء مربعات الأيام
for (let i = 1; i <= 31; i++) {
  const day = document.createElement("div");
  day.className = "daybox";
  day.setAttribute('data-day', i);
  day.innerHTML = `<strong>${i}</strong>`;
  day.tabIndex = 0;
  day.setAttribute('role', 'button');
  day.setAttribute('aria-label', `Day ${i}, click to add or edit task`);
  day.addEventListener('click', () => openModal(day));
  day.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(day);
    }
  });
  calendar.appendChild(day);
}

function openModal(dayBox, taskEl = null) {
  selectedDayBox = dayBox;
  editingTask = taskEl;

  if (taskEl) {
    // تعديل مهمة موجودة
    taskInput.value = taskEl.getAttribute('data-text');
    taskTime.value = taskEl.getAttribute('data-time');
    taskType.value = taskEl.getAttribute('data-type');
  } else {
    // مهمة جديدة
    taskInput.value = '';
    taskTime.value = '';
    taskType.value = 'normal';
  }

  modal.style.display = 'block';
  overlay.style.display = 'block';
  taskInput.focus();
}

function closeModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
  editingTask = null;
}

saveBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  const time = taskTime.value;
  const type = taskType.value;

  if (!text || !time) {
    alert('Please enter a task and choose a time.');
    return;
  }

  if (editingTask) {
    // تعديل مهمة موجودة
    editingTask.textContent = `${time} - ${text}`;
    editingTask.setAttribute('data-text', text);
    editingTask.setAttribute('data-time', time);
    editingTask.setAttribute('data-type', type);
    editingTask.className = 'task ' + type;
  } else {
    // إضافة مهمة جديدة
    createTaskElement(selectedDayBox, { text, time, type });
  }

  saveTasksData();
  closeModal();
});

cancelBtn.addEventListener('click', () => closeModal());
overlay.addEventListener('click', () => closeModal());

// تحميل المهام عند بدء الصفحة
window.addEventListener('load', () => {
  loadTasks();
});

