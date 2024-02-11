document.addEventListener("DOMContentLoaded", function () {
    // Create navigation elements
    const navigation = document.createElement("nav");
    navigation.innerHTML = `
        <div class="navigation" style="font-weight: bold; font-size: 25px;"><a href="https://aurashak.github.io/fossilcapital/index.html">FOSSIL CAPITAL MAP</a></div>
        <div class="navigation" id="projectsLink">SUPPORTING DOCUMENTS</div>
        <div class="hidden-projects" id="projectsList">
            <a href="https://aurashak.github.io/fossilcapital/visionboard.html">Vision Board</a>
            <a href="https://aurashak.github.io/fossilcapital/notes.html">Notes</a>
            <a href="https://aurashak.github.io/fossilcapital/sources.html">Sources</a>
        </div>
    `;

    // Find the element with the class "header" and append the navigation
    const headerElement = document.querySelector(".header");
    if (headerElement) {
        headerElement.appendChild(navigation);
    }

    // Get the current page URL
    const currentURL = window.location.href;

    // Highlight the active link in the navigation
    const navigationLinks = navigation.querySelectorAll(".navigation a");
    navigationLinks.forEach(link => {
        if (link.href === currentURL) {
            link.classList.add("current-page");
        }
    });

    

   
    // Toggle the visibility of projectsList when clicking on projectsLink
    const projectsList = document.getElementById("projectsList");

    projectsLink.addEventListener("click", function () {
        if (projectsList.style.display === "none" || projectsList.style.display === "") {
            projectsList.style.display = "inline-block";
        } else {
            projectsList.style.display = "none";
        }

        if (projectsList.style.display === "inline-block") {
            positionHiddenProjectsList();
        }
    });

    // Adjust the position of the hidden projects list when resizing the window
    window.addEventListener("resize", function () {
        if (projectsList.style.display === "inline-block") {
            positionHiddenProjectsList();
        }
    });

    // Function to position the hidden projects list to the right of the "Projects" navigation item
    function positionHiddenProjectsList() {
        const projectsLinkRect = projectsLink.getBoundingClientRect();
        projectsList.style.top = projectsLinkRect.top + "px";
        projectsList.style.left = projectsLinkRect.right + "px";
    }
});
