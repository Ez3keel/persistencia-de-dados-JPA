// ====================================
// ADMIN SPECIFIC FUNCTIONALITY
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    setupAdminNavigation();
    setupThemeToggle();
    showInitialSection();
});

// Configurar navegação do admin
function setupAdminNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar active ao clicado
            this.classList.add('active');
            
            // Pegar a seção alvo
            const section = this.getAttribute('data-section');
            
            // Mostrar seção correspondente
            showSection(section);
            
            // Atualizar URL sem recarregar (opcional)
            history.pushState({section}, '', `?section=${section}`);
        });
    });
    
    // Lidar com botão Voltar/Forward do navegador
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.section) {
            showSection(event.state.section);
        }
    });
}

function showSection(sectionName) {
    // Mapear data-section para ID da seção
    const sectionMap = {
        'dashboard': 'dashboard-section',
        'product': 'produtos-section',
        'user': 'usuarios-section',
        'order': 'pedidos-section'
    };
    
    const sectionId = sectionMap[sectionName];
    
    if (!sectionId) return;
    
    // Esconder todas as seções
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar a seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

function showInitialSection() {
    // Verificar se há parâmetro na URL
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section') || 'dashboard';
    
    // Ativar o link correspondente
    const activeLink = document.querySelector(`.admin-nav-link[data-section="${section}"]`);
    if (activeLink) {
        document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    // Mostrar a seção
    showSection(section);
}

// Theme Toggle (copiado do main.js mas adaptado)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', toggleTheme);
    loadSavedTheme();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const iconElement = document.querySelector('#theme-toggle i');
    if (iconElement) {
        iconElement.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const iconElement = document.querySelector('#theme-toggle i');
    if (iconElement) {
        iconElement.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}