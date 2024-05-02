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

    if (isLoading) {
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
        {data.images.map((image: string, index: number) => (
          <li key={index} onClick={() => setSide(index + 1)}>
            <img

              className={`${
                index + 1 != currentSlide
                  ? 'opacity-50'
                  : 'border-2 border-black shadow-md'
              } w-20 h-20 rounded-[10px] overflow-hidden`}
              src={image}
              alt="..."
            />
          </li>
        ))}
      </ul>
    );
  }
);

export default ImageList;
