import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 主要背景框体 - 自适应宽度 x 610px with gradient */}
      <div 
        className="w-full h-[610px] flex-shrink-0"
        style={{
          background: 'linear-gradient(180deg, #E7F5FF 1.04%, #FFF 98.7%)'
        }}
      >
        {/* 内容容器 - 最大宽度1440px居中 */}
        <div className="max-w-[1440px] mx-auto h-full">
          
          {/* 导航栏 */}
          <nav className="flex justify-between items-center px-20 h-20">
            {/* Logo - 使用提供的SVG */}
            <div className="flex items-center flex-shrink-0">
              <Image 
                src="/brand/brand-logo-black.svg"
                alt="Filo Logo"
                width={60}
                height={35.792}
                className="w-[60px] h-[35.792px] flex-shrink-0"
              />
            </div>
            
            {/* 语言选择器 */}
            <div className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
              <span className="text-base">English</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                  letterSpacing: '-5px'
                }}
              >
                Inbox to Done
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
                  margin: '0 auto'
                }}
              >
                Turn overwhelming emails into crystal-clear summaries, quick replies and AI-generated to-dos in one sec.
              </p>
            </div>
            
            {/* 下载按钮组 */}
            <div className="flex gap-4 items-center">
              {/* App Store 按钮 - 使用提供的SVG */}
              <a href="#" className="inline-block hover:opacity-90 transition-opacity">
                <Image 
                  src="/ui/ui-appstore-download.svg"
                  alt="Download on the App Store"
                  width={258}
                  height={74}
                  className="w-auto h-[74px]"
                />
              </a>
              
              {/* macOS 按钮 - 保持原样但调整尺寸匹配 */}
              <a href="#" className="inline-block">
                <div className="bg-blue-500 text-white px-8 py-5 rounded-[12px] flex items-center gap-3 hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl h-[74px]">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="3" y="17" width="18" height="2" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <div className="text-left flex items-center gap-2">
                    <span className="text-lg font-semibold">Download for macOS</span>
                    <span className="text-xs bg-blue-600 px-2 py-0.5 rounded font-medium">Beta</span>
                  </div>
                </div>
              </a>
            </div>
            
          </main>
          
        </div>
        
      </div>
      
      {/* 其余内容区域 - 为后续部分预留空间 */}
      <div className="w-[1440px] mx-auto">
        {/* 这里将是首页的其他部分 */}
        <div className="h-[400px] bg-white"></div>
      </div>
    </div>
  );
}
