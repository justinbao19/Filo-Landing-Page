'use client'
import { useTranslations } from 'next-intl'
import { useCallback, useRef, useState } from 'react'

const HomeDownloadDropdown = () => {
  const t = useTranslations('home')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
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
    setIsDropdownOpen((prev) => !prev)
  }, [])
  return (
    <div
      className="relative mac-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleButtonClick}
        className="transition-all md:rounded-[20px] rounded-2xl md:h-[73px] h-[54px] text-white md:px-7.5 px-3 gap-2 flex items-center justify-center duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200/50 hover:brightness-110"
        style={{
          border: '1.5px solid var(--14, rgba(0, 0, 0, 0.04))',
          background: 'var(--02, #22A0FB)',
          boxShadow:
            '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)',
        }}
      >
        <p className="md:text-[20px] leading-1 font-bold">Download for macOS</p>
        <p className="px-2 py-1 rounded-lg bg-white/15 text-xs">Beta</p>
      </button>

      {/* Dropdown 菜单 */}
      {isDropdownOpen && (
        <div
          className="absolute top-full left-0 mt-2 z-30 dropdown-animate w-full"
          style={{
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
  )
}

export default HomeDownloadDropdown
