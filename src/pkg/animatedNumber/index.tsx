// import { useState } from "react";
import type { CSSProperties } from "react";
import AnimatedNumbers from "react-animated-numbers";

const AnimatedNumber = ({number, fontStyle}:{number:number, fontStyle: CSSProperties}) => {
    // const [number, setNumber] = useState(0);
  return (
    <AnimatedNumbers
        useThousandsSeparator
        // className={styles.container}
        transitions={(index) => ({
          type: "keyframes",
          duration: index + 1,
        })}
        animateToNumber={number}
        fontStyle={fontStyle}
      />
  )
}

export default AnimatedNumber