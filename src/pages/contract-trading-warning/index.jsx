import React, { useState } from 'react';
import { TrendingDown, Trash2, Brain, AlertTriangle } from 'lucide-react';

export const slides = [
  {
    type: 'cover',
    title: '合约 = 碎钞机？',
    subtitle: '模拟盘都没玩明白，你也敢冲？',
    bgColor: 'bg-yellow-400',
    textColor: 'text-black',
    icon: AlertTriangle,
  },
  {
    type: 'content',
    title: '一年积蓄 几分钟归零',
    content: '辛辛苦苦搬砖攒的钱，只需一根针，瞬间灰飞烟灭。',
    highlight: '几分钟归零',
    bgColor: 'bg-indigo-600',
    textColor: 'text-white',
    icon: TrendingDown,
  },
  {
    type: 'content',
    title: '扔钱进垃圾桶',
    content: '闭眼把钱扔进垃圾桶你心疼吗？玩合约爆仓时，你为什么不心疼？',
    highlight: '扔钱进垃圾桶',
    bgColor: 'bg-red-500',
    textColor: 'text-white',
    icon: Trash2,
  },
  {
    type: 'ending',
    title: '别做“慈善家”',
    content: '先去模拟盘练练手，或者老实囤币。',
    cta: '清醒一点！',
    bgColor: 'bg-green-500',
    textColor: 'text-black',
    icon: Brain,
  }
];

const ContractTradingWarning = ({ pageIndex, isExport }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const activeIndex = pageIndex !== undefined ? pageIndex : currentSlide;
  const slide = slides[activeIndex];
  const Icon = slide.icon;

  // Fix for html2canvas vertical alignment
  const highlightPadding = isExport ? 'pt-2 pb-3' : 'pt-1 pb-2';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div 
        onClick={handleNext}
        className={`relative aspect-[9/16] h-[800px] w-auto ${slide.bgColor} ${slide.textColor} overflow-hidden shadow-2xl cursor-pointer flex flex-col transition-colors duration-300`}
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

        {/* Content Container - Safety Zone Applied */}
        {/* pt-[25%] pb-[30%] px-[15%] as requested */}
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
  id: 'contract-trading-warning',
  title: '合约交易避坑指南',
  copy: `😭救命！如果你模拟盘都玩不明白，千万别碰合约！🔥

家人们谁懂啊！👋 我是真没想到，还有人连K线都看不懂就敢去开百倍合约！🤯

这就好比你连自行车都不会骑，直接去开F1赛车，这不就是纯纯的送人头吗？🏎️💥

1️⃣ **一年白干**：辛辛苦苦打工攒的钱，几分钟就爆仓归零，那种心凉的感觉真的比失恋还难受！💸

2️⃣ **扔钱行为**：你要是敢把几万块现金扔进垃圾桶还面不改色，那你玩合约我没意见。如果不敢，就别去送钱！🗑️

3️⃣ **清醒一点**：模拟盘是你的试错成本，实盘就是真金白银的学费。别用自己的血汗钱去挑战人性！🧠

听我一句劝，先在模拟盘里活下来，再考虑进场。不然你就是币圈最大的“慈善家”！🙏

#合约交易 #币圈避坑 #交易心态 #韭菜日记 #投资理财 #加密货币 #模拟盘 #拒绝赌徒心态 #程序员日常 #技术复盘 #DevOps`
};

export default ContractTradingWarning;
