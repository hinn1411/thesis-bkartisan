import { Dispatch, FC, memo } from 'react';
import { Carousel } from 'flowbite-react';
export interface ImageSliderProps {
  data: any;
  isLoading: boolean;
  currentSlide: number;
  setSlide: Dispatch<number>;
}

const ImageSlider: FC<ImageSliderProps> = memo(
  ({ data, isLoading, currentSlide, setSlide }) => {
    if (isLoading) {
      return (
        <Carousel
          onSlideChange={(index) => {
            console.log(`slide change = ${index}`);
            setSlide(index + 1);
          }}
          slide={false}
          // indicators={true}
        >
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
        </Carousel>
      );
    }
    return (
      <Carousel activeSlide={2} indicators={true}>
        {data.images.map((image: string, index: number) => (
          <img key={index} src={image} />
        ))}
      </Carousel>
    );
  }
);

export default ImageSlider;
