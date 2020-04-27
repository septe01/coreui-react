import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { mapToCssModules } from './Shared/helper.js'

export const Context = React.createContext({});

//component - CoreUI / CCarousel

const CCarousel = props => {

  const {
    className,
    cssModule,
    //
    innerRef,
    autoSlide,
    activeIndex,
    animate,
    onSlideChange,
    ...attributes
  } = props;

  const [state, setState] = useState([null, activeIndex])
  const [itemNumber, setItemNumber] = useState(null)
  const [animating, setAnimating] = useState()

  useEffect(() => {
    setState([state[1], activeIndex])
  }, [activeIndex])

  const [slide, setSlide] = useState()

  const setNext = () => {
    reset()
    autoSlide && setSlide(setTimeout(() => nextItem(), autoSlide))
  }
  const reset = () => clearTimeout(slide)
  const nextItem = () => {
    setState([state[1], itemNumber === state[1] + 1 ? 0 : state[1] + 1, 'next'])
  }

  useEffect(() => {
    onSlideChange && onSlideChange(state[1])
    setNext()
    return () => reset()
  }, [state])


  const classes = mapToCssModules(classNames('carousel', className), cssModule)
  return (
    <div
      className={classes}
      onMouseEnter={reset}
      onMouseLeave={setNext}
      {...attributes}
      ref={innerRef}
    >
      <Context.Provider value={{
        state,
        setState,
        animate,
        itemNumber,
        setItemNumber,
        animating,
        setAnimating
      }}>
        {props.children}
      </Context.Provider>
    </div>
  )
}

CCarousel.propTypes = {
  cssModule: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.array,
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  activeIndex: PropTypes.number,
  autoSlide: PropTypes.number,
  animate: PropTypes.bool,
  onSlideChange: PropTypes.func
};

CCarousel.defaultProps = {
  activeIndex: 0
};

export default CCarousel
