import React from 'react';

const CarouselItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className='mx-[6px]  bg-transparent'>
                {/* @CardItem */}
                {children}
            </div>
        </div>
    );
};

export default CarouselItem;
