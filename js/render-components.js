document.addEventListener('DOMContentLoaded', async () => {
	const headerElement = document.getElementById('header');

	if (headerElement) {
		try {
			const response = await fetch('assets/html/header.html');

			if (response.ok) {
				headerElement.innerHTML = await response.text();
				setActiveHeaderLinkWithBee();
			}
		} catch (error) {
			console.warn('Unable to load header component.', error);
		}
	}

	applyMinecraftTextureBackground();
});

function setActiveHeaderLinkWithBee() {
	const currentPage = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0].split('#')[0] || 'index.html';
	const navLinks = document.querySelectorAll('#siteHeaderNav .nav-link');

	navLinks.forEach((link) => {
		const href = link.getAttribute('href') || '';
		if (!href || href.startsWith('http://') || href.startsWith('https://')) {
			link.classList.remove('active');
			return;
		}

		const linkPage = href.split('/').pop() || href;
		const isActive = linkPage === currentPage;
		link.classList.toggle('active', isActive);

		if (isActive && !link.querySelector('.nav-link-bee')) {
			const bee = document.createElement('img');
			bee.src = 'assets/img/decorations/Baby_Bee_BE2.gif';
			bee.alt = '';
			bee.width = 40;
			bee.height = 40;
			bee.className = 'nav-link-bee';
			bee.setAttribute('aria-hidden', 'true');
			link.appendChild(bee);
		}
	});
}

function applyMinecraftTextureBackground() {
	const textures = Array.isArray(window.mcTexture) ? window.mcTexture : [];
	const pages = Array.isArray(window.htmlPage) ? window.htmlPage : [];

	if (textures.length === 0 || pages.length === 0) {
		return;
	}

	const currentPage = window.location.pathname.split('/').pop() || 'index.html';
	const pageIndex = pages.indexOf(currentPage);

	if (pageIndex === -1 || !textures[pageIndex]) {
		return;
	}

	const texturePath = new URL(`assets/img/minecraft-Textures/${textures[pageIndex]}`, window.location.href).href;
	document.body.classList.add('mc-texture-background');
	document.body.style.setProperty('--mc-texture-image', `url("${texturePath}")`);
}
