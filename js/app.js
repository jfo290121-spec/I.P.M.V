// Função para trocar entre abas
function switchTab(tabId, button) {
    // Esconde todas as abas
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remove classe ativa dos botões
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active-tab'));
    
    // Mostra a aba atual e ativa o botão
    document.getElementById(tabId).classList.add('active');
    button.classList.add('active-tab');
    
    // Salva a aba ativa no localStorage
    localStorage.setItem('activeTab', tabId);
}

// Função para copiar chave PIX
function copyPix() {
    const pixKey = 'pix@igrejacomunidade.com.br';
    navigator.clipboard.writeText(pixKey).then(() => {
        showToast('✅ Chave PIX copiada!');
    }).catch(() => {
        alert('Erro ao copiar. Por favor, copie manualmente.');
    });
}

// Função para mostrar notificação (toast)
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Lógica de envio de formulário de oração
document.getElementById('prayerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value || 'Amigo(a)';
    const request = document.getElementById('request').value;
    
    // Simulação de envio (em produção, enviaria para um servidor)
    console.log('Pedido de oração:', { name, request });
    
    showToast('🙏 Pedido de oração enviado com sucesso! Deus te abençoe.');
    this.reset();
});

// Restaurar aba ativa ao carregar a página
window.addEventListener('load', function() {
    const activeTab = localStorage.getItem('activeTab') || 'inicio';
    const tabButton = document.querySelector(`button[onclick="switchTab('${activeTab}', this)"]`);
    if (tabButton) {
        switchTab(activeTab, tabButton);
    }
});

// Adicionar suporte a swipe para navegação (opcional)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const tabOrder = ['inicio', 'agenda', 'oracao', 'contribuir'];
    const activeTab = localStorage.getItem('activeTab') || 'inicio';
    const currentIndex = tabOrder.indexOf(activeTab);
    
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe esquerda - próxima aba
        if (currentIndex < tabOrder.length - 1) {
            const nextTab = tabOrder[currentIndex + 1];
            const button = document.querySelector(`button[onclick="switchTab('${nextTab}', this)"]`);
            if (button) switchTab(nextTab, button);
        }
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe direita - aba anterior
        if (currentIndex > 0) {
            const prevTab = tabOrder[currentIndex - 1];
            const button = document.querySelector(`button[onclick="switchTab('${prevTab}', this)"]`);
            if (button) switchTab(prevTab, button);
        }
    }
}