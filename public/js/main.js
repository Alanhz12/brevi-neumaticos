// ========== INICIALIZAR AOS ==========
// Esperamos al load completo para que AOS calcule bien las posiciones reales
window.addEventListener('load', () => {
  AOS.init({
    duration: 750,
    once: true,
    offset: 0,            // Dispara en cuanto el elemento entra al viewport
    easing: 'ease-out-cubic',
    startEvent: 'load',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 20,
    throttleDelay: 60,
    mirror: false,
  });

  // Forzar refresh para que los elementos ya visibles al cargar se animen correctamente
  setTimeout(() => AOS.refresh(), 300);
  setTimeout(() => AOS.refresh(), 1000); // segundo refresh por si el preloader desplazó layouts
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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZtUa8TyHCjpBFISkSUGl0hKTGS06_UAA",
  authDomain: "brevi-neumaticos.firebaseapp.com",
  projectId: "brevi-neumaticos",
  storageBucket: "brevi-neumaticos.firebasestorage.app",
  messagingSenderId: "126173922281",
  appId: "1:126173922281:web:46863b73abc7085f128178"
};

// Initialize Firebase


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
  autoplay: { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
  pagination: { el: '.hero .swiper-pagination', clickable: true },
  navigation: { nextEl: '.hero .swiper-button-next', prevEl: '.hero .swiper-button-prev' },
  effect: 'fade',
  fadeEffect: { crossFade: true },
  speed: 1200, // Transición de 1.2s — suave y cinematográfica
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

// Sin datos de ejemplo — las promociones se cargan exclusivamente desde Firebase
const defaultBanners = [];
const defaultPromos = [];

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
  const waTexto = banner.whatsappTexto || 'Hola, consulto por una promocion.';
  const whatsappUrl = 'https://wa.me/' + numeroWhatsapp + '?text=' + encodeURIComponent(waTexto);
  const precio = banner.precio || '';
  const precioAnterior = banner.precioAnterior || '';
  const descuento = banner.descuento || '';
  const tag = banner.tag || '';
  const titulo = banner.titulo || '';
  const destacado = banner.destacado || '';
  const descripcion = banner.descripcion || '';

  const precioHTML = (precio || descuento) ? (
    '<div class="banner-price-block">' +
    (precio ? '<span class="banner-price-new">' + precio + '</span>' : '') +
    (precioAnterior ? '<span class="banner-price-old">' + precioAnterior + '</span>' : '') +
    (descuento ? '<span class="banner-discount-badge">' + descuento + '</span>' : '') +
    '</div>'
  ) : '';

  const ctaHTML = banner.whatsappTexto
    ? '<a href="' + whatsappUrl + '" class="banner-cta" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Consultar ahora</a>'
    : '';

  return (
    '<div class="swiper-slide">' +
      '<div class="banner-generated">' +
        '<img src="' + banner.imagen + '" alt="' + titulo + '" class="banner-img-slide" ' +
          'onerror="this.style.display=\'none\'">' +
        '<div class="banner-overlay-gradient banner-overlay-gradient-img"></div>' +
        '<div class="banner-overlay-content">' +
          '<div class="banner-text-block">' +
            (tag ? '<span class="banner-tag">' + tag + '</span>' : '') +
            '<h2 class="banner-title">' + titulo + (destacado ? '<br><span class="banner-highlight">' + destacado + '</span>' : '') + '</h2>' +
            (descripcion ? '<p class="banner-desc">' + descripcion + '</p>' : '') +
            precioHTML +
            ctaHTML +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
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
  if (progressRAF) cancelAnimationFrame(progressRAF);

  setTimeout(() => {
    bannerSwiper = new Swiper('.banner-carousel', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: banners.length > 1,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 800,
      autoplay: false,
      pagination: {
        el: '.banner-pagination',
        clickable: true,
      },
      navigation: false,
      on: {
        slideChange: () => resetProgressBar()
      }
    });

    const btnPrev = document.querySelector('.banner-prev');
    const btnNext = document.querySelector('.banner-next');
    if (btnPrev) btnPrev.onclick = () => bannerSwiper.slidePrev();
    if (btnNext) btnNext.onclick = () => bannerSwiper.slideNext();

    if (banners.length > 1) startProgressBar();
  }, 100);
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
        // Todos van al carrusel de banners
        banners.push(data);
        // Solo van a las tarjetas si tipo === 'oferta' (o si no tiene tipo definido, por compatibilidad)
        if (data.generaTarjeta !== false && data.tipo !== 'banner') {
          promoCards.push(data);
        }
      });
    } catch (err) {
      console.warn('Firestore no disponible, usando datos de ejemplo:', err);
    }
  }

  // Sin fallback — si no hay datos en Firebase, mostrar estado vacío
  if (banners.length === 0) {
    bannerContainer.innerHTML = `
      <div class="swiper-slide">
        <div class="banner-generated" style="background:#141414;display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;padding:40px 20px;">
            <i class="fas fa-tag" style="font-size:48px;color:var(--amarillo);margin-bottom:16px;display:block;"></i>
            <p style="color:rgba(255,255,255,0.5);font-size:16px;">Próximamente nuevas promociones</p>
          </div>
        </div>
      </div>`;
  } else {
    bannerContainer.innerHTML = banners.map((b, i) => {
      if (b.imagen) return renderBannerImagen(b);
      return renderBannerGenerado(b, i);
    }).join('');
  }

  initBannerSwiper(banners);

  // --- Renderizar tarjetas ---
  if (promoCards.length === 0) {
    promosContainer.innerHTML = `
      <div class="swiper-slide">
        <div class="promo-card" style="display:flex;align-items:center;justify-content:center;min-height:200px;">
          <p style="color:rgba(255,255,255,0.4);text-align:center;">Próximamente nuevas ofertas</p>
        </div>
      </div>`;
  } else {
    promosContainer.innerHTML = promoCards.map(renderPromoCard).join('');
  }
  setTimeout(() => initPromoCardsSwiper(), 100);
}

// Iniciar carga al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  loadPromotions();
});

// ========== BUSCADOR — DIRECTO A WHATSAPP ==========
const buscarBtn = document.getElementById('buscarWhatsApp');
const typeBtns = document.querySelectorAll('.type-btn');
const searchTabs = document.querySelectorAll('.search-tab');
const searchPanels = document.querySelectorAll('.search-panel');

let selectedType = 'agro';

typeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    typeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedType = btn.getAttribute('data-type');
  });
});

searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.getAttribute('data-tab');
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    searchPanels.forEach(panel => panel.classList.remove('active'));
    const panel = document.getElementById('panel-' + tabId);
    if (panel) panel.classList.add('active');
  });
});

if (buscarBtn) {
  buscarBtn.addEventListener('click', () => {
    const activeTab = document.querySelector('.search-tab.active')?.getAttribute('data-tab');
    const tipoTexto = selectedType === 'agro' ? 'agricola' : 'vial';
    let texto = 'Hola! Consulto por neumaticos PIRELLI ' + tipoTexto + '.';

    if (activeTab === 'medida') {
      const medidaCompleta = document.getElementById('medidaCompleta')?.value?.trim();
      const ancho    = document.getElementById('ancho')?.value?.trim();
      const aspecto  = document.getElementById('aspecto')?.value?.trim();
      const diametro = document.getElementById('diametro')?.value?.trim();
      if (medidaCompleta) {
        texto += ' Medida: ' + medidaCompleta + '.';
      } else if (ancho || aspecto || diametro) {
        if (ancho)    texto += ' Ancho: ' + ancho + 'mm.';
        if (aspecto)  texto += ' Perfil: ' + aspecto + '%.';
        if (diametro) texto += ' Diametro: ' + diametro + '".' ;
      } else {
        texto += ' Necesito asesoramiento para elegir la medida correcta.';
      }
    } else if (activeTab === 'vehiculo') {
      const vehiculoSel = document.getElementById('tipoVehiculo');
      const modelo = document.getElementById('modeloVehiculo')?.value?.trim();
      if (vehiculoSel?.value) texto += ' Vehiculo: ' + vehiculoSel.options[vehiculoSel.selectedIndex].text + '.';
      if (modelo) texto += ' Modelo/marca: ' + modelo + '.';
    } else if (activeTab === 'aplicacion') {
      const terrenoSel = document.getElementById('terreno');
      if (terrenoSel?.value) texto += ' Aplicacion/terreno: ' + terrenoSel.options[terrenoSel.selectedIndex].text + '.';
    }

    texto += ' Me pueden asesorar?';
    window.open('https://wa.me/' + numeroWhatsapp + '?text=' + encodeURIComponent(texto), '_blank');
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

// ========== GALERÍA DE IMÁGENES ==========
let galeriaItems = [];
let lightboxIndex = 0;

function renderGaleriaItem(item) {
  const caption = item.titulo
    ? `<div class="gallery-item-overlay"><span class="gallery-item-caption">${item.titulo}</span></div>`
    : `<div class="gallery-item-overlay"></div>`;
  return `
    <div class="gallery-item" data-imagen="${item.imagen}" data-titulo="${(item.titulo || '').replace(/"/g, '&quot;')}">
      <img src="${item.imagen}" alt="${item.titulo || 'Brevi Neumáticos'}" loading="lazy" onerror="this.closest('.gallery-item').style.display='none'">
      ${caption}
      <span class="gallery-zoom-icon"><i class="fas fa-expand"></i></span>
    </div>
  `;
}

async function loadGaleria() {
  const grid = document.getElementById('galeriaGrid');
  const countEl = document.getElementById('galeriaCount');
  if (!grid) return;

  let imagenes = [];

  if (db) {
    try {
      const snap = await db.collection('galeria')
        .where('activa', '==', true)
        .orderBy('orden', 'asc')
        .get();
      snap.forEach(doc => imagenes.push({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.warn('Galería: no se pudo cargar desde Firestore:', err);
    }
  }

  galeriaItems = imagenes.filter(i => i.imagen);

  if (countEl) countEl.textContent = galeriaItems.length;

  if (galeriaItems.length === 0) {
    grid.innerHTML = `
      <div class="gallery-empty-state" style="column-span: all;">
        <i class="fas fa-images"></i>
        <p>Próximamente fotos de nuestro local y trabajos realizados.</p>
      </div>`;
    return;
  }

  grid.innerHTML = galeriaItems.map(renderGaleriaItem).join('');
  initGalleryClicks();
}

function initGalleryClicks() {
  document.querySelectorAll('.gallery-item').forEach((el, idx) => {
    el.addEventListener('click', () => openLightbox(idx));
  });
}

function openLightbox(idx) {
  lightboxIndex = idx;
  updateLightbox();
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateLightbox() {
  if (!galeriaItems.length) return;
  const item = galeriaItems[lightboxIndex];
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const counter = document.getElementById('lightboxCounter');
  if (img) img.src = item.imagen;
  if (caption) caption.textContent = item.titulo || '';
  if (counter) counter.textContent = (lightboxIndex + 1) + ' / ' + galeriaItems.length;
}

function lightboxPrev() {
  if (!galeriaItems.length) return;
  lightboxIndex = (lightboxIndex - 1 + galeriaItems.length) % galeriaItems.length;
  updateLightbox();
}

function lightboxNext() {
  if (!galeriaItems.length) return;
  lightboxIndex = (lightboxIndex + 1) % galeriaItems.length;
  updateLightbox();
}

const lightboxCloseBtn = document.getElementById('lightboxClose');
const lightboxPrevBtn = document.getElementById('lightboxPrev');
const lightboxNextBtn = document.getElementById('lightboxNext');
const lightboxOverlayEl = document.getElementById('lightboxOverlay');

if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', lightboxPrev);
if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', lightboxNext);
if (lightboxOverlayEl) {
  lightboxOverlayEl.addEventListener('click', (e) => {
    if (e.target === lightboxOverlayEl) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay || !overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
});

document.addEventListener('DOMContentLoaded', () => {
  loadGaleria();
});

console.log('Brevi Neumáticos — Carrusel de Banners & Promociones activo ✓');
