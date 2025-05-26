import { IKImage } from "imagekitio-react";

const ImageComponent = ({ path, src, alt = "", className = "", w, h, onLoad }) => {
  // Fallback if neither `path` nor `src` is provided
  if (!path && !src) {
    return <img src="/default-fallback.png" alt={alt} className={className} />;
  }

  // If full URL (e.g. ImageKit returned URL), use `src` instead of `path`
  const isFullURL = path && path.startsWith("http");

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      {...(isFullURL ? { src: path } : { path })}
      transformation={
        w || h
          ? [{ height: h || null, width: w || null }]
          : []
      }
      alt={alt}
      loading="lazy"
      className={className}
      lqip={{ active: true, quality: 20 }}
      onLoad={onLoad}
    />
  );
};

export default ImageComponent;
