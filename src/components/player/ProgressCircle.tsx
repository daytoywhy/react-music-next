import { useMemo } from "react";
import './style/progress-circle.scss'
export default function ProgressCircle(props){
  const dashArray = Math.PI * 100;
  const dashOffset = useMemo(() => {
    return (1 - props.progress) * dashArray
  },[props.progress])
  return (
    <div className="progress-circle">
    <svg
      width={props.radius}
      height={props.radius}
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle
        className="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
      />
    </svg>
    { props.children}
  </div>
  )
}