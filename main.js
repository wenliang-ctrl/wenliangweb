// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initAIChat();
    const carousel = new HologramCarousel();
    new ParticleSystem();
    initScrollReveal();
    initHoverEffects();
    initMobileMenu();
    optimizeTouchEvents();
    initScrollSpy();
    // 确保第一个卡片可见
    carousel.cards[0].classList.add('active');
    carousel.cards[0].style.zIndex = 40;
    initScrollIndicator();
    initSectionTransitions();
    initMouseFollow();
    initScrollToTop();
    initModal();
    createStars();
});

// 视差滚动效果
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// AI对话界面
function initAIChat() {
    const chatButton = document.querySelector('.ai-chat-button');
    const chatPanel = document.querySelector('.ai-chat-panel');

    chatButton.addEventListener('click', () => {
        chatPanel.classList.toggle('hidden');
    });
}

// 粒子效果（将在后续实现）
function createParticleEffect() {
    // 粒子系统实现
}

// 轮播系统
class HologramCarousel {
    constructor() {
        this.container = document.querySelector('.waterfall-container');
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        // 初始化其他功能
    }
}

// 粒子特效
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.floor(window.innerWidth * 0.1);
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            this.ctx.fillStyle = `rgba(99, 102, 241, ${particle.size/3})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }
}

// 添加滚动显示动画
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 为需要动画的元素添加观察
    document.querySelectorAll('.project-card, .social-icon').forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// 添加鼠标悬停效果
function initHoverEffects() {
    // 光标跟随效果
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);

    let cursorTimeout;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursor.classList.add('active');
        clearTimeout(cursorTimeout);
        
        cursorTimeout = setTimeout(() => {
            cursor.classList.remove('active');
        }, 500);
    });

    // 为可交互元素添加磁性效果
    document.querySelectorAll('a, button, .quantum-sphere').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            el.style.transform = `translate(
                ${(x - rect.width / 2) / 10}px, 
                ${(y - rect.height / 2) / 10}px
            )`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 依次显示各个元素
    const elements = [
        '.logo',
        '.space-nav nav',
        '.project-card',
        '.social-matrix',
        '.ai-chat-button'
    ];
    
    elements.forEach((selector, index) => {
        setTimeout(() => {
            document.querySelector(selector).classList.add('fade-in-up');
        }, index * 200);
    });

    // 模拟加载进度
    const loadingBar = document.querySelector('.loading-bar');
    let width = 0;
    const interval = setInterval(() => {
        width += 10;
        loadingBar.style.width = width + '%';
        if (width >= 100) clearInterval(interval);
    }, 50);
});

// 在 DOMContentLoaded 事件处理程序中添加
function initMobileMenu() {
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('.space-nav nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // 点击导航链接后平滑滚动到对应区域
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // 关闭移动端菜单
            menuButton.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');

            // 平滑滚动到目标位置
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// 优化触摸事件处理
function optimizeTouchEvents() {
    // 禁用默认的触摸行为
    document.addEventListener('touchmove', (e) => {
        if (document.body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    }, { passive: false });

    // 优化轮播触摸体验
    const carousel = document.querySelector('.hologram-carousel');
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            // 触发轮播切换
            const carouselInstance = document.querySelector('.carousel-container').__carouselInstance;
            if (diff > 0) {
                carouselInstance.goToSlide(carouselInstance.currentIndex + 1);
            } else {
                carouselInstance.goToSlide(carouselInstance.currentIndex - 1);
            }
        }
    });
}

// 优化移动端性能
function optimizeMobilePerformance() {
    // 降低粒子数量
    if (window.innerWidth <= 768) {
        const particleSystem = document.querySelector('#particleCanvas').__particleSystem;
        particleSystem.particles = particleSystem.particles.slice(0, particleSystem.particles.length / 2);
    }

    // 减少动画复杂度
    if (window.innerWidth <= 480) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.transform = 'none';
        });
    }
}

// 在窗口调整大小时优化性能
window.addEventListener('resize', () => {
    optimizeMobilePerformance();
});

// 添加滚动监听，高亮当前区域的导航项
function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// 滚动进度指示器
function initScrollIndicator() {
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / totalHeight) * 100;
        scrollProgress.style.height = `${progress}%`;
    });
}

// 页面切换动画
function initSectionTransitions() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
}

// 鼠标跟随特效
function initMouseFollow() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // 磁性效果
    const magneticElements = document.querySelectorAll('a, button, .quantum-sphere');
    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-magnetic');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-magnetic');
        });
    });

    // 鼠标移动事件
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor');
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // 添加拖尾效果
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
                document.body.appendChild(trail);
                setTimeout(() => trail.remove(), 500);
            }, i * 50);
        }
    });
}

// 确保滚动到顶部按钮初始化
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 弹窗功能
function initModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalImages = document.querySelector('.modal-images');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

    // 打开弹窗
    viewDetailsBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // 清空之前的图片
            modalImages.innerHTML = '';

            // 根据项目索引加载图片
            const images = getProjectImages(index);
            images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                modalImages.appendChild(img);
                console.log("地址为：==》"+src);
            });
            

            // 显示弹窗
            modalOverlay.classList.remove('hidden');
            modalOverlay.classList.add('visible');
        });
    });

    // 关闭弹窗
    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('visible');
        modalOverlay.classList.add('hidden');
    });

    // 点击遮罩层关闭弹窗
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('visible');
            modalOverlay.classList.add('hidden');
        }
    });
}

// 获取项目图片（本地路径）
function getProjectImages(index) {
    const projects = [
        ['/image/1740128363121.jpg'], // 保持绝对路径
        ['/image/1740129056259.jpg'],
        ['/image/1740129098055.jpg']
    ];

    return projects[index] || [];
}

// 创建星空
function createStars() {
    const container = document.body;
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 1.5 + 's';
        container.appendChild(star);
    }
}

// 视差滚动
window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax-element').forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.3;
        const yPos = -(window.pageYOffset * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
}); 