// main.js

// Marca que el JS está activo: solo así se ocultan los elementos que aparecen al hacer scroll
document.documentElement.classList.add('js');

const IMG = 'assets/img/projects/';

// Detalle de cada proyecto para el modal
const PROJECTS = {
    burguer: {
        type: 'E-commerce · Restaurante',
        title: 'Burguer',
        desc: 'Plataforma de pedidos en línea para una cadena de comidas rápidas. El cliente arma su pedido desde el menú y lo recoge en la sede que elija; el negocio administra todo desde un panel con usuarios, grupos y permisos.',
        features: [
            'Menú en línea con filtros por categoría, carrito y checkout con selección de sede.',
            'Cuenta de cliente: registro, inicio de sesión, recuperación de clave e historial de pedidos.',
            'Sección "Trabaja con nosotros" con carga de hoja de vida.',
            'Panel administrativo con indicadores: pedidos por estado, total vendido e inventario más bajo.',
            'Gestión de productos, categorías, pedidos, clientes, sucursales y proveedores.',
            'Control de acceso por grupos y permisos (patentes) para cada operación del sistema.'
        ],
        tech: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap', 'jQuery'],
        repo: 'https://github.com/Yeistyle11/burguer',
        images: [
            ['burguer-home.webp', 'Página principal'],
            ['burguer-menu.webp', 'Menú con filtros por categoría'],
            ['burguer-contacto.webp', 'Contacto y sedes'],
            ['burguer-admin-home.webp', 'Inicio del panel administrativo'],
            ['burguer-admin.webp', 'Gestión de productos']
        ]
    },
    ventas: {
        type: 'Sistema administrativo',
        title: 'Sistema de Ventas',
        desc: 'Aplicación administrativa para registrar ventas y llevar el control de clientes, productos e inventario, con indicadores de facturación mensual y anual.',
        features: [
            'Panel con facturación del mes y del año, facturación mensual graficada e ingresos por producto.',
            'Registro de ventas con cálculo automático de totales y descuento de inventario.',
            'Gestión de clientes con ubicación por provincia y localidad.',
            'Catálogo de productos con alertas de stock bajo y agotado.',
            'Usuarios con inicio de sesión y contraseñas cifradas; exportación de reportes a CSV.'
        ],
        tech: ['PHP (POO)', 'MySQL', 'Bootstrap', 'Chart.js', 'jQuery'],
        repo: 'https://github.com/Yeistyle11/php/tree/main/sistema_ventas',
        images: [
            ['ventas-dashboard.webp', 'Panel de inicio'],
            ['ventas-listado.webp', 'Historial de ventas'],
            ['ventas-productos.webp', 'Productos e inventario'],
            ['ventas-login.webp', 'Inicio de sesión']
        ]
    },
    abm: {
        type: 'CRUD · Fundamentos',
        title: 'ABM Clientes',
        desc: 'Aplicación para dar de alta, modificar y eliminar clientes, pensada para practicar los fundamentos de PHP sin base de datos: la información se guarda en un archivo JSON.',
        features: [
            'Alta, edición y eliminación de clientes desde una sola pantalla, con confirmación antes de borrar.',
            'Búsqueda en vivo por nombre, documento o correo.',
            'Carga de fotografía con validación de formato y reemplazo de la imagen anterior.',
            'Persistencia de datos en JSON.'
        ],
        tech: ['PHP', 'JSON', 'Bootstrap'],
        repo: 'https://github.com/Yeistyle11/ABMClientes',
        images: [['abm-clientes.webp', 'Registro de clientes']]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar con fondo al hacer scroll
    const navbar = document.getElementById('navbar');
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Menú móvil
    const burger = document.getElementById('hamburger');
    const links = document.getElementById('nav-links');
    const closeMenu = () => {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Aparición al hacer scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Galería de BeautySpot
    const gallery = document.querySelector('[data-gallery]');
    if (gallery) {
        const main = gallery.querySelector('.gallery-main');
        const caption = gallery.querySelector('.gallery-caption');
        const tabs = gallery.querySelectorAll('[role="tab"]');
        tabs.forEach(tab => tab.addEventListener('click', () => {
            tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
            tab.setAttribute('aria-selected', 'true');
            main.classList.add('fading');
            setTimeout(() => {
                main.src = tab.dataset.src;
                main.alt = 'BeautySpot – ' + tab.textContent;
                caption.textContent = tab.dataset.caption;
                main.classList.remove('fading');
            }, 180);
        }));
        // Precarga de las imágenes de la galería
        tabs.forEach(t => { const i = new Image(); i.src = t.dataset.src; });
    }

    // Visor de imagen ampliada
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const openLightbox = (src, alt) => {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.showModal();
    };
    document.querySelectorAll('[data-zoom]').forEach(btn => btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        openLightbox(img.src, img.alt);
    }));

    // Modal de proyectos
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const thumbs = document.getElementById('modal-thumbs');

    const openProject = key => {
        const p = PROJECTS[key];
        if (!p) return;
        document.getElementById('modal-type').textContent = p.type;
        document.getElementById('modal-title').textContent = p.title;
        document.getElementById('modal-desc').textContent = p.desc;
        document.getElementById('modal-features').innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
        document.getElementById('modal-tech').innerHTML = p.tech.map(t => `<li>${t}</li>`).join('');
        document.getElementById('modal-repo').href = p.repo;

        const show = i => {
            modalImg.src = IMG + p.images[i][0];
            modalImg.alt = `${p.title} – ${p.images[i][1]}`;
            thumbs.querySelectorAll('button').forEach((b, j) => b.classList.toggle('active', i === j));
        };
        thumbs.innerHTML = p.images.length > 1
            ? p.images.map(([src, alt], i) => `<button data-i="${i}" aria-label="${alt}"><img src="${IMG + src}" alt=""></button>`).join('')
            : '';
        thumbs.querySelectorAll('button').forEach(b => b.addEventListener('click', () => show(Number(b.dataset.i))));
        show(0);
        modal.showModal();
    };

    document.querySelectorAll('[data-project]').forEach(btn =>
        btn.addEventListener('click', () => openProject(btn.dataset.project)));
    modalImg.addEventListener('click', () => openLightbox(modalImg.src, modalImg.alt));

    // Cerrar diálogos con el botón o haciendo clic fuera
    document.querySelectorAll('dialog').forEach(dlg => {
        dlg.querySelector('[data-close]').addEventListener('click', () => dlg.close());
        dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    });
});
