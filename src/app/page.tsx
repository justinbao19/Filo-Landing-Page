"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

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

  return (
    <div className="min-h-screen bg-white">
      {/* 主要背景框体 - 自适应宽度 x 610px with gradient */}
      <div 
        className="w-full h-[610px] flex-shrink-0"
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
                src="/brand/brand-logo-black.svg"
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
                  src="/ui/ui-appstore-download.svg"
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
                    src="/ui/ui_desktop_download.svg"
                    alt="Download for macOS"
                    width={359}
                    height={74}
                    className="w-auto h-[74px]"
                  />
                </button>
                
                {/* Dropdown 菜单 */}
                {isDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 z-20"
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
                      className="block w-full hover:opacity-80 transition-opacity"
                      style={{ alignSelf: 'stretch' }}
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
                      href="#" 
                      className="block w-full hover:opacity-80 transition-opacity"
                      style={{ alignSelf: 'stretch' }}
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
      <section className="w-full bg-white pt-[220px] pb-32">
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
              <div className="flex gap-[40px] px-4" style={{ width: 'max-content', paddingTop: '20px', paddingBottom: '120px' }}>
                
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
                          src="/feature/feature-sample1-original.png"
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
                          src="/feature/feature-sample1-translated.png"
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
                        src="/feature/feature_sample2_promo.png"
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
                        src="/feature/feature_sample3_french.png"
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
                        src="/feature/freature_sample4_boss.png"
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
                          src="/feature/feature_sample5_subscription.png"
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
                        src="/feature/feature_sample5_notification.png"
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
    </div>
  );
}
