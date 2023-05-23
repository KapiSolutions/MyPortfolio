import React from "react";
import Carousel from "react-material-ui-carousel";
import CarouselSlide from "./CarouselSlide";
import slides from "./bookBoxSlides.json";

const BookBoxSection = (): JSX.Element => {
  return (
    <Carousel
      autoPlay={true}
      indicators={true}
      stopAutoPlayOnHover={true}
      navButtonsAlwaysVisible={false}
      animation="fade"
      swipe={false}
      interval={6000}
      duration={400}
      sx={{ m: "auto", height: "100vh", width: "100vw" }}
      indicatorContainerProps={{
        style: {
          zIndex: 1,
          position: "absolute",
          bottom: "30px",
        },
      }}
      navButtonsWrapperProps={{
        style: {
          paddingRight: "15px",
        },
      }}
    >
      {slides.map((slide, idx) => (
        <CarouselSlide key={idx} slide={slide} />
      ))}
    </Carousel>
  );
};

export default BookBoxSection;
