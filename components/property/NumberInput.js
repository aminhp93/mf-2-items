import React from "react";
import { TextField } from "./TextField";
import css from "./Input.module.scss";

/**
 * @param {string} value
 * @returns {null|number}
 */
const toNumber = (value) => (value === "" ? null : Number(value));

/**
 * NumberInput Component
 * Handles number input logic,
 * and isn't consired about styling.
 *  - If you want to style the input you should place it inside another component like TextField.
 *
 * @typedef NumberInputProps
 * @property {number} [value] The value to show in the input field.
 * @property {string} [label] The label of the input field.
 * @property {string} [id] The id of the input element.
 * @property {boolean} [compact] Reduces the height of the input field if true.
 * @property {boolean} [required] Highlights the input field if it has no input.
 * @property {boolean} [fullWidth] Will use the full available with if true.
 * @property {boolean} [disabled] Will disable input field if true.
 * @property {number} [min] The minimum allowed value.
 * @property {number} [max] The maximum allowed value.
 * @property {number} [maxDecimals] entered number will be rounded to this number
 * @property {boolean} [changeOnInput] Will invoke the onChange function on every input/keypress if true.
 * @property {function(number)} onChange Invoked with the new value when the input value has changed.
 * @property {function(number)} onInput Invoked with the new value for every input/keypress.
 */
export default class NumberInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: props.value != null,
      value: props.value == null ? "" : props.value,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value == null ? "" : this.props.value,
        active: this.props.value != null,
      });
    }
  }

  onBlur = (e) => {
    const value = e.target.value;
    this.props.onChange && this.props.onChange(toNumber(value));
  };

  onChange = (e) => {
    const value = this.auditValue(e.target.value);
    this.setState(() => ({
      active: value !== "",
    }));
    if (this.props.onChange) {
      // changeOnInput shouldn't be needed
      this.props.onChange(toNumber(value));
    } else if (this.props.onInput) {
      this.props.onInput(toNumber(value));
    }
  };

  render() {
    return (
      <TextField
        label={this.props.label}
        compact={this.props.compact}
        fullWidth={this.props.fullWidth}
        style={this.props.style ?? {}}
        labelStyle={this.props.labelStyle ?? {}}
        active={this.state.active}
      >
        <input
          id={this.props.id}
          className={css.sharedInputStyle}
          disabled={this.props.disabled && "disabled"}
          type="number"
          min={this.props.min && Number(this.props.min)}
          max={this.props.max && Number(this.props.max)}
          step={this.props.step}
          required={this.props.required}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onBlur={this.onBlur}
          onChange={this.onChange}
        />
      </TextField>
    );
  }

  // auto corrects number to fit given min || max. If maxDecimals is defined, it will auto adjust decimals.
  auditValue(value) {
    const { min, max, maxDecimals } = this.props;

    value = value || 0;

    if (min || max) {
      if (value < min) return min;
      else if (value > max) return max;
    }

    if (typeof maxDecimals === "number")
      return Number(value).toFixed(maxDecimals);

    return value;
  }
}
