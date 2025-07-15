'use client'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

const HomeTyping = () => {
  const t = useTranslations('home')
  // 输入框动态文本状态
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')

  // 输入框文本内容
  const inputTexts = useMemo(() => {
    return [
      t('inputScrollText1'),
      t('inputScrollText2'),
      t('inputScrollText3'),
      t('inputScrollText4'),
    ]
  }, [])

  const [isVisible, setIsVisible] = useState(false)

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const nextTextTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 打字效果和文本循环
  useEffect(() => {
    if (!isVisible) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
      if (nextTextTimeoutRef.current) {
        clearTimeout(nextTextTimeoutRef.current)
        nextTextTimeoutRef.current = null
      }
      return
    }

    const currentText = inputTexts[currentTextIndex]
    const currentLength = displayText.length

    if (currentLength < currentText.length) {
      // 正在打字
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayText(currentText.slice(0, currentLength + 1))
      }, 50) // 50ms 每个字符，更快的打字速度
    } else {
      // 打字完成，等待1秒后切换到下一个文本
      nextTextTimeoutRef.current = setTimeout(() => {
        setDisplayText('')
        setCurrentTextIndex((prev) => (prev + 1) % inputTexts.length)
        // 不改变 isTyping 状态，保持光标显示
      }, 1000)
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
      if (nextTextTimeoutRef.current) {
        clearTimeout(nextTextTimeoutRef.current)
        nextTextTimeoutRef.current = null
      }
    }
  }, [displayText, currentTextIndex, inputTexts, isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      })
    })

    const typingContainer = document.querySelector('.typing-container')
    if (typingContainer) {
      observer.observe(typingContainer)
    }

    return () => {
      if (typingContainer) {
        observer.unobserve(typingContainer)
      }
    }
  }, [])

  return (
    <div
      className="typing-container"
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <div
        className="hidden md:block"
        style={{ position: 'relative', width: '800px', height: '110px' }}
      >
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
          <rect x="20" y="20" width="760" height="70" rx="35" ry="35" fill="rgba(0, 0, 0, 0.04)" />

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
      <div className="block md:hidden">
        <svg
          width="375"
          height="146"
          viewBox="0 0 375 146"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_dddddd_13007_121801)">
            <rect x="22.5" y="0.291016" width="330" height="55" rx="27.5" fill="#F6F6F6" />
            <rect
              x="32.5"
              y="10.291"
              width="310"
              height="35"
              rx="17.5"
              fill="black"
              fillOpacity="0.04"
            />
            <path
              d="M42.6235 25.4028C42.8145 24.6151 43.9349 24.6151 44.1259 25.4028L44.6515 27.5704C44.7197 27.8516 44.9393 28.0712 45.2205 28.1394L47.388 28.665C48.1758 28.856 48.1758 29.9764 47.388 30.1674L45.2205 30.693C44.9393 30.7612 44.7197 30.9808 44.6515 31.262L44.1259 33.4295C43.9349 34.2173 42.8145 34.2173 42.6235 33.4295L42.0979 31.262C42.0297 30.9808 41.8101 30.7612 41.5288 30.693L39.3613 30.1674C38.5736 29.9764 38.5736 28.856 39.3613 28.665L41.5288 28.1394C41.8101 28.0712 42.0297 27.8516 42.0979 27.5704L42.6235 25.4028Z"
              fill="#22A0FB"
            />
            <path
              d="M48.3943 21.8748C48.4954 21.4578 49.0886 21.4578 49.1897 21.8748L49.4679 23.0223C49.504 23.1712 49.6203 23.2875 49.7692 23.3236L50.9167 23.6018C51.3338 23.7029 51.3338 24.2961 50.9167 24.3972L49.7692 24.6755C49.6203 24.7116 49.504 24.8278 49.4679 24.9767L49.1897 26.1242C49.0886 26.5413 48.4954 26.5413 48.3943 26.1242L48.116 24.9767C48.0799 24.8278 47.9637 24.7116 47.8148 24.6755L46.6673 24.3972C46.2502 24.2961 46.2502 23.7029 46.6673 23.6018L47.8148 23.3236C47.9637 23.2875 48.0799 23.1712 48.116 23.0223L48.3943 21.8748Z"
              fill="#22A0FB"
            />
            <text
            x="55"
            y="33"
            fill="#707070"
            fontSize="12"
            fontFamily="Inter, sans-serif"
            fontWeight="400"
          >
            {displayText}
          </text>
          </g>
          <defs>
            <filter
              id="filter0_dddddd_13007_121801"
              x="-17.5"
              y="0.291016"
              width="410"
              height="145"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1.38363" />
              <feGaussianBlur stdDeviation="0.553451" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_13007_121801"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="3.32505" />
              <feGaussianBlur stdDeviation="1.33002" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0287542 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_13007_121801"
                result="effect2_dropShadow_13007_121801"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="6.26078" />
              <feGaussianBlur stdDeviation="2.50431" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0238443 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_dropShadow_13007_121801"
                result="effect3_dropShadow_13007_121801"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="11.1682" />
              <feGaussianBlur stdDeviation="4.46726" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
              <feBlend
                mode="normal"
                in2="effect3_dropShadow_13007_121801"
                result="effect4_dropShadow_13007_121801"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="20.8888" />
              <feGaussianBlur stdDeviation="8.35552" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0161557 0"
              />
              <feBlend
                mode="normal"
                in2="effect4_dropShadow_13007_121801"
                result="effect5_dropShadow_13007_121801"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="50" />
              <feGaussianBlur stdDeviation="20" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0112458 0"
              />
              <feBlend
                mode="normal"
                in2="effect5_dropShadow_13007_121801"
                result="effect6_dropShadow_13007_121801"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect6_dropShadow_13007_121801"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default memo(HomeTyping)
