/**
 * Custom Tooltip
 *
 */

import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";

export default function Tooltip(props: ITooltip) {
  const { style, place, ...other } = props;
  return (
    <ReactTooltip
      style={{
        backgroundColor: "#6c757d",
        padding: "2px 4px",
        color: "#fafafa",
        fontSize: "12px",
        zIndex: 10,
        maxWidth: "300px",
        ...style,
      }}
      place={place || "bottom"}
      {...other}
    >
      {props.children}
    </ReactTooltip>
  );
}
