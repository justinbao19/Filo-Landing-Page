import { useLocale } from 'next-intl'

const HomeTitle = ({ title }: { title: string }) => {
  const locale = useLocale()
  return (
    <h2
      style={{
        color: 'var(--06, #000)',
        fontFeatureSettings: '"liga" off, "clig" off',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '130%',
        letterSpacing: '-3px',
        margin: 0,
      }}
      className={`md:text-[70px] text-[54px] md:text-left text-center md:px-0 px-5 ${locale === 'ja' || locale === 'zh-TW' || locale === 'zh-CN' || locale === 'ko' ? 'md:text-[60px]' : 'md:text-[70px]'}`}
    >
      {title}
    </h2>
  )
}

export default HomeTitle
