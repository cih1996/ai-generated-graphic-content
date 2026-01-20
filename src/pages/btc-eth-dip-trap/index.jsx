import React, { useState } from 'react';
import { TrendingDown, AlertTriangle, Skull, DollarSign, ShieldAlert } from 'lucide-react';

export const slides = [
  {
    type: 'cover',
    title: '抄底？接盘！',
    subtitle: '别让你的年终奖，变成庄家的年终奖！',
    bgColor: 'bg-red-600',
    textColor: 'text-white',
    icon: TrendingDown,
  },
  {
    type: 'content',
    title: '还在跌！',
    content: 'BTC和ETH跌跌不休，你以为是“倒车接人”？醒醒吧！这是在诱敌深入！',
    highlight: '诱敌深入',
    bgColor: 'bg-yellow-400',
    textColor: 'text-black',
    icon: AlertTriangle,
  },
  {
    type: 'content',
    title: '精准爆仓',
    content: '故意反弹一点点，骗你上车，然后一根大阴线直接带走你的止损！',
    highlight: '精准爆仓',
    bgColor: 'bg-gray-900',
    textColor: 'text-white',
    icon: Skull,
  },
  {
    type: 'content',
    title: '谁在过肥年？',
    content: '是你吗？不！是拿走你血汗钱的狗庄！他们在开香槟庆祝！',
    highlight: '狗庄',
    bgColor: 'bg-green-500',
    textColor: 'text-black',
    icon: DollarSign,
  },
  {
    type: 'ending',
    title: '管住手！',
    content: '看不懂盘面结构就别动，保住本金才是硬道理！',
    cta: '拒绝接盘',
    bgColor: 'bg-indigo-600',
    textColor: 'text-white',
    icon: ShieldAlert,
  }
];

const CryptoDipTrap = ({ pageIndex, isExport }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const activeIndex = pageIndex !== undefined ? pageIndex : currentSlide;
  const slide = slides[activeIndex];
  const Icon = slide.icon;

  // Fix for html2canvas vertical alignment
  // In export mode, we use different padding to ensure text is centered
  const highlightPadding = isExport ? 'pt-2 pb-3' : 'pt-1 pb-2';

  return (
    <div className="flex items-center justify-center min-h-full bg-gray-900">
      <div 
        onClick={handleNext}
        className={`relative aspect-[9/16] h-full w-full ${slide.bgColor} ${slide.textColor} overflow-hidden shadow-2xl cursor-pointer flex flex-col transition-colors duration-300`}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 flex gap-1 px-2 pt-2 z-10">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`h-full flex-1 rounded-full transition-all duration-300 ${index <= currentSlide ? 'bg-white/90' : 'bg-black/20'}`}
            />
          ))}
        </div>

        {/* Content Container - Safety Zone Applied: pt-[25%] pb-[30%] px-[15%] */}
        <div className="flex-1 flex flex-col pt-[25%] pb-[30%] px-[15%] items-center justify-center text-center relative">
          
          {/* Icon */}
          <div className="mb-8 transform rotate-[-5deg] transition-transform duration-500 hover:rotate-0">
             <Icon size={120} strokeWidth={2.5} className="drop-shadow-xl" />
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black mb-6 leading-tight tracking-tighter drop-shadow-md">
            {slide.title}
          </h1>

          {/* Subtitle / Content */}
          <div className="text-2xl font-bold max-w-[280px] leading-relaxed relative">
             {slide.type === 'content' ? (
                <span>
                   {slide.content.split(slide.highlight).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className={`${slide.bgColor === 'bg-yellow-400' ? 'bg-black text-white' : 'bg-yellow-400 text-black'} px-2 ${highlightPadding} mx-1 transform -skew-x-6 inline-block leading-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                            {slide.highlight}
                          </span>
                        )}
                      </React.Fragment>
                   ))}
                </span>
             ) : (
                <span className="opacity-90">{slide.subtitle || slide.content}</span>
             )}
          </div>

          {/* Ending CTA */}
          {slide.type === 'ending' && (
             <div className="mt-12">
                <span className="bg-white text-black px-8 py-4 rounded-full text-2xl font-black shadow-[6px_6px_0px_0px_rgba(100,100,100,0.5)] border-2 border-black inline-flex items-center justify-center">
                   {slide.cta} 👇
                </span>
             </div>
          )}
          
        </div>

      </div>
    </div>
  );
};

export const meta = {
  id: 'btc-eth-dip-trap',
  title: '抄底还是接盘？',
  copy: `😭哭死！以为抄底过肥年，结果被狗庄狠狠上课！📉

家人们谁懂啊！看着BTC和ETH跌跌不休，以为机会来了？🛑

你以为是“倒车接人”，其实是“灵车漂移”！🏎️⚰️

辛辛苦苦攒的钱，想着抄底赚一波过个好年，结果全送给狗庄发年终奖了！💸

盘面结构一眼假，这就是典型的“诱多杀猪盘”！触发你的止损，爆掉你的仓位！💥

真正过肥年的，只有那些收割你的庄家！🏦

听劝！管住手，看不懂结构别乱冲，保住本金才是硬道理！🙏

#BTC #ETH #抄底 #爆仓 #交易心态 #加密货币 #避坑指南`
};

export default CryptoDipTrap;
