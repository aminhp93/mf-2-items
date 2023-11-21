import React from "react";
import css from "./TextField.module.scss";
import layoutsCss from "./layouts.module.scss";

/**
 * TextField Component
 * Defines a text or input field, this is separate from the input itself.
 * Intended for use with different type of inputs or components.
 * Input or anyother component should be passed from children
 */
export default class TextField extends React.PureComponent {
  render() {
    const {
      id,
      label,
      active,
      compact,
      fullWidth,
      rightAlign,
      leadingIcon,
      trailingIcon,
      children,
      style,
      labelStyle,
      width,
    } = this.props;

    return (
      <div
        className={this.getClasses({
          compact,
          enableFullWidth: fullWidth,
          enableRightAlign: rightAlign,
        })}
        style={{ ...style, width: !fullWidth && width }}
      >
        {leadingIcon}
        {children}
        <div
          className={
            active ? css.outlined + " " + css.floatAbove : css.outlined
          }
        >
          <div />
          <div>
            {label && (
              <label style={{ ...labelStyle }} htmlFor={id}>
                {label}
              </label>
            )}
          </div>
          <div />
        </div>
        {trailingIcon}
      </div>
    );
  }

  getClasses({
    compact = false,
    enableRightAlign = false,
    enableFullWidth = false,
  }) {
    const result = [];
    result.push(compact ? css.compactLayout : css.comfortableLayout);
    result.push(enableFullWidth ? css.fullWidth : css.defaultWidth);

    if (enableRightAlign) {
      result.push(layoutsCss.rightAlign);
    }

    return result.join(" ");
  }
}
