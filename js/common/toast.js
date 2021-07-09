function toast({
  message = '',
  type = 'info',
  duration = 3000
}) {
  const main = document.getElementById('toast');
  const toast = document.createElement('div');
  const icons = {
    success: 'fas fa-check-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-circle',
    error: 'fas fa-exclamation-triangle'
  }
  const icon = icons[type];

  toast.classList.add('toast', `toast--${type}`);
  toast.style.animation = 'show_slide 1s ease forwards'
  toast.innerHTML = `<div class="toast__icon">
      <i class="${icon}"></i>
    </div>
    <div class="toast__body">
      <span class="toast__msg">${message}</span>
    </div>
    <div class="toast__close">
      <i class="fas fa-times"></i>
    </div>`
  main.appendChild(toast)

  // Auto remove toast
  const autoRemoveId = setTimeout(() => {
    main.removeChild(toast);
  }, duration + 1550)

  setTimeout(() => {
    toast.classList.add('hide');
  }, duration + 1000)

  // Remove toast when clicked
  toast.onclick = function (e) {
    if (e.target.closest('.toast__close')) { // target vào nó hoặc các con của nó
      main.removeChild(toast);
      clearTimeout(autoRemoveId);
    }

  }
}