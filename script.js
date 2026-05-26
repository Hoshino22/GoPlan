const openLogin =
  document.getElementById("openLogin");

const loginModal =
  document.getElementById("loginModal");

const closeLogin =
  document.getElementById("closeLogin");

const closeBtn =
  document.getElementById("closeBtn");

/* OPEN MODAL */

openLogin.addEventListener("click", () => {

  loginModal.classList.add("show");

});

/* CLOSE MODAL */

closeLogin.addEventListener("click", () => {

  loginModal.classList.remove("show");

});

closeBtn.addEventListener("click", () => {

  loginModal.classList.remove("show");

});

/* SWITCH FORM */

const loginForm =
  document.getElementById("loginForm");

const registerForm =
  document.getElementById("registerForm");

const showRegister =
  document.getElementById("showRegister");

const showLogin =
  document.getElementById("showLogin");

/* OPEN REGISTER */

showRegister.addEventListener("click", (e) => {

  e.preventDefault();

  loginForm.classList.remove("active");

  registerForm.classList.add("active");

});

/* OPEN LOGIN */

showLogin.addEventListener("click", (e) => {

  e.preventDefault();

  registerForm.classList.remove("active");

  loginForm.classList.add("active");

});

/* SHOW PASSWORD */

const toggles =
  document.querySelectorAll(".toggle-password");

toggles.forEach(toggle => {

  toggle.addEventListener("click", () => {

    const target =
      document.getElementById(
        toggle.dataset.target
      );

    if(target.type === "password"){

      target.type = "text";

      toggle.classList.remove("fa-eye");

      toggle.classList.add("fa-eye-slash");

    }else{

      target.type = "password";

      toggle.classList.remove("fa-eye-slash");

      toggle.classList.add("fa-eye");

    }

  });

});
/* =========================
   TODO LIST
========================= */

/* =========================
   TODO LIST
========================= */

const todoInput = document.getElementById("todoInput");

/* =========================
   USER AUTH MANAGEMENT
========================= */

// Load user on page load
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if(user) {
    updateUIForLoggedInUser(user);
  }
});

// Handle Login
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
if(loginSubmitBtn) {
  loginSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("loginName").value.trim();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    
    if(!name || !email || !password) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    const user = {
      name: name,
      email: email
    };
    
    localStorage.setItem("currentUser", JSON.stringify(user));
    loginModal.classList.remove("show");
    
    updateUIForLoggedInUser(user);
    
    // Clear form
    document.getElementById("loginName").value = "";
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
  });
}

// Handle Register
const registerSubmitBtn = document.getElementById("registerSubmitBtn");
if(registerSubmitBtn) {
  registerSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    
    if(!name || !email || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    if(password !== confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }
    
    const user = {
      name: name,
      email: email
    };
    
    localStorage.setItem("currentUser", JSON.stringify(user));
    loginModal.classList.remove("show");
    
    updateUIForLoggedInUser(user);
    
    // Clear form
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  });
}

// Update UI when user logs in
function updateUIForLoggedInUser(user) {
  const openLoginBtn = document.getElementById("openLogin");
  const avatarBtn = document.getElementById("avatarBtn");
  const avatarText = document.getElementById("avatarText");
  
  if(openLoginBtn && avatarBtn) {
    openLoginBtn.style.display = "none";
    avatarBtn.style.display = "flex";
    
    // Get first letter of name in uppercase
    const firstLetter = user.name.charAt(0).toUpperCase();
    avatarText.textContent = firstLetter;
  }
}

// Handle Avatar Button Click
const avatarBtn = document.getElementById("avatarBtn");
if(avatarBtn) {
  avatarBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if(user) {
      const isLogout = confirm(`Bạn muốn đăng xuất ${user.name}?`);
      if(isLogout) {
        localStorage.removeItem("currentUser");
        location.reload();
      }
    }
  });
}

/* =========================
   GOOGLE SIGN-IN
========================= */

// Handle Google Login (Simple version without backend)
const googleLoginBtns = document.querySelectorAll(".social-btn.google");
googleLoginBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Simulate Google login by generating mock user data
    // In production, you would use Google OAuth 2.0
    
    const googleUser = {
      name: "Google User",
      email: "user@gmail.com",
      isGoogleAuth: true
    };
    
    // Save user to localStorage
    localStorage.setItem("currentUser", JSON.stringify(googleUser));
    
    // Close modal
    const modal = document.getElementById("loginModal");
    if(modal) {
      modal.classList.remove("show");
    }
    
    // Update UI
    updateUIForLoggedInUser(googleUser);
    
    // Show success message
    alert("Đăng nhập Google thành công!");
  });
});
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

if (addTodoBtn) {

  addTodoBtn.addEventListener("click", addTask);

  todoInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
      addTask();
    }

  });

}

function addTask() {

  const task = todoInput.value.trim();

  if (task === "") return;

  const taskWidget = document.createElement("div");

  taskWidget.className = "task-widget";

  taskWidget.innerHTML = `

    <div class="task-left">

      <label class="custom-checkbox">

        <input type="checkbox">

        <span class="checkmark">
          <i class="fa-solid fa-check"></i>
        </span>

      </label>

      <span class="task-text">
        ${task}
      </span>

    </div>

    <button class="delete-task">

      <i class="fa-solid fa-trash"></i>

    </button>

  `;

  /* COMPLETE */

  const checkbox = taskWidget.querySelector("input");

  const taskText = taskWidget.querySelector(".task-text");

  checkbox.addEventListener("change", () => {

    if (checkbox.checked) {

      taskText.classList.add("completed");

    } else {

      taskText.classList.remove("completed");

    }

  });

  /* DELETE */

  const deleteBtn = taskWidget.querySelector(".delete-task");

  deleteBtn.addEventListener("click", () => {

    taskWidget.remove();

  });

  todoList.appendChild(taskWidget);

  todoInput.value = "";

}