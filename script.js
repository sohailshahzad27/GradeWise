// JavaScript for Sidebar Toggle and Notification Dropdown
const sidebar = document.querySelector('.sidebar');
const burgerMenuButton = document.querySelector('.burger-menu-button');
const notificationDropdown = document.getElementById('notificationDropdown');

// Toggle sidebar on mobile by toggling "active" on sidebar and "shifted" on content
function toggleSidebar() {
    if(window.innerWidth <= 768) {
      const sidebar = document.querySelector('.sidebar');
      const content = document.querySelector('.content');
      sidebar.classList.toggle('active');
      content.classList.toggle('shifted');
    }
  }

  // Dummy function for notifications toggle
  function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('hidden');
  }



// *** JavaScript for dynamic content and basic interactions would go here ***

// Placeholder for updating notification count dynamically
function updateNotificationCount(count) {
    const notificationCountSpan = document.getElementById('notificationCount');
    if (count > 0) {
        notificationCountSpan.textContent = count > 9 ? '9+' : count; // YouTube style
        notificationCountSpan.style.display = 'block'; // Make badge visible if count > 0
    } else {
        notificationCountSpan.style.display = 'none'; // Hide badge if count is 0
    }
}
updateNotificationCount(3);
// *** Today's Focus Data and Population ***
const todaysFocusData = [
    { type: "Quiz", subject: "Database Systems", date: "Sep 7", detailLink: "quiz-dbms.html" },
    { type: "Assignment", subject: "Object Oriented Programming", date: "Sep 10", detailLink: "assignment-oop.html" },
    // ... Add more events as needed
];


document.addEventListener('DOMContentLoaded', function() {
  // Function to format the date
  function formatDate(date) {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }

  // Get and display current date
  const currentDateElement = document.getElementById('currentDate');
  if (currentDateElement) {
    const today = new Date();
    currentDateElement.textContent = formatDate(today);
  }

  // Rest of your existing DOMContentLoaded code...
});

  // Global flags to track expanded state
  let coursesExpanded = false;
  let assignmentsExpanded = false;

  function toggleCourses() {
    const extraCourses = document.querySelectorAll('#enrolledCoursesList .course-item.extra');
    extraCourses.forEach(course => {
      if (coursesExpanded) {
        course.classList.add('hidden');
      } else {
        course.classList.remove('hidden');
      }
    });
    coursesExpanded = !coursesExpanded;
    document.getElementById('see-all-courses').textContent = coursesExpanded ? 'Show less' : 'See all';
  }

  function toggleAssignments() {
    const extraAssignments = document.querySelectorAll('#assignmentsList .assignment-item.extra');
    extraAssignments.forEach(assignment => {
      if (assignmentsExpanded) {
        assignment.classList.add('hidden');
      } else {
        assignment.classList.remove('hidden');
      }
    });
    assignmentsExpanded = !assignmentsExpanded;
    document.getElementById('see-all-assignments').textContent = assignmentsExpanded ? 'Show less' : 'See all';
  }




document.addEventListener('DOMContentLoaded', function() {
  // To-Do List Functionality
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  if (addTodoBtn && todoInput && todoList) {
    // Event listeners
    addTodoBtn.addEventListener('click', handleAddTodo);
    todoInput.addEventListener('keypress', handleEnterKey);
    
    // Initial load
    loadTodos();
  }

  function handleAddTodo(e) {
    e.preventDefault();
    const task = todoInput.value.trim();
    if (task) {
      createTodoItem(task);
      todoInput.value = '';
    }
  }

  function handleEnterKey(e) {
    if (e.key === 'Enter') {
      handleAddTodo(e);
    }
  }

  function createTodoItem(task) {
    const li = document.createElement('li');
    li.className = 'p-4 bg-gray-100 rounded-lg shadow flex items-center justify-between transition transform hover:scale-105 mb-2';

    const taskContainer = document.createElement('div');
    taskContainer.className = 'flex items-center space-x-3 flex-grow';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'h-5 w-5 text-purple-600 focus:ring-purple-500';

    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'font-medium flex-grow';

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeBtn.className = 'text-red-500 hover:text-red-700 ml-4';
    removeBtn.addEventListener('click', () => {
      li.remove();
      saveTodos();
    });

    checkbox.addEventListener('change', () => {
      taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
      taskText.style.color = checkbox.checked ? '#6b7280' : 'inherit';
      saveTodos();
    });

    taskContainer.append(checkbox, taskText);
    li.append(taskContainer, removeBtn);
    todoList.appendChild(li);

    saveTodos();
  }

  function saveTodos() {
    const todos = Array.from(todoList.children).map(li => ({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('input').checked
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
      createTodoItem(todo.text);
      const lastItem = todoList.lastElementChild;
      if (lastItem) {
        const checkbox = lastItem.querySelector('input');
        checkbox.checked = todo.completed;
        const text = lastItem.querySelector('span');
        text.style.textDecoration = todo.completed ? 'line-through' : 'none';
        text.style.color = todo.completed ? '#6b7280' : 'inherit';
      }
    });
  }
});

class TodoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    document.getElementById('addTodoBtn').addEventListener('click', () => this.addTask());
    document.getElementById('todoInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask();
    });
    
    document.querySelectorAll('.priority-filter').forEach(button => {
      button.addEventListener('click', (e) => this.filterTasks(e.target.dataset.priority));
    });
  }

  addTask() {
    const input = document.getElementById('todoInput');
    const priority = document.getElementById('prioritySelect').value;
    const dueDate = document.getElementById('dueDate').value;
    
    if (input.value.trim()) {
      this.tasks.push({
        id: Date.now(),
        text: input.value.trim(),
        completed: false,
        priority,
        dueDate: dueDate || 'No due date',
        createdAt: new Date()
      });
      
      input.value = '';
      this.saveToLocalStorage();
      this.render();
    }
  }

  filterTasks(priority) {
    this.currentFilter = priority;
    document.querySelectorAll('.priority-filter').forEach(btn => {
      btn.classList.toggle('active-filter', btn.dataset.priority === priority);
    });
    this.render();
  }

  render() {
    const filteredTasks = this.currentFilter === 'all' 
      ? this.tasks 
      : this.tasks.filter(task => task.priority === this.currentFilter);
  
    const taskList = document.getElementById('todoList');
    taskList.innerHTML = filteredTasks.map(task => `
      <li class="task-item flex items-center justify-between p-4 bg-white rounded-lg shadow-sm ${
        task.completed ? 'completed' : ''
      }" data-priority="${task.priority}">
        <div class="flex items-center space-x-4">
          <input type="checkbox" ${task.completed ? 'checked' : ''} 
                 onchange="todoList.toggleTask(${task.id})" 
                 class="w-5 h-5">
          <span class="task-text">${task.text}</span>
          <span class="priority-dot ${task.priority}-priority"></span>
          <span class="text-sm text-gray-500">${task.dueDate}</span>
        </div>
        <div class="task-actions flex space-x-2">
          <button onclick="todoList.editTask(${task.id})" class="text-purple-500 hover:text-purple-700">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="todoList.deleteTask(${task.id})" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    `).join('');
  
    // Declare totalTasks before using it
    const totalTasks = this.tasks.length;
  
    // Update progress
    const completedTasks = this.tasks.filter(task => task.completed).length;
    const priorities = ['high', 'medium', 'low'];
    const priorityData = priorities.map(priority => {
      const tasksInCategory = this.tasks.filter(t => t.priority === priority);
      const totalInCategory = tasksInCategory.length;
      const completedInCategory = tasksInCategory.filter(t => t.completed).length;
      
      return {
        priority,
        total: totalInCategory,
        completed: completedInCategory,
        categoryRatio: totalTasks > 0 ? totalInCategory / totalTasks : 0, // Now totalTasks is defined
        completionRatio: totalInCategory > 0 ? completedInCategory / totalInCategory : 0
      };
    });
  
    const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    document.getElementById('progressFill').style.width = `${overallProgress}%`;
    priorityData.forEach(data => {
      const element = document.querySelector(`.${data.priority}-progress`);
      if (element) {
        const categoryWidth = data.categoryRatio * 100;
        const filledWidth = categoryWidth * data.completionRatio;
        element.style.width = `${filledWidth}%`; // Fixed variable name from progressElement to element
      }
    });
  
    document.getElementById('completedCount').textContent = completedTasks;
    document.getElementById('totalCount').textContent = totalTasks;
  }

  toggleTask(id) {
    this.tasks = this.tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    );
    this.saveToLocalStorage();
    this.render();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToLocalStorage();
    this.render();
  }

  editTask(id) {
    const task = this.tasks.find(task => task.id === id);
    const newText = prompt('Edit task:', task.text);
    if (newText !== null) {
      task.text = newText.trim();
      this.saveToLocalStorage();
      this.render();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

// Initialize Todo List
const todoList = new TodoList();




// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('input[type="text"][placeholder="Search"]');
  
  searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      const allItems = document.querySelectorAll('.course-item, .assignment-item');
      let hasResults = false;

      // Show all items when search is empty
      if (searchTerm === '') {
          allItems.forEach(item => item.classList.remove('hidden'));
          return;
      }

      // Search through courses and assignments
      allItems.forEach(item => {
          const title = item.querySelector('.text-lg, .font-bold')?.textContent.toLowerCase();
          const description = item.querySelector('.text-gray-500')?.textContent.toLowerCase();
          
          if (title?.includes(searchTerm) || description?.includes(searchTerm)) {
              item.classList.remove('hidden');
              hasResults = true;
          } else {
              item.classList.add('hidden');
          }
      });

      // Show "no results" message
      const existingNoResults = document.getElementById('no-results-message');
      if (!hasResults && !existingNoResults) {
          const noResults = document.createElement('div');
          noResults.id = 'no-results-message';
          noResults.className = 'text-gray-500 text-center mt-4';
          noResults.textContent = 'No matching courses or assignments found.';
          document.querySelector('.content').appendChild(noResults);
      } else if (hasResults && existingNoResults) {
          existingNoResults.remove();
      }
  });

  // Handle Enter key for search
  searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
          // You can add additional search logic here if needed
          console.log('Performing search for:', e.target.value);
      }
  });
});




// *** Placeholder for login/signup functionality ***
// In a real app, you would handle form submissions with JavaScript,
// send data to a backend for authentication and user management,
// and redirect/update UI based on login status.
// For this HTML template, these sections are just placeholders