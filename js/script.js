'use strict';

// VNS.CO — Site estático: menus, artigos, calculadora de Ohm e contato local.
// Nenhuma funcionalidade acessa dispositivos, escaneia redes ou envia formulários.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const siteHeader = $('.site-header');
const menuToggle = $('.menu-toggle');
const mobileMenu = $('#mobile-menu');
function setMenu(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  mobileMenu.classList.toggle('open', isOpen);
  mobileMenu.inert = !isOpen;
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
$$('.mobile-menu a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', event => {
  if (menuToggle.getAttribute('aria-expanded') === 'true' && !siteHeader.contains(event.target)) setMenu(false);
});
window.addEventListener('resize', () => { if (window.innerWidth > 850) setMenu(false); }, {passive:true});
window.addEventListener('scroll', () => siteHeader.classList.toggle('scrolled', window.scrollY > 15), {passive:true});

// Animations and accessibility
if ('IntersectionObserver' in window && !motionReduced) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
  }), { threshold:.04, rootMargin:'0px 0px 24px 0px' });
  $$('.reveal').forEach(el => observer.observe(el));
} else $$('.reveal').forEach(el => el.classList.add('visible'));

// Guides: these are introductory, responsible explanations; no unauthorized access instructions.
const guides = {
  etica: {
    category:'CYBERSECURITY / GUIDE 01', title:'Hacking ético: por onde começar?',
    sections:[
      ['O que é?', 'Hacking ético é investigar possíveis falhas de segurança com autorização da pessoa ou organização responsável pelo sistema. O foco é entender, registrar e ajudar a corrigir problemas, respeitando a privacidade.'],
      ['Três regras essenciais', '<ul><li><strong>Permissão:</strong> nunca teste sistemas ou redes de terceiros sem autorização explícita.</li><li><strong>Escopo:</strong> combine antecipadamente o que pode ser verificado e quais limites respeitar.</li><li><strong>Registro responsável:</strong> documente observações sem divulgar senhas ou dados de outras pessoas.</li></ul>'],
      ['Por onde estudar?', 'Comece pelos fundamentos de redes, sistemas operacionais, HTTP e proteção de dados. Depois, pratique exclusivamente em laboratórios próprios ou plataformas preparadas para aprendizado.'],
      ['Lembre-se', '<p class="guide-warning">Curiosidade e pesquisa são importantes; acessar contas, dispositivos ou serviços sem permissão não é hacking ético.</p>']
    ]
  },
  senhas:{
    category:'CYBERSECURITY / GUIDE 02',title:'Como proteger suas contas',sections:[
      ['Senhas únicas', 'Utilize uma senha diferente para cada serviço. Prefira senhas longas ou frases-senha e considere um gerenciador confiável.'],
      ['Autenticação em dois fatores', 'Ative a autenticação multifator (MFA) sempre que possível, especialmente no e-mail e em contas importantes. Aplicativos autenticadores e chaves de segurança oferecem boas opções.'],
      ['Cuidado com golpes', 'Confirme o endereço de sites e remetentes antes de digitar credenciais. Não compartilhe códigos de verificação recebidos por mensagem.'],
      ['Atualizações e recuperação', 'Mantenha os dispositivos atualizados e revise opções de recuperação, como telefone e e-mail alternativo.']
    ]
  },
  ip:{
    category:'NETWORK / GUIDE 03',title:'IP, roteador e Wi‑Fi',sections:[
      ['Endereço IP', 'O IP é um identificador lógico usado para encaminhar dados numa rede. Em redes domésticas são comuns endereços privados, como 192.168.1.10.'],
      ['Roteador e gateway', 'O roteador conecta redes diferentes. Em casa, costuma funcionar como porta de saída dos equipamentos para a internet.'],
      ['DHCP e DNS', 'O DHCP normalmente distribui configurações de rede automaticamente. O DNS relaciona nomes de domínios com endereços IP para que você não precise memorizar números.'],
      ['Boas práticas', 'Use uma senha forte no Wi‑Fi, proteção WPA2-AES ou WPA3 quando disponível, e mantenha o firmware do roteador atualizado.']
    ]
  },
  cabos:{
    category:'NETWORK / GUIDE 04',title:'Introdução ao cabeamento',sections:[
      ['Cabos de par trançado', 'Cabos Ethernet de par trançado, como Cat5e e Cat6, são comuns em redes locais. A categoria, distância e qualidade da instalação influenciam o desempenho.'],
      ['Conectores e padrões', 'O conector modular 8P8C é frequentemente chamado de RJ45 no uso cotidiano. T568A e T568B são esquemas de terminação comuns e devem ser aplicados de modo consistente.'],
      ['Organização', 'Identifique cabos, evite dobras exageradas e planeje passagem e organização usando componentes adequados.'],
      ['Teste', 'Após montar um enlace, um testador apropriado ajuda a identificar problemas de continuidade e de mapeamento de fios.']
    ]
  },
  hardware:{
    category:'HARDWARE / GUIDE 05',title:'Conheça as peças do PC',sections:[
      ['Processador (CPU)', 'Executa instruções dos programas. Seu desempenho depende de vários fatores, como arquitetura, frequência e quantidade de núcleos.'],
      ['Memória RAM', 'Armazena temporariamente dados dos programas em execução. Não substitui o armazenamento permanente.'],
      ['SSD e placa-mãe', 'O SSD armazena sistema e arquivos. A placa-mãe conecta processador, RAM, armazenamento e outros componentes.'],
      ['Fonte e cuidados', 'A fonte fornece energia elétrica aos componentes. Antes de qualquer manutenção, desligue o computador, desconecte a alimentação e evite abrir fontes ou monitores: capacitores podem reter energia perigosa.']
    ]
  },
  ohm:{
    category:'ELECTRIC / GUIDE 06',title:'Eletricidade e Lei de Ohm',sections:[
      ['Tensão, corrente e resistência', 'Tensão (V) é a diferença de potencial elétrico; corrente (A) é o fluxo de carga; resistência (Ω) representa a oposição à passagem da corrente.'],
      ['Lei de Ohm', 'Para um resistor ideal com resistência constante, V = R × I. Conhecendo tensão e resistência, a corrente teórica pode ser calculada por I = V ÷ R.'],
      ['Potência', 'Em corrente contínua, a potência elétrica pode ser calculada por P = V × I. No exemplo de 5 V e 220 Ω, a corrente é aproximadamente 22,7 mA e a potência é 0,114 W.'],
      ['Segurança', '<p class="guide-warning">Estude com kits didáticos de baixa tensão e supervisão. Nunca toque em fios energizados nem abra fontes, tomadas ou quadros elétricos para aprender sozinho.</p>']
    ]
  }
};
const guideDialog = $('#guide-dialog');
function openGuide(id) {
  const guide = guides[id]; if (!guide) return;
  $('#guide-modal-label').textContent = guide.category;
  $('#guide-modal-title').textContent = guide.title;
  const body = $('#guide-modal-body');
  body.innerHTML = '';
  for (const [heading, content] of guide.sections) {
    const title = document.createElement('h3'); title.textContent = heading; body.append(title);
    const block = document.createElement('div');
    // content is a fixed, authored literal — never user input.
    block.innerHTML = /<\w/.test(content) ? content : `<p>${content}</p>`;
    body.append(block);
  }
  if (guideDialog.showModal) guideDialog.showModal();
};
$$('.guide-card').forEach(card => card.addEventListener('click', () => openGuide(card.dataset.guide)));
$$('[data-close-modal]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));

// Filter + actual search for guide titles, descriptions and categories.
let selectedFilter = 'todos';
function updateGuides(){
  const search = $('#search-guide').value.trim().toLocaleLowerCase('pt-BR');
  let shown = 0;
  $$('.guide-card').forEach(card => {
    const matchesFilter = selectedFilter === 'todos' || card.dataset.category === selectedFilter;
    const matchesSearch = card.textContent.toLocaleLowerCase('pt-BR').includes(search);
    card.hidden = !(matchesFilter && matchesSearch);
    if (!card.hidden) shown++;
  });
  $('#empty-results').hidden = shown > 0;
}
function setFilter(filter) {
  selectedFilter = filter;
  $$('.filter-btn').forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  updateGuides();
}
$$('.filter-btn').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
$('#search-guide').addEventListener('input', updateGuides);
$$('[data-go-category]').forEach(link => link.addEventListener('click', () => {
  $('#search-guide').value = '';
  setFilter(link.dataset.goCategory);
}));

// Didactic Ohm's law calculator (low-voltage resistor model).
const voltage = $('#voltage'), resistance = $('#resistance');
function fmt(value, maximumFractionDigits = 3) {
  return new Intl.NumberFormat('pt-BR', {maximumFractionDigits}).format(value);
}
function updateOhm() {
  const v = Number(voltage.value), r = Number(resistance.value);
  const valid = voltage.value.trim() !== '' && resistance.value.trim() !== '' && Number.isFinite(v) && Number.isFinite(r) && v >= 0 && v <= 1000 && r > 0 && r <= 1e8;
  const current = $('#current-result'), power = $('#power-result'), feedback = $('#calc-feedback');
  if (!valid) {
    current.textContent = '—';power.textContent = '—';
    feedback.textContent = 'Use tensão entre 0 e 1000 V e resistência maior que zero.';
    feedback.classList.add('error'); return;
  }
  const I = v/r, P = v*I;
  current.textContent = I < 1 ? `${fmt(I*1000,2)} mA` : `${fmt(I,3)} A`;
  power.textContent = P < .001 ? `${fmt(P*1000,3)} mW` : `${fmt(P,3)} W`;
  feedback.textContent = 'Valores teóricos para um resistor ideal; somente fins educativos.';
  feedback.classList.remove('error');
}
[voltage,resistance].forEach(input => input.addEventListener('input',updateOhm));
$$('[data-volt][data-res]').forEach(button => button.addEventListener('click', () => {
  voltage.value = button.dataset.volt;
  resistance.value = button.dataset.res;
  updateOhm();
}));
updateOhm();

// Form: creates text locally without sending data anywhere.
let messageToCopy = '';
const toast = $('#toast');
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('show'),3500);
}
$('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('#name').value.trim(), email = $('#email').value.trim(), interest = $('#interest').value, message = $('#message').value.trim();
  const feedback = $('#contact-feedback'); feedback.textContent = '';
  if (name.length < 2) { feedback.textContent='Informe seu nome com pelo menos 2 letras.'; $('#name').focus(); return; }
  if (!$('#email').checkValidity() || !email) { feedback.textContent='Informe um e-mail válido.'; $('#email').focus(); return; }
  if (!interest) { feedback.textContent='Escolha o assunto da mensagem.'; $('#interest').focus(); return; }
  if (message.length < 10) { feedback.textContent='Descreva sua mensagem com pelo menos 10 caracteres.'; $('#message').focus(); return; }
  messageToCopy = `Olá, VNS.CO!\n\nMeu nome é ${name}.\nMeu e-mail é ${email}.\nAssunto: ${interest}.\n\n${message}\n\nAguardo seu retorno.`;
  $('#contact-message-output').textContent = messageToCopy;
  $('#contact-dialog').showModal();
});
async function copyMessage(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  const textarea = document.createElement('textarea');
  textarea.value = text; textarea.style.position = 'fixed';textarea.style.left = '-9999px';
  document.body.append(textarea);textarea.select();
  try { if (!document.execCommand('copy')) throw new Error('failed'); } finally { textarea.remove(); }
}
$('#copy-message').addEventListener('click', async () => {
  try { await copyMessage(messageToCopy); showToast('Mensagem copiada!'); $('#contact-dialog').close(); }
  catch { showToast('Copie a mensagem selecionando o texto na janela.'); $('#contact-message-output').focus(); }
});
document.addEventListener('keydown',event => { if (event.key === 'Escape') setMenu(false); });
$('#year').textContent = new Date().getFullYear();

// Subtle decorative stars; respects reduced motion and pauses in background.
const canvas = $('#starfield');
const ctx = canvas.getContext('2d');
if (ctx) {
  let stars = [], width = 0, height = 0, timer = null, frame = 0;
  const dpr = Math.min(window.devicePixelRatio || 1,2);
  function setup() {
    width = innerWidth; height = innerHeight;
    canvas.width = Math.round(width*dpr);canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const num = Math.min(100,Math.floor(width*height/13000));
    stars = Array.from({length:num}, () => ({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.1+.2,phase:Math.random()*6.28,alpha:.12+Math.random()*.3}));
  }
  function draw() {
    ctx.clearRect(0,0,width,height);frame += .012;
    for(const s of stars){
      const alpha = s.alpha*(motionReduced?1:.78+.22*Math.cos(frame+s.phase));
      ctx.fillStyle = `rgba(220,178,118,${alpha})`;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
    }
    if (!motionReduced && !document.hidden) timer = requestAnimationFrame(draw);
  }
  setup();draw();
  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);resizeTimer = setTimeout(() => {setup();if (motionReduced) draw();},160);
  },{passive:true});
  document.addEventListener('visibilitychange', () => {
    if (motionReduced) return;
    if (document.hidden) cancelAnimationFrame(timer); else {cancelAnimationFrame(timer);draw();}
  });
}
