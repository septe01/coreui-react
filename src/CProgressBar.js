import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {  mapToCssModules } from './Shared/helper.js'
import { Context } from './CProgress'
//component - CoreUI / CProgressBar

const CProgressBar = directProps => {

  const { inheritedProps } = useContext(Context)
  const props = {...inheritedProps, ...directProps }

  const {
    children,
    className,
    cssModule,
    //
    innerRef,
    color,
    striped,
    animated,
    precision,
    showPercentage,
    showValue,
    max,
    value,
    ...attributes
  } = props

  // render
  const progressBarClasses = mapToCssModules(classNames(
    'progress-bar',
    animated && 'progress-bar-animated',
    striped || animated && 'progress-bar-striped',
    color && `bg-${color}`,
    className
  ), cssModule)

  const valLabel = Number(value).toFixed(precision)
  const percentLabel = Number((value / max) * 100).toFixed(precision) + '%'

  return (
    <div
      className={progressBarClasses}
      style={{ width: `${(value / max) * 100}%` }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax={max}
      {...attributes}
      ref={innerRef}
    >
      { showPercentage ? percentLabel : showValue ? valLabel : children }
    </div>
  )
}

CProgressBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  value: PropTypes.number,
  max: PropTypes.number,
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  color: PropTypes.string,
  precision: PropTypes.number,
  showPercentage: PropTypes.bool,
  showValue: PropTypes.bool
};

export default CProgressBar
