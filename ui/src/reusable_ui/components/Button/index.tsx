// Libraries
import React, {Component} from 'react'
import classnames from 'classnames'

// Types
import {
  ComponentStatus,
  ComponentColor,
  ComponentSize,
  ButtonShape,
  IconFont,
} from 'src/reusable_ui/types'

// Styles
import 'src/reusable_ui/components/Button/Button.scss'

import {ErrorHandling} from 'src/shared/decorators/errors'

interface Props {
  text: string
  onClick?: () => void
  color?: ComponentColor
  size?: ComponentSize
  shape?: ButtonShape
  icon?: IconFont
  status?: ComponentStatus
  titleText?: string
}

@ErrorHandling
class Button extends Component<Props> {
  public static defaultProps: Partial<Props> = {
    color: ComponentColor.Default,
    size: ComponentSize.Small,
    shape: ButtonShape.Default,
    status: ComponentStatus.Default,
  }

  public render() {
    const {status, onClick, text, titleText} = this.props

    return (
      <button
        className={this.className}
        disabled={status === ComponentStatus.Disabled}
        onClick={onClick}
        title={titleText || text}
      >
        {this.icon}
        {this.text}
        {this.statusIndicator}
      </button>
    )
  }

  private get icon(): JSX.Element {
    const {icon} = this.props

    if (icon) {
      return <span className={`button-icon icon ${icon}`} />
    }

    return null
  }

  private get text(): string {
    const {text, shape} = this.props

    if (shape === ButtonShape.Square) {
      return null
    }

    return text
  }

  private get statusIndicator(): JSX.Element {
    const {status, size} = this.props

    if (status === ComponentStatus.Loading) {
      return <div className={`button-spinner button-spinner--${size}`} />
    }

    return null
  }

  private get className(): string {
    const {color, size, shape, status} = this.props

    return classnames(`button button-${size} button-${color}`, {
      'button-square': shape === ButtonShape.Square,
      'button-stretch': shape === ButtonShape.StretchToFit,
      'button--loading': status === ComponentStatus.Loading,
    })
  }
}

export default Button
