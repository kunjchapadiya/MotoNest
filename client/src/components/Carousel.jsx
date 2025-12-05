import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // IMPORTANT

const CarImageCarousel = ({ images }) => {
    return (
        <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden">
            <Carousel
                infiniteLoop={true}
                autoPlay={true}
                showArrows={true}
                showStatus={false}
                swipeable={true}
                emulateTouch={true}
                thumbWidth={100}
                showThumbs={false}
                dynamicHeight={false}
                interval={3000}
                className="rounded-xl object-contain"
            >
                {images?.map((img, index) => (
                    <div key={index}>
                        <img
                            src={img}
                            alt={`car-${index}`}
                            className="rounded-xl object-contain"
                            style={{ height: "500px", width: "100%" }}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarImageCarousel;
