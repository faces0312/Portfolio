// Phone Launcher Tabbar Navigation Script
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const appItems = document.querySelectorAll('.app-item');
    const contentSections = document.querySelectorAll('.content-section');
    const bubble = document.querySelector('.bubble');
    
    // SubIcons 데이터 객체
    const subIcons = {
        profile: ['Profile'],
        home: ['Home'],
        geekble: ['PolyStone', '황야의 수호자'],
        spartacamp: ['Idle Soul'],
        school: ['ZEPETO'],
        tksoft: ['닌자: 천년의 수련', '해와 달의 몰락', '콜로세움 워', 'Over Head', '군인 키우기', 'Run Block Run', 'Tinny Spaceship']
    };
    
    // 프로젝트 이름을 실제 HTML id로 매핑
    const projectIdMap = {
        '닌자: 천년의 수련': 'ninja',
        '해와 달의 몰락': 'moonfall',
        '콜로세움 워': 'colosseum',
        'Over Head': 'overhead',
        '군인 키우기': 'soldier',
        'Run Block Run': 'rbr',
        'Tinny Spaceship': 'tinny',
        'PolyStone': 'polystone',
        '황야의 수호자': 'guardian',
        'Idle Soul': 'idlesoul',
        'ZEPETO': 'zepeto'
    };
    
    // Initialize - show home section
    showSection('home');
    
    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Tab clicked:', this.getAttribute('data-category'));
            const category = this.getAttribute('data-category');
            
            if (category === 'profile' || category === 'home') {
                showSection('home');
                updateActiveTab(this);
                return;
            }
    
            // 캐러셀에서 탭 클릭 시 중앙으로 이동하고 말풍선 표시
            centerTabAndShowBubble(this, category);
        });
    });
    
    // Add click event listeners to app items
    appItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            updateActiveAppItem(this);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) translateY(-5px)';
            this.style.background = 'rgba(102, 126, 234, 0.2)';
            this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Close speech bubbles when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tab')) {
            closeAllSpeechBubbles();
        }
    });
    
    function centerTabAndShowBubble(clickedTab, category) {
        console.log('centerTabAndShowBubble called with:', category);
        // 모든 탭에서 active 클래스 제거
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // 클릭된 탭 활성화
        clickedTab.classList.add('active');
        
        // 말풍선 내용 생성 및 표시
        createBubbleContent(category);
        
        // 말풍선 표시
        if (bubble) {
            bubble.classList.add('show');
            console.log('Bubble should be visible now');
        }
    }
    
    function closeAllSpeechBubbles() {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        if (bubble) {
            bubble.classList.remove('show');
        }
    }
    
    function showSection(sectionId) {
        console.log('showSection called with:', sectionId);
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        console.log('Target section found:', targetSection);
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            console.error('Section not found:', sectionId);
        }
    }
    
    function updateActiveTab(clickedTab) {
        // 모든 탭에서 active 클래스 제거
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
    
        // 클릭된 탭 활성화
        clickedTab.classList.add('active');
    }
    
    
    function createBubbleContent(category) {
        console.log('createBubbleContent called with:', category);
        if (!bubble) {
            console.log('Bubble element not found!');
            return;
        }
        
        const apps = subIcons[category] || [];
        console.log('Apps for category:', apps);
        let content = '';
        
        apps.forEach(app => {
            const appId = projectIdMap[app] || app.toLowerCase().replace(/\s+/g, '').replace(/[^\w]/g, '');
            
            // 아이콘 파일 이름 규칙: appId + "_icon.png"
            const iconPath = `images/${appId}_icon.png`;
        
            content += `
                <div class="app-item" data-link="${appId}">
                    <div class="app-icon">
                        <img src="${iconPath}" alt="${app}" />
                    </div>
                    <div class="app-name">${app}</div>
                </div>
            `;
        });
        
        
        bubble.innerHTML = `
            <div class="bubble-content">
                ${content}
            </div>
        `;
        
        console.log('Bubble content created:', bubble.innerHTML);
        
        // 새로 생성된 앱 아이템들에 이벤트 리스너 추가
        const newAppItems = bubble.querySelectorAll('.app-item');
        newAppItems.forEach(item => {
            item.addEventListener('click', function() {
                const link = this.getAttribute('data-link');
                showSection(link);
                updateActiveAppItem(this);
            });
        });
    }
    
    function updateActiveAppItem(clickedAppItem) {
        // Remove active class from all tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to parent tab
        const parentTab = clickedAppItem.closest('.tab');
        if (parentTab) {
            parentTab.classList.add('active');
        }
    }
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionBody = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all accordions
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                accordionBody.classList.add('active');
            }
        });
    });

    // Video mute/unmute functionality
    const muteButton = document.getElementById('mute-btn');
    const video = document.getElementById('moonfall-video');
    
    if (muteButton && video) {
        muteButton.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                this.classList.add('unmuted');
                this.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            } else {
                video.muted = true;
                this.classList.remove('unmuted');
                this.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            }
        });
    }

    // Copy functionality for contact items
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-copy');
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = '✅';
                this.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
                
            } catch (err) {
                console.error('복사 실패:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Visual feedback for fallback
                const originalText = this.textContent;
                this.textContent = '✅';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeCategory = document.querySelector('.category-item.active');
        const currentIndex = Array.from(categoryItems).indexOf(activeCategory);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            categoryItems[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < categoryItems.length - 1) {
            categoryItems[currentIndex + 1].click();
        }
    });
    
    // Smooth scroll for better UX
    function smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add scroll to top when switching sections
    categoryItems.forEach(item => {
        item.addEventListener('click', smoothScrollToTop);
    });
    
    subItems.forEach(item => {
        item.addEventListener('click', smoothScrollToTop);
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe profile cards
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
