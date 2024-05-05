import { Dispatch, FC, memo, useEffect, useRef } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { BsCircleFill } from 'react-icons/bs';
import { ASSETS } from '@contants/assets';
import ReactPlayer from 'react-player';
export interface NativeSliderProps {
  isLoading: boolean;
  data: any;
  currentSlide: number;
  setSlide: Dispatch<number>;
  parentWidth?: number;
}

const ImageSlider: FC<NativeSliderProps> = memo(
  ({ data, currentSlide, setSlide, isLoading }) => {
    // const timerRef = useRef<number>();

    // useEffect(() => {
    //   if (timerRef.current) {
    //     clearTimeout(timerRef.current);
    //   }
    //   timerRef.current = setTimeout(() => {
    //     goToNext();
    //   }, 2000);

    //   return () => clearTimeout(timerRef.current);
    // });

    const goToPrevious = () => {
      const isFirstSlide = currentSlide === 0;
      const newIndex = isFirstSlide ? data.assets.length - 1 : currentSlide - 1;
      setSlide(newIndex);
    };
    const goToNext = () => {
      const isLastSlide = currentSlide === data.assets.length - 1;
      const newIndex = isLastSlide ? 0 : currentSlide + 1;
      setSlide(newIndex);
    };
    // console.log(`sliderwith = ${sliderWidth}`);

    if (isLoading || data.assets.length === 0) {
      return (
        <div
          className="h-full rounded-[10px]"
          style={{
            backgroundImage: `url(https://flowbite.com/docs/images/carousel/carousel-1.svg)`,
          }}
        ></div>
      );
    }
    return (
      <div className={`h-full relative `}>
        {/* Left arrow */}
        <div
          onClick={goToPrevious}
          style={{
            transform: 'translate(0, 0)',
          }}
          className="absolute top-[50%] translate-y-[-50%] left-12 md:left-20 flex justify-center items-center p-4 bg-white rounded-full shadow-lg z-10 cursor-pointer"
        >
          <ArrowLeftOutlined onClick={goToPrevious} />
        </div>
        {/* Right arrow */}
        <div
          onClick={goToNext}
          style={{
            transform: 'translate(0, 0)',
          }}
          className="absolute top-[50%] translate-y-[-50%] right-12 md:right-20 flex justify-center items-center p-4 bg-white rounded-full shadow-lg z-10 cursor-pointer"
        >
          <ArrowRightOutlined onClick={goToNext} />
        </div>
        {data.assets[currentSlide].type === ASSETS.VIDEO ? (
          <video
            src={data.assets[currentSlide].link}
            // controls
            className="rounded-[10px] h-full"
            autoPlay={true}
          ></video>
        ) : (
          <div
            className={`h-full rounded-[10px] bg-center bg-auto`}
            style={{
              backgroundImage: `url(${data.assets[currentSlide].link})`,
            }}
          ></div>
        )}

        {/* <div className="overflow-hidden h-full">
          <ul
            className="overflow-hidden h-full flex justify-start"
            style={{
              transition: 'transform ease-out 0.3s',
              transform: `translateX(${-currentSlide * parentWidth}px)`,
              width: data.length * parentWidth,
            }}
          >
            {data.map((slide, index) => (
              <div
                key={index}
                className={`h-full w-[${parentWidth}px] rounded-[10px] bg-center bg-auto`}
                style={{ backgroundImage: `url(${slide})` }}
              ></div>
            ))}
          </ul>
        </div> */}
        {/* Bullets */}

        <div className="absolute bottom-4 translate-x-[-50%] left-[50%] flex space-x-2">
          {data.assets.map((_, index: number) => (
            <BsCircleFill
              style={{
                color: `${currentSlide === index ? 'gray' : 'white'}`,
              }}
              onClick={() => setSlide(index)}
              className="cursor-pointer"
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default ImageSlider;
