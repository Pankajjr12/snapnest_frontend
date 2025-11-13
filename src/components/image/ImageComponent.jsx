import { IKImage } from "imagekitio-react";

const ImageComponent = ({ path, src, alt = "", className = "", w, h, onLoad }) => {
  if (!path && !src) {
    return <img src="/default-fallback.png" alt={alt} className={className} />;
  }

  // ✅ Detect if it's a local or imported file (e.g., logoBig.png)
  const isLocalAsset =
    path?.startsWith("/") ||
    path?.startsWith("blob:") ||
    path?.startsWith("data:") ||
    path?.includes("logo") ||
    path?.includes("png") ||
    path?.includes("jpg");

  const isFullURL = path && path.startsWith("http");

  // ✅ Render normally for local/static images
  if (isLocalAsset) {
    return (
      <img
        src={path}
        alt={alt}
        className={className}
        width={w}
        height={h}
        loading="lazy"
        onLoad={onLoad}
      />
    );
  }

  // ✅ Otherwise, render via ImageKit
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
