import React from 'react';

export default class SlideSelectorList extends React.Component {
  constructor(props) {
    super(props);
    this.buildListItems = this.buildListItems.bind(this);
  }

  buildListItems() {
    const { currentIndex, setCurrentIndex, slides } = this.props;
    return slides.map((slide, index) => {
      return (
        <li
          key={`slide-selector-${index}`}
          className={`${currentIndex === index ? 'selected' : ''}`}
          onClick={() => setCurrentIndex(index)}
        />
      );
    });
  }

  render() {

    return (
      <div className="bottom-container slide-selector-wrapper">
        <ul>
          {
            this.buildListItems()
          }
        </ul>
      </div>
    );

  }
}