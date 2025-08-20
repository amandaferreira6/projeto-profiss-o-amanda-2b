// Formulário de Contato
document.addEventListener('DOMContentLoaded', function() {
    const formContato = document.getElementById('form-contato');
    const formMensagem = document.getElementById('form-mensagem');
    
    if (!formContato) return;
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)$/, '($1');
            }
            
            e.target.value = value;
        });
    }
    
    // Validação do formulário
    formContato.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar campos
        if (!validateForm()) {
            return;
        }
        
        // Mostrar loading
        const submitBtn = formContato.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Simular envio (em um projeto real, usaria fetch para enviar para o servidor)
            await simulateFormSubmit();
            
            // Mostrar mensagem de sucesso
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Limpar formulário
            formContato.reset();
            
        } catch (error) {
            // Mostrar mensagem de erro
            showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
            console.error('Erro no formulário:', error);
        } finally {
            // Restaurar botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Validar formulário
    function validateForm() {
        let isValid = true;
        const campos = formContato.querySelectorAll('input, select, textarea');
        
        campos.forEach(campo => {
            if (campo.hasAttribute('required') && !campo.value.trim()) {
                markAsInvalid(campo, 'Este campo é obrigatório.');
                isValid = false;
            } else if (campo.type === 'email' && campo.value.trim()) {
                if (!isValidEmail(campo.value)) {
                    markAsInvalid(campo, 'Por favor, insira um email válido.');
                    isValid = false;
                } else {
                    markAsValid(campo);
                }
            } else if (campo.id === 'telefone' && campo.value.trim()) {
                // Remover caracteres não numéricos para validar
                const phoneDigits = campo.value.replace(/\D/g, '');
                if (phoneDigits.length < 10) {
                    markAsInvalid(campo, 'Por favor, insira um telefone válido.');
                    isValid = false;
                } else {
                    markAsValid(campo);
                }
            } else if (campo.value.trim()) {
                markAsValid(campo);
            }
        });
        
        return isValid;
    }
    
    // Validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Marcar campo como inválido
    function markAsInvalid(campo, mensagem) {
        campo.style.borderColor = '#dc3545';
        
        // Remover mensagem de erro anterior
        let errorElement = campo.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // Adicionar mensagem de erro
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.textContent = mensagem;
        
        campo.parentNode.insertBefore(errorElement, campo.nextSibling);
    }
    
    // Marcar campo como válido
    function markAsValid(campo) {
        campo.style.borderColor = '#28a745';
        
        // Remover mensagem de erro
        const errorElement = campo.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    // Simular envio do formulário (substituir por código real)
    function simulateFormSubmit() {
        return new Promise((resolve, reject) => {
            // Simular tempo de processamento
            setTimeout(() => {
                // Simular sucesso (90% das vezes) ou erro (10% das vezes)
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Erro simulado no envio'));
                }
            }, 2000);
        });
    }
    
    // Mostrar mensagem de status
    function showMessage(mensagem, tipo) {
        formMensagem.textContent = mensagem;
        formMensagem.className = `form-mensagem ${tipo}`;
        
        // Rolagem suave para a mensagem
        formMensagem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-esconder após 5 segundos
        setTimeout(() => {
            formMensagem.style.opacity = '0';
            setTimeout(() => {
                formMensagem.className = 'form-mensagem';
                formMensagem.style.opacity = '1';
            }, 300);
        }, 5000);
    }
    
    // Validação em tempo real
    const campos = formContato.querySelectorAll('input, select, textarea');
    campos.forEach(campo => {
        campo.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                markAsInvalid(this, 'Este campo é obrigatório.');
            } else if (this.type === 'email' && this.value.trim()) {
                if (!isValidEmail(this.value)) {
                    markAsInvalid(this, 'Por favor, insira um email válido.');
                } else {
                    markAsValid(this);
                }
            } else if (this.id === 'telefone' && this.value.trim()) {
                const phoneDigits = this.value.replace(/\D/g, '');
                if (phoneDigits.length < 10) {
                    markAsInvalid(this, 'Por favor, insira um telefone válido.');
                } else {
                    markAsValid(this);
                }
            } else if (this.value.trim()) {
                markAsValid(this);
            }
        });
    });
});

// EmailJS Integration (Configuração para envio real de emails)
// Para usar, descomente o código abaixo e adicione suas credenciais do EmailJS

/*
// Inicializar EmailJS
(function() {
    emailjs.init("SEU_USER_ID_DO_EMAILJS"); // Substitua pelo seu User ID
})();

// Função para enviar email real
async function sendEmail(formData) {
    const templateParams = {
        from_name: formData.nome,
        from_email: formData.email,
        telefone: formData.telefone,
        assunto: formData.assunto,
        message: formData.mensagem,
        to_email: "amanda.silva0601@escola.pr.gov.br"
    };

    try {
        const response = await emailjs.send(
            "SEU_SERVICE_ID", // Substitua pelo seu Service ID
            "SEU_TEMPLATE_ID", // Substitua pelo seu Template ID
            templateParams
        );
        
        return response;
    } catch (error) {
        throw error;
    }
}

// No evento de submit do formulário, substitua simulateFormSubmit() por:
// await sendEmail({
//     nome: document.getElementById('nome').value,
//     email: document.getElementById('email').value,
//     telefone: document.getElementById('telefone').value,
//     assunto: document.getElementById('assunto').value,
//     mensagem: document.getElementById('mensagem').value
// });
*/
