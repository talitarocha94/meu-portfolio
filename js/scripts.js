/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 
function handleSubmit(e){
  e.preventDefault();
  const form = e.target;
  const name = form.nome.value.trim();
  const email = form.email.value.trim();
  const msg = form.mensagem.value.trim();
  const statusEl = document.getElementById('formStatus');

  if(!name || !email || !msg){
    statusEl.textContent = 'Preencha todos os campos :)';
    return false;
  }

  // Aqui você pode integrar com um serviço (EmailJS, backend, etc.)
  statusEl.textContent = 'Mensagem enviada! (demo)';
  form.reset();
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll suave para navegação
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  // Navbar mais sólida após rolagem
  const nav = document.querySelector('.glass-nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

// Override: envio real via FormSubmit (AJAX), sem abrir app de e-mail
window.handleSubmit = async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const statusEl = document.getElementById('formStatus');

  const name = (form.nome?.value || '').trim();
  const email = (form.email?.value || '').trim();
  const message = (form.mensagem?.value || '').trim();

  if (!name || !email || !message) {
    if (statusEl) statusEl.textContent = 'Preencha todos os campos.';
    return false;
  }

  const emailOk = /.+@.+\..+/.test(email);
  if (!emailOk) {
    if (statusEl) statusEl.textContent = 'Informe um e-mail válido.';
    form.email?.focus();
    return false;
  }

  const btn = form.querySelector('button[type="submit"]');
  if (btn) btn.disabled = true;
  if (statusEl) statusEl.textContent = 'Enviando...';

  try {
    const endpoint = 'https://formsubmit.co/ajax/taly30.lima@gmail.com';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Contato do Portfólio — ${name}`,
        _captcha: 'false'
      })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      if (statusEl) statusEl.textContent = 'Mensagem enviada! Obrigada pelo contato.';
      form.reset();
    } else {
      if (statusEl) statusEl.textContent = data?.message || 'Não foi possível enviar agora. Tente novamente mais tarde.';
    }
  } catch (e) {
    if (statusEl) statusEl.textContent = 'Falha de conexão ao enviar. Verifique sua internet e tente novamente.';
  } finally {
    if (btn) btn.disabled = false;
    setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 5000);
  }

  return false;
};

// Revelar elementos ao entrar na viewport
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));
});
