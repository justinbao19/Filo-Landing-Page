'use client'
import { useState } from "react"
import { RainbowButton } from "./ui/rainbow-button"
import { useTranslations } from "next-intl"

const HomeRainbowBtn = () => {
  const [isGetFiloTodayHovered, setIsGetFiloTodayHovered] = useState(false)
  const t = useTranslations('home')
  return (
    <div className="inline-block group">
      <RainbowButton
        className="text-white h-[53px] font-semibold overflow-hidden text-base whitespace-nowrap md:group-hover:px-5 md:px-0 md:group-hover:w-[380px] md:w-[150px]"
        style={{
          fontFamily: 'Inter',
          transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '150px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="flex"
        >
          <div
            style={{
              position: 'absolute',
              whiteSpace: 'nowrap',
            }}
            className={`md:group-hover:opacity-0 md:opacity-100 md:pointer-events-none`}
            onClick={() => setIsGetFiloTodayHovered(!isGetFiloTodayHovered)}
          >
            {t('getFiloToday')}
          </div>
          <div
            style={{
              position: 'absolute',
              alignItems: 'center',
              transition: 'all 0.3s ease-in-out',
            }}
            className={`bg-black h-[150px] md:h-[53px] justify-between md:justify-start py-4 md:py-0 rounded-xl md:bg-transparent md:group-hover:flex md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 top-full left-1/2 -translate-x-1/2 md:hidden md:flex-row flex-col md:opacity-0 md:group-hover:opacity-100 md:pointer-events-auto ${isGetFiloTodayHovered ? 'opacity-100 flex pointer-events-auto' : 'opacity-0 hidden pointer-events-none'}`}
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
              className="md:hover:opacity-80"
              target="_blank"
            >
              {t('ios')}
            </a>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                margin: '0',
              }}
              className="md:w-[1px] md:h-4 h-[1px] w-full"
            />
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
              className="md:hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {t('macOSAppleSilicon')}
            </a>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                margin: '0',
              }}
              className="md:w-[1px] md:h-4 h-[1px] w-full my-4 md:my-0"
            />
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
              className="md:hover:opacity-80"
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
  )
}

export default HomeRainbowBtn
