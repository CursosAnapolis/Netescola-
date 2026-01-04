// Redirecionar para site após login
export function redirectToSite(url, delay = 2000) {
    if (!url) {
        console.error('URL de redirecionamento não definida');
        return;
    }
    
    // Mostrar mensagem de redirecionamento
    alert(`Login realizado com sucesso! Redirecionando em ${delay/1000} segundos...`);
    
    // Redirecionar após o delay
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

// Você pode adicionar mais URLs de redirecionamento aqui
export const REDIRECT_URLS = {
    aluno: 'https://aluno.educa.go.gov.br',
    portal: 'https://portaleducacao.go.gov.br',
    googleClassroom: 'https://classroom.google.com'
};
