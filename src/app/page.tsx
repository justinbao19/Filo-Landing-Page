'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { useTranslations } from 'next-intl'
import { Language, LANGUAGE_OPTIONS } from '@/lib/locale'
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isGetFiloDropdownOpen, setIsGetFiloDropdownOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(Language.EN)
  const [isGetFiloTodayHovered, setIsGetFiloTodayHovered] = useState(false)

  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const getFiloTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const languageTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const t = useTranslations('home')

  useEffect(() => {
    setSelectedLanguage(cookies.get('user-locale') as Language || Language.EN)
  }, [])

  const [selectedView, setSelectedView] = useState<'mobile' | 'desktop'>('mobile')

  // 输入框动态文本状态
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // 输入框文本内容
  const inputTexts = [
    t('inputScrollText1'),
    t('inputScrollText2'),
    t('inputScrollText3'),
    t('inputScrollText4'),
  ]

  // 滚动动画状态
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // A Closer Look Mobile 线条动画状态
  const [mobileLineAnimations, setMobileLineAnimations] = useState<Set<number>>(new Set())
  const [hasPlayedLineAnimation, setHasPlayedLineAnimation] = useState(false)

  // Email Task 弹窗悬停状态
  const [isAnyPopupHovered, setIsAnyPopupHovered] = useState(false)

  // 滚动动画效果
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section')
          if (sectionId) {
            setVisibleSections((prev) => new Set([...prev, sectionId]))
          }
        }
      })
    }, observerOptions)

    // 观察所有带有 data-section 属性的元素
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  // A Closer Look Mobile 线条动画触发 - 只在页面加载时触发一次
  useEffect(() => {
    if (!hasPlayedLineAnimation && selectedView === 'mobile') {
      // 延迟触发动画，确保页面已加载
      const initialDelay = setTimeout(() => {
        // 重置动画状态
        setMobileLineAnimations(new Set())

        // 依次触发4条线的动画 - 按指定顺序
        const animationSequence = [
          { delay: 200, lineNumber: 2 }, // Summarize what matters
          { delay: 600, lineNumber: 1 }, // Take actions
          { delay: 1000, lineNumber: 3 }, // Sync to-dos
          { delay: 1400, lineNumber: 4 }, // Chat with AI
        ]

        animationSequence.forEach(({ delay, lineNumber }) => {
          setTimeout(() => {
            setMobileLineAnimations((prev) => new Set([...prev, lineNumber]))
          }, delay)
        })

        // 标记动画已播放
        setHasPlayedLineAnimation(true)
      }, 1000) // 1秒延迟确保页面完全加载

      return () => clearTimeout(initialDelay)
    }
  }, [selectedView, hasPlayedLineAnimation])

  // 水平循环动画效果
  // CSS 动画将用于无限水平滚动

  // 处理视图切换
  const handleViewToggle = useCallback((view: 'mobile' | 'desktop') => {
    setSelectedView(view)
  }, [])

  // 键盘快捷键处理
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handleViewToggle('mobile')
      } else if (event.key === 'ArrowRight') {
        handleViewToggle('desktop')
      }
    }

    // 添加事件监听器
    document.addEventListener('keydown', handleKeyPress)

    // 清理函数
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleViewToggle])

  // 打字效果和文本循环
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout
    let nextTextTimeout: NodeJS.Timeout

    if (isTyping) {
      const currentText = inputTexts[currentTextIndex]
      const currentLength = displayText.length

      if (currentLength < currentText.length) {
        // 正在打字
        typingTimeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, currentLength + 1))
        }, 50) // 50ms 每个字符，更快的打字速度
      } else {
        // 打字完成，等待1秒后切换到下一个文本
        nextTextTimeout = setTimeout(() => {
          setDisplayText('')
          setCurrentTextIndex((prev) => (prev + 1) % inputTexts.length)
          // 不改变 isTyping 状态，保持光标显示
        }, 1000)
      }
    }

    return () => {
      clearTimeout(typingTimeout)
      clearTimeout(nextTextTimeout)
    }
  }, [displayText, currentTextIndex, isTyping, inputTexts])

  // 处理macOS下拉菜单鼠标进入
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsDropdownOpen(true)
  }

  // 处理macOS下拉菜单鼠标离开
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 100) // 100ms 延迟，给用户时间移动到下拉菜单
  }

  // 处理macOS按钮点击
  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // 处理Get Filo Today下拉菜单鼠标进入
  const handleGetFiloMouseEnter = () => {
    if (getFiloTimeoutRef.current) {
      clearTimeout(getFiloTimeoutRef.current)
      getFiloTimeoutRef.current = null
    }
    setIsGetFiloDropdownOpen(true)
  }

  // 处理Get Filo Today下拉菜单鼠标离开
  const handleGetFiloMouseLeave = () => {
    getFiloTimeoutRef.current = setTimeout(() => {
      setIsGetFiloDropdownOpen(false)
    }, 100) // 100ms 延迟，给用户时间移动到下拉菜单
  }

  // 处理Get Filo Today按钮点击
  const handleGetFiloButtonClick = () => {
    setIsGetFiloDropdownOpen(!isGetFiloDropdownOpen)
  }

  // 处理语言下拉菜单鼠标进入
  const handleLanguageMouseEnter = () => {
    if (languageTimeoutRef.current) {
      clearTimeout(languageTimeoutRef.current)
      languageTimeoutRef.current = null
    }
    setIsLanguageDropdownOpen(true)
  }

  // 处理语言下拉菜单鼠标离开
  const handleLanguageMouseLeave = () => {
    languageTimeoutRef.current = setTimeout(() => {
      setIsLanguageDropdownOpen(false)
    }, 100)
  }

  // 处理语言选择
  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    setIsLanguageDropdownOpen(false)
    cookies.set('user-locale', language, { path: '/' })
    window.location.reload()
  }

  // 处理FAQ折叠展开
  const handleFaqToggle = (index: number) => {
    setExpandedFaqs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // 处理弹窗悬停
  const handlePopupMouseEnter = () => {
    setIsAnyPopupHovered(true)
  }

  const handlePopupMouseLeave = () => {
    setIsAnyPopupHovered(false)
  }

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0% {
            box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.15);
            transform: translateY(0px);
          }
          50% {
            box-shadow: 0 25px 25px 0px rgba(0, 0, 0, 0.08);
            transform: translateY(-15px);
          }
          100% {
            box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.15);
            transform: translateY(0px);
          }
        }
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
        .float-animation:hover {
          animation-play-state: paused;
        }
        .float-animation.paused {
          animation-play-state: paused;
        }

        @keyframes cursor-blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        .cursor-blink {
          animation: cursor-blink 1.2s infinite;
        }

        /* 下拉菜单动画 */
        @keyframes dropdownExpand {
          from {
            opacity: 0;
            transform: translateY(-10px) scaleY(0.8);
            transformorigin: top;
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
            transformorigin: top;
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

        /* 无限水平滚动动画 */
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .infinite-scroll {
          animation: infiniteScroll 60s linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .scroll-container {
          display: flex;
          width: 200%; /* 双倍宽度以容纳重复内容 */
        }

        .scroll-content {
          display: flex;
          width: 50%; /* 每个内容块占50%宽度 */
          flex-shrink: 0;
        }

        /* Tone Card Hover Effects */
        .tone-card-hover:hover .tone-card-content {
          transform: translate(-3.5rem, -3.5rem);
        }

        .tone-card-hover:hover .tone-card-overlay {
          transform: translate(3.5rem, 3.5rem);
        }
      `}</style>
      <div className="min-h-screen bg-white">
        {/* 主要背景框体 - 自适应宽度 x 610px with gradient */}
        <div
          className="w-full h-[610px] flex-shrink-0 relative z-20"
          style={{
            background: 'linear-gradient(180deg, #E7F5FF 1.04%, #FFF 98.7%)',
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
              <div
                className="relative"
                onMouseEnter={handleLanguageMouseEnter}
                onMouseLeave={handleLanguageMouseLeave}
              >
                <div className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
                  <span className="text-base">
                    {LANGUAGE_OPTIONS.find((e) => e.value === selectedLanguage)?.nativeLabel}
                  </span>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* 语言下拉菜单 */}
                {isLanguageDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 z-30 dropdown-animate"
                    style={{
                      display: 'inline-flex',
                      padding: '12px 20px 12px 12px',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '16px',
                      borderRadius: '16px',
                      background: 'var(--14, rgba(0, 0, 0, 0.04))',
                      width: '140px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {/* English */}
                    <div
                      onClick={() => handleLanguageSelect(Language.EN)}
                      className="cursor-pointer flex items-center gap-2"
                      style={{
                        color: '#374151',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: selectedLanguage === Language.EN ? 600 : 400,
                        lineHeight: '130%',
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.6"
                        height="17.6"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ opacity: selectedLanguage === Language.EN ? 1 : 0 }}
                      >
                        <path
                          d="M6.75146 13.1716C6.46186 13.1716 6.2145 13.0429 6.00938 12.7854L2.88419 8.87594C2.80777 8.78343 2.75146 8.69293 2.71526 8.60445C2.68308 8.51596 2.66699 8.42546 2.66699 8.33295C2.66699 8.1238 2.73537 7.95085 2.87212 7.8141C3.01289 7.67735 3.18987 7.60897 3.40304 7.60897C3.64839 7.60897 3.85553 7.71958 4.02446 7.9408L6.72732 11.4099L11.9641 3.09012C12.0566 2.94934 12.1512 2.8508 12.2477 2.79449C12.3442 2.73416 12.4689 2.70399 12.6217 2.70399C12.8309 2.70399 13.0018 2.77036 13.1346 2.90309C13.2673 3.0318 13.3337 3.20073 13.3337 3.40988C13.3337 3.49434 13.3196 3.58082 13.2914 3.6693C13.2633 3.75377 13.219 3.84427 13.1587 3.9408L7.48751 12.7794C7.31053 13.0408 7.06518 13.1716 6.75146 13.1716Z"
                          fill="black"
                        />
                      </svg>
                      <span>
                        {LANGUAGE_OPTIONS.find((e) => e.value === Language.EN)?.nativeLabel}
                      </span>
                    </div>

                    {/* español */}
                    <div
                      onClick={() => handleLanguageSelect(Language.ES)}
                      className="cursor-pointer flex items-center gap-2"
                      style={{
                        color: '#374151',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: selectedLanguage === Language.ES ? 600 : 400,
                        lineHeight: '130%',
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.6"
                        height="17.6"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ opacity: selectedLanguage === Language.ES ? 1 : 0 }}
                      >
                        <path
                          d="M6.75146 13.1716C6.46186 13.1716 6.2145 13.0429 6.00938 12.7854L2.88419 8.87594C2.80777 8.78343 2.75146 8.69293 2.71526 8.60445C2.68308 8.51596 2.66699 8.42546 2.66699 8.33295C2.66699 8.1238 2.73537 7.95085 2.87212 7.8141C3.01289 7.67735 3.18987 7.60897 3.40304 7.60897C3.64839 7.60897 3.85553 7.71958 4.02446 7.9408L6.72732 11.4099L11.9641 3.09012C12.0566 2.94934 12.1512 2.8508 12.2477 2.79449C12.3442 2.73416 12.4689 2.70399 12.6217 2.70399C12.8309 2.70399 13.0018 2.77036 13.1346 2.90309C13.2673 3.0318 13.3337 3.20073 13.3337 3.40988C13.3337 3.49434 13.3196 3.58082 13.2914 3.6693C13.2633 3.75377 13.219 3.84427 13.1587 3.9408L7.48751 12.7794C7.31053 13.0408 7.06518 13.1716 6.75146 13.1716Z"
                          fill="black"
                        />
                      </svg>
                      <span>
                        {LANGUAGE_OPTIONS.find((e) => e.value === Language.ES)?.nativeLabel}
                      </span>
                    </div>

                    {/* 简体中文 */}
                    <div
                      onClick={() => handleLanguageSelect(Language.ZH_CN)}
                      className="cursor-pointer flex items-center gap-2"
                      style={{
                        color: '#374151',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: selectedLanguage === Language.ZH_CN ? 600 : 400,
                        lineHeight: '130%',
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.6"
                        height="17.6"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ opacity: selectedLanguage === Language.ZH_CN ? 1 : 0 }}
                      >
                        <path
                          d="M6.75146 13.1716C6.46186 13.1716 6.2145 13.0429 6.00938 12.7854L2.88419 8.87594C2.80777 8.78343 2.75146 8.69293 2.71526 8.60445C2.68308 8.51596 2.66699 8.42546 2.66699 8.33295C2.66699 8.1238 2.73537 7.95085 2.87212 7.8141C3.01289 7.67735 3.18987 7.60897 3.40304 7.60897C3.64839 7.60897 3.85553 7.71958 4.02446 7.9408L6.72732 11.4099L11.9641 3.09012C12.0566 2.94934 12.1512 2.8508 12.2477 2.79449C12.3442 2.73416 12.4689 2.70399 12.6217 2.70399C12.8309 2.70399 13.0018 2.77036 13.1346 2.90309C13.2673 3.0318 13.3337 3.20073 13.3337 3.40988C13.3337 3.49434 13.3196 3.58082 13.2914 3.6693C13.2633 3.75377 13.219 3.84427 13.1587 3.9408L7.48751 12.7794C7.31053 13.0408 7.06518 13.1716 6.75146 13.1716Z"
                          fill="black"
                        />
                      </svg>
                      <span>
                        {LANGUAGE_OPTIONS.find((e) => e.value === Language.ZH_CN)?.nativeLabel}
                      </span>
                    </div>

                    {/* 繁体中文 */}
                    <div
                      onClick={() => handleLanguageSelect(Language.ZH_TW)}
                      className="cursor-pointer flex items-center gap-2"
                      style={{
                        color: '#374151',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: selectedLanguage === Language.ZH_TW ? 600 : 400,
                        lineHeight: '130%',
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.6"
                        height="17.6"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ opacity: selectedLanguage === Language.ZH_TW ? 1 : 0 }}
                      >
                        <path
                          d="M6.75146 13.1716C6.46186 13.1716 6.2145 13.0429 6.00938 12.7854L2.88419 8.87594C2.80777 8.78343 2.75146 8.69293 2.71526 8.60445C2.68308 8.51596 2.66699 8.42546 2.66699 8.33295C2.66699 8.1238 2.73537 7.95085 2.87212 7.8141C3.01289 7.67735 3.18987 7.60897 3.40304 7.60897C3.64839 7.60897 3.85553 7.71958 4.02446 7.9408L6.72732 11.4099L11.9641 3.09012C12.0566 2.94934 12.1512 2.8508 12.2477 2.79449C12.3442 2.73416 12.4689 2.70399 12.6217 2.70399C12.8309 2.70399 13.0018 2.77036 13.1346 2.90309C13.2673 3.0318 13.3337 3.20073 13.3337 3.40988C13.3337 3.49434 13.3196 3.58082 13.2914 3.6693C13.2633 3.75377 13.219 3.84427 13.1587 3.9408L7.48751 12.7794C7.31053 13.0408 7.06518 13.1716 6.75146 13.1716Z"
                          fill="black"
                        />
                      </svg>
                      <span>
                        {LANGUAGE_OPTIONS.find((e) => e.value === Language.ZH_TW)?.nativeLabel}
                      </span>
                    </div>

                    {/* 日本語 */}
                    <div
                      onClick={() => handleLanguageSelect(Language.JA)}
                      className="cursor-pointer flex items-center gap-2"
                      style={{
                        color: '#374151',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: selectedLanguage === Language.JA ? 600 : 400,
                        lineHeight: '130%',
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.6"
                        height="17.6"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ opacity: selectedLanguage === Language.JA ? 1 : 0 }}
                      >
                        <path
                          d="M6.75146 13.1716C6.46186 13.1716 6.2145 13.0429 6.00938 12.7854L2.88419 8.87594C2.80777 8.78343 2.75146 8.69293 2.71526 8.60445C2.68308 8.51596 2.66699 8.42546 2.66699 8.33295C2.66699 8.1238 2.73537 7.95085 2.87212 7.8141C3.01289 7.67735 3.18987 7.60897 3.40304 7.60897C3.64839 7.60897 3.85553 7.71958 4.02446 7.9408L6.72732 11.4099L11.9641 3.09012C12.0566 2.94934 12.1512 2.8508 12.2477 2.79449C12.3442 2.73416 12.4689 2.70399 12.6217 2.70399C12.8309 2.70399 13.0018 2.77036 13.1346 2.90309C13.2673 3.0318 13.3337 3.20073 13.3337 3.40988C13.3337 3.49434 13.3196 3.58082 13.2914 3.6693C13.2633 3.75377 13.219 3.84427 13.1587 3.9408L7.48751 12.7794C7.31053 13.0408 7.06518 13.1716 6.75146 13.1716Z"
                          fill="black"
                        />
                      </svg>
                      <span>
                        {LANGUAGE_OPTIONS.find((e) => e.value === Language.JA)?.nativeLabel}
                      </span>
                    </div>
                  </div>
                )}
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
                    letterSpacing: '-5px',
                  }}
                >
                  {t('slogan')}
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
                    margin: '0 auto',
                  }}
                >
                  {t('sloganDescription')}
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
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)',
                  }}
                  target="_blank"
                >
                  <Image
                    src="/icons/ui/ui-appstore-download.svg"
                    alt={t('downloadOnAppStore')}
                    width={258}
                    height={74}
                    className="w-auto h-[74px]"
                  />
                </a>

                {/* macOS 按钮 - 使用新的SVG with dropdown */}
                <div
                  className="relative mac-dropdown"
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
                      boxShadow:
                        '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)',
                    }}
                  >
                    <Image
                      src="/icons/ui/ui_desktop_download.svg"
                      alt={t('downloadFormacOS')}
                      width={359}
                      height={74}
                      className="w-auto h-[74px]"
                    />
                  </button>

                  {/* Dropdown 菜单 */}
                  {isDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 z-30 dropdown-animate"
                      style={{
                        width: '359px',
                        display: 'flex',
                        padding: '20px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '12px',
                        borderRadius: '16px',
                        background: '#FFFFFF',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {/* Apple Silicon 选项 */}
                      <a
                        href="https://download.filomail.com/mac_upgrade/versions/latest/prod/arm64/Filo-arm64.dmg"
                        className="block w-full transition-all duration-200 dropdown-item-animate dropdown-item-delay-1"
                        style={{
                          textDecoration: 'none',
                          borderRadius: '12px',
                          padding: '12px 16px',
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(34, 160, 251, 0.1)'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.transform = 'translateY(0px)'
                        }}
                      >
                        <div
                          style={{
                            color: '#22A0FB',
                            fontFeatureSettings: '"liga" off, "clig" off',
                            fontFamily: 'Inter',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: '130%',
                          }}
                        >
                          {t('appleSilicon')}
                        </div>
                      </a>

                      {/* Intel 选项 */}
                      <a
                        href="https://download.filomail.com/mac_upgrade/versions/latest/prod/x64/Filo-x64.dmg"
                        className="block w-full transition-all duration-200 dropdown-item-animate dropdown-item-delay-2"
                        style={{
                          textDecoration: 'none',
                          borderRadius: '12px',
                          padding: '12px 16px',
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(34, 160, 251, 0.1)'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.transform = 'translateY(0px)'
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <div
                          style={{
                            color: '#22A0FB',
                            fontFeatureSettings: '"liga" off, "clig" off',
                            fontFamily: 'Inter',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: '130%',
                          }}
                        >
                          {t('intel')}
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Sample Emails 区域 */}
        <section
          className={`w-full bg-white pt-[200px] pb-32 scroll-animate relative z-10 ${visibleSections.has('sample-emails') ? 'visible' : ''}`}
          data-section="sample-emails"
        >
          <div className="w-full">
            {/* 卡片自动滚动容器 */}
            <div className="relative overflow-hidden">
              <div
                className="sample-cards-scroll flex gap-[40px]"
                style={{
                  paddingLeft: '80px',
                  paddingRight: '80px',
                  paddingTop: '30px',
                  paddingBottom: '30px',
                }}
              >
                {/* 卡片 1 - Understand It All */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('understandItAll').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('understandItAll').includes('\n') ? (
                        t('understandItAll').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('understandItAll')
                      )}
                    </h3>

                    {/* 功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                        {/* Japanese email */}
                        <div style={{ flex: 1 }}>
                          <Image
                            src="/icons/feature/sample1_jp.png"
                            alt="Japanese email example"
                            width={258}
                            height={350}
                            className="w-full h-auto"
                            style={{
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow:
                                '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                            }}
                          />
                        </div>
                        {/* English translation */}
                        <div style={{ flex: 1 }}>
                          <Image
                            src="/icons/feature/sample1_en.png"
                            alt="English translation example"
                            width={258}
                            height={350}
                            className="w-full h-auto"
                            style={{
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow:
                                '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 卡片 2 - Promo, Condensed */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('promoCondensed').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('promoCondensed').includes('\n') ? (
                        t('promoCondensed').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('promoCondensed')
                      )}
                    </h3>

                    {/* 促销功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <Image
                        src="/icons/feature/sample2.png"
                        alt="Promo email condensed feature"
                        width={540}
                        height={350}
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          borderRadius: '12px',
                          boxShadow:
                            '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 卡片 3 - What do I say? */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('whatDoISay').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('whatDoISay').includes('\n') ? (
                        t('whatDoISay').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('whatDoISay')
                      )}
                    </h3>

                    {/* 法语功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <Image
                        src="/icons/feature/sample3.png"
                        alt="French AI reply feature"
                        width={540}
                        height={350}
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          borderRadius: '12px',
                          boxShadow:
                            '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 卡片 4 - Boss Bomb Defused */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('bossBombDefused').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('bossBombDefused').includes('\n') ? (
                        t('bossBombDefused').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('bossBombDefused')
                      )}
                    </h3>

                    {/* Boss功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <Image
                        src="/icons/feature/sample4.png"
                        alt="Boss task management feature"
                        width={540}
                        height={350}
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          borderRadius: '12px',
                          boxShadow:
                            '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 卡片 5 - Goodbye Auto-Bill */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('goodbyeAutoBill').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('goodbyeAutoBill').includes('\n') ? (
                        t('goodbyeAutoBill').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('goodbyeAutoBill')
                      )}
                    </h3>

                    {/* 订阅管理功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <Image
                        src="/icons/feature/sample5.png"
                        alt="Subscription management feature"
                        width={540}
                        height={350}
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          borderRadius: '12px',
                          boxShadow:
                            '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 重复卡片以实现无缝循环 */}
                {/* 卡片 1 - Understand It All (重复) */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('understandItAll').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('understandItAll').includes('\n') ? (
                        t('understandItAll').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('understandItAll')
                      )}
                    </h3>

                    {/* 功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                        {/* Japanese email */}
                        <div style={{ flex: 1 }}>
                          <Image
                            src="/icons/feature/sample1_jp.png"
                            alt="Japanese email example"
                            width={258}
                            height={350}
                            className="w-full h-auto"
                            style={{
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow:
                                '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                            }}
                          />
                        </div>
                        {/* English translation */}
                        <div style={{ flex: 1 }}>
                          <Image
                            src="/icons/feature/sample1_en.png"
                            alt="English translation example"
                            width={258}
                            height={350}
                            className="w-full h-auto"
                            style={{
                              display: 'block',
                              borderRadius: '12px',
                              boxShadow:
                                '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 卡片 2 - Promo, Condensed (重复) */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('promoCondensed').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('promoCondensed').includes('\n') ? (
                        t('promoCondensed').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('promoCondensed')
                      )}
                    </h3>

                    {/* 促销功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <Image
                        src="/icons/feature/sample2.png"
                        alt="Promo email condensed feature"
                        width={540}
                        height={350}
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          borderRadius: '12px',
                          boxShadow:
                            '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 卡片 3 - What do I say? (重复) */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('whatDoISay').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('whatDoISay').includes('\n') ? (
                        t('whatDoISay').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('whatDoISay')
                      )}
                    </h3>

                    {/* 法语功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <Image
                        src="/icons/feature/sample3.png"
                        alt="French AI reply feature"
                        width={540}
                        height={350}
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          borderRadius: '12px',
                          boxShadow:
                            '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 卡片 4 - Boss Bomb Defused (重复) */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: '40px',
                      }}
                    >
                      {t('bossBombDefused').split('\n').map((line, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <span style={{ fontSize: '18.225px' }}>{line}</span>
                          ) : (
                            <div>{line}</div>
                          )}
                        </div>
                      ))}
                    </h3>

                    {/* Boss功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <Image
                        src="/icons/feature/sample4.png"
                        alt="Boss task management feature"
                        width={540}
                        height={350}
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          borderRadius: '12px',
                          boxShadow:
                            '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 卡片 5 - Goodbye Auto-Bill (重复) */}
                <div
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    width: '600px',
                    height: '570px',
                    borderRadius: '20px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: 'var(--09, #FCFAFA)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
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
                        marginBottom: t('goodbyeAutoBill').includes('\n') ? '28px' : '40px',
                      }}
                    >
                      {t('goodbyeAutoBill').includes('\n') ? (
                        t('goodbyeAutoBill').split('\n').map((line, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <span style={{ fontSize: '18.225px' }}>{line}</span>
                            ) : (
                              <div>{line}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        t('goodbyeAutoBill')
                      )}
                    </h3>

                    {/* 订阅管理功能示例图片 */}
                    <div className="flex-1 flex items-end">
                      <Image
                        src="/icons/feature/sample5.png"
                        alt="Subscription management feature"
                        width={540}
                        height={350}
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          borderRadius: '12px',
                          boxShadow:
                            '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* A Closer Look 区域 */}
        <section
          className="w-full pt-24 pb-0 overflow-hidden"
          data-section="closer-look"
          style={{ marginBottom: '-104px' }}
        >
          <div className="max-w-[1440px] mx-auto px-20">
            {/* 标题 */}
            <div
              className="text-center mb-20 relative z-20"
              style={{
                transform: 'translateY(-50px)',
                position: 'relative',
                isolation: 'isolate',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              <h2
                style={{
                  color: 'var(--06, #000)',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: (selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA) ? '60px' : '80px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '130%',
                  letterSpacing: '-2px',
                }}
              >
                {t('aCloserLook')}
              </h2>
            </div>

            {/* Mobile/Desktop 切换按钮 */}
            <div
              className="flex justify-center mb-16 relative z-20"
              style={{
                transform: 'translateY(-50px)',
                position: 'relative',
                isolation: 'isolate',
              }}
            >
              <div
                className="relative"
                style={{
                  display: 'flex',
                  padding: '4px',
                  alignItems: 'center',
                  borderRadius: '62px',
                  background: 'var(--05, #E9F6FF)',
                  boxShadow:
                    '0px 100px 80px 0px rgba(0, 0, 0, 0.05), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.04), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.03), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.01)',
                  width: '368px',
                  height: '60px',
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
                    zIndex: 1,
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
                    cursor: 'pointer',
                  }}
                >
                  {t('mobile')}
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
                    cursor: 'pointer',
                  }}
                >
                  {t('desktop')}
                </button>
              </div>
            </div>

            {/* 展示区域容器 */}
            <div
              className="relative z-10"
              style={{
                height: '1100px',
                transform: 'translateY(-50px)',
                isolation: 'isolate',
              }}
            >
              {/* Mobile 视图 */}
              <div
                className={`absolute inset-0 transition-all duration-700 ${
                  selectedView === 'mobile'
                    ? 'translate-x-0 opacity-100 scale-100'
                    : '-translate-x-full opacity-0 scale-95'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: selectedView === 'mobile' ? '100ms' : '0ms',
                }}
              >
                <div className="relative flex justify-center items-center h-full">
                  {/* 手机原型 */}
                  <div
                    className={`relative z-0 transition-all duration-500 ${
                      selectedView === 'mobile' ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
                    }`}
                    style={{
                      transform: 'translateY(50px)',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: selectedView === 'mobile' ? '200ms' : '0ms',
                    }}
                  >
                    <Image
                      src="/icons/feature/feature_iphone_mockup.png"
                      alt="iPhone mockup showing Filo app"
                      width={714}
                      height={1071}
                      className="w-auto h-auto"
                      style={{ maxHeight: '1071px' }}
                    />
                  </div>

                  {/* 功能标签 */}
                  <div
                    className={`absolute left-[195px] top-[390px] feature-line feature-line-1 z-10 ${mobileLineAnimations.has(1) ? 'animate-sequence' : ''}`}
                  >
                    <div className="flex flex-col items-start" style={{ gap: '8px' }}>
                      <Image
                        src="/icons/feature/feature_line2.svg"
                        alt="line"
                        width={320}
                        height={1}
                      />
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
                        {t('takeActions')}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`absolute right-[117px] top-[270px] feature-line feature-line-2 z-10 ${mobileLineAnimations.has(2) ? 'animate-sequence' : ''}`}
                  >
                    <div className="flex flex-col items-end" style={{ gap: '8px' }}>
                      <Image
                        src="/icons/feature/feature_line1.svg"
                        alt="line"
                        width={470}
                        height={1}
                      />
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
                        {t('summarizeWhatMatters')}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`absolute right-[120px] top-[450px] feature-line feature-line-3 z-10 ${mobileLineAnimations.has(3) ? 'animate-sequence' : ''}`}
                  >
                    <div className="flex flex-col items-end" style={{ gap: '8px' }}>
                      <Image
                        src="/icons/feature/feature_line3.svg"
                        alt="line"
                        width={420}
                        height={1}
                      />
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
                        {t('syncTodos')}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`absolute left-[195px] top-[682px] feature-line feature-line-4 z-10 ${mobileLineAnimations.has(4) ? 'animate-sequence' : ''}`}
                  >
                    <div className="flex flex-col items-start" style={{ gap: '8px' }}>
                      <Image
                        src="/icons/feature/feature_line4.svg"
                        alt="line"
                        width={320}
                        height={1}
                      />
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
                        {t('chatWithAI')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop 视图 */}
              <div
                className={`absolute inset-0 transition-all duration-700 ${
                  selectedView === 'desktop'
                    ? 'translate-x-0 opacity-100 scale-100'
                    : 'translate-x-full opacity-0 scale-95'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: selectedView === 'desktop' ? '100ms' : '0ms',
                }}
              >
                <div className="relative flex justify-center items-center h-full">
                  <div
                    className={`transition-all duration-500 ${
                      selectedView === 'desktop' ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
                    }`}
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: selectedView === 'desktop' ? '200ms' : '0ms',
                    }}
                  >
                    <Image
                      src="/icons/feature/feature_macbook_mockup.png"
                      alt="MacBook mockup showing Filo app"
                      width={1214}
                      height={911}
                      className="w-auto h-auto"
                      style={{ maxHeight: '911px', transform: 'translateY(-30px) scale(1.1)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button - Only show when mobile view is selected */}
            {selectedView === 'mobile' && (
              <div
                className="flex justify-center mt-16"
                style={{
                  transform: 'translateY(-200px)',
                  position: 'relative',
                  zIndex: 20,
                }}
              >
                <a
                  href="https://apple.co/43FINlq"
                  style={{
                    display: 'inline-flex',
                    padding: '8px 22px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '100px',
                    border: '0.5px solid var(--02, #22A0FB)',
                    background: 'transparent',
                    color: 'var(--02, #22A0FB)',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '150%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--02, #22A0FB)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--02, #22A0FB)'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {t('downloadMobile')}
                </a>
              </div>
            )}

            {/* CTA Buttons - Only show when desktop view is selected */}
            {selectedView === 'desktop' && (
              <div
                className="flex justify-center mt-16"
                style={{
                  transform: 'translateY(-200px)',
                  position: 'relative',
                  zIndex: 20,
                  gap: '20px',
                }}
              >
                <a
                  href="https://download.filomail.com/mac_upgrade/versions/latest/prod/arm64/Filo-arm64.dmg"
                  style={{
                    display: 'inline-flex',
                    padding: '8px 22px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '100px',
                    border: '0.5px solid var(--02, #22A0FB)',
                    background: 'transparent',
                    color: 'var(--02, #22A0FB)',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '150%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--02, #22A0FB)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--02, #22A0FB)'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {t('downloadMacMSeries')}
                </a>
                <a
                  href="https://download.filomail.com/mac_upgrade/versions/latest/prod/x64/Filo-x64.dmg"
                  style={{
                    display: 'inline-flex',
                    padding: '8px 22px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '100px',
                    border: '0.5px solid var(--02, #22A0FB)',
                    background: 'transparent',
                    color: 'var(--02, #22A0FB)',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '150%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--02, #22A0FB)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--02, #22A0FB)'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {t('downloadMacIntel')}
                </a>
              </div>
            )}
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
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '1440px',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '120px',
            }}
          >
            {/* 主标题 */}
            <h1
              style={{
                color: 'var(--06, #000)',
                textAlign: 'center',
                fontFeatureSettings: '"liga" off, "clig" off',
                fontFamily: 'Inter',
                fontSize: (selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA) ? '60px' : '80px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '-3px',
                alignSelf: 'stretch',
                margin: 0,
              }}
            >
              {t('emailInTaskOut')}
            </h1>

            {/* 内容区域 */}
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '1200px',
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
                    marginBottom: '32px',
                  }}
                >
                  {t('neverMissATask')}
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
                    width: '100%',
                  }}
                >
                  {t('neverMissATaskDescription')}
                </p>
              </div>

              {/* 右侧邮件交互区域 */}
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
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
                      boxShadow:
                        '0px 67.568px 54.054px 0px rgba(0, 0, 0, 0.07), 0px 28.228px 22.582px 0px rgba(0, 0, 0, 0.05), 0px 15.092px 12.074px 0px rgba(0, 0, 0, 0.04), 0px 8.461px 6.768px 0px rgba(0, 0, 0, 0.04), 0px 4.493px 3.595px 0px rgba(0, 0, 0, 0.03), 0px 1.87px 1.496px 0px rgba(0, 0, 0, 0.02)',
                    }}
                  />

                  {/* 弹窗 1 - Review (右上角) */}
                  <div
                    className={`absolute float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
                    style={{
                      top: '180px',
                      right: '-210px',
                      animationDelay: '0.5s',
                    }}
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  >
                    <Image
                      src="/icons/feature/feature_todo_popup1_review.svg"
                      alt="Review popup"
                      width={297}
                      height={78}
                    />
                  </div>

                  {/* 弹窗 2 - Reservation (左侧中部) */}
                  <div
                    className={`absolute float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
                    style={{
                      top: '325px',
                      left: '-170px',
                      animationDelay: '1s',
                    }}
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  >
                    <Image
                      src="/icons/feature/feature_todo_popup2_reservation.svg"
                      alt="Reservation popup"
                      width={202}
                      height={78}
                    />
                  </div>

                  {/* 弹窗 3 - Confirm (右侧中下部) */}
                  <div
                    className={`absolute float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
                    style={{
                      top: '435px',
                      right: '-120px',
                      animationDelay: '1.5s',
                    }}
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  >
                    <Image
                      src="/icons/feature/feature_todo_popup3_confirm.svg"
                      alt="Confirm popup"
                      width={252}
                      height={58}
                    />
                  </div>

                  {/* 弹窗 4 - RSVP Cancel (底部中央) */}
                  <div
                    className={`absolute float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
                    style={{
                      top: '610px',
                      left: '-70px',
                      animationDelay: '2s',
                    }}
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  >
                    <Image
                      src="/icons/feature/feature_todo_popup4_RSVP_cancel.svg"
                      alt="RSVP Cancel popup"
                      width={236}
                      height={78}
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
            paddingTop: '120px',
            paddingBottom: '160px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '120px',
            background: 'var(--09, #FCFAFA)',
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
                fontSize: (selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA) ? '60px' : '80px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '-3px',
                margin: 0,
              }}
            >
              {t('respondTheToneYouWant')}
            </h2>
          </div>

          {/* 三个语调选项区域 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1200px',
              gap: '100px',
            }}
          >
            {/* Positive */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                className="tone-card-hover"
                style={{
                  position: 'relative',
                  width: '350px',
                  height: '470px',
                  transform: 'translateY(-15px)',
                  cursor: 'pointer',
                }}
              >
                {/* Content Layer - moves up-left on hover */}
                <div
                  className="tone-card-content"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    padding: '40px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    borderRadius: '30px',
                    background: 'var(--05, #E9F6FF)',
                    boxShadow:
                      '0px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 41.778px 0px rgba(0, 0, 0, 0.02), 0px 22.336px 22.336px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 12.522px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 6.65px 0px rgba(0, 0, 0, 0.04), 0px 2.767px 2.767px 0px rgba(0, 0, 0, 0.06)',
                    zIndex: 2,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div
                    style={{
                      color: '#22A0FB',
                      fontFamily: 'Inter',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '150%',
                      textAlign: 'left',
                    }}
                  >
                    Hey Emily,
                    <br />
                    <br />
                    Just rescheduled the dentist for next Thursday and uploaded the missing trip
                    photos. I'm free on the 14th for Aunt Denise's dinner — count me in.
                    <br />
                    <br />
                    Thanks for the nudge! Hope your weekend's off to a good start.
                    <br />
                    Jordan
                  </div>
                </div>

                {/* Overlay Layer - moves down-right on hover */}
                <div
                  className="tone-card-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    padding: '40px',
                    paddingBottom: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    textAlign: 'center',
                    borderRadius: '30px',
                    background: '#fff',
                    zIndex: 1,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: 'Georgia',
                        fontSize: '36px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        color: '#111',
                        lineHeight: '32px',
                        letterSpacing: '1px',
                        margin: 0,
                        marginBottom: '12px',
                      }}
                    >
                      {t('positive')}
                    </h2>
                    <span
                      style={{
                        color: 'var(--07, #707070)',
                        textAlign: 'center',
                        fontFeatureSettings: '"liga" off, "clig" off',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                      }}
                    >
                      {t('sayYesOrShowSupport')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Negative */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                className="tone-card-hover"
                style={{
                  position: 'relative',
                  width: '350px',
                  height: '470px',
                  transform: 'translateY(-15px)',
                  cursor: 'pointer',
                }}
              >
                {/* Content Layer - moves up-left on hover */}
                <div
                  className="tone-card-content"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    padding: '40px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    borderRadius: '30px',
                    background: '#FFE4E1',
                    boxShadow:
                      '0px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 41.778px 0px rgba(0, 0, 0, 0.02), 0px 22.336px 22.336px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 12.522px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 6.65px 0px rgba(0, 0, 0, 0.04), 0px 2.767px 2.767px 0px rgba(0, 0, 0, 0.06)',
                    zIndex: 2,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div
                    style={{
                      color: '#F78B60',
                      fontFamily: 'Inter',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '150%',
                      textAlign: 'left',
                    }}
                  >
                    Hey Em,
                    <br />
                    <br />
                    Haven't rebooked the dentist yet — might push it to next month. Still digging up
                    those trip photos. And I won't be able to make it to Aunt Denise's on the 14th.
                    Please send my apologies.
                    <br />
                    <br />
                    Hope you have a great weekend,
                    <br />
                    Jordan
                  </div>
                </div>

                {/* Overlay Layer - moves down-right on hover */}
                <div
                  className="tone-card-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    padding: '40px',
                    paddingBottom: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    textAlign: 'center',
                    borderRadius: '30px',
                    background: '#fff',
                    zIndex: 1,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: 'Georgia',
                        fontSize: '36px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        color: '#111',
                        lineHeight: '32px',
                        letterSpacing: '1px',
                        margin: 0,
                        marginBottom: '12px',
                      }}
                    >
                      {t('negative')}
                    </h2>
                    <span
                      style={{
                        color: 'var(--07, #707070)',
                        textAlign: 'center',
                        fontFeatureSettings: '"liga" off, "clig" off',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                      }}
                    >
                      {t('politelySayNoOrPass')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Neutral */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                className="tone-card-hover"
                style={{
                  position: 'relative',
                  width: '350px',
                  height: '470px',
                  transform: 'translateY(-15px)',
                  cursor: 'pointer',
                }}
              >
                {/* Content Layer - moves up-left on hover */}
                <div
                  className="tone-card-content"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    padding: '40px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    borderRadius: '30px',
                    background: '#FFE49F',
                    boxShadow:
                      '0px 100px 100px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 41.778px 0px rgba(0, 0, 0, 0.02), 0px 22.336px 22.336px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 12.522px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 6.65px 0px rgba(0, 0, 0, 0.04), 0px 2.767px 2.767px 0px rgba(0, 0, 0, 0.06)',
                    zIndex: 2,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div
                    style={{
                      color: '#D8AA41',
                      fontFamily: 'Inter',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '150%',
                      textAlign: 'left',
                    }}
                  >
                    Hey Emily,
                    <br />
                    <br />
                    Still sorting out the dentist — haven't picked a new date. I'll look for those
                    trip photos this weekend. As for Aunt Denise's dinner, I'm not sure yet, depends
                    on work.
                    <br />
                    <br />
                    I'll let you know soon.
                    <br />
                    <br />
                    Thanks for the check-in,
                    <br />
                    Jordan
                  </div>
                </div>

                {/* Overlay Layer - moves down-right on hover */}
                <div
                  className="tone-card-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    padding: '40px',
                    paddingBottom: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    textAlign: 'center',
                    borderRadius: '30px',
                    background: '#fff',
                    zIndex: 1,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: 'Georgia',
                        fontSize: '36px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        color: '#111',
                        lineHeight: '32px',
                        letterSpacing: '1px',
                        margin: 0,
                        marginBottom: '12px',
                      }}
                    >
                      {t('neutral')}
                    </h2>
                    <span
                      style={{
                        color: 'var(--07, #707070)',
                        textAlign: 'center',
                        fontFeatureSettings: '"liga" off, "clig" off',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                      }}
                    >
                      {t('keepItCasualOrUndecided')}
                    </span>
                  </div>
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
            paddingTop: '0px',
            paddingBottom: '260px',
            marginTop: '-10px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '50px',
            background: 'var(--09, #FCFAFA)',
          }}
        >
          {/* 标题 */}
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h2
              style={{
                alignSelf: 'stretch',
                textAlign: 'center',
                margin: 0,
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
                  letterSpacing: '-1px',
                  marginRight: '20px',
                }}
              >
                {t('orWriteWithAI')}
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
                  boxShadow:
                    '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.02), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.02), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.04)',
                  borderRadius: '55px',
                }}
              >
                {/* 外框背景 */}
                <rect width="800" height="110" rx="55" ry="55" fill="#F6F6F6" />

                {/* 内框背景 */}
                <rect
                  x="20"
                  y="20"
                  width="760"
                  height="70"
                  rx="35"
                  ry="35"
                  fill="rgba(0, 0, 0, 0.04)"
                />

                {/* 星形图标 1 */}
                <path
                  d="M40.2479 50.2231C40.63 48.6476 42.8707 48.6476 43.2527 50.2231L44.3039 54.5582C44.4403 55.1207 44.8795 55.5599 45.442 55.6963L49.777 56.7475C51.3525 57.1295 51.3525 59.3702 49.777 59.7522L45.442 60.8034C44.8795 60.9398 44.4403 61.379 44.3039 61.9415L43.2527 66.2766C42.8707 67.852 40.63 67.852 40.2479 66.2766L39.1968 61.9415C39.0604 61.379 38.6212 60.9398 38.0587 60.8034L33.7236 59.7522C32.1481 59.3702 32.1481 57.1295 33.7236 56.7475L38.0587 55.6963C38.6212 55.5599 39.0604 55.1207 39.1968 54.5582L40.2479 50.2231Z"
                  fill="#22A0FB"
                />

                {/* 星形图标 2 */}
                <path
                  d="M51.7876 43.1671C51.9899 42.333 53.1761 42.333 53.3784 43.1671L53.9349 45.4621C54.0071 45.7599 54.2396 45.9924 54.5374 46.0646L56.8324 46.6211C57.6665 46.8234 57.6665 48.0096 56.8324 48.2119L54.5374 48.7684C54.2396 48.8406 54.0071 49.0731 53.9349 49.3709L53.3784 51.6659C53.1761 52.5 51.9899 52.5 51.7876 51.6659L51.2311 49.3709C51.1589 49.0731 50.9264 48.8406 50.6286 48.7684L48.3336 48.2119C47.4995 48.0096 47.4995 46.8234 48.3336 46.6211L50.6286 46.0646C50.9264 45.9924 51.1589 45.7599 51.2311 45.4621L51.7876 43.1671Z"
                  fill="#22A0FB"
                />

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
            background: '#FFFFFF',
            paddingTop: '100px',
            paddingBottom: '100px',
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
              padding: '0 60px',
            }}
          >
            {/* 左侧内容 */}
            <div
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '40px',
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
                  fontSize: (selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA) ? '60px' : '80px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '120%',
                  letterSpacing: '-3px',
                  margin: 0,
                }}
              >
                {t('poweredByTopTierAILine1')}
                <br />
                {t('poweredByTopTierAILine2')}
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
                  maxWidth: '520px',
                }}
              >
                {t('poweredByTopTierAIDescription')}
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
                    border: '1px solid var(--06, #000)',
                    background: 'transparent',
                    color: 'var(--06, #000)',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--06, #000)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--06, #000)'
                  }}
                >
                  {t('getFiloToday2')}
                </button>

                {/* Dropdown 菜单 */}
                {isGetFiloDropdownOpen && (
                  <div
                    className="absolute top-full z-50 dropdown-animate"
                    style={{
                      width: '300px',
                      left: '30px',
                      marginTop: '20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    {/* Single line */}
                    <div
                      style={{
                        width: '1px',
                        height: '110px', // Height to cover all 3 options: 24px * 3 + 20px * 2 spacing
                        background: 'var(--06, #000)',
                        flexShrink: 0,
                        marginTop: '0px',
                      }}
                    />

                    {/* Options container */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        width: '100%',
                      }}
                    >
                      {/* iOS & iPadOS 选项 */}
                      <a
                        href="https://apple.co/43FINlq"
                        style={{
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '150%',
                          textDecoration: 'none',
                          transition: 'opacity 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1'
                        }}
                        target="_blank"
                      >
                        {t('iosIpadOS')}
                      </a>

                      {/* macOS Apple Silicon 选项 */}
                      <a
                        href="https://download.filomail.com/mac_upgrade/versions/latest/prod/arm64/Filo-arm64.dmg"
                        style={{
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '150%',
                          textDecoration: 'none',
                          transition: 'opacity 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1'
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        {t('macOSAppleSilicon')}
                      </a>

                      {/* macOS Intel 选项 */}
                      <a
                        href="https://download.filomail.com/mac_upgrade/versions/latest/prod/x64/Filo-x64.dmg"
                        style={{
                          color: 'var(--06, #000)',
                          fontFeatureSettings: '"liga" off, "clig" off',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '150%',
                          textDecoration: 'none',
                          transition: 'opacity 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1'
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        {t('macOSIntel')}
                      </a>
                    </div>
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
                gap: '110px',
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
            alignItems: 'center',
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
              padding: '0 60px',
            }}
          >
            {/* 左侧储物柜图片 */}
            <div
              style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                  objectFit: 'contain',
                  borderRadius: '30px',
                  aspectRatio: '491/364',
                  transform: 'scale(1.1)',
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
                gap: '40px',
              }}
            >
              {/* 大标题 */}
              <h2
                style={{
                  color: 'var(--06, #000)',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: (selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA) ? '60px' : '80px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '120%',
                  letterSpacing: '-2.4px',
                  margin: 0,
                }}
              >
                {t('noPeeking')}
                <br />
                {t('noPeekingPromise')}
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
                  letterSpacing: '0.5px',
                  margin: 0,
                }}
              >
                {t('privacyTagline')}
              </p>

              {/* 第三段文字 */}
              <p
                style={{
                  width: '520px',
                  color: '#000',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  margin: 0,
                }}
              >
                {t('privacyDescription')}
                <a
                  href="https://appdefensealliance.dev/casa"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#000',
                    textDecoration: 'none',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  {t('casaTier3Verified')}
                </a>
              </p>

              {/* See Our Data Promise 按钮 */}
              <Link
                href="/terms-privacy?section=data"
                style={{
                  display: 'flex',
                  padding: '8px 22px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '100px',
                  border: '1px solid var(--06, #000)',
                  background: 'transparent',
                  color: 'var(--06, #000)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.background = 'var(--06, #000)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--06, #000)'
                }}
                target="_blank"
              >
                <span
                  style={{
                    color: 'inherit',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%',
                  }}
                >
                  {t('seeOurDataPromise')}
                </span>
              </Link>
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
            padding: '160px 60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '50px',
              width: '100%',
              maxWidth: '1000px',
            }}
          >
            {/* FAQ 标题 */}
            <h2
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: (selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA) ? '60px' : '80px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '-3px',
                margin: 0,
              }}
            >
              {t('faqTitle')}
            </h2>

            {/* FAQ 列表 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              {[
                {
                  question: t('faqHowDoesFiloWork'),
                  answer: t('faqHowDoesFiloWorkAnswer'),
                },
                {
                  question: t('faqWhatKindsTasks'),
                  answer: t('faqWhatKindsTasksAnswer'),
                },
                {
                  question: t('faqIsDataSecure'),
                  answer: t('faqIsDataSecureAnswer'),
                },
                {
                  question: t('faqHowCanIShareFeedback'),
                  answer: t('faqHowCanIShareFeedbackAnswer'),
                },
              ].map((faq, index, array) => (
                <React.Fragment key={index}>
                  <div
                    style={{
                      background: 'transparent',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        position: 'relative',
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
                          transition: 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1'
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
                          transform: expandedFaqs.has(index)
                            ? 'scaleX(-1) rotate(-90deg)'
                            : 'scaleX(-1) rotate(0deg)',
                          transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          position: 'absolute',
                          right: '30px',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          const currentTransform = expandedFaqs.has(index)
                            ? 'scaleX(-1) rotate(-90deg)'
                            : 'scaleX(-1) rotate(0deg)'
                          e.currentTarget.style.transform = `${currentTransform} translateX(3px)`
                          e.currentTarget.style.filter = 'brightness(1.2)'
                        }}
                        onMouseLeave={(e) => {
                          const currentTransform = expandedFaqs.has(index)
                            ? 'scaleX(-1) rotate(-90deg)'
                            : 'scaleX(-1) rotate(0deg)'
                          e.currentTarget.style.transform = currentTransform
                          e.currentTarget.style.filter = 'brightness(1)'
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
                        transform: expandedFaqs.has(index) ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transitionProperty: 'max-height, opacity, transform',
                      }}
                    >
                      <div
                        style={{
                          padding: expandedFaqs.has(index) ? '0 30px 30px 30px' : '0 30px 0px 30px',
                          color: '#CCC',
                          fontFamily: 'Inter',
                          fontSize: '18px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '150%',
                          transition: 'padding 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        }}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>

                  {/* Add divider between questions (except after the last one) */}
                  {index < array.length - 1 && (
                    <div
                      style={{
                        width: '100%',
                        height: '0.5px',
                        background: '#3B3B3B',
                        margin: '0',
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 底部图像区域 */}
        <div style={{ background: '#E9F6FF', paddingTop: '140px', paddingBottom: '40px' }}>
          <div className="max-w-[1280px] mx-auto">
            {/* 主容器 - 左右布局 */}
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'flex-start',
                gap: '120px',
              }}
            >
              {/* 左侧：标题、文本和按钮容器 */}
              <div
                style={{
                  display: 'flex',
                  width: '575px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '40px',
                }}
              >
                {/* 标题 */}
                <h2
                  style={{
                    color: 'var(--06, #000)',
                    textAlign: 'left',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: (selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA) ? '60px' : '80px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '130%',
                    letterSpacing: '-3px',
                    margin: 0,
                  }}
                >
                  {t('theStartOfFilo')}
                </h2>

                {/* 文本 */}
                <div
                  style={{
                    width: '417px',
                    color: 'var(--07, #707070)',
                    textAlign: 'left',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%',
                    margin: 0,
                  }}
                >
                  {t('theStartOfFiloDescription').split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      style={{
                        margin: index === 0 ? '0 0 16px 0' : '16px 0',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 按钮区域 */}
                <div className="flex gap-[30px] items-start">
                  {/* Mobile 按钮 - Rainbow Button */}
                  <div
                    className="inline-block"
                    onMouseEnter={() => setIsGetFiloTodayHovered(true)}
                    onMouseLeave={() => setIsGetFiloTodayHovered(false)}
                  >
                    <RainbowButton
                      className="text-white font-semibold text-base whitespace-nowrap"
                      style={{
                        fontFamily: 'Inter',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: isGetFiloTodayHovered ? '0 20px' : '0',
                        width: isGetFiloTodayHovered ? 'auto' : '150px',
                        height: '53px',
                        minWidth: '150px',
                      }}
                    >
                      {!isGetFiloTodayHovered ? (
                        t('getFiloToday')
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <a
                            href="https://apple.co/43FINlq"
                            style={{
                              color: 'white',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: 600,
                              transition: 'opacity 0.3s ease',
                              whiteSpace: 'nowrap',
                              padding: '0 15px',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '0.8'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '1'
                            }}
                            target="_blank"
                          >
                            {t('ios')}
                          </a>
                          <div
                            style={{
                              width: '1px',
                              height: '16px',
                              background: 'rgba(255, 255, 255, 0.3)',
                              margin: '0',
                            }}
                          ></div>
                          <a
                            href="https://download.filomail.com/mac_upgrade/versions/latest/prod/arm64/Filo-arm64.dmg"
                            style={{
                              color: 'white',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: 600,
                              transition: 'opacity 0.3s ease',
                              whiteSpace: 'nowrap',
                              padding: '0 15px',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '0.8'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '1'
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            {t('macOSAppleSilicon')}
                          </a>
                          <div
                            style={{
                              width: '1px',
                              height: '16px',
                              background: 'rgba(255, 255, 255, 0.3)',
                              margin: '0',
                            }}
                          ></div>
                          <a
                            href="https://download.filomail.com/mac_upgrade/versions/latest/prod/x64/Filo-x64.dmg"
                            style={{
                              color: 'white',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: 600,
                              transition: 'opacity 0.3s ease',
                              whiteSpace: 'nowrap',
                              padding: '0 15px',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '0.8'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '1'
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            {t('macOSIntel')}
                          </a>
                        </div>
                      )}
                    </RainbowButton>
                  </div>

                  {/* Docs 按钮 - Regular Button */}
                  <a
                    href="https://filo-mail.gitbook.io/filo-mail-docs/"
                    className="inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="w-[161px] h-[53px] text-black font-semibold text-base whitespace-nowrap"
                      style={{
                        fontFamily: 'Inter',
                        background: 'white',
                        color: 'black',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.04)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white'
                      }}
                    >
                      {t('learnHow')}
                    </button>
                  </a>
                </div>
              </div>

              {/* 右侧：团队插图 */}
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src="/icons/feature/team.svg"
                  alt="Team working in office"
                  width={500}
                  height={300}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    transform: 'scale(0.9) translateY(200px) translateX(50px)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div
          style={{
            width: '100%',
            background: '#E9F6FF',
            display: 'flex',
            justifyContent: 'center',
            padding: '0 20px',
          }}
        >
          <div
            style={{
              width: '1280px',
              height: '0.5px',
              background: 'var(--06, #000)',
              alignSelf: 'stretch',
            }}
          />
        </div>

        {/* 页脚区域 */}
        <div
          style={{
            width: '100%',
            background: '#E9F6FF',
            padding: '10px 20px 110px 20px',
          }}
        >
          <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center">
            {/* 左侧链接 */}
            <div className="flex items-center" style={{ gap: '24px' }}>
              <Link
                href="/terms-privacy?section=terms"
                style={{
                  color: 'var(--06, #000)',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '130%',
                  letterSpacing: '-0.3px',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.opacity = '0.7'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.opacity = '1'
                }}
                target="_blank"
              >
                {t('termsOfService')}
              </Link>
              <Link
                href="/terms-privacy?section=privacy"
                style={{
                  color: 'var(--06, #000)',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '130%',
                  letterSpacing: '-0.3px',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.opacity = '0.7'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.opacity = '1'
                }}
                target="_blank"
              >
                {t('privacyPolicy')}
              </Link>
              <Link
                href="/terms-privacy?section=data"
                style={{
                  color: 'var(--06, #000)',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '130%',
                  letterSpacing: '-0.3px',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.opacity = '0.7'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.opacity = '1'
                }}
                target="_blank"
              >
                {t('dataProtection')}
              </Link>
              <span
                style={{
                  color: 'var(--07, #707070)',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '130%',
                  letterSpacing: '-0.3px',
                }}
              >
                {t('copyright')}
              </span>
            </div>

            {/* 右侧社交媒体图标 */}
            <div className="flex items-center" style={{ gap: '30px' }}>
              <a
                href="https://discord.gg/filo-mail"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                target="_blank"
              >
                <Image
                  src="/icons/brand/brand_discord_icon.svg"
                  alt="Discord"
                  width={32}
                  height={32}
                  className="w-[32px] h-[32px]"
                  style={{
                    width: '32px',
                    height: '32px',
                  }}
                />
              </a>
              <a
                href="https://x.com/Filo_Mail"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                target="_blank"
              >
                <Image
                  src="/icons/brand/brand_x_icon.svg"
                  alt="X (Twitter)"
                  width={32}
                  height={32}
                  className="w-[32px] h-[32px]"
                  style={{
                    width: '32px',
                    height: '32px',
                  }}
                />
              </a>
              <a
                href="https://feedback.filomail.com/"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translateY(-3px) scale(0.95)',
                }}
                target="_blank"
              >
                <Image
                  src="/icons/brand/brand_feedback_icon.svg"
                  alt="Feedback"
                  width={32}
                  height={32}
                  className="w-[32px] h-[32px]"
                  style={{
                    width: '32px',
                    height: '32px',
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
