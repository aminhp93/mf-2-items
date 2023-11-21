import React from "react";
// import { Icon } from "../../lib/components";
// import List from "../../lib/components/List";

// import css from "./List.module.scss";

class List extends React.PureComponent {
  render() {
    return <ul className={css.list}>{this.props.children}</ul>;
  }
}

// import css from "./ListElement.module.scss";

/**
 * ListElement Component
 * @typedef ListElementProps
 * @property {*} leadingIcon - Leading icon as element
 * @property {*} trailingIcon - Trailing icon as element
 * @property {*} children - List Element text
 * @property {boolean} compact - Compact List Element
 */
class ListElement extends React.PureComponent {
  render() {
    return (
      <li
        className={this.props.compact ? css.compactElement : css.normalElement}
        onClick={this.props.onClick}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && this.props.onClick()
        }
      >
        {this.props.leadingElement}
        <span>{this.props.children}</span>
        {this.props.trailingElement}
      </li>
    );
  }
}

List.Element = ListElement;

export default class PropertyGroup extends React.Component {
  state = {
    expanded: false,
  };

  render() {
    const { label, children } = this.props;
    return (
      <React.Fragment>
        <List.Element
          onClick={() => this.setState((s) => ({ expanded: !s.expanded }))}
          // leadingElement={<Icon>{this.state.expanded ? "expand_more" : "chevron_right"}</Icon>}
          compact={true}
        >
          {label}
        </List.Element>
        {this.state.expanded && children}
      </React.Fragment>
    );
  }
}
