import React, { useState } from 'react';

const thumbnailStyles = {
  minWidth: '100%',
  // filter: "blur(3px)",
  // transition: "opacity ease-in 1000ms",
  // clipPath: "inset(0)",
};

export default function ProgressiveImage(props) {
  const [highResImageLoaded, setHighResImageLoaded] = useState(false);
  const { alt, thumbnailSMSrc, thumbnailHDSrc, className } = props;

  return (
    <span>
      <img
        className={`${className} img-hq`}
        style={{ display: highResImageLoaded ? 'block' : 'none' }}
        onLoad={() => {
          setHighResImageLoaded(true);
        }}
        src={thumbnailHDSrc}
        alt={alt}
      />

      {!highResImageLoaded && (
        <img
          className={`${className} img-sm`}
          src={thumbnailSMSrc}
          alt={alt}
          style={{
            ...thumbnailStyles,
          }}
        />
      )}
    </span>
  );
}
