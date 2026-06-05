document.addEventListener('DOMContentLoaded', () => {
    const archiveServers = [
        {
            name: '2024-2025',
            mapImage: 'assets/img/Archives/maps/map-2024-2025.png',
            logo: 'assets/img/Archives/old-logos/logo-2024-2025.png',
            worldDownload: 'https://drive.google.com/drive/folders/1Ccavqk8uOWUPhgAkNXv83kojb8ES8ALW',
            oldWebsite: 'https://sspect.github.io/web_omgmc.no/',
            summary: "A season with many different shops, several community projects, and two minigames.",
            screenshots: [
                'assets/img/Archives/screenshots-2024-2025/Prophecy.webp',
                'assets/img/Archives/screenshots-2024-2025/Otherworldly_Goods.webp',
                'assets/img/Archives/screenshots-2024-2025/Groggie_the_froggie.webp',
                'assets/img/Archives/screenshots-2024-2025/Deadalus&Sons_wings.webp',
                'assets/img/Archives/screenshots-2024-2025/Stump_Stockpile.png',
                'assets/img/Archives/screenshots-2024-2025/stumpel.webp',
                'assets/img/Archives/screenshots-2024-2025/The_box_stor.webp',
                'assets/img/Archives/screenshots-2024-2025/Wax and Wings.png',
            ],
            whitelist: 'This whitelist was lost during transition to a new season.',
        },
        {
            name: '2025-2026',
            mapImage: 'assets/img/Archives/maps/map-2025-2026.png',
            logo: 'assets/img/Archives/old-logos/logo-2025-2026.png',
            worldDownload: '#',
            oldWebsite: 'https://sspect.github.io/blockmets',
            summary: "A season with relatively few long-term active players, likely due to a lack of server-run events.",
            screenshots: [
                'assets/img/Archives/screenshots-2025-2026/Screenshot 2026-06-05 232958.png',
                'assets/img/Archives/screenshots-2025-2026/Screenshot 2026-06-05 232910.png',
                'assets/img/Archives/screenshots-2025-2026/Screenshot 2026-06-06 003219.png',
                'assets/img/Archives/screenshots-2025-2026/Screenshot 2026-06-06 003247.png',
                'assets/img/Archives/screenshots-2025-2026/Screenshot 2026-06-06 003800.png',
                'assets/img/Archives/screenshots-2025-2026/Screenshot 2026-06-06 003828.png',
            ],
            whitelist: 'AriTheTimelord, PinkHoneyBee, Moist_Pyro, Sky08401, Nirentos, Zaptor_raptor, Fjordh3ksa, Iithiiliien, WeakSwan, Serkth, embermare, LaserChaser, Veamern, SicarioIIII, markuscharles, Databrus42, ooley, emaau, YouNeedTheraphy, Dawco, MrKomda, Sspect, oliver33311, Cia_grr, mmckalbert, RockBoxFire, heyy666, Madgimmy, iQuackLikeADuck, God_of_fishing, Stratos_06, Nola_Bunny, J_L1en, MagmaMage6, Nico_Hero, VioletBrokeAgain, SZYUI, bummbelbee, jeghaterleague, hhwea, scorpiotic, Llama_Legacy, LadyYavanna2, Sadrith_Aron, Xcer, ConanQT',
        },
    ];

    const archiveGrid = document.getElementById('archive-grid');

    if (!archiveGrid) {
        return;
    }

    archiveGrid.innerHTML = archiveServers.map((server, index) => `
		<div class="col">
			<div class="card h-100 bg-body-tertiary border-0 shadow-sm overflow-hidden">
				<img src="${escapeHtml(server.mapImage)}" class="card-img-top" alt="${escapeHtml(server.name)} map">
				<div class="card-body d-flex flex-column gap-3">
					<div class="d-flex align-items-center gap-3">
                        <img src="${escapeHtml(server.logo)}" alt="${escapeHtml(server.name)} logo" class="rounded" style="width: 200px; height: 96px; object-fit: contain; background: rgba(255, 255, 255, 0.04); padding: 0.35rem;">
						<div>
							<h2 class="h4 mb-1">${escapeHtml(server.name)}</h2>
							<p class="mb-0 text-body-secondary">Old server archive</p>
						</div>
					</div>

					<div>
						<p class="mb-0">${escapeHtml(server.summary)}</p>
					</div>

					<div class="d-flex flex-wrap gap-2 mt-auto">
						${renderDownloadButton(server)}
                        ${renderWebsiteButton(server)}
						<button type="button" class="btn btn-outline-light" data-archive-popup="screenshots" data-archive-index="${index}">Screenshots</button>
						<button type="button" class="btn btn-outline-light" data-archive-popup="whitelist" data-archive-index="${index}">Whitelist</button>
					</div>
				</div>
			</div>
		</div>
	`).join('');

    appendArchiveModal();
    attachArchivePopupHandlers(archiveServers);

    function appendArchiveModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'archiveModal';
        modal.tabIndex = -1;
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
			<div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content bg-body">
					<div class="modal-header">
						<h5 class="modal-title" id="archiveModalLabel">Archive details</h5>
						<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body" id="archiveModalBody"></div>
				</div>
			</div>
		`;
        document.body.appendChild(modal);
    }

    function attachArchivePopupHandlers(servers) {
        const modalElement = document.getElementById('archiveModal');
        const modalTitle = document.getElementById('archiveModalLabel');
        const modalBody = document.getElementById('archiveModalBody');

        if (!modalElement || !modalTitle || !modalBody || !window.bootstrap) {
            return;
        }

        document.querySelectorAll('[data-archive-popup]').forEach((button) => {
            button.addEventListener('click', () => {
                const serverIndex = Number(button.getAttribute('data-archive-index'));
                const popupType = button.getAttribute('data-archive-popup');
                const server = servers[serverIndex];

                if (!server || !popupType) {
                    return;
                }

                modalTitle.textContent = `${server.name} - ${formatPopupTitle(popupType)}`;
                modalBody.innerHTML = buildPopupContent(server, popupType);
                bootstrap.Modal.getOrCreateInstance(modalElement).show();
            });
        });
    }

    function buildPopupContent(server, popupType) {
        if (popupType === 'screenshots') {
            return `
				<div class="row g-3">
					${server.screenshots.map((image) => `
						<div class="col-12 col-md-6">
							<div class="card bg-body-tertiary border-0 h-100 overflow-hidden">
								<img src="${escapeHtml(image)}" class="card-img-top" alt="${escapeHtml(server.name)} screenshot">
							</div>
						</div>
					`).join('')}
				</div>
			`;
        }

        if (popupType === 'whitelist') {
            return `
				<p class="mb-0">${escapeHtml(server.whitelist)}</p>
			`;
        }

        return `
			<p class="mb-0">${escapeHtml(server.summary)}</p>
		`;
    }

    function formatPopupTitle(popupType) {
        if (popupType === 'screenshots') {
            return 'Screenshots';
        }

        if (popupType === 'whitelist') {
            return 'Whitelist';
        }

        return 'About';
    }

    function renderDownloadButton(server) {
        if (!server.worldDownload || server.worldDownload === '#') {
            return '<button type="button" class="btn btn-primary" disabled>World download soon</button>';
        }

        return `<a class="btn btn-primary" href="${escapeHtml(server.worldDownload)}" target="_blank" rel="noopener noreferrer">World download</a>`;
    }

    function renderWebsiteButton(server) {
        if (!server.oldWebsite) {
            return '';
        }

        return `<a class="btn btn-outline-info" href="${escapeHtml(server.oldWebsite)}" target="_blank" rel="noopener noreferrer">Old website</a>`;
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }
});
