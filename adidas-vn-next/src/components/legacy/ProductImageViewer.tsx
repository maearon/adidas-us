"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { productDetailImageUrl } from "@/lib/format";

declare global {
  interface Window {
    imageZoom?: (imgId: string, resultId: string) => void;
  }
}

type Props = {
  productId: number;
  productName: string;
};

export function ProductImageViewer({ productId, productName }: Props) {
  const [activeThumb, setActiveThumb] = useState(1);
  const [mainSrc, setMainSrc] = useState(productDetailImageUrl(productId, 1));
  const [zoomOpen, setZoomOpen] = useState(false);
  const zoomInitialized = useRef(false);

  const initZoom = useCallback(() => {
    if (typeof window.imageZoom === "function") {
      window.imageZoom("expandedImg", "myresult");
      zoomInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (typeof window.imageZoom === "function") {
        initZoom();
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [initZoom, mainSrc]);

  function toggleZoom() {
    setZoomOpen((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => initZoom());
      }
      return next;
    });
  }

  function selectThumb(index: number) {
    const src = productDetailImageUrl(productId, index);
    setActiveThumb(index);
    setMainSrc(src);
    zoomInitialized.current = false;
    if (zoomOpen) {
      requestAnimationFrame(() => initZoom());
    }
  }

  return (
    <>
      <div
        data-auto-id="glass-image-viewer"
        className="glass_image_viewer___3pD5T"
        style={{ backgroundColor: "#eceef0", backgroundSize: "50% 100%!important" }}
      >
        <div
          data-auto-id="images_container"
          className="images_container___3KxTB"
          style={{ marginLeft: -250 }}
          onClick={toggleZoom}
          onKeyDown={(e) => e.key === "Enter" && toggleZoom()}
          role="button"
          tabIndex={0}
          aria-label="Phóng to ảnh sản phẩm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="expandedImg"
            className="performance-item"
            alt={productName}
            src={mainSrc}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            id="myresult"
            className={`img-zoom-result zoom_active___kp-HB${zoomOpen ? " is-active" : ""}`}
            style={{ display: zoomOpen ? "block" : "none" }}
          />
        </div>
      </div>

      <div data-abtest-atp-1231="control" className="thumbnails___b-juv thumbnails__control">
        <div>
          <div
            className="gl-vspacing-l thumbnails_container___3SJWq thumbnails_container__control"
            style={{ left: 35, width: 80, maxHeight: 320, overflowY: "scroll" }}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <div
                key={n}
                className="thumbnail___3g19J thumbnail__control"
                style={{
                  transform: "translate(0px, 0px)",
                  borderBottom: activeThumb === n ? "2px solid #000" : undefined,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-auto-id="image"
                  src={productDetailImageUrl(productId, n)}
                  id={`thumbnail_${n}`}
                  alt=""
                  onClick={() => selectThumb(n)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
