"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGetFiloDropdownOpen, setIsGetFiloDropdownOpen] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const getFiloTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [selectedView, setSelectedView] = useState<'mobile' | 'desktop'>('mobile');
  
  // 输入框动态文本状态
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  // 输入框文本内容
  const inputTexts = [
    'More casual but still respectful',
    'Split into two 3 paragraphs',
    'Add a quick thanks for checking in',
    'Mention I\'ll send the photos by Sunday'
  ];

  // 滚动动画状态
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // 滚动动画效果
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => new Set([...prev, sectionId]));
          }
        }
      });
    }, observerOptions);

    // 观察所有带有 data-section 属性的元素
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // 处理鼠标进入下拉区域
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  // 处理鼠标离开下拉区域
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100); // 100ms 延迟，给用户时间移动到下拉菜单
  };

  // 处理按钮点击
  const handleButtonClick = () => {
    // 这里可以添加默认下载逻辑，或者切换下拉菜单状态
    setIsDropdownOpen(!isDropdownOpen);
  };

  const init = useRef(false)

  // 自动滚动逻辑
  useEffect(() => {
    const scrollSpeed = 5; // 滚动速度：4像素每帧 (约240像素/秒) - 再快2倍
    const interactionDelay = 2000; // 用户交互后等待2秒
    let lastTime = 0;

    const autoScroll = (currentTime: number) => {
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteractionRef.current;

      // 页面加载2秒后开始滚动，用户交互后暂停2秒
      if (scrollContainerRef.current && timeSinceLastInteraction > interactionDelay) {
        const container = scrollContainerRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        console.log('maxScrollLeft', maxScrollLeft, container.scrollLeft)
        if (maxScrollLeft > 0) {
          // 计算基于时间的平滑滚动
          
          
          if (container.scrollLeft >= maxScrollLeft - 10) {
            // 滚动到最右边，重置到开始
            container.scrollLeft = 0;
          } else {
            // 实时连续滚动 - 基于时间差计算移动距离
            console.log('pixelsToMove', scrollSpeed)
            container.scrollLeft += scrollSpeed;
          }
        }
      }
      
      lastTime = currentTime;
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    if (!init.current) {
      autoScroll(Date.now())
      init.current = true
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isUserInteracting, isAutoScrollEnabled]); // 恢复依赖数组以避免 React 警告

  // 处理用户交互
  const handleUserInteraction = () => {
    console.log('User interaction detected');
    lastInteractionRef.current = Date.now();
    setIsUserInteracting(true);
    
    // 200ms后重置交互状态，允许继续检测交互
    setTimeout(() => {
      setIsUserInteracting(false);
      console.log('User interaction state reset');
    }, 200);
  };

  // 处理视图切换
  const handleViewToggle = (view: 'mobile' | 'desktop') => {
    setSelectedView(view);
  };

  // 打字效果和文本循环
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let nextTextTimeout: NodeJS.Timeout;

    if (isTyping) {
      const currentText = inputTexts[currentTextIndex];
      const currentLength = displayText.length;

      if (currentLength < currentText.length) {
        // 正在打字
        typingTimeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, currentLength + 1));
        }, 80); // 80ms 每个字符，稍微慢一点让光标更稳定
      } else {
        // 打字完成，等待1秒后切换到下一个文本
        nextTextTimeout = setTimeout(() => {
          setDisplayText('');
          setCurrentTextIndex((prev) => (prev + 1) % inputTexts.length);
          // 不改变 isTyping 状态，保持光标显示
        }, 1000);
      }
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(nextTextTimeout);
    };
  }, [displayText, currentTextIndex, isTyping, inputTexts]);

  // 处理Get Filo按钮鼠标进入
  const handleGetFiloMouseEnter = () => {
    if (getFiloTimeoutRef.current) {
      clearTimeout(getFiloTimeoutRef.current);
      getFiloTimeoutRef.current = null;
    }
    setIsGetFiloDropdownOpen(true);
  };

  // 处理Get Filo按钮鼠标离开
  const handleGetFiloMouseLeave = () => {
    getFiloTimeoutRef.current = setTimeout(() => {
      setIsGetFiloDropdownOpen(false);
    }, 100); // 100ms 延迟，给用户时间移动到下拉菜单
  };

  // 处理Get Filo按钮点击
  const handleGetFiloButtonClick = () => {
    setIsGetFiloDropdownOpen(!isGetFiloDropdownOpen);
  };

  // 处理FAQ折叠展开
  const handleFaqToggle = (index: number) => {
    setExpandedFaqs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <>
      <style jsx>{`
        @keyframes gentle-bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
        }
        .gentle-bounce {
          animation: gentle-bounce 3s ease-in-out infinite;
        }
        .gentle-bounce:hover {
          animation-play-state: paused;
        }
        
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        .cursor-blink {
          animation: cursor-blink 1.2s infinite;
        }

        /* 下拉菜单动画 */
        @keyframes dropdownExpand {
          from {
            opacity: 0;
            transform: translateY(-10px) scaleY(0.8);
            transformOrigin: top;
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
            transformOrigin: top;
          }
        }

        .dropdown-animate {
          animation: dropdownExpand 0.3s ease-out forwards;
        }

        /* 下拉菜单项逐个展开动画 */
        @keyframes dropdownItemExpand {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .dropdown-item-animate {
          animation: dropdownItemExpand 0.2s ease-out forwards;
        }

        .dropdown-item-delay-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .dropdown-item-delay-2 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .dropdown-item-delay-3 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-delay-600 {
          animation-delay: 0.6s;
        }

        .animate-delay-800 {
          animation-delay: 0.8s;
        }

        .animate-delay-1000 {
          animation-delay: 1s;
        }

        /* 初始状态：隐藏元素 */
        .scroll-animate {
          opacity: 0;
          transform: translateY(60px);
        }

        /* 当元素可见时应用动画 */
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.8s ease-out;
        }
      `}</style>
      <div className="min-h-screen bg-white">
        {/* 主要背景框体 - 自适应宽度 x 610px with gradient */}
        <div 
          className="w-full h-[610px] flex-shrink-0 relative z-20"
          style={{
            background: 'linear-gradient(180deg, #E7F5FF 1.04%, #FFF 98.7%)'
          }}
        >
          {/* 内容容器 - 最大宽度1440px居中 */}
          <div className="max-w-[1440px] mx-auto h-full">
            
            {/* 导航栏 */}
            <nav className="flex justify-between items-center px-20 h-20">
              {/* Logo - 使用提供的SVG */}
              <div className="flex items-center flex-shrink-0">
                <Image 
                  src="/icons/brand/brand-logo-black.svg"
                  alt="Filo Logo"
                  width={60}
                  height={35.792}
                  className="w-[60px] h-[35.792px] flex-shrink-0"
                />
              </div>
              
              {/* 语言选择器 */}
              <div className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
                <span className="text-base">English</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </nav>

            {/* 主要内容区域 */}
            <main className="flex flex-col items-center text-center px-20">
              
              {/* 主标题区域 - 调整垂直间距以适应610px高度 */}
              <div className="mt-[120px] mb-[40px]">
                <h1 
                  className="text-center font-bold"
                  style={{
                    alignSelf: 'stretch',
                    color: '#000',
                    textAlign: 'center',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontSize: '108px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '130%',
                    letterSpacing: '-5px'
                  }}
                >
                  Inbox to Done
                </h1>
              </div>
              
              {/* 副标题描述 - 应用设计规范 */}
              <div className="mb-[80px]">
                <p 
                  className="text-center"
                  style={{
                    alignSelf: 'stretch',
                    color: '#707070',
                    textAlign: 'center',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontSize: '22px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%',
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}
                >
                  Turn overwhelming emails into crystal-clear summaries, quick replies and AI-generated to-dos in one sec.
                </p>
              </div>
              
              {/* 下载按钮组 */}
              <div className="flex gap-[30px] items-center">
                {/* App Store 按钮 - 使用提供的SVG */}
                <a 
                  href="https://apple.co/43FINlq" 
                  className="inline-block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200/50 hover:brightness-110"
                  style={{
                    borderRadius: '20px',
                    border: '1.5px solid var(--14, rgba(0, 0, 0, 0.04))',
                    background: 'var(--06, #000)',
                    boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                  }}
                >
                  <Image 
                    src="/icons/ui/ui-appstore-download.svg"
                    alt="Download on the App Store"
                    width={258}
                    height={74}
                    className="w-auto h-[74px]"
                  />
                </a>
                
                {/* macOS 按钮 - 使用新的SVG with dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    onClick={handleButtonClick}
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200/50 hover:brightness-110"
                    style={{
                      borderRadius: '20px',
                      border: '1.5px solid var(--14, rgba(0, 0, 0, 0.04))',
                      background: 'var(--02, #22A0FB)',
                      boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                    }}
                  >
                    <Image 
                      src="/icons/ui/ui_desktop_download.svg"
                      alt="Download for macOS"
                      width={359}
                      height={74}
                      className="w-auto h-[74px]"
                    />
                  </button>
                  
                  {/* Dropdown 菜单 */}
                  {isDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 z-30"
                      style={{
                        width: '359px',
                        display: 'flex',
                        padding: '30px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '24px',
                        alignSelf: 'stretch',
                        borderRadius: '24px',
                        background: 'rgba(0, 0, 0, 0.04)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                      }}
                    >
                      {/* Apple Silicon 选项 */}
                      <a 
                        href="https://download.filomail.com/mac_upgrade/versions/latest/prod/arm64/Filo-arm64.dmg" 
                        className="block w-full transition-all duration-200"
                        style={{ alignSelf: 'stretch', borderRadius: '12px', padding: '8px 12px' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(34, 160, 251, 0.1)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0px)';
                        }}
                      >
                        <div 
                          style={{
                            alignSelf: 'stretch',
                            textAlign: 'left',
                            color: '#22A0FB',
                            fontFeatureSettings: '"liga" off, "clig" off',
                            fontFamily: 'var(--font-inter), Inter, sans-serif',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '130%'
                          }}
                        >
                          Apple Silicon
                        </div>
                      </a>
                      
                      {/* Intel 选项 */}
                      <a 
                        href="https://download.filomail.com/mac_upgrade/versions/latest/prod/x64/Filo-x64.dmg" 
                        className="block w-full transition-all duration-200"
                        style={{ alignSelf: 'stretch', borderRadius: '12px', padding: '8px 12px' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(34, 160, 251, 0.1)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0px)';
                        }}
                      >
                        <div 
                          style={{
                            alignSelf: 'stretch',
                            textAlign: 'left',
                            color: '#22A0FB',
                            fontFeatureSettings: '"liga" off, "clig" off',
                            fontFamily: 'var(--font-inter), Inter, sans-serif',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '130%'
                          }}
                        >
                          Intel
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
            </main>
            
          </div>
          
        </div>
        
        {/* 功能卡片区域 */}
        <section 
          className={`w-full bg-white pt-[220px] pb-32 scroll-animate relative z-10 ${visibleSections.has('cards') ? 'visible' : ''}`}
          data-section="cards"
        >
          <div className="max-w-[1440px] mx-auto px-20">
            
            {/* 卡片水平滚动容器 */}
            <div className="relative">
              {/* 左侧渐变遮罩 */}
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              {/* 右侧渐变遮罩 */}
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
              
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide"
                // onScroll={handleUserInteraction}
                // onMouseDown={handleUserInteraction}
                // onTouchStart={handleUserInteraction}
              >
                <div className="flex gap-[40px] px-4" style={{ width: 'max-content', paddingTop: '20px', paddingBottom: '80px' }}>
                  
                  {/* 卡片 1 */}
                  <div 
                    className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
                    style={{
                      width: '600px',
                      height: '570px',
                      borderRadius: '20px',
                      border: '0.5px solid rgba(0, 0, 0, 0.04)',
                      background: 'var(--09, #FCFAFA)',
                      transformOrigin: 'center center',
                      boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                    }}
                  >
                    <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
                      <h3 
                        style={{
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '27px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                          marginBottom: '40px'
                        }}
                      >
                        Understand It All
                      </h3>
                      
                      {/* 功能示例图片 */}
                      <div className="flex-1 relative" style={{ minHeight: '400px' }}>
                        {/* 底层原始图片 - 左侧显示 */}
                        <div 
                          className="absolute"
                          style={{
                            left: '0px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '60%',
                            zIndex: 1
                          }}
                        >
                          <Image 
                            src="/icons/feature/feature-sample1-original.png"
                            alt="Original email interface"
                            width={438}
                            height={308}
                            className="w-full h-auto"
                            style={{ 
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </div>
                        
                        {/* 叠加的翻译图片 - 右侧显示，部分重叠 */}
                        <div 
                          className="absolute"
                          style={{
                            right: '0px',
                            bottom: '33px',
                            width: '55%',
                            zIndex: 2
                          }}
                        >
                          <Image 
                            src="/icons/feature/feature-sample1-translated.png"
                            alt="Translated email summary"
                            width={404}
                            height={333}
                            className="w-full h-auto"
                            style={{ 
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 卡片 2 */}
                  <div 
                    className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
                    style={{
                      width: '600px',
                      height: '570px',
                      borderRadius: '20px',
                      border: '0.5px solid rgba(0, 0, 0, 0.04)',
                      background: 'var(--09, #FCFAFA)',
                      transformOrigin: 'center center',
                      boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                    }}
                  >
                    <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
                      <h3 
                        style={{
                          alignSelf: 'stretch',
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '27px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                          marginBottom: '40px'
                        }}
                      >
                        Promo, Condensed
                      </h3>
                      
                      {/* 促销功能示例图片 */}
                      <div 
                        style={{
                          display: 'flex',
                          padding: '20px',
                          alignItems: 'flex-start',
                          gap: '18px',
                          flex: '1 0 0',
                          alignSelf: 'stretch'
                        }}
                      >
                        <Image 
                          src="/icons/feature/feature_sample2_promo.png"
                          alt="Promo email condensed feature"
                          width={500}
                          height={350}
                          className="w-full h-auto"
                          style={{ 
                            display: 'block',
                            borderRadius: '12px',
                            boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 卡片 3 */}
                  <div 
                    className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
                    style={{
                      width: '600px',
                      height: '570px',
                      borderRadius: '20px',
                      border: '0.5px solid rgba(0, 0, 0, 0.04)',
                      background: 'var(--09, #FCFAFA)',
                      transformOrigin: 'center center',
                      boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                    }}
                  >
                    <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
                      <h3 
                        style={{
                          alignSelf: 'stretch',
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '27px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                          marginBottom: '40px'
                        }}
                      >
                        What do I say?
                      </h3>
                      
                      {/* 法语功能示例图片 */}
                      <div className="flex-1 flex items-end">
                        <Image 
                          src="/icons/feature/feature_sample3_french.png"
                          alt="French AI reply feature"
                          width={540}
                          height={350}
                          className="w-full h-auto"
                          style={{ 
                            display: 'block',
                            borderRadius: '12px',
                            boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 卡片 4 */}
                  <div 
                    className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
                    style={{
                      width: '600px',
                      height: '570px',
                      borderRadius: '20px',
                      border: '0.5px solid rgba(0, 0, 0, 0.04)',
                      background: 'var(--09, #FCFAFA)',
                      transformOrigin: 'center center',
                      boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                    }}
                  >
                    <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
                      <h3 
                        style={{
                          alignSelf: 'stretch',
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '27px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                          marginBottom: '40px'
                        }}
                      >
                        Boss Bomb Defused
                      </h3>
                      
                      {/* Boss功能示例图片 */}
                      <div className="flex-1 flex items-end">
                        <Image 
                          src="/icons/feature/freature_sample4_boss.png"
                          alt="Boss task management feature"
                          width={540}
                          height={350}
                          className="w-full h-auto"
                          style={{ 
                            display: 'block',
                            borderRadius: '12px',
                            boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 卡片 5 */}
                  <div 
                    className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
                    style={{
                      width: '600px',
                      height: '570px',
                      borderRadius: '20px',
                      border: '0.5px solid rgba(0, 0, 0, 0.04)',
                      background: 'var(--09, #FCFAFA)',
                      transformOrigin: 'center center',
                      boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                    }}
                  >
                    <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
                      <h3 
                        style={{
                          alignSelf: 'stretch',
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '27px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                          marginBottom: '40px'
                        }}
                      >
                        Goodbye Auto-Bill
                      </h3>
                      
                      {/* 订阅管理功能示例图片 */}
                      <div className="flex-1 relative">
                        {/* 底层订阅图片 */}
                        <div className="flex items-end h-full">
                          <Image 
                            src="/icons/feature/feature_sample5_subscription.png"
                            alt="Subscription management feature"
                            width={540}
                            height={350}
                            className="w-full h-auto"
                            style={{ 
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)'
                            }}
                          />
                        </div>
                        
                        {/* 叠加的倾斜通知图片 */}
                        <Image 
                          src="/icons/feature/feature_sample5_notification.png"
                          alt="Cancel subscription notification"
                          width={320}
                          height={120}
                          className="absolute w-auto h-auto"
                          style={{ 
                            top: '20px',
                            right: '40px',
                            transform: 'rotate(8deg)',
                            zIndex: 2,
                            display: 'block',
                            background: 'transparent',
                            border: 'none',
                            boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.15)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* A Closer Look 区域 */}
        <section className="w-full bg-white py-24">
          <div className="max-w-[1440px] mx-auto px-20">
            
            {/* 标题 */}
            <div className="text-center mb-20">
              <h2 
                style={{
                  color: 'var(--06, #000)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: '64px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '130%',
                  letterSpacing: '-2px'
                }}
              >
                A Closer Look
              </h2>
            </div>

            {/* Mobile/Desktop 切换按钮 */}
            <div className="flex justify-center mb-16">
              <div 
                className="relative"
                style={{
                  display: 'flex',
                  padding: '4px',
                  alignItems: 'center',
                  borderRadius: '62px',
                  background: 'var(--05, #E9F6FF)',
                  boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.05), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.04), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.03), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.01)',
                  width: '368px',
                  height: '60px'
                }}
              >
                {/* 滑动的蓝色背景 */}
                <div 
                  className="absolute transition-transform duration-300 ease-in-out"
                  style={{
                    backgroundColor: '#22A0FB',
                    width: '180px',
                    height: '52px',
                    borderRadius: '26px',
                    top: '4px',
                    left: '4px',
                    transform: selectedView === 'desktop' ? 'translateX(184px)' : 'translateX(0px)',
                    zIndex: 1
                  }}
                />
                
                <button 
                  onClick={() => handleViewToggle('mobile')}
                  className="relative z-10 rounded-full transition-colors duration-300"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: selectedView === 'mobile' ? 'white' : 'var(--02, #22A0FB)',
                    textAlign: 'center',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%',
                    width: '180px',
                    height: '52px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Mobile
                </button>
                <button 
                  onClick={() => handleViewToggle('desktop')}
                  className="relative z-10 rounded-full transition-colors duration-300 flex-1"
                  style={{
                    backgroundColor: 'transparent',
                    color: selectedView === 'desktop' ? 'white' : 'var(--02, #22A0FB)',
                    textAlign: 'center',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%',
                    height: '52px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Desktop
                </button>
              </div>
            </div>

            {/* 展示区域容器 */}
            <div className="relative overflow-hidden" style={{ height: '800px' }}>
              
              {/* Mobile 视图 */}
              <div 
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  selectedView === 'mobile' ? 'translate-x-0' : '-translate-x-full'
                }`}
              >
                <div className="relative flex justify-center items-center h-full">
                  
                  {/* 背景圆形托盘 */}
                  <div className="absolute inset-0 flex justify-center items-center" style={{ transform: 'translateY(100px)' }}>
                    <Image 
                      src="/icons/feature/feature_circle_pad.png"
                      alt="Circle background"
                      width={600}
                      height={600}
                      className="w-auto h-auto"
                      style={{ maxHeight: '600px' }}
                    />
                  </div>

                  {/* 手机阴影 */}
                  <div className="absolute" style={{ bottom: '50px' }}>
                    <Image 
                      src="/icons/feature/feature_shadow.svg"
                      alt="Phone shadow"
                      width={422}
                      height={615}
                      className="w-auto h-auto opacity-30"
                    />
                  </div>

                  {/* 手机原型 */}
                  <div className="relative z-10">
                    <Image 
                      src="/icons/feature/feature_iphone_mockup.png"
                      alt="iPhone mockup showing Filo app"
                      width={400}
                      height={600}
                      className="w-auto h-auto"
                      style={{ maxHeight: '600px' }}
                    />
                  </div>

                  {/* 功能标签 */}
                  <div className="absolute left-[230px] top-[412px]">
                    <div className="flex flex-col items-start" style={{gap: '8px'}}>
                      <Image src="/icons/feature/feature_line2.svg" alt="line" width={300} height={1} />
                      <p 
                        style={{
                          color: 'var(--02, #22A0FB)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                        }}
                      >
                        Take actions
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-[217px] top-[248px]">
                    <div className="flex flex-col items-end" style={{gap: '8px'}}>
                      <Image src="/icons/feature/feature_line1.svg" alt="line" width={470} height={1} />
                      <p 
                        style={{
                          color: 'var(--02, #22A0FB)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                        }}
                      >
                        Summarize what matters
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-[230px] top-[548px]">
                    <div className="flex flex-col items-end" style={{gap: '8px'}}>
                      <Image src="/icons/feature/feature_line3.svg" alt="line" width={420} height={1} />
                      <p 
                        style={{
                          color: 'var(--02, #22A0FB)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                        }}
                      >
                        Sync to-dos
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-[230px] top-[612px]">
                    <div className="flex flex-col items-start" style={{gap: '8px'}}>
                      <Image src="/icons/feature/feature_line4.svg" alt="line" width={300} height={1} />
                      <p 
                        style={{
                          color: 'var(--02, #22A0FB)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '130%',
                        }}
                      >
                        Chat with AI
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Desktop 视图 */}
              <div 
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  selectedView === 'desktop' ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="relative flex justify-center items-center h-full">
                  <Image 
                    src="/icons/feature/feature_macbook_mockup.png"
                    alt="MacBook mockup showing Filo app"
                    width={800}
                    height={600}
                    className="w-auto h-auto"
                    style={{ maxHeight: '600px' }}
                  />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Never Miss a Task 区域 */}
        <div 
          className={`scroll-animate ${visibleSections.has('email-task') ? 'visible' : ''}`}
          data-section="email-task"
          style={{
            width: '100%',
            padding: '120px 0px 160px 0px',
            background: 'var(--09, #FCFAFA)',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div 
            style={{
              display: 'flex',
              width: '1440px',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '120px'
            }}
          >
            {/* 主标题 */}
            <h1
              style={{
                color: 'var(--06, #000)',
                textAlign: 'center',
                fontFeatureSettings: '"liga" off, "clig" off',
                fontFamily: 'Inter',
                fontSize: '80px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '-3px',
                alignSelf: 'stretch',
                margin: 0
              }}
            >
              Email in, Task out
            </h1>

            {/* 内容区域 */}
            <div 
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '1200px'
              }}
            >
              {/* 左侧文字 */}
              <div style={{ flex: '0 0 auto', width: '224px' }}>
                <h2 
                  style={{
                    color: 'var(--06, #000)',
                    textAlign: 'center',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Georgia',
                    fontSize: '40px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '120%',
                    margin: 0,
                    marginBottom: '32px'
                  }}
                >
                  Never<br />miss<br />a task
                </h2>
                
                <p
                  style={{
                    color: 'var(--07, #707070)',
                    textAlign: 'center',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%',
                    alignSelf: 'stretch',
                    margin: 0,
                    width: '100%'
                  }}
                >
                  Filo finds your to-dos buried in emails, pulls them out, and reminds you right on time.
                  <br /><br />
                  No setup, no stress.
                </p>
              </div>

              {/* 右侧邮件交互区域 */}
              <div style={{ flex: '1', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                {/* 邮件底图 */}
                <div style={{ position: 'relative' }}>
                  <Image 
                    src="/icons/feature/feature_todo_email.png"
                    alt="Email interface"
                    width={343}
                    height={692}
                    className="w-auto h-auto"
                    style={{
                      borderRadius: '20.27px',
                      borderLeft: '0.338px solid var(--14, rgba(0, 0, 0, 0.04))',
                      background: 'var(--10, #FFF)',
                      boxShadow: '0px 67.568px 54.054px 0px rgba(0, 0, 0, 0.07), 0px 28.228px 22.582px 0px rgba(0, 0, 0, 0.05), 0px 15.092px 12.074px 0px rgba(0, 0, 0, 0.04), 0px 8.461px 6.768px 0px rgba(0, 0, 0, 0.04), 0px 4.493px 3.595px 0px rgba(0, 0, 0, 0.03), 0px 1.87px 1.496px 0px rgba(0, 0, 0, 0.02)'
                    }}
                  />
                  
                  {/* 弹窗 1 - Review (右上角) */}
                  <div 
                    className="absolute gentle-bounce transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl hover:brightness-110"
                    style={{ 
                      top: '180px', 
                      right: '-210px',
                      animationDelay: '0.5s'
                    }}
                  >
                    <Image 
                      src="/icons/feature/feature_todo_popup1_review.svg"
                      alt="Review popup"
                      width={297}
                      height={78}
                      className="drop-shadow-lg"
                    />
                  </div>

                  {/* 弹窗 2 - Reservation (左侧中部) */}
                  <div 
                    className="absolute gentle-bounce transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl hover:brightness-110"
                    style={{ 
                      top: '325px', 
                      left: '-170px',
                      animationDelay: '1s'
                    }}
                  >
                    <Image 
                      src="/icons/feature/feature_todo_popup2_reservation.svg"
                      alt="Reservation popup"
                      width={202}
                      height={78}
                      className="drop-shadow-lg"
                    />
                  </div>

                  {/* 弹窗 3 - Confirm (右侧中下部) */}
                  <div 
                    className="absolute gentle-bounce transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl hover:brightness-110"
                    style={{ 
                      top: '435px', 
                      right: '-120px',
                      animationDelay: '1.5s'
                    }}
                  >
                    <Image 
                      src="/icons/feature/feature_todo_popup3_confirm.svg"
                      alt="Confirm popup"
                      width={252}
                      height={58}
                      className="drop-shadow-lg"
                    />
                  </div>

                  {/* 弹窗 4 - RSVP Cancel (底部中央) */}
                  <div 
                    className="absolute gentle-bounce transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl hover:brightness-110"
                    style={{ 
                      top: '610px', 
                      left: '-70px',
                      animationDelay: '2s'
                    }}
                  >
                    <Image 
                      src="/icons/feature/feature_todo_popup4_RSVP_cancel.svg"
                      alt="RSVP Cancel popup"
                      width={236}
                      height={78}
                      className="drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Respond the tone you want 区域 */}
        <div 
          className={`scroll-animate ${visibleSections.has('tone') ? 'visible' : ''}`}
          data-section="tone"
          style={{
            display: 'flex',
            width: '100%',
            paddingBottom: '0px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '120px',
            background: 'var(--09, #FCFAFA)'
          }}
        >
          {/* 这里将添加新板块的内容 */}
          <div style={{ width: '100%' }}>
            <h2 
              style={{ 
                alignSelf: 'stretch',
                color: 'var(--06, #000)',
                textAlign: 'center',
                fontFeatureSettings: '"liga" off, "clig" off',
                fontFamily: 'Inter',
                fontSize: '80px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '-3px',
                margin: 0
              }}
            >
              Respond<br />the tone you want
            </h2>
          </div>

          {/* 三个语调选项区域 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', gap: '60px' }}>
            
            {/* Positive */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <h3 
                style={{
                  color: 'var(--06, #000)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Georgia',
                  fontSize: '40px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  margin: 0
                }}
              >
                Positive
              </h3>
              <p 
                style={{
                  alignSelf: 'stretch',
                  color: 'var(--07, #707070)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '150%',
                  margin: 0,
                  marginBottom: '24px'
                }}
              >
                Say yes or show support
              </p>
              <div 
                className="transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl"
                style={{
                  display: 'flex',
                  width: '350px',
                  height: '470px',
                  transform: 'rotate(-5deg) translateY(25px)',
                  padding: '40px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  borderRadius: '30px',
                  background: 'var(--05, #E9F6FF)',
                  boxShadow: '0px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 41.778px 0px rgba(0, 0, 0, 0.02), 0px 22.336px 22.336px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 12.522px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 6.65px 0px rgba(0, 0, 0, 0.04), 0px 2.767px 2.767px 0px rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer'
                }}
              >
                <div 
                  style={{
                    color: '#22A0FB',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '150%',
                    textAlign: 'left'
                  }}
                >
                  Hey Emily,<br /><br />
                  Just rescheduled the dentist for next Thursday and uploaded the missing trip photos. I'm free on the 14th for Aunt Denise's dinner — count me in.<br /><br />
                  Thanks for the nudge! Hope your weekend's off to a good start.<br />
                  Jordan
                </div>
              </div>
            </div>

            {/* Negative */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <h3 
                style={{
                  color: 'var(--06, #000)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Georgia',
                  fontSize: '40px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  margin: 0
                }}
              >
                Negative
              </h3>
              <p 
                style={{
                  alignSelf: 'stretch',
                  color: 'var(--07, #707070)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '150%',
                  margin: 0,
                  marginBottom: '24px'
                }}
              >
                Politely say no or pass
              </p>
              <div 
                className="transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl"
                style={{
                  display: 'flex',
                  width: '350px',
                  height: '470px',
                  transform: 'rotate(5deg) translateY(25px)',
                  padding: '40px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  borderRadius: '30px',
                  background: '#FFE4E1',
                  boxShadow: '0px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 41.778px 0px rgba(0, 0, 0, 0.02), 0px 22.336px 22.336px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 12.522px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 6.65px 0px rgba(0, 0, 0, 0.04), 0px 2.767px 2.767px 0px rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer'
                }}
              >
                <div 
                  style={{
                    color: '#F78B60',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '150%',
                    textAlign: 'left'
                  }}
                >
                  Hey Em,<br /><br />
                  Haven't rebooked the dentist yet — might push it to next month. Still digging up those trip photos. And I won't be able to make it to Aunt Denise's on the 14th. Please send my apologies.<br /><br />
                  Hope you have a great weekend,<br />
                  Jordan
                </div>
              </div>
            </div>

            {/* Neutral */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <h3 
                style={{
                  color: 'var(--06, #000)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Georgia',
                  fontSize: '40px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  margin: 0
                }}
              >
                Neutral
              </h3>
              <p 
                style={{
                  alignSelf: 'stretch',
                  color: 'var(--07, #707070)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '150%',
                  margin: 0,
                  marginBottom: '24px'
                }}
              >
                Keep it casual or undecided
              </p>
              <div 
                className="transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl"
                style={{
                  display: 'flex',
                  width: '350px',
                  height: '470px',
                  transform: 'rotate(-5deg) translateY(25px)',
                  padding: '40px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  borderRadius: '30px',
                  background: '#FFF8DC',
                  boxShadow: '0px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 41.778px 0px rgba(0, 0, 0, 0.02), 0px 22.336px 22.336px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 12.522px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 6.65px 0px rgba(0, 0, 0, 0.04), 0px 2.767px 2.767px 0px rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer'
                }}
              >
                <div 
                  style={{
                    color: '#D8AA41',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '150%',
                    textAlign: 'left'
                  }}
                >
                  Hey Emily,<br /><br />
                  Still sorting out the dentist — haven't picked a new date. I'll look for those trip photos this weekend. As for Aunt Denise's dinner, I'm not sure yet, depends on work.<br /><br />
                  I'll let you know soon.<br /><br />
                  Thanks for the check-in,<br />
                  Jordan
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Or Write with AI 区域 */}
        <div 
          className={`scroll-animate ${visibleSections.has('write-ai') ? 'visible' : ''}`}
          data-section="write-ai"
          style={{
            display: 'flex',
            width: '100%',
            paddingTop: '120px',
            paddingBottom: '160px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '80px',
            background: 'var(--09, #FCFAFA)'
          }}
        >
          {/* 标题 */}
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h2 
              style={{ 
                alignSelf: 'stretch',
                textAlign: 'center',
                margin: 0
              }}
            >
              <span
                style={{
                  color: 'var(--06, #000)',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Georgia',
                  fontSize: '40px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '130%',
                  letterSpacing: '-1px'
                }}
              >
                Or{' '}
              </span>
              <span
                style={{
                  color: 'var(--06, #000)',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '50px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '130%',
                  letterSpacing: '-1px'
                }}
              >
                Write with AI
              </span>
            </h2>
          </div>

          {/* 输入框区域 */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '800px', height: '110px' }}>
              <svg 
                width="800" 
                height="110" 
                viewBox="0 0 800 110" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  background: 'transparent',
                  boxShadow: '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.02), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.02), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.04)',
                  borderRadius: '30px'
                }}
              >
                {/* 外框背景 */}
                <rect width="800" height="110" rx="30" ry="30" fill="#F6F6F6"/>
                
                {/* 内框背景 */}
                <rect x="20" y="20" width="760" height="70" rx="16" ry="16" fill="rgba(0, 0, 0, 0.04)"/>
                
                {/* 星形图标 1 */}
                <path d="M40.2479 50.2231C40.63 48.6476 42.8707 48.6476 43.2527 50.2231L44.3039 54.5582C44.4403 55.1207 44.8795 55.5599 45.442 55.6963L49.777 56.7475C51.3525 57.1295 51.3525 59.3702 49.777 59.7522L45.442 60.8034C44.8795 60.9398 44.4403 61.379 44.3039 61.9415L43.2527 66.2766C42.8707 67.852 40.63 67.852 40.2479 66.2766L39.1968 61.9415C39.0604 61.379 38.6212 60.9398 38.0587 60.8034L33.7236 59.7522C32.1481 59.3702 32.1481 57.1295 33.7236 56.7475L38.0587 55.6963C38.6212 55.5599 39.0604 55.1207 39.1968 54.5582L40.2479 50.2231Z" fill="#22A0FB"/>
                
                {/* 星形图标 2 */}
                <path d="M51.7876 43.1671C51.9899 42.333 53.1761 42.333 53.3784 43.1671L53.9349 45.4621C54.0071 45.7599 54.2396 45.9924 54.5374 46.0646L56.8324 46.6211C57.6665 46.8234 57.6665 48.0096 56.8324 48.2119L54.5374 48.7684C54.2396 48.8406 54.0071 49.0731 53.9349 49.3709L53.3784 51.6659C53.1761 52.5 51.9899 52.5 51.7876 51.6659L51.2311 49.3709C51.1589 49.0731 50.9264 48.8406 50.6286 48.7684L48.3336 48.2119C47.4995 48.0096 47.4995 46.8234 48.3336 46.6211L50.6286 46.0646C50.9264 45.9924 51.1589 45.7599 51.2311 45.4621L51.7876 43.1671Z" fill="#22A0FB"/>
                
                {/* 动态文本 */}
                <text 
                  x="71" 
                  y="63" 
                  fill="#707070" 
                  fontSize="22" 
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                >
                  {displayText}
                  {isTyping && (
                    <tspan className="cursor-blink">|</tspan>
                  )}
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Powered by top-tier AI 区域 */}
        <div 
          className={`scroll-animate ${visibleSections.has('ai-powered') ? 'visible' : ''}`}
          data-section="ai-powered"
          style={{
            display: 'flex',
            width: '100%',
            height: '700px',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#FFFFFF'
          }}
        >
          <div 
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '1200px',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '120px',
              padding: '0 60px'
            }}
          >
            {/* 左侧内容 */}
            <div 
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '40px'
              }}
            >
              {/* 大标题 */}
              <h2 
                style={{
                  alignSelf: 'stretch',
                  color: 'var(--06, #000)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '80px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '120%',
                  letterSpacing: '-3px',
                  margin: 0
                }}
              >
                Powered by<br />top-tier AI
              </h2>

              {/* Tagline */}
              <p 
                style={{
                  color: 'var(--07, #707070)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  margin: 0,
                  maxWidth: '520px'
                }}
              >
                Filo uses industry-leading AI agents like ChatGPT, Gemini, and Claude to help you summarize emails, write replies, and stay on top of your to-dos.
              </p>

              {/* Get Filo Today 按钮 */}
              <div 
                className="relative"
                onMouseEnter={handleGetFiloMouseEnter}
                onMouseLeave={handleGetFiloMouseLeave}
              >
                <button 
                  onClick={handleGetFiloButtonClick}
                  style={{
                    display: 'flex',
                    padding: '8px 22px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '100px',
                    border: '0.5px solid var(--06, #000)',
                    background: 'transparent',
                    color: 'var(--06, #000)',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--06, #000)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--06, #000)';
                  }}
                >
                  Get Filo Today
                </button>

                {/* Dropdown 菜单 */}
                {isGetFiloDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 z-50 dropdown-animate"
                    style={{
                      marginTop: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      background: 'transparent',
                      minWidth: '300px',
                      paddingLeft: '14px' // 向左移动8像素 (22px - 8px = 14px)
                    }}
                  >
                    {/* 左侧引导线 */}
                    <div 
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        bottom: '0',
                        width: '0.5px',
                        background: '#000'
                      }}
                    />
                    
                    {/* Download for iOS */}
                    <a 
                      href="https://apple.co/43FINlq" 
                      className="block transition-all duration-200 dropdown-item-animate dropdown-item-delay-1"
                      style={{ 
                        textDecoration: 'none',
                        marginBottom: '0px',
                        whiteSpace: 'nowrap',
                        borderRadius: '8px',
                        padding: '11px 10px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0px)';
                      }}
                    >
                      <div 
                        style={{
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '150%'
                        }}
                      >
                        Download for iOS
                      </div>
                    </a>
                    
                    {/* Download for macOS (Apple Silicon) */}
                    <a 
                      href="https://download.filomail.com/mac_upgrade/versions/latest/prod/arm64/Filo-arm64.dmg" 
                      className="block transition-all duration-200 dropdown-item-animate dropdown-item-delay-2"
                      style={{ 
                        textDecoration: 'none',
                        marginBottom: '0px',
                        whiteSpace: 'nowrap',
                        borderRadius: '8px',
                        padding: '11px 10px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0px)';
                      }}
                    >
                      <div 
                        style={{
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '150%'
                        }}
                      >
                        Download for macOS (Apple Silicon)
                      </div>
                    </a>
                    
                    {/* Download for macOS (Intel) */}
                    <a 
                      href="https://download.filomail.com/mac_upgrade/versions/latest/prod/x64/Filo-x64.dmg" 
                      className="block transition-all duration-200 dropdown-item-animate dropdown-item-delay-3"
                      style={{ 
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        borderRadius: '8px',
                        padding: '11px 10px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0px)';
                      }}
                    >
                      <div 
                        style={{
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '150%'
                        }}
                      >
                        Download for macOS (Intel)
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* 右侧AI图标 */}
            <div 
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '110px'
              }}
            >
              {/* ChatGPT 图标 */}
              <div>
                <Image 
                  src="/icons/brand/brand_chatgpt_icon.svg"
                  alt="ChatGPT"
                  width={72}
                  height={71}
                  className="w-auto h-auto"
                />
              </div>

              {/* Gemini 图标 */}
              <div>
                <Image 
                  src="/icons/brand/brand_gemini_icon.svg"
                  alt="Gemini"
                  width={230}
                  height={53}
                  className="w-auto h-auto"
                />
              </div>

              {/* Claude 图标 */}
              <div>
                <Image 
                  src="/icons/brand/brand_claude_icon.svg"
                  alt="Claude"
                  width={220}
                  height={48}
                  className="w-auto h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 隐私安全区域 */}
        <div 
          className={`scroll-animate ${visibleSections.has('privacy') ? 'visible' : ''}`}
          data-section="privacy"
          style={{
            width: '100%',
            height: '700px',
            background: '#F4ECE2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div 
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '1200px',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '120px',
              padding: '0 60px'
            }}
          >
            {/* 左侧储物柜图片 */}
            <div
              style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image 
                src="/icons/ui/ui_locker_image.png"
                alt="Secure storage lockers"
                width={491}
                height={364}
                className="w-auto h-auto"
                style={{ 
                  width: '491px',
                  height: '364px',
                  objectFit: 'cover',
                  borderRadius: '30px',
                  background: 'url(/icons/ui/ui_locker_image.png) lightgray -61px 0px / 112.424% 101.099% no-repeat, #D9D9D9'
                }}
              />
            </div>

            {/* 右侧文字内容 */}
            <div 
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '40px'
              }}
            >
              {/* 大标题 */}
              <h2 
                style={{
                  color: 'var(--06, #000)',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: '80px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '120%',
                  letterSpacing: '-2.4px',
                  margin: 0
                }}
              >
                No peeking,<br />promise
              </h2>

              {/* 中间 tagline */}
              <p 
                style={{
                  width: '380px',
                  color: '#9B601A',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Georgia',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  letterSpacing: '1px',
                  margin: 0
                }}
              >
                Your privacy matters to us just as much as it does to you.
              </p>

              {/* 第三段文字 */}
              <p 
                style={{
                  width: '520px',
                  color: 'var(--07, #707070)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  margin: 0
                }}
              >
                Filo is <a 
                  href="https://appdefensealliance.dev/casa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--07, #707070)',
                    textDecoration: 'underline',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >CASA Tier 3-verified</a>, meeting world-class security standards. Your emails are only processed to support smart features — never shared or used to train external AI.
              </p>

              {/* See Our Data Promise 按钮 */}
              <button 
                onClick={() => {
                  // 目前只有点击效果，后续添加页面跳转
                  console.log('See Our Data Promise clicked');
                }}
                style={{
                  display: 'flex',
                  padding: '8px 22px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '100px',
                  border: '0.5px solid var(--06, #000)',
                  background: 'transparent',
                  color: 'var(--06, #000)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--06, #000)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--06, #000)';
                }}
              >
                <span
                  style={{
                    color: 'inherit',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%'
                  }}
                >
                  See Our Data Promise
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* FAQ 区域 */}
        <div 
          className={`scroll-animate ${visibleSections.has('faq') ? 'visible' : ''}`}
          data-section="faq"
          style={{
            width: '100%',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '80px 60px'
          }}
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '80px',
              width: '100%',
              maxWidth: '1000px'
            }}
          >
            {/* FAQ 标题 */}
            <h2 
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: '80px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '-3px',
                margin: 0
              }}
            >
              Questions?
            </h2>

            {/* FAQ 列表 */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1px'
              }}
            >
              {[
                {
                  question: "How does Filo work?",
                  answer: "Just tell Filo what you need—like \"Help me remove all marketing emails to the trash\"—and it takes care of the rest. No coding, no fuss."
                },
                {
                  question: "What kinds of tasks can I ask Filo to perform?",
                  answer: "Filo can help you clean up unwanted emails, sort your inbox, schedule tasks, and more. We're continuously adding new features based on your feedback."
                },
                {
                  question: "Is my data secure with Filo?",
                  answer: "We don't store any user data anywhere. All email service information is provided by Google, so if you trust Gmail's security, then you can trust Filo too. You can learn how we protect your data here."
                },
                {
                  question: "How can I share feedback?",
                  answer: "We'd love to hear from you! Join our Discord server and drop your suggestions or bug reports in #📩｜feedback. Need help? Head over to #🛠｜support—our team's there for you."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* 问题按钮 */}
                  <button
                    onClick={() => handleFaqToggle(index)}
                    style={{
                      width: '100%',
                      padding: '30px',
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span
                      style={{
                        color: '#FFF',
                        textAlign: 'center',
                        fontFamily: 'Inter',
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '130%',
                        flex: 1
                      }}
                    >
                      {faq.question}
                    </span>
                    
                    {/* 展开/收起图标 */}
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform: expandedFaqs.has(index) ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        flexShrink: 0,
                        marginLeft: '20px'
                      }}
                    >
                      <path 
                        d="M15 18L9 12L15 6" 
                        stroke="#FFF" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* 答案内容 */}
                  <div
                    style={{
                      maxHeight: expandedFaqs.has(index) ? '500px' : '0px',
                      opacity: expandedFaqs.has(index) ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div 
                      style={{
                        padding: '0 30px 30px 30px',
                        color: '#CCC',
                        fontFamily: 'Inter',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '150%'
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部图像区域 */}
        <div className="bg-white pt-60 pb-16">
          <div className="max-w-[1200px] mx-auto px-8">
            {/* 标题 */}
            <h2 
              className="text-center mb-12"
              style={{
                color: 'var(--06, #000)',
                textAlign: 'center',
                fontFeatureSettings: '"liga" off, "clig" off',
                fontFamily: 'Inter',
                fontSize: '80px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '130%',
                letterSpacing: '-3px'
              }}
            >
              The Start of Filo
            </h2>
            
            {/* 中间文本 */}
            <div className="flex justify-center mb-20">
              <p 
                className="text-center"
                style={{
                  width: '420px',
                  color: 'var(--07, #707070)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%'
                }}
              >
                We're not backed by Silicon Valley fame, no keynote stages, no hype cycles — just a small team who loves crafting digital tools that make life a bit easier. When AI took off, we saw a chance to build something simpler, smarter, and more human. That's why we made Filo: not to disrupt the world, just to make email suck less.
              </p>
            </div>
            
            {/* 图像区域 */}
            <div className="flex justify-between items-center">
              {/* 左侧植物图 */}
              <div className="flex-shrink-0">
                <Image 
                  src="/icons/ui/ui_illustration_plant.svg" 
                  alt="Plant illustration" 
                  width={226}
                  height={351}
                  className="w-auto h-auto"
                />
              </div>
              
              {/* 右侧办公室图 */}
              <div className="flex-shrink-0">
                <Image 
                  src="/icons/ui/ui_illustration_office.svg" 
                  alt="Office illustration" 
                  width={688}
                  height={272}
                  className="w-auto h-auto"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

