'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect, useCallback, memo } from 'react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { useTranslations } from 'next-intl'
import { Language, LANGUAGE_OPTIONS } from '@/lib/locale'
import Cookies from 'universal-cookie'
import './animate.css'
import HomeTyping from '@/components/home-typing'
import HomeCarousel from '@/components/home-carousel'
import HomeCloser from '@/components/home-closer'
import HomeLanguage from '@/components/home-language'
import HomeFloat from '@/components/home-float'

const cookies = new Cookies()

function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isGetFiloDropdownOpen, setIsGetFiloDropdownOpen] = useState(false)
 
  const [selectedLanguage, setSelectedLanguage] = useState(Language.EN)
  const [isGetFiloTodayHovered, setIsGetFiloTodayHovered] = useState(false)

  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const getFiloTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const t = useTranslations('home')

  useEffect(() => {
    setSelectedLanguage((cookies.get('user-locale') as Language) || Language.EN)
  }, [])

  // 滚动动画状态
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const observerSections = useRef<null | IntersectionObserver>(null)

  // 滚动动画效果
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    if (visibleSections.size === 6) {
      return
    }

    observerSections.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(123)
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section')
          if (sectionId) {
            setVisibleSections((prev) => {
              if (prev.size === 6) {
                const sections = document.querySelectorAll('[data-section]')
                sections.forEach((section) => observerSections.current?.unobserve(section))
                observerSections.current?.disconnect()
                observerSections.current = null
                return prev
              }
              if (prev.has(sectionId)) {
                return prev
              }
              return new Set([...prev, sectionId])
            })
          }
        }
      })
    }, observerOptions)

    // 观察所有带有 data-section 属性的元素
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach((section) => observerSections.current?.observe(section))

    return () => {
      sections.forEach((section) => observerSections.current?.unobserve(section))
      observerSections.current?.disconnect()
      observerSections.current = null
    }
  }, [])

  
  // 处理macOS下拉菜单鼠标进入
  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsDropdownOpen(true)
  }, [])

  // 处理macOS下拉菜单鼠标离开
  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 100) // 100ms 延迟，给用户时间移动到下拉菜单
  }, [])

  // 处理macOS按钮点击
  const handleButtonClick = useCallback(() => {
    setIsDropdownOpen(!isDropdownOpen)
  }, [])

  // 处理Get Filo Today下拉菜单鼠标进入
  const handleGetFiloMouseEnter = useCallback(() => {
    if (getFiloTimeoutRef.current) {
      clearTimeout(getFiloTimeoutRef.current)
      getFiloTimeoutRef.current = null
    }
    setIsGetFiloDropdownOpen(true)
  }, [])

  // 处理Get Filo Today下拉菜单鼠标离开
  const handleGetFiloMouseLeave = useCallback(() => {
    getFiloTimeoutRef.current = setTimeout(() => {
      setIsGetFiloDropdownOpen(false)
    }, 100) // 100ms 延迟，给用户时间移动到下拉菜单
  }, [])

  // 处理Get Filo Today按钮点击
  const handleGetFiloButtonClick = () => {
    setIsGetFiloDropdownOpen(!isGetFiloDropdownOpen)
  }

  // 处理FAQ折叠展开
  const handleFaqToggle = useCallback((index: number) => {
    setExpandedFaqs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }, [])



  console.log(visibleSections)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden overflow-y-auto">
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
          <HomeLanguage />

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
                  colorScheme: 'light',
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
        className={`w-full bg-white pt-[200px] pb-32 scroll-animate relative z-10 visible`}
      >
        <div className="w-full">
          {/* 卡片自动滚动容器 */}
          <div className="relative overflow-hidden">
            <HomeCarousel />
          </div>
        </div>
      </section>

      {/* A Closer Look 区域 */}
      <section
        className="w-full pt-24 pb-0 overflow-hidden"
        style={{ marginBottom: '-104px' }}
      >
        <HomeCloser />
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
        <HomeFloat selectedLanguage={selectedLanguage} />
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
              fontSize:
                selectedLanguage === Language.ZH_CN ||
                selectedLanguage === Language.ZH_TW ||
                selectedLanguage === Language.JA
                  ? '60px'
                  : selectedLanguage === Language.ES
                    ? '70px'
                    : '80px',
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
            <>
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
                Or
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
                  letterSpacing: '-1px',
                }}
              >
                Write with AI
              </span>
            </>
          </h2>
        </div>

        {/* 输入框区域 */}
        <HomeTyping />
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
                fontSize:
                  selectedLanguage === Language.ZH_CN ||
                  selectedLanguage === Language.ZH_TW ||
                  selectedLanguage === Language.JA
                    ? '60px'
                    : selectedLanguage === Language.ES
                      ? '70px'
                      : '80px',
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
                  colorScheme: 'light',
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
                fontSize:
                  selectedLanguage === Language.ZH_CN ||
                  selectedLanguage === Language.ZH_TW ||
                  selectedLanguage === Language.JA
                    ? '60px'
                    : selectedLanguage === Language.ES
                      ? '70px'
                      : '80px',
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
                color: 'var(--07, #707070)',
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
              {t('privacyDescriptionStart')}
              <a
                href="https://appdefensealliance.dev/casa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#707070] font-bold text-lg hover:opacity-70"
                style={{
                  textDecoration: 'none',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  lineHeight: '150%',
                }}
              >
                {t('casaTier3Verified')}
              </a>
              {t('privacyDescriptionEnd')}
            </p>

            {/* See Our Data Promise 按钮 */}
            <Link
              href="/terms-privacy?section=data"
              className="flex py-2 px-5.5 items-center hover:bg-black hover:text-white justify-center rounded-full border-black border text-black cursor-pointer transition-colors duration-300"
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
        className={`scroll-animate visible`}
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
          className={`scroll-animate ${visibleSections.has('faq') ? 'visible' : ''}`}
        >
          {/* FAQ 标题 */}
          <h2
            style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize:
                selectedLanguage === Language.ZH_CN ||
                selectedLanguage === Language.ZH_TW ||
                selectedLanguage === Language.JA
                  ? '60px'
                  : selectedLanguage === Language.ES
                    ? '70px'
                    : '80px',
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
                  fontSize:
                    selectedLanguage === Language.ZH_CN ||
                    selectedLanguage === Language.ZH_TW ||
                    selectedLanguage === Language.JA
                      ? '60px'
                      : selectedLanguage === Language.ES
                        ? '70px'
                        : '80px',
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
                {t('theStartOfFiloDescription')
                  .split('\n\n')
                  .map((paragraph, index) => (
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
                      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: isGetFiloTodayHovered ? '0 20px' : '0',
                      width: isGetFiloTodayHovered ? '380px' : '150px',
                      height: '53px',
                      minWidth: '150px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          opacity: isGetFiloTodayHovered ? 0 : 1,
                          transition: 'opacity 0.3s ease-in-out',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t('getFiloToday')}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          opacity: isGetFiloTodayHovered ? 1 : 0,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          transform: isGetFiloTodayHovered ? 'translateX(0)' : 'translateX(20px)',
                          transition: 'all 0.3s ease-in-out 0.2s',
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
                    </div>
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
                      colorScheme: 'light',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'
                      e.currentTarget.style.color = 'black'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white'
                      e.currentTarget.style.color = 'black'
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
          padding: '30px 20px 110px 20px',
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
  )
}
export default memo(Home)