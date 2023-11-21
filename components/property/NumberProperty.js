import React from "react";
import { NumberInput } from "./NumberInput";
import Property from "./Property";

export default class NumberProperty extends React.Component {
  render() {
    return (
      <Property label={this.props.label}>
        <NumberInput
          compact={true}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onInput={(val) => this.props.onChange(val)}
          maxDecimals={this.props.maxDecimals}
        />
      </Property>
    );
  }
}
