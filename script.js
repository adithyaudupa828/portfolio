// script.js

// 1. CONFIGURATION
const config = {
    hero_name: "Adithya Udupa",
    hero_tagline: "Game Designer",
    contact_email: "adithyaudupa828@gmail.com",
    contact_linkedin: "https://linkedin.com/in/828-adithya-udupa/",
    contact_resume: "#",
    primary_color: "#00f0ff",
    secondary_color: "#ff0080",
    surface_color: "#1a1a2e"
};

// 2. PROJECT DATA (Paste your full data here. I'm using a snippet for brevity)
const projectsData = [
  {
    id: 1,
    name: "Daredevil",
    duration: "2 months",
    role: "Level Designer",
    type: "Solo Developer",
    tools: ["UE5", "Blender"],
    thumbnail: "thumbnails/daredevil1.png", 
    mainImages: ["main_images/d1.png", "main_images/d2.png"], // Example paths
    mainVideo: null, // Test: This should be skipped
    game: "Fan game with parkour combat.",
    description: "Full description goes here...",
    gallery: ["gallery/g1.png"],
    galleryVideos: [],
    postmortem: { wentWell: "A", learned: "B", wentWrong: "C" }
  },
  // ... Add the rest of your projects here ...
];


// 3. RENDER CARDS (Thumbnails)
function renderProjectCards() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projectsData.map(project => `
        <div class="project-card cursor-pointer card-glow rounded-lg overflow-hidden flex flex-col" 
             onclick="openProjectOverlay(${project.id})" 
             style="background: ${config.surface_color};">
             
            <div class="relative w-full square-thumb">
                ${project.thumbnail ? 
                    `<img src="${project.thumbnail}" class="w-full h-full object-cover" loading="lazy">` : 
                    `<div class="w-full h-full flex items-center justify-center opacity-30">
                        <span style="color:${config.primary_color}">No Image</span>
                     </div>`
                }
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            <div class="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h3 class="font-orbitron text-base font-bold mb-2 text-glow-micro truncate" style="color: ${config.primary_color};">
                        ${project.name}
                    </h3>
                    <div class="flex flex-wrap gap-1 mb-2">
                        ${project.tools.slice(0, 3).map(tool => `
                            <span class="font-rajdhani text-sm px-2 py-1 rounded border border-white/10" 
                                  style="color: ${config.secondary_color};">
                                ${tool}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <p class="font-rajdhani text-lg mt-2 text-gray-400">View Details →</p>
            </div>
        </div>
    `).join('');
}


// 4. OPEN OVERLAY
function openProjectOverlay(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const overlay = document.getElementById('project-overlay');
    const content = document.getElementById('overlay-content').querySelector('.inner-dark');

    // --- BUILD MEDIA HTML ---
    
    // A. Main Media (Images + Video if exists)
    let mainMediaHTML = project.mainImages.map((img, i) => img ? 
        `<img src="${img}" class="media-item-main cursor-pointer hover:opacity-90" onclick="openFullscreenViewer('${img}')">` 
        : ''
    ).join('');

    // Only add video if it is NOT null
    if (project.mainVideo) {
        mainMediaHTML += `<video src="${project.mainVideo}" controls class="media-item-main"></video>`;
    }

    // If section is empty, show placeholder text
    if (!mainMediaHTML) mainMediaHTML = `<div class="p-8 text-gray-500">No media available.</div>`;


    // B. Gallery (Images + Videos)
    let galleryHTML = project.gallery.map((img, i) => img ? 
        `<img src="${img}" class="media-item-gallery cursor-pointer hover:opacity-90" onclick="openFullscreenViewer('${img}')">` 
        : ''
    ).join('');

    if (project.galleryVideos) {
        galleryHTML += project.galleryVideos.map(vid => vid ? 
            `<video src="${vid}" controls class="media-item-gallery"></video>` : ''
        ).join('');
    }


    // --- INJECT HTML ---
    content.innerHTML = `
        <div class="mb-8 border-b border-gray-800 pb-6">
            <h2 class="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-glow" style="color: ${config.primary_color};">${project.name}</h2>
            <div class="flex flex-wrap gap-6 text-xl text-gray-400 font-rajdhani">
                <span>⏱ ${project.duration}</span>
                <span>👤 ${project.role}</span>
                <span>🏢 ${project.type}</span>
            </div>
        </div>

        <div class="mb-12">
            <h3 class="font-orbitron text-lg font-bold mb-4 text-glow-micro" style="color: ${config.secondary_color};">FEATURED MEDIA</h3>
            <div class="media-scroller">
                ${mainMediaHTML}
            </div>
        </div>

        <div class="mb-8">
            <h3 class="font-orbitron text-lg font-bold mb-4" style="color: ${config.secondary_color};">GAME OVERVIEW</h3>
            <p class="text-xl leading-relaxed text-gray-300 whitespace-pre-line">${project.game || "No overview available."}</p>
        </div>

        <div class="mb-8">
            <h3 class="font-orbitron text-lg font-bold mb-4" style="color: ${config.secondary_color};">DESCRIPTION</h3>
            <p class="text-xl leading-relaxed text-gray-300 whitespace-pre-line">${project.description || "No description available."}</p>
        </div>

        <div class="mb-12">
            <h3 class="font-orbitron text-lg font-bold mb-4" style="color: ${config.secondary_color};">GALLERY</h3>
            <div class="media-scroller">
                ${galleryHTML}
            </div>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
             <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
                <h4 class="text-green-400 font-bold mb-2">What Went Well</h4>
                <p class="text-gray-300">${project.postmortem.wentWell}</p>
             </div>
             <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded">
                <h4 class="text-blue-400 font-bold mb-2">What I Learned</h4>
                <p class="text-gray-300">${project.postmortem.learned}</p>
             </div>
             <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
                <h4 class="text-red-400 font-bold mb-2">What Went Wrong</h4>
                <p class="text-gray-300">${project.postmortem.wentWrong}</p>
             </div>
        </div>
    `;

    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// 5. GLOBAL HELPERS
function closeProjectOverlay() {
    document.getElementById('project-overlay').classList.add('hidden');
    document.body.style.overflow = '';
}

function openFullscreenViewer(src) {
    const v = document.getElementById('fullscreen-viewer');
    document.getElementById('fullscreen-image').src = src;
    v.classList.remove('hidden');
}

function closeFullscreenViewer() {
    document.getElementById('fullscreen-viewer').classList.add('hidden');
}

// 6. INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    renderProjectCards();
});
