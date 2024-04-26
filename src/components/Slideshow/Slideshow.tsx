import { Carousel } from 'antd';
import { useRef, useState } from 'react';
import SliderControls from '../SliderControls';
import { CarouselRef } from 'antd/es/carousel';

// interface ICardItemProps {
//     [key: string]: any; // có api thì sẽ định nghĩa lại
// }

interface ISlideshowProps {
    ItemCard: React.ElementType;
}

const Slideshow: React.FC<ISlideshowProps> = ({ ItemCard }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const ref = useRef<CarouselRef>(null);
    const handlePrev = () => {
        if (ref.current) {
            ref.current.prev();
        }
    };
    const handleNext = () => {
        if (ref.current) {
            ref.current.next();
        }
    };
    const data = [1, 1, 1, 1, 1];
    return (
        <>
            <div className='relative'>
                <div className='group'>
                    <Carousel
                        ref={ref}
                        autoplay
                        autoplaySpeed={4000}
                        centerPadding='50'
                        beforeChange={(from, to) => setCurrentSlide(to)}
                        draggable
                        infinite
                        speed={300}
                    >
                        {data.map((item, i) => (
                            <ItemCard key={i} status={currentSlide === i} />
                        ))}
                    </Carousel>
                    <SliderControls isButtonHandle={false} handlePrev={handlePrev} handleNext={handleNext} />
                </div>
            </div>
        </>
    );
};

export default Slideshow;
