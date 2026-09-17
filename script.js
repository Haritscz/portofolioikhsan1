/**
 * PORTFOLIO SCRIPT — IKHSAN NADIM AL HARITS
 * Mengelola Theme Switcher, Mobile Navigation, Project Modal,
 * Copy to Clipboard, Scroll Spy, dan Scroll Reveal Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. THEME SWITCHER (Dark & Light Mode with localStorage)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const THEME_STORAGE_KEY = 'ikhsan_theme_pref';

  // Fungsi untuk mengaplikasikan tema
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f8f9fc' : '#0b0a10');
    }

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'light' ? 'Ubah ke Mode Gelap (Dark)' : 'Ubah ke Mode Terang (Light)'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'light' ? 'Ubah ke Mode Gelap' : 'Ubah ke Mode Terang'
      );
    }
  }

  // Cek tema yang tersimpan di localStorage atau gunakan dark mode sebagai default
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  applyTheme(savedTheme);

  // Event listener tombol theme toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // =========================================================================
  // 2. NAVBAR SCROLL BEHAVIOR & STICKY BLUR
  // =========================================================================
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Inisialisasi posisi saat ini

  // =========================================================================
  // 3. MOBILE HAMBURGER MENU & DRAWER
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    if (!mobileToggle || !mobileDrawer) return;
    const isOpen = mobileDrawer.classList.contains('open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Tutup menu mobile ketika salah satu link diklik
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Tutup menu mobile jika pengguna klik di luar navbar
  document.addEventListener('click', (e) => {
    if (navbar && !navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // =========================================================================
  // 4. ACTIVE NAVIGATION LINK SPY (Scroll Spy)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 120; // Offset navbar

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileLinks.forEach((mLink) => {
          mLink.classList.remove('active');
          if (mLink.getAttribute('href') === `#${sectionId}`) {
            mLink.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // =========================================================================
  // 5. PROJECT DETAIL MODAL INTERACTIVITY
  // =========================================================================
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActionClose = document.getElementById('modal-action-close');
  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeaturesList = document.getElementById('modal-features-list');

  // Database Data Detail Project
  const projectDetails = {
    portfolio: {
      title: 'Website Portofolio Pribadi',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive', 'Light/Dark Mode'],
      desc: 'Website portofolio pribadi modern yang dibangun untuk merepresentasikan profil saya sebagai siswa Rekayasa Perangkat Lunak di SMK N Tembarak. Dibangun menggunakan arsitektur Vanilla Web murni agar performa pemuatan super ringan, cepat, dan mudah dipelihara.',
      features: [
        'Sistem Tema Ganda (Dark Mode & Light Mode) dengan penyimpanan preferensi localStorage tanpa reload',
        'Desain responsif komprehensif untuk tampilan desktop, laptop, tablet, dan smartphone',
        'Navigasi interaktif dengan glassmorphic blur, scroll spy, dan mobile drawer menu',
        'Visualisasi mockup kode interaktif dan palet warna dark purple elegan',
        'Struktur semantic HTML5 dengan optimasi hierarki SEO dan aksesibilitas'
      ]
    },
    python: {
      title: 'Program Python & Algoritma',
      tags: ['Python 3', 'Logika Pemrograman', 'CLI Application', 'Data Structures'],
      desc: 'Kumpulan program latihan dan tugas pemrograman menggunakan bahasa Python yang difokuskan pada penguasaan dasar-dasar algoritma, manipulasi data, dan pemecahan masalah komputasional.',
      features: [
        'Implementasi logika percabangan dan perulangan untuk kalkulasi data otomatis',
        'Program utilitas berbasis command line (CLI) dengan validasi input pengguna',
        'Pengolahan struktur data dasar (List, Dictionary, Tuple, dan Set)',
        'Eksplorasi pembuatan fungsi modular dan prinsip Clean Code',
        'Latihan simulasi studi kasus inventaris sederhana dan pengurutan angka'
      ]
    },
    uiux: {
      title: 'UI/UX Design — Antarmuka Aplikasi',
      tags: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'Design System'],
      desc: 'Perancangan prototipe antarmuka aplikasi digital menggunakan Figma. Mengutamakan kenyamanan interaksi pengguna (user experience), kejelasan informasi, serta estetika visual modern yang selaras.',
      features: [
        'Perancangan alur interaksi pengguna (User Flow) dan wireframe tata letak layar',
        'Pembuatan sistem komponen reusable (Buttons, Input Fields, Navigation, Cards)',
        'Penerapan kombinasi warna bertema dark modern dengan aksen violet yang elegan',
        'Penataan hierarki tipografi agar nyaman dibaca pada berbagai ukuran layar ponsel',
        'Pembuatan prototipe interaktif untuk simulasi navigasi antar halaman'
      ]
    }
  };

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    // Render tags
    modalTags.innerHTML = '';
    data.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    // Render features
    modalFeaturesList.innerHTML = '';
    data.features.forEach((feature) => {
      const li = document.createElement('li');
      li.textContent = feature;
      modalFeaturesList.appendChild(li);
    });

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Kunci scroll halaman saat modal terbuka
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Kembalikan scroll halaman
  }

  // Event listener tombol "Lihat Project"
  document.querySelectorAll('.btn-project-detail').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalActionClose) modalActionClose.addEventListener('click', closeModal);

  // Tutup modal jika klik di luar area modal content (backdrop)
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  // Tutup modal dengan tombol Keyboard ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  // =========================================================================
  // 6. COPY TO CLIPBOARD & TOAST NOTIFICATION
  // =========================================================================
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-clipboard');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback untuk browser lawas atau non-https
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast(`Tersalin: ${textToCopy}`);
      } catch (err) {
        showToast(`Gagal menyalin secara otomatis`);
      }
    });
  });

  // =========================================================================
  // 7. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 8. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback jika browser tidak mendukung IntersectionObserver
    revealElements.forEach((el) => el.classList.add('revealed'));
  }
});
