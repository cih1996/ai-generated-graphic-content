import React, { useState } from 'react';
import { Rocket, Palette, Crop, TrendingUp, Zap } from 'lucide-react';

const slides = [
  {
    type: 'cover',
    title: '1天播放10万+？',
    subtitle: '0基础小白的逆袭秘籍',
    bgColor: 'bg-purple-600',
    textColor: 'text-white',
    icon: Rocket,
  },
  {
    type: 'content',
    title: '根本不用画画',
    content: '只要把想法告诉AI，它自己就会“画”出来！连排版都省了！',
    highlight: '不用画画',
    bgColor: 'bg-yellow-400',
    textColor: 'text-black',
    icon: Palette,
  },
  {
    type: 'content',
    title: '截图即成品',
    content: 'AI 直接输出完美图文，我只需要手机截图就能发！',
    highlight: '截图即成品',
    bgColor: 'bg-pink-500',
    textColor: 'text-white',
    icon: Crop,
  },
  {
    type: 'content',
    title: '流量直接爆炸',
    content: '不到24小时，播放量冲到10万！这泼天的富贵终于轮到我了！',
    highlight: '流量爆炸',
    bgColor: 'bg-green-500',
    textColor: 'text-black',
    icon: TrendingUp,
  },
  {
    type: 'ending',
    title: '想学吗？',
    content: '关注我，手把手教你用AI搞定爆款！',
    cta: '带带我！',
    bgColor: 'bg-black',
    textColor: 'text-white',
    icon: Zap,
  }
];

const ViralPostStory = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

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
                          <span className={`${slide.bgColor === 'bg-yellow-400' ? 'bg-black text-white' : 'bg-yellow-400 text-black'} px-2 mx-1 transform -skew-x-6 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
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
             <div className="mt-12 animate-bounce">
                <span className="bg-white text-black px-8 py-4 rounded-full text-2xl font-black shadow-[6px_6px_0px_0px_rgba(100,100,100,0.5)] border-2 border-black">
                   {slide.cta} 👇
                </span>
             </div>
          )}
          
        </div>

        {/* Footer/Watermark */}
        <div className="absolute bottom-12 w-full text-center opacity-60 text-sm font-mono font-bold tracking-widest uppercase">
          tap to continue
        </div>
      </div>
    </div>
  );
};

export const meta = {
  id: 'how-i-made-viral-ai-post',
  title: 'AI打造爆款作品经历',
  copy: `🔥爆了！0基础小白如何1天播放量10w+？🤖

家人们谁懂啊！👋 昨天随便发的一条笔记，竟然爆了！

我是真的不会画画，PS更是完全不懂。🎨❌

全靠这个AI神器，我把想法告诉它，啪一下图文就出来了！✨

直接截图就能发，这效率简直离谱！🚀

不到24小时，播放量冲到10万！这泼天的富贵终于轮到我了？💰

想学的姐妹在评论区举手，我把方法整理给你们！👇

#AI黑科技 #自媒体干货 #涨粉秘籍 #AI绘画 #副业赚钱`
};

export default ViralPostStory;
