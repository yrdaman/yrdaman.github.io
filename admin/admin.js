// GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".dashboard h1", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(".dashboard form, .dashboard ul, .dashboard canvas", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: { trigger: ".dashboard", start: "top 80%" },
    });
    gsap.to(".parallax-bg", {
      y: 100,
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true },
    });

    // Particles.js
    particlesJS("particles-js", {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 2, direction: "none", random: true },
      },
      interactivity: {
        events: { onhover: { enable: true, mode: "repulse" } },
      },
    });

    // Theme Toggle
    const toggleTheme = () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      document.getElementById('themeToggle').textContent = isLight ? 'Dark Mode' : 'Light Mode';
    };
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    

    // Add Project
    function addProject() {
      const title = document.getElementById("projTitle").value.trim();
      const status = document.getElementById("projStatus").value;
      if (!title) {
        alert("Project title is required!");
        document.getElementById("projectUpdate").textContent = "Project title is required.";
        return;
      }
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      projects.push({ title, status });
      localStorage.setItem("projects", JSON.stringify(projects));
      loadProjects();
      document.getElementById("projTitle").value = "";
      document.getElementById("projStatus").value = "In Progress";
      document.getElementById("projectUpdate").textContent = `Project ${title} added successfully.`;
      gsap.from(".project-item:last-child", { opacity: 0, x: 50, duration: 0.5 });
    }

    // Edit/Delete Projects
    function editProject(index) {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const newTitle = prompt("Edit project title:", projects[index].title);
      if (newTitle) {
        projects[index].title = newTitle.trim();
        localStorage.setItem("projects", JSON.stringify(projects));
        loadProjects();
        document.getElementById("projectUpdate").textContent = `Project ${newTitle} updated successfully.`;
      }
    }
    function deleteProject(index) {
      if (confirm("Delete this project?")) {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const deletedTitle = projects[index].title;
        projects.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
        loadProjects();
        document.getElementById("projectUpdate").textContent = `Project ${deletedTitle} deleted successfully.`;
      }
    }

    // Project Status Chart
    let projectChart;
    function updateChart(projects) {
      const ctx = document.getElementById("projectChart").getContext("2d");
      const completed = projects.filter(p => p.status === "Completed").length;
      const inProgress = projects.filter(p => p.status === "In Progress").length;
      if (projectChart) projectChart.destroy();
      projectChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Completed", "In Progress"],
          datasets: [{
            data: [completed, inProgress],
            backgroundColor: ["#34D399", "#FBBF24"],
            borderColor: ["#fff", "#fff"],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top", labels: { color: "#fff" } },
            title: { display: true, text: "Project Status", color: "#fff", font: { size: 18 } },
          },
        },
      });
    }

    // Logout
    function logout() {
      localStorage.removeItem("isAdmin");
      window.location.href = "index.html";
    }

    // Check Admin Status
    document.addEventListener("DOMContentLoaded", () => {
      if (localStorage.getItem("isAdmin") !== "true") {
        alert("Unauthorized access. Redirecting to main page...");
        window.location.href = "index.html";
      } else {
        loadProjects();
      }
    });