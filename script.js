const themeToggle = document.getElementById('theme-toggle');

// Function to switch between light and dark modes
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Change the icon based on the current mode
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.src = 'Images/sun-icon.svg';  // Switch to sun icon
    themeToggle.alt = 'Switch to Light Mode';
    localStorage.setItem('theme', 'dark'); // Store dark mode preference
  } else {
    themeToggle.src = 'Images/moon-icon.svg'; // Switch to moon icon
    themeToggle.alt = 'Switch to Dark Mode';
    localStorage.setItem('theme', 'light'); // Store light mode preference
  }
});

// Check local storage for theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.src = 'Images/sun-icon.svg'; // Show sun icon in dark mode
    themeToggle.alt = 'Switch to Light Mode';
  } else {
    themeToggle.src = 'Images/moon-icon.svg'; // Show moon icon in light mode
    themeToggle.alt = 'Switch to Dark Mode';
  }
});
