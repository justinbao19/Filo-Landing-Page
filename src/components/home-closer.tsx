'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { memo, useCallback, useEffect, useState } from 'react'

const HomeCloser = () => {
  const t = useTranslations('home')

  const [selectedView, setSelectedView] = useState<'mobile' | 'desktop'>('mobile')
  const [hasPlayedLineAnimation, setHasPlayedLineAnimation] = useState(false)

  // A Closer Look Mobile 线条动画状态
  const [mobileLineAnimations, setMobileLineAnimations] = useState<Set<number>>(new Set())

  const [isVisible, setIsVisible] = useState(false)

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


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      })
    })

    const closerLookContainer = document.querySelector('.closer-look-container')
    if (closerLookContainer) {
      observer.observe(closerLookContainer)
    }

    return () => {
      if (closerLookContainer) {
        observer.unobserve(closerLookContainer)
      }
    }
  }, [])

  // A Closer Look Mobile 线条动画触发 - 只在页面加载时触发一次
  useEffect(() => {
    if (
      !hasPlayedLineAnimation &&
      selectedView === 'mobile' &&
      isVisible
    ) {
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
  }, [selectedView, hasPlayedLineAnimation, isVisible])

  return (
    <div className="max-w-[1440px] mx-auto md:px-20 closer-look-container md:pb-20 pb-10 bg-white">
      {/* 标题 */}
      <div
        className="text-center mb-20 relative z-20"
        style={{
          position: 'relative',
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
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '130%',
            letterSpacing: '-2px',
          }}
          className={`md:text-[70px] text-[56px]`}
        >
          {t('aCloserLook')}
        </h2>
      </div>

      {/* Mobile/Desktop 切换按钮 */}
      <div
        className="flex justify-center mb-15 relative z-20 will-change-transform md:mb-20"
      >
        <div
          className="relative grid grid-cols-2 items-center justify-center md:shadow-2xl shadow-xl md:w-[368px] w-[276px] md:h-[58px] h-[46px] py-1 px-1"
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '62px',
            background: 'var(--05, #E9F6FF)',
          }}
        >
          {/* 滑动的蓝色背景 */}
          <div
            className="md:w-[181px] w-[135px] absolute md:h-[52px] h-[40px] md:top-1 md:left-1 top-[3px] left-[3px] transition-all duration-300 ease-in-out will-change-transform"
            style={{
              backgroundColor: '#22A0FB',
              borderRadius: '26px',
              left: selectedView === 'desktop' ? 'calc(50% - 3px)' : '3px',
              zIndex: 1,
            }}
          />

          <button
            onClick={() => handleViewToggle('mobile')}
            className="relative w-full md:text-[20px] text-[15px] flex items-center justify-center h-full z-10 rounded-full transition-colors duration-300 will-change-transform"
            style={{
              backgroundColor: 'transparent',
              color: selectedView === 'mobile' ? 'white' : 'var(--02, #22A0FB)',
              textAlign: 'center',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '150%',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {t('mobile')}
          </button>
          <button
            onClick={() => handleViewToggle('desktop')}
            className="relative md:text-[20px] text-[15px] w-full h-full flex items-center justify-center z-10 rounded-full transition-colors duration-300 will-change-[transform,color]"
            style={{
              backgroundColor: 'transparent',
              color: selectedView === 'desktop' ? 'white' : 'var(--02, #22A0FB)',
              textAlign: 'center',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '150%',
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
        className="relative flex flex-nowrap z-10 md:mb-30 overflow-hidden w-full"
      >
       
        {/* Mobile 视图 */}
        <div
          className={`w-full shrink-0 inline-block h-fit transition-all duration-300 md:duration-700 translate-y-0 will-change-[transform,opacity] ${
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
              className={`relative md:bg-[url(/icons/feature/feature_iphone_circle.png)] bg-contain bg-no-repeat z-0 md:w-[800px] flex justify-center transition-all duration-500 will-change-[transform,opacity] ${
                selectedView === 'mobile' ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
              }`}
              style={{
                transform: 'translateY(50px)',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: selectedView === 'mobile' ? '200ms' : '0ms',
                backgroundPosition: 'center 150px',
              }}
            >
              <Image
                src="/icons/feature/feature_iphone_mockup.png"
                alt="iPhone mockup showing Filo app"
                width={1278}
                height={2172}
                className="w-[540px] h-auto z-50"
              />
            </div>

            {/* 功能标签 */}
            <div
              className={`absolute lg:block hidden left-[195px] top-[390px] feature-line feature-line-1 z-10 ${mobileLineAnimations.has(1) ? 'animate-sequence' : ''}`}
            >
              <div className="flex flex-col items-start" style={{ gap: '8px' }}>
                <Image src="/icons/feature/feature_line2.svg" alt="line" width={320} height={1} />
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
              className={`absolute lg:block hidden right-[117px] top-[270px] feature-line feature-line-2 z-10 ${mobileLineAnimations.has(2) ? 'animate-sequence' : ''}`}
            >
              <div className="flex flex-col items-end" style={{ gap: '8px' }}>
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
                  {t('summarizeWhatMatters')}
                </p>
              </div>
            </div>

            <div
              className={`absolute lg:block hidden right-[120px] top-[450px] feature-line feature-line-3 z-10 ${mobileLineAnimations.has(3) ? 'animate-sequence' : ''}`}
            >
              <div className="flex flex-col items-end" style={{ gap: '8px' }}>
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
                  {t('syncTodos')}
                </p>
              </div>
            </div>

            <div
              className={`absolute lg:block hidden left-[195px] top-[682px] feature-line feature-line-4 z-10 ${mobileLineAnimations.has(4) ? 'animate-sequence' : ''}`}
            >
              <div className="flex flex-col items-start" style={{ gap: '8px' }}>
                <Image src="/icons/feature/feature_line4.svg" alt="line" width={320} height={1} />
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
          className={`w-full shrink-0 inline-block h-fit translate-y-40 md:translate-y-0 transition-all duration-300 md:duration-700 will-change-[transform,opacity] ${
            selectedView === 'desktop'
              ? '-translate-x-full opacity-100 scale-100'
              : 'translate-x-0 opacity-0 scale-95'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: selectedView === 'desktop' ? '100ms' : '0ms',
          }}
        >
          <div className="relative flex justify-center items-center h-full">
            <div
              className={`transition-all duration-500 will-change-[transform,opacity] ${
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
                style={{ maxHeight: '911px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button - Only show when mobile view is selected */}
      {selectedView === 'mobile' && (
        <div
          className="md:flex hidden justify-center -mt-16"
          style={{
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
          className="hidden justify-center -mt-40 md:flex"
          style={{
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
  )
}

export default memo(HomeCloser)
