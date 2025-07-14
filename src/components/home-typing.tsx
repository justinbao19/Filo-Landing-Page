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
    </div>
  )
}

export default memo(HomeTyping)
