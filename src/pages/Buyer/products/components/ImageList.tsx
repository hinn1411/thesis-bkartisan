import { ASSETS } from '@contants/assets';
import { FC, memo, Dispatch } from 'react';

export interface ImageSliderProps {
  isLoading: boolean;
  data: any;
  className?: string;
  currentSlide: number;
  setSide: Dispatch<number>;
}

const ImageList: FC<ImageSliderProps> = memo(
  ({ isLoading, data, className, currentSlide, setSide }) => {
    let style = 'flex mt-10 space-x-4 flex-wrap';
    if (className) {
      style = className;
    }

    if (isLoading || data.assets.length === 0) {
      return (
        <ul className={`${style}`}>
          <li>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
          </li>
          <li>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
          </li>
          <li>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
          </li>
          <li>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
          </li>
          <li>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
          </li>
          <li>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
          </li>
        </ul>
      );
    }
    return (
      <ul className={`${style}`}>
        {data.assets.map((asset: any, index: number) => (
          <li className="w-20 h-20" key={index} onClick={() => setSide(index)}>
            {asset.type == ASSETS.IMAGE ? (
              <img
                className={`${
                  index != currentSlide
                    ? 'opacity-50'
                    : 'border-2 border-black shadow-md'
                } w-full h-full rounded-[10px] overflow-hidden`}
                src={asset.link}
                alt="..."
              />
            ) : (
              <video
                src={asset.link}
                className={`${
                  index != currentSlide
                    ? 'opacity-50 border-2'
                    : 'border-2 border-black shadow-md'
                } w-20 h-20 rounded-[10px] overflow-hidden`}
                // controls
              >
                Your browser does not support the video tag.
              </video>
            )}
          </li>
        ))}
      </ul>
    );
  }
);

export default ImageList;
