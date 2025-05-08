const textarea = document.getElementById('expandingText');

textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
});

textarea.dispatchEvent(new Event('input'));
