const themeToggle = document.getElementById('theme-toggle');

// Function to switch between light and dark modes
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Change the icon based on the current mode
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.src = '/Images/sun-icon.svg';  // Switch to sun icon
    themeToggle.alt = 'Switch to Light Mode';
    localStorage.setItem('theme', 'dark'); // Store dark mode preference
  } else {
    themeToggle.src = '/Images/moon-icon.svg'; // Switch to moon icon
    themeToggle.alt = 'Switch to Dark Mode';
    localStorage.setItem('theme', 'light'); // Store light mode preference
  }
});

// Check local storage for theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.src = '/Images/sun-icon.svg'; // Show sun icon in dark mode
    themeToggle.alt = 'Switch to Light Mode';
  } else {
    themeToggle.src = '/Images/moon-icon.svg'; // Show moon icon in light mode
    themeToggle.alt = 'Switch to Dark Mode';
  }
});

// Toggle project details display
function toggleProjectDetails(button) {
  const details = button.nextElementSibling;
  details.style.display = details.style.display === "block" ? "none" : "block";
}

// Switching between tabs on Projects page 
const tabContainer = document.querySelector('.tabs');
const buttons = tabContainer.querySelectorAll('button');
const activeIndicator = tabContainer.querySelector('.active');
const tabContent = document.querySelector('.tab-content');

function moveIndicator(button) {
  const buttonRect = button.getBoundingClientRect();
  const containerRect = tabContainer.getBoundingClientRect();

  activeIndicator.style.width = `${button.offsetWidth - 20}px`; // 20 = left+right padding
  activeIndicator.style.transform = `translateX(${button.offsetLeft +10 }px)`; // shift right by left padding

}

// Initialize: position the indicator under the first button
moveIndicator(buttons[0]);

function initializeTableauViz() {
  var containerDiv = document.getElementById("vizContainer");
  if (!containerDiv) {
    console.error("Dashboard container not found");
    return;
  }

  var url = "https://public.tableau.com/views/Book1_17475606343450/Dashboard1";

  var options = {
    hideTabs: true,
    width: "100%",
    height: (containerDiv.offsetWidth * 0.75) + "px"
  };

  // Dispose existing viz if present to avoid duplicates
  if (window.viz) {
    window.viz.dispose();
  }

  window.viz = new tableau.Viz(containerDiv, url, options);
}


function loadTabContent(file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Page not found");
      return response.text();
    })
    .then(html => {
      tabContent.innerHTML = html;

      // If the loaded tab is the dashboard, initialize Tableau viz
      if (file === "Dashboard.html") {
        if (typeof initializeTableauViz === "function") {
          initializeTableauViz();
        } else {
          console.error("initializeTableauViz function not found.");
        }
      }
    })
    .catch(error => {
      tabContent.innerHTML = `<p>Error loading content: ${error.message}</p>`;
    });
}


buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    moveIndicator(button);
    loadTabContent(button.dataset.file);
  });

  // Load first tab by default
  if (index === 0) {
    moveIndicator(button);
    loadTabContent(button.dataset.file);
  }
});



