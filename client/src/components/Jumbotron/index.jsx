import React from 'react';

import JumbotronSlide from './JumbotronSlide';
import SlideSelectorList from './SlideSelectorList';

export default class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      fadeOut: false
    };
    this.formatSlides = this.formatSlides.bind(this);
    this.setCurrentIndex = this.setCurrentIndex.bind(this);
  }

  formatSlides(slides, currentIndex, fadeOut) {
    return slides.map((slide, index) => {
      return (
        <JumbotronSlide
          currentIndex={currentIndex}
          fadeOut={fadeOut}
          slide={slide}
        />
      );
    });
  }

  setBackgroundColor(slide) {
    return {"backgroundColor": slide.backgroundColor};
  }

  setCurrentIndex(index) {
    const { currentIndex } = this.state;
    if (index === currentIndex) {
      return;
    }

    this.setState({
      fadeOut: true
    }, () => {
      setTimeout(() => {
        this.setState({
          currentIndex: index,
          fadeOut: false
        });
      }, 200);
    });
  }

  render() {
    const { slides } = this.props;
    const { currentIndex, fadeOut } = this.state;
    /*
      This method invocation is using a locally created 'slides' collection.
      If the 'slides' array is removed from this file and stored externally,
      We will need to do 1 of 2 things:
        1. Pass the slides in as an argument to 'formatSlides'
        2. Extract the slides from the props
    */
    let formattedSlides = this.formatSlides(slides, currentIndex, fadeOut);

    return (
      <section className={`jumbotron-wrapper`} style={this.setBackgroundColor(slides[currentIndex])}>
        <div className="jumbotron-inner-wrapper">
          {
            formattedSlides[currentIndex]
          }
          <SlideSelectorList
            currentIndex={currentIndex}
            setCurrentIndex={this.setCurrentIndex}
            slides={slides}
          />
        </div>
      </section>
    );

  }
};