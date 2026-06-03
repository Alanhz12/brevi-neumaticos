// ========== INICIALIZAR AOS ==========
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-in-out'
});

// ========== PRELOADER ==========
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 500);
  }
});

// ========== CONFIGURACIÓN DE FIREBASE ==========
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

let db;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  console.log('Firebase inicializado correctamente');
} catch (error) {
  console.warn('Firebase no disponible:', error);
}

// ========== BASE DE DATOS DE NEUMÁTICOS PIRELLI ==========
const tireDatabase = [
  // NEUMÁTICOS AGRO PIRELLI
  { nombre: "Pirelli FarmTrac R1", tipo: "agro", especificacion: "18.4-38", medidas: { ancho: null, aspecto: null, diametro: 38 }, aplicacion: "campo", uso: "Tracción en barro", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R1", tipo: "agro", especificacion: "480/70R34", medidas: { ancho: 480, aspecto: 70, diametro: 34 }, aplicacion: "campo", uso: "Tracción en barro", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R1", tipo: "agro", especificacion: "520/70R38", medidas: { ancho: 520, aspecto: 70, diametro: 38 }, aplicacion: "campo", uso: "Tracción en barro", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R1", tipo: "agro", especificacion: "580/70R42", medidas: { ancho: 580, aspecto: 70, diametro: 42 }, aplicacion: "campo", uso: "Tracción en barro", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R1W", tipo: "agro", especificacion: "650/65R38", medidas: { ancho: 650, aspecto: 65, diametro: 38 }, aplicacion: "campo", uso: "Alta flotación", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R1W", tipo: "agro", especificacion: "600/65R28", medidas: { ancho: 600, aspecto: 65, diametro: 28 }, aplicacion: "campo", uso: "Alta flotación", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R1W", tipo: "agro", especificacion: "710/70R42", medidas: { ancho: 710, aspecto: 70, diametro: 42 }, aplicacion: "campo", uso: "Alta flotación", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R2", tipo: "agro", especificacion: "14.9-28", medidas: { ancho: null, aspecto: null, diametro: 28 }, aplicacion: "rastrojo", uso: "Resistente a cortes", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R2", tipo: "agro", especificacion: "18.4-34", medidas: { ancho: null, aspecto: null, diametro: 34 }, aplicacion: "rastrojo", uso: "Resistente a cortes", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R4", tipo: "agro", especificacion: "14.9-24", medidas: { ancho: null, aspecto: null, diametro: 24 }, aplicacion: "mixto", uso: "Uso mixto campo/ruta", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac R4", tipo: "agro", especificacion: "16.9-28", medidas: { ancho: null, aspecto: null, diametro: 28 }, aplicacion: "mixto", uso: "Uso mixto campo/ruta", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac IF", tipo: "agro", especificacion: "480/70R30", medidas: { ancho: 480, aspecto: 70, diametro: 30 }, aplicacion: "campo", uso: "Tecnología IF - Mayor carga", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac VF", tipo: "agro", especificacion: "600/70R30", medidas: { ancho: 600, aspecto: 70, diametro: 30 }, aplicacion: "campo", uso: "Tecnología VF - Máxima carga", precio: "Consulta" },
  { nombre: "Pirelli FarmTrac VF", tipo: "agro", especificacion: "650/65R42", medidas: { ancho: 650, aspecto: 65, diametro: 42 }, aplicacion: "campo", uso: "Tecnología VF - Máxima carga", precio: "Consulta" },
  
  // NEUMÁTICOS VIALES PIRELLI
  { nombre: "Pirelli FG:01", tipo: "vial", especificacion: "295/80R22.5", medidas: { ancho: 295, aspecto: 80, diametro: 22.5 }, aplicacion: "ruta", uso: "Larga distancia - Dirección", precio: "Consulta" },
  { nombre: "Pirelli FG:01", tipo: "vial", especificacion: "315/80R22.5", medidas: { ancho: 315, aspecto: 80, diametro: 22.5 }, aplicacion: "ruta", uso: "Larga distancia - Dirección", precio: "Consulta" },
  { nombre: "Pirelli FR:01", tipo: "vial", especificacion: "295/80R22.5", medidas: { ancho: 295, aspecto: 80, diametro: 22.5 }, aplicacion: "ruta", uso: "Tracción - Eje motriz", precio: "Consulta" },
  { nombre: "Pirelli FR:01", tipo: "vial", especificacion: "315/80R22.5", medidas: { ancho: 315, aspecto: 80, diametro: 22.5 }, aplicacion: "ruta", uso: "Tracción - Eje motriz", precio: "Consulta" },
  { nombre: "Pirelli FT:01", tipo: "vial", especificacion: "12R22.5", medidas: { ancho: null, aspecto: null, diametro: 22.5 }, aplicacion: "ruta", uso: "Remolque", precio: "Consulta" },
  { nombre: "Pirelli FT:01", tipo: "vial", especificacion: "11R22.5", medidas: { ancho: null, aspecto: null, diametro: 22.5 }, aplicacion: "ruta", uso: "Remolque", precio: "Consulta" },
  { nombre: "Pirelli FH:01", tipo: "vial", especificacion: "12.00R20", medidas: { ancho: null, aspecto: null, diametro: 20 }, aplicacion: "mixto", uso: "Uso mixto - Obra/vial", precio: "Consulta" },
  { nombre: "Pirelli FH:01", tipo: "vial", especificacion: "11.00R20", medidas: { ancho: null, aspecto: null, diametro: 20 }, aplicacion: "mixto", uso: "Uso mixto - Obra/vial", precio: "Consulta" },
  { nombre: "Pirelli Crono", tipo: "vial", especificacion: "205/75R17.5", medidas: { ancho: 205, aspecto: 75, diametro: 17.5 }, aplicacion: "ruta", uso: "Semi-remolque", precio: "Consulta" },
  { nombre: "Pirelli Crono", tipo: "vial", especificacion: "215/75R17.5", medidas: { ancho: 215, aspecto: 75, diametro: 17.5 }, aplicacion: "ruta", uso: "Semi-remolque", precio: "Consulta" },
  { nombre: "Pirelli ST:01", tipo: "vial", especificacion: "385/65R22.5", medidas: { ancho: 385, aspecto: 65, diametro: 22.5 }, aplicacion: "ruta", uso: "Super ancho - Flotación", precio: "Consulta" },
  { nombre: "Pirelli ST:01", tipo: "vial", especificacion: "425/65R22.5", medidas: { ancho: 425, aspecto: 65, diametro: 22.5 }, aplicacion: "ruta", uso: "Super ancho - Flotación", precio: "Consulta" }
];

// ========== MENÚ MÓVIL ==========
const mobileIcon = document.querySelector('.mobile-menu-icon');
const navMenu = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
let scrollPosition = 0;

function closeMenu() {
  if (!navMenu || !navMenu.classList.contains('active')) return;
  navMenu.classList.remove('active');
  document.body.classList.remove('menu-open');
  if (scrollPosition) {
    window.scrollTo(0, scrollPosition);
    scrollPosition = 0;
  }
  if (mobileIcon) {
    const icon = mobileIcon.querySelector('i');
    if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
  }
}

function openMenu() {
  if (!navMenu || navMenu.classList.contains('active')) return;
  scrollPosition = window.pageYOffset;
  navMenu.classList.add('active');
  document.body.classList.add('menu-open');
  if (mobileIcon) {
    const icon = mobileIcon.querySelector('i');
    if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
  }
}

if (mobileIcon) {
  mobileIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        closeMenu();
        setTimeout(() => { targetElement.scrollIntoView({ behavior: 'smooth' }); }, 100);
      }
    }
  });
});

document.addEventListener('click', (e) => {
  if (navMenu && navMenu.classList.contains('active')) {
    if (!navMenu.contains(e.target) && mobileIcon && !mobileIcon.contains(e.target)) closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) closeMenu();
});

if (navMenu) { navMenu.addEventListener('click', (e) => { e.stopPropagation(); }); }

// ========== HEADER SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 50) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); }
  if (scrollTopBtn) {
    if (window.scrollY > 300) { scrollTopBtn.classList.add('show'); } else { scrollTopBtn.classList.remove('show'); }
  }
});

// ========== SCROLL TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// ========== CARRUSEL HERO ==========
const heroSwiper = new Swiper('.hero-slider', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  effect: 'fade',
  fadeEffect: { crossFade: true }
});

// ========== FUNCIÓN WHATSAPP ==========
const numeroWhatsapp = '5492984287176';

function enviarWhatsApp(modelo, medida = '', aplicacion = '', uso = '') {
  let texto = `Hola, consulto por el neumático ${modelo} (PIRELLI)`;
  if (medida) texto += ` - Medida: ${medida}`;
  if (aplicacion) texto += ` - Aplicación: ${aplicacion}`;
  if (uso) texto += ` - Uso: ${uso}`;
  window.open(`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`, '_blank');
}

// ========== CARRUSEL DE BANNERS PROFESIONAL ==========
let bannerSwiper = null;
let promosSwiper = null;
let bannerInterval = null;
const BANNER_DELAY = 5000;

// Paletas de colores para banners generados
const bannerPalettes = [
  { bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1200 60%, #2a1a00 100%)', overlay: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.1) 100%)' },
  { bg: 'linear-gradient(135deg, #0a0a0a 0%, #0d0d1f 60%, #1a1a3a 100%)', overlay: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.1) 100%)' },
  { bg: 'linear-gradient(135deg, #0a0000 0%, #1a0000 60%, #2a0a0a 100%)', overlay: 'linear-gradient(90deg, rgba(5,0,0,0.95) 0%, rgba(5,0,0,0.7) 60%, rgba(0,0,0,0.1) 100%)' },
  { bg: 'linear-gradient(135deg, #000a0a 0%, #001a15 60%, #002a20 100%)', overlay: 'linear-gradient(90deg, rgba(0,5,5,0.95) 0%, rgba(0,5,5,0.7) 60%, rgba(0,0,0,0.1) 100%)' },
];

// Datos de fallback para banners (se muestran si no hay Firebase)
const defaultBanners = [
  {
    tipo: 'generado',
    tag: '🔥 Oferta del mes',
    titulo: '20% OFF en toda la línea',
    destacado: 'Pirelli Agro',
    descripcion: 'Descuento especial en neumáticos agrícolas Pirelli seleccionados. Stock limitado.',
    precio: null,
    precioAnterior: null,
    descuento: '20% OFF',
    imagen: null,
    paletaIdx: 0,
    whatsappTexto: 'Hola! Consulto por el 20% OFF en neumáticos Pirelli Agro.'
  },
  {
    tipo: 'generado',
    tag: '💳 Financiación',
    titulo: 'Hasta 12 cuotas',
    destacado: 'sin interés',
    descripcion: 'Financiá tu compra con tarjeta de crédito en todos los bancos adheridos.',
    precio: null,
    precioAnterior: null,
    descuento: null,
    imagen: null,
    paletaIdx: 1,
    whatsappTexto: 'Hola! Consulto por la financiación en cuotas sin interés.'
  },
  {
    tipo: 'generado',
    tag: '🚚 Envío gratis',
    titulo: 'Entrega en tu',
    destacado: 'chacra o campo',
    descripcion: 'Coordinamos la entrega directamente en tu establecimiento en todo el Alto Valle.',
    precio: null,
    precioAnterior: null,
    descuento: null,
    imagen: null,
    paletaIdx: 3,
    whatsappTexto: 'Hola! Consulto por el servicio de entrega a domicilio.'
  }
];

// Datos de fallback para tarjetas de promo
const defaultPromos = [
  {
    titulo: "2×1 en Pirelli FarmTrac R1",
    descripcion: "Llevate dos neumáticos de la línea R1 y pagá uno. Ideal para tractores de tracción.",
    precio: "$120.000",
    precioAnterior: "$240.000",
    descuento: "50% OFF",
    imagen: null,
    whatsappTexto: "2x1 Pirelli FarmTrac R1"
  },
  {
    titulo: "20% OFF Línea Vial",
    descripcion: "Descuento especial en neumáticos Pirelli FG:01 y FR:01 para camiones de larga distancia.",
    precio: "$180.000",
    precioAnterior: "$225.000",
    descuento: "20% OFF",
    imagen: null,
    whatsappTexto: "20% OFF Pirelli Línea Vial"
  },
  {
    titulo: "Financiación sin interés",
    descripcion: "Hasta 12 cuotas sin interés en toda la línea Pirelli Agro y Vial con tarjetas seleccionadas.",
    precio: "Consultá",
    precioAnterior: null,
    descuento: null,
    imagen: null,
    whatsappTexto: "Financiación en cuotas Pirelli"
  },
  {
    titulo: "Pack Doble Eje",
    descripcion: "Compra combinada de neumáticos de dirección + tracción para camión. Precio especial de conjunto.",
    precio: "Consultar",
    precioAnterior: null,
    descuento: "Pack",
    imagen: null,
    whatsappTexto: "Pack Doble Eje Pirelli camión"
  }
];

// ---- Render banner generado ----
function renderBannerGenerado(banner, idx) {
  const palette = bannerPalettes[banner.paletaIdx || (idx % bannerPalettes.length)];
  const whatsappUrl = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(banner.whatsappTexto || 'Hola, consulto por una promoción.')}`;
  return `
    <div class="swiper-slide">
      <div class="banner-generated" style="background: ${palette.bg};">
        <div class="banner-overlay-gradient" style="background: ${palette.overlay};"></div>
        <div class="banner-overlay-content">
          <div class="banner-text-block">
            ${banner.tag ? `<span class="banner-tag">${banner.tag}</span>` : ''}
            <h2 class="banner-title">
              ${banner.titulo}<br><span class="banner-highlight">${banner.destacado || ''}</span>
            </h2>
            ${banner.descripcion ? `<p class="banner-desc">${banner.descripcion}</p>` : ''}
            ${(banner.precio || banner.precioAnterior || banner.descuento) ? `
              <div class="banner-price-block">
                ${banner.precio ? `<span class="banner-price-new">${banner.precio}</span>` : ''}
                ${banner.precioAnterior ? `<span class="banner-price-old">${banner.precioAnterior}</span>` : ''}
                ${banner.descuento ? `<span class="banner-discount-badge">${banner.descuento}</span>` : ''}
              </div>
            ` : ''}
            <a href="${whatsappUrl}" class="banner-cta" target="_blank" rel="noopener">
              <i class="fab fa-whatsapp"></i> Consultar ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- Render banner con imagen ----
function renderBannerImagen(banner) {
  const whatsappUrl = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(banner.whatsappTexto || 'Hola, consulto por una promoción.')}`;
  return `
    <div class="swiper-slide">
      <img src="${banner.imagen}" alt="${banner.titulo || 'Promoción'}" class="banner-img-slide"
        onerror="this.parentElement.innerHTML = \`${renderBannerGenerado(banner, 0).replace(/`/g, "'")}\`">
      <div class="banner-overlay-content">
        <div class="banner-overlay-gradient" style="background: linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);"></div>
        <div class="banner-text-block" style="position:relative;z-index:3;">
          ${banner.tag ? `<span class="banner-tag">${banner.tag}</span>` : ''}
          <h2 class="banner-title">
            ${banner.titulo || ''}<br><span class="banner-highlight">${banner.destacado || ''}</span>
          </h2>
          ${banner.descripcion ? `<p class="banner-desc">${banner.descripcion}</p>` : ''}
          ${(banner.precio || banner.descuento) ? `
            <div class="banner-price-block">
              ${banner.precio ? `<span class="banner-price-new">${banner.precio}</span>` : ''}
              ${banner.precioAnterior ? `<span class="banner-price-old">${banner.precioAnterior}</span>` : ''}
              ${banner.descuento ? `<span class="banner-discount-badge">${banner.descuento}</span>` : ''}
            </div>
          ` : ''}
          <a href="${whatsappUrl}" class="banner-cta" target="_blank" rel="noopener">
            <i class="fab fa-whatsapp"></i> Consultar ahora
          </a>
        </div>
      </div>
    </div>
  `;
}

// ---- Render promo card ----
function renderPromoCard(promo) {
  const whatsappUrl = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent('Hola, consulto por la promoción: ' + (promo.whatsappTexto || promo.titulo))}`;
  return `
    <div class="swiper-slide">
      <div class="promo-card">
        <div class="promo-image-wrap">
          ${promo.imagen
            ? `<img src="${promo.imagen}" alt="${promo.titulo}" class="promo-image" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
            : ''
          }
          <div class="promo-image-fallback" style="display:${promo.imagen ? 'none' : 'flex'};">
            <i class="fas fa-tag"></i>
          </div>
          ${promo.descuento ? `<span class="promo-badge">${promo.descuento}</span>` : ''}
        </div>
        <div class="promo-info">
          <h3 class="promo-title">${promo.titulo || 'Promoción especial'}</h3>
          <p class="promo-description">${promo.descripcion || ''}</p>
          <div class="promo-price-row">
            <span class="promo-price">${promo.precio || 'Consultar'}</span>
            ${promo.precioAnterior ? `<span class="promo-old-price">${promo.precioAnterior}</span>` : ''}
          </div>
          <a href="${whatsappUrl}" class="promo-btn" target="_blank" rel="noopener">
            <i class="fab fa-whatsapp"></i> Consultar oferta
          </a>
        </div>
      </div>
    </div>
  `;
}

// ---- Inicializar swiper del banner ----
function initBannerSwiper(banners) {
  if (bannerSwiper) { bannerSwiper.destroy(true, true); bannerSwiper = null; }
  clearInterval(bannerInterval);

  bannerSwiper = new Swiper('.banner-carousel', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: banners.length > 1,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    autoplay: false, // manejamos el progreso manualmente
    pagination: {
      el: '.banner-pagination',
      clickable: true,
    },
    navigation: false,
    on: {
      slideChange: () => resetProgressBar()
    }
  });

  // Botones de navegación custom
  const btnPrev = document.querySelector('.banner-prev');
  const btnNext = document.querySelector('.banner-next');
  if (btnPrev) btnPrev.addEventListener('click', () => { bannerSwiper.slidePrev(); });
  if (btnNext) btnNext.addEventListener('click', () => { bannerSwiper.slideNext(); });

  if (banners.length > 1) startProgressBar();
}

// ---- Barra de progreso ----
let progressStart = null;
let progressRAF = null;

function startProgressBar() {
  const bar = document.getElementById('bannerProgressBar');
  if (!bar) return;
  clearInterval(bannerInterval);
  if (progressRAF) cancelAnimationFrame(progressRAF);
  progressStart = null;

  function step(ts) {
    if (!progressStart) progressStart = ts;
    const elapsed = ts - progressStart;
    const pct = Math.min((elapsed / BANNER_DELAY) * 100, 100);
    bar.style.width = pct + '%';
    if (pct < 100) {
      progressRAF = requestAnimationFrame(step);
    } else {
      if (bannerSwiper) bannerSwiper.slideNext();
    }
  }
  progressRAF = requestAnimationFrame(step);
}

function resetProgressBar() {
  const bar = document.getElementById('bannerProgressBar');
  if (!bar) return;
  if (progressRAF) cancelAnimationFrame(progressRAF);
  bar.style.width = '0%';
  progressStart = null;
  startProgressBar();
}

// ---- Inicializar swiper de tarjetas ----
function initPromoCardsSwiper() {
  if (promosSwiper) { promosSwiper.destroy(true, true); promosSwiper = null; }

  promosSwiper = new Swiper('.promo-cards-carousel', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.promo-pagination', clickable: true },
    navigation: {
      prevEl: '.pc-btn-prev',
      nextEl: '.pc-btn-next'
    },
    breakpoints: {
      600: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    autoplay: { delay: 5000, disableOnInteraction: false },
    loop: false
  });
}

// ---- Cargar promociones ----
async function loadPromotions() {
  const bannerContainer = document.getElementById('bannerContainer');
  const promosContainer = document.getElementById('promosContainer');
  if (!bannerContainer || !promosContainer) return;

  let banners = [];
  let promoCards = [];

  // Intentar cargar de Firebase
  if (db) {
    try {
      const snap = await db.collection('promociones')
        .where('activa', '==', true)
        .orderBy('orden', 'asc')
        .get();

      snap.forEach(doc => {
        const data = { id: doc.id, ...doc.data() };
        // Si tiene imagen o datos de banner, va al carrusel principal
        if (data.esBanner) {
          banners.push(data);
        }
        // Siempre va también a las tarjetas
        promoCards.push(data);
      });
    } catch (err) {
      console.warn('Firestore no disponible, usando datos de ejemplo:', err);
    }
  }

  // Fallback si no hay datos de Firebase
  if (banners.length === 0) banners = defaultBanners;
  if (promoCards.length === 0) promoCards = defaultPromos;

  // --- Renderizar banners ---
  bannerContainer.innerHTML = banners.map((b, i) => {
    if (b.imagen) return renderBannerImagen(b);
    return renderBannerGenerado(b, i);
  }).join('');

  initBannerSwiper(banners);

  // --- Renderizar tarjetas ---
  promosContainer.innerHTML = promoCards.map(renderPromoCard).join('');
  setTimeout(() => initPromoCardsSwiper(), 100);
}

// Iniciar carga al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  loadPromotions();
});

// ========== BUSCADOR MEJORADO - SOLO PIRELLI ==========
const buscarBtn = document.getElementById('buscarWhatsApp');
const anchoInput = document.getElementById('ancho');
const aspectoInput = document.getElementById('aspecto');
const diametroInput = document.getElementById('diametro');
const medidaCompletaInput = document.getElementById('medidaCompleta');
const typeBtns = document.querySelectorAll('.type-btn');
const searchTabs = document.querySelectorAll('.search-tab');
const searchPanels = document.querySelectorAll('.search-panel');
const searchResultsDiv = document.getElementById('searchResults');
const resultsList = document.getElementById('resultsList');
const resultsCount = document.getElementById('resultsCount');
const tipoVehiculoSelect = document.getElementById('tipoVehiculo');
const modeloVehiculoInput = document.getElementById('modeloVehiculo');
const terrenoSelect = document.getElementById('terreno');
const rangoPrecioSelect = document.getElementById('rangoPrecio');

let selectedType = 'agro';
let currentSearchResults = [];

searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.getAttribute('data-tab');
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    searchPanels.forEach(panel => panel.classList.remove('active'));
    document.getElementById(`panel-${tabId}`).classList.add('active');
    if (searchResultsDiv) searchResultsDiv.style.display = 'none';
  });
});

typeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    typeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedType = btn.getAttribute('data-type');
    if (searchResultsDiv) searchResultsDiv.style.display = 'none';
  });
});

function parseMedidaCompleta(medida) {
  const patronRadial = /^(\d{2,4})\/(\d{2,3})R(\d{1,2}(?:\.\d+)?)$/i;
  const patronDiagonal = /^(\d{1,2}(?:\.\d+)?)-(\d{1,2})$/i;
  let match = medida.match(patronRadial);
  if (match) return { ancho: parseInt(match[1]), aspecto: parseInt(match[2]), diametro: parseFloat(match[3]) };
  match = medida.match(patronDiagonal);
  if (match) return { ancho: null, aspecto: null, diametro: parseFloat(match[2]) };
  return null;
}

function getAplicacionPorVehiculo(vehiculo) {
  const mapping = { 'tractor': 'campo', 'cosechadora': 'campo', 'camion': 'ruta', 'implemento': 'mixto', 'camioneta': 'mixto' };
  return mapping[vehiculo] || null;
}

function searchTires() {
  const results = [];
  const activeTab = document.querySelector('.search-tab.active')?.getAttribute('data-tab');

  if (activeTab === 'medida') {
    let ancho = anchoInput?.value ? parseInt(anchoInput.value) : null;
    let aspecto = aspectoInput?.value ? parseInt(aspectoInput.value) : null;
    let diametro = diametroInput?.value ? parseFloat(diametroInput.value) : null;
    const medidaCompleta = medidaCompletaInput?.value?.trim();
    if (medidaCompleta && !ancho && !aspecto && !diametro) {
      const parsed = parseMedidaCompleta(medidaCompleta);
      if (parsed) { ancho = parsed.ancho; aspecto = parsed.aspecto; diametro = parsed.diametro; }
    }
    tireDatabase.forEach(tire => {
      if (tire.tipo !== selectedType) return;
      let match = true;
      if (ancho && tire.medidas.ancho && Math.abs(tire.medidas.ancho - ancho) > 20) match = false;
      if (aspecto && tire.medidas.aspecto && Math.abs(tire.medidas.aspecto - aspecto) > 10) match = false;
      if (diametro && tire.medidas.diametro && Math.abs(tire.medidas.diametro - diametro) > 0.5) match = false;
      if (match) results.push(tire);
    });
  } else if (activeTab === 'vehiculo') {
    const vehiculo = tipoVehiculoSelect?.value;
    if (vehiculo) {
      const aplicacionBuscada = getAplicacionPorVehiculo(vehiculo);
      tireDatabase.forEach(tire => {
        if (tire.tipo !== selectedType) return;
        if (tire.aplicacion === aplicacionBuscada) results.push(tire);
      });
    } else {
      tireDatabase.forEach(tire => { if (tire.tipo === selectedType) results.push(tire); });
    }
  } else if (activeTab === 'aplicacion') {
    const aplicacion = terrenoSelect?.value;
    tireDatabase.forEach(tire => {
      if (tire.tipo !== selectedType) return;
      if (aplicacion === tire.aplicacion) results.push(tire);
    });
    if (results.length === 0 && (!aplicacion || aplicacion === '')) {
      tireDatabase.forEach(tire => { if (tire.tipo === selectedType) results.push(tire); });
    }
  }

  const uniqueResults = [];
  const seen = new Set();
  for (const tire of results) {
    const key = `${tire.nombre}-${tire.especificacion}`;
    if (!seen.has(key)) { seen.add(key); uniqueResults.push(tire); }
  }

  currentSearchResults = uniqueResults;
  displaySearchResults(uniqueResults);
  return uniqueResults;
}

function displaySearchResults(results) {
  if (!searchResultsDiv || !resultsCount || !resultsList) return;
  if (results.length > 0) {
    searchResultsDiv.style.display = 'block';
    resultsCount.textContent = results.length;
    resultsList.innerHTML = results.map(tire => `
      <div class="results-list-item">
        <div>
          <div class="result-name">${tire.nombre}</div>
          <div class="result-spec">${tire.especificacion} | ${tire.uso}</div>
        </div>
        <button class="btn-whatsapp result-whatsapp" data-modelo="${tire.nombre}" data-espec="${tire.especificacion}" data-aplicacion="${tire.aplicacion}" data-uso="${tire.uso}">
          <i class="fab fa-whatsapp"></i> Consultar
        </button>
      </div>
    `).join('');
    document.querySelectorAll('.result-whatsapp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        enviarWhatsApp(btn.getAttribute('data-modelo'), btn.getAttribute('data-espec'), btn.getAttribute('data-aplicacion'), btn.getAttribute('data-uso'));
      });
    });
  } else {
    searchResultsDiv.style.display = 'block';
    resultsCount.textContent = '0';
    resultsList.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <i class="fas fa-search" style="font-size: 48px; color: var(--amarillo); margin-bottom: 15px; display: block;"></i>
        No se encontraron neumáticos Pirelli con esos criterios.
        <br><br>
        <strong>¡Consultanos directamente por WhatsApp y te asesoramos!</strong>
      </div>
    `;
  }
}

if (buscarBtn) {
  buscarBtn.addEventListener('click', () => {
    const results = searchTires();
    let texto = `Hola, necesito asesoramiento para neumáticos PIRELLI ${selectedType === 'agro' ? 'agrícolas' : 'viales'}.`;
    const activeTab = document.querySelector('.search-tab.active')?.getAttribute('data-tab');
    if (activeTab === 'medida') {
      if (medidaCompletaInput?.value) texto += ` Medida: ${medidaCompletaInput.value}.`;
      else {
        if (anchoInput?.value) texto += ` Ancho: ${anchoInput.value}mm.`;
        if (aspectoInput?.value) texto += ` Relación: ${aspectoInput.value}%.`;
        if (diametroInput?.value) texto += ` Diámetro: ${diametroInput.value}".`;
      }
    } else if (activeTab === 'vehiculo') {
      if (tipoVehiculoSelect?.value) texto += ` Vehículo: ${tipoVehiculoSelect.options[tipoVehiculoSelect.selectedIndex]?.text}.`;
      if (modeloVehiculoInput?.value) texto += ` Modelo: ${modeloVehiculoInput.value}.`;
    } else if (activeTab === 'aplicacion') {
      if (terrenoSelect?.value) texto += ` Aplicación: ${terrenoSelect.options[terrenoSelect.selectedIndex]?.text}.`;
      if (rangoPrecioSelect?.value) texto += ` Rango: ${rangoPrecioSelect.options[rangoPrecioSelect.selectedIndex]?.text}.`;
    }
    if (currentSearchResults.length > 0) {
      texto += ` Encontré estos neumáticos Pirelli: ${currentSearchResults.slice(0, 5).map(r => `${r.nombre} ${r.especificacion}`).join(', ')}.`;
    }
    window.open(`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`, '_blank');
  });
}

// ========== FAQ ACORDEÓN ==========
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  if (question) { question.addEventListener('click', () => { item.classList.toggle('active'); }); }
});

// ========== ACTIVE NAV LINK ==========
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
  const scrollPos = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (navLink && scrollPos >= sectionTop && scrollPos < sectionBottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ========== AJUSTE DE ALTURA HERO ==========
function setHeroHeight() {
  const hero = document.querySelector('.hero');
  const heroSlider = document.querySelector('.hero-slider');
  const heroWrapper = document.querySelector('.hero-content-wrapper');
  if (hero) hero.style.height = `${window.innerHeight}px`;
  if (heroSlider) heroSlider.style.height = `${window.innerHeight}px`;
  if (heroWrapper) heroWrapper.style.height = `${window.innerHeight}px`;
  document.querySelectorAll('.hero .swiper-slide').forEach(slide => {
    slide.style.height = `${window.innerHeight}px`;
  });
}
window.addEventListener('load', setHeroHeight);
window.addEventListener('resize', setHeroHeight);

console.log('Brevi Neumáticos — Carrusel de Banners & Promociones activo ✓');
