import { Language, LANGUAGE_OPTIONS } from '@/lib/locale'
import Image from 'next/image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const HomeLanguage = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(Language.EN)

  useEffect(() => {
    setSelectedLanguage((cookies.get('user-locale') as Language) || Language.EN)
  }, [])

  const languageTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 处理语言下拉菜单鼠标进入
  const handleLanguageMouseEnter = useCallback(() => {
    if (languageTimeoutRef.current) {
      clearTimeout(languageTimeoutRef.current)
      languageTimeoutRef.current = null
    }
    setIsLanguageDropdownOpen(true)
  }, [])

  // 处理语言下拉菜单鼠标离开
  const handleLanguageMouseLeave = useCallback(() => {
    languageTimeoutRef.current = setTimeout(() => {
      setIsLanguageDropdownOpen(false)
    }, 100)
  }, [])

  // 处理语言选择
  const handleLanguageSelect = useCallback((language: Language) => {
    setSelectedLanguage(language)
    setIsLanguageDropdownOpen(false)
    cookies.set('user-locale', language, { path: '/' })
    window.location.reload()
  }, [])

  return (
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
              <span>{LANGUAGE_OPTIONS.find((e) => e.value === Language.EN)?.nativeLabel}</span>
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
              <span>{LANGUAGE_OPTIONS.find((e) => e.value === Language.ES)?.nativeLabel}</span>
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
              <span>{LANGUAGE_OPTIONS.find((e) => e.value === Language.ZH_CN)?.nativeLabel}</span>
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
              <span>{LANGUAGE_OPTIONS.find((e) => e.value === Language.ZH_TW)?.nativeLabel}</span>
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
              <span>{LANGUAGE_OPTIONS.find((e) => e.value === Language.JA)?.nativeLabel}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default memo(HomeLanguage)
