'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import HomeFloat from './home-float'
import HomeTyping from './home-typing'
import Image from 'next/image'
import Link from 'next/link'

const HomeSection = () => {
  const t = useTranslations('home')
  const locale = useLocale()
  const getFiloTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isGetFiloDropdownOpen, setIsGetFiloDropdownOpen] = useState(false)
  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set())
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

  useEffect(() => {
    const sections = new Set<string>()
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

  return (
    <>
      {/* Never Miss a Task 区域 */}
      <div
        className={`scroll-animate md:pt-[120px] pt-[70px] md:pb-[160px] pb-[80px] ${visibleSections.has('email-task') ? 'visible' : ''}`}
        data-section="email-task"
        style={{
          width: '100%',
          background: 'var(--09, #FCFAFA)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <HomeFloat />
      </div>

      {/* Respond the tone you want 区域 */}
      <div
        className={`scroll-animate md:gap-30 gap-15 md:pt-[50px] pt-[70px] md:pb-[160px] pb-[100px] ${visibleSections.has('tone') ? 'visible' : ''}`}
        data-section="tone"
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'var(--09, #FCFAFA)',
        }}
      >
        {/* 这里将添加新板块的内容 */}
        <div style={{ width: '100%' }}>
          <h2
            className={`text-[56px] font-bold flex flex-col justify-center ${locale === 'ja' || locale === 'zh-TW' || locale === 'zh-CN' || locale === 'ko' ? 'md:text-[60px]' : 'md:text-[70px]'}`}
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              textAlign: 'center',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '120%',
              letterSpacing: '-3px',
              margin: 0,
            }}
          >
            <p>{`${t('respondTheToneYouWant1')}`}</p>
            <p>{t('respondTheToneYouWant2')}</p>
          </h2>
        </div>

        {/* 三个语调选项区域 */}
        <div
          className="flex md:flex-row flex-col md:gap-30 gap-7.5 md:justify-between"
          style={{
            width: '100%',
            maxWidth: '1200px',
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
              className="group"
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
                className="md:group-hover:-translate-x-[3.5rem] md:group-hover:-translate-y-[3.5rem]"
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
                className="md:group-hover:translate-x-[3.5rem] md:group-hover:translate-y-[3.5rem]"
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
              className="group"
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
                className="md:group-hover:-translate-x-[3.5rem] md:group-hover:-translate-y-[3.5rem]"
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
                className="md:group-hover:translate-x-[3.5rem] md:group-hover:translate-y-[3.5rem]"
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
              className="group"
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
                className="md:group-hover:-translate-x-[3.5rem] md:group-hover:-translate-y-[3.5rem]"
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
                className="md:group-hover:translate-x-[3.5rem] md:group-hover:translate-y-[3.5rem]"
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
        className={`scroll-animate md:pb-[180px] pb-[80px] ${visibleSections.has('write-ai') ? 'visible' : ''}`}
        data-section="write-ai"
        style={{
          display: 'flex',
          width: '100%',
          paddingTop: '0px',
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
            className="flex md:flex-row flex-col gap-2 justify-center items-center"
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
              {t('or')}
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
              {t('orWriteWithAI')}
            </span>
          </h2>
        </div>

        {/* 输入框区域 */}
        <HomeTyping />
      </div>

      {/* Powered by top-tier AI 区域 */}
      <div
        className={`scroll-animate z-50 md:pb-32 md:pt-25 py-20 ${visibleSections.has('ai-powered') ? 'visible' : ''}`}
        data-section="ai-powered"
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#FFFFFF',
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
          }}
          className="flex md:flex-row flex-col md:px-15 px-5 justify-center items-center md:gap-30 gap-10"
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
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '-3px',
                margin: 0,
              }}
              className={`text-[56px] ${locale === 'ja' || locale === 'zh-TW' || locale === 'zh-CN' || locale === 'ko' ? 'md:text-[60px]' : 'md:text-[70px]'}`}
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
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '150%',
                margin: 0,
                maxWidth: '520px',
              }}
              className="md:text-[18px] text-[16px]"
            >
              {t('poweredByTopTierAIDescription')}
            </p>

            {/* Get Filo Today 按钮 */}
            <div
              className="relative hidden md:block"
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
          <div
            className="relative block md:hidden mb-20 mt-20"
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
              className="md:hover:bg-black md:hover:text-white"
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
      </div>

      {/* 隐私安全区域 */}
      <div
        className={`scroll-animate flex md:h-[700px] py-10 items-center justify-center flex-col md:flex-row ${visibleSections.has('privacy') ? 'visible' : ''}`}
        data-section="privacy"
        style={{
          width: '100%',
          background: '#F4ECE2',
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
          }}
          className=" md:gap-30 gap-10 flex md:flex-row flex-col justify-center items-center"
        >
          {/* 左侧储物柜图片 */}
          <div
            style={{
              flex: '1',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="md:flex hidden"
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
            className="gap-10 px-10 w-full"
          >
            {/* 大标题 */}
            <h2
              style={{
                color: 'var(--06, #000)',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: '-2.4px',
                margin: 0,
              }}
              className={`text-[56px] ${locale === 'ja' || locale === 'zh-TW' || locale === 'zh-CN' || locale === 'ko' ? 'md:text-[60px]' : 'md:text-[70px]'}`}
            >
              {t('noPeeking')}
              <br />
              {t('noPeekingPromise')}
            </h2>

            {/* 中间 tagline */}
            <p
              style={{
                color: '#9B601A',
                textAlign: 'center',
                fontFeatureSettings: '"liga" off, "clig" off',
                fontFamily: 'Georgia',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '150%',
                letterSpacing: '0.5px',
                margin: 0,
              }}
              className="md:w-[380px] w-[310px] md:text-[20px] text-[16px]"
            >
              {t('privacyTagline')}
            </p>

            {/* 第三段文字 */}
            <p
              style={{
                color: 'var(--07, #707070)',
                textAlign: 'center',
                fontFeatureSettings: '"liga" off, "clig" off',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '150%',
                margin: 0,
              }}
              className="md:w-[520px] w-[310px] md:text-[18px] text-[16px]"
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
              className="md:flex hidden py-2 px-5.5 items-center hover:bg-black hover:text-white justify-center rounded-full border-black border text-black cursor-pointer transition-colors duration-300"
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
          <div
            style={{
              flex: '1',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="flex md:hidden px-10 relative"
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
            <Link
              href="/terms-privacy?section=data"
              className="flex md:hidden py-2 px-5.5 bg-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-white border text-white cursor-pointer transition-colors duration-300"
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
                className="text-nowrap"
              >
                {t('seeOurDataPromise')}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ 区域 */}
      <div
        className={`scroll-animate visible will-change-[height] md:py-[160px] py-[80px] md:px-15 px-5`}
        data-section="faq"
        style={{
          width: '100%',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '120%',
              letterSpacing: '-3px',
              margin: 0,
            }}
            className={`text-[56px] ${locale === 'ja' || locale === 'zh-TW' || locale === 'zh-CN' || locale === 'ko' ? 'md:text-[60px]' : 'md:text-[70px]'}`}
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
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                    }}
                    className="md:p-7.5 p-5"
                  >
                    <span
                      style={{
                        color: '#FFF',
                        textAlign: 'center',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '130%',
                        transition: 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                      className="md:text-[24px] text-[20px] md:hover:opacity-70"
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
                      className="hidden md:inline"
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
    </>
  )
}

export default HomeSection
