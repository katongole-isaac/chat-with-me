/**
 * Custom Tooltip
 *
 */

import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";

export default function Tooltip(props: ITooltip) {
  return (
    <ReactTooltip
      style={{
        backgroundColor: "#6c757d",
        padding: "2px 4px",
        color: "#fafafa",
        fontSize: "12px",
        ...props.style,
      }}
      place={props.place || "bottom"}
      {...props}
    >
      {props.children}
    </ReactTooltip>
  );
}
