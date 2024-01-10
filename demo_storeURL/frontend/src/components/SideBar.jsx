import { useEffect, useRef, useState } from "react";

export default function SideBar({ title, images, children, props }) {
  const scrollbar = useRef();
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [classes, setClasses] = useState("galary-images");

  useEffect(() => {
    if (scrollbar.current.scrollHeight > scrollbar.current.clientHeight) {
      setHasScrollbar(true);
      setClasses((pre) => {
        pre = pre + " scrollbar";
        return pre;
      });
    } else if (
      scrollbar.current.scrollHeight < scrollbar.current.clientHeight
    ) {
      setHasScrollbar(false);
      setHasScrollbar("galary-images");
    }
    console.log("Rendering");
  }, []);
  useEffect(() => {
    if (
      scrollbar.current.scrollHeight < scrollbar.current.clientHeight &&
      hasScrollbar
    ) {
      setHasScrollbar(false);
      setClasses("galary-images");
    }
  }, [hasScrollbar]);

  return (
    <>
      <div className="galary-sidebar" {...props}>
        <h1>{title}</h1>
        <div className={classes} ref={scrollbar}>
          <ul>
            {images &&
              images.map((image) => (
                <li key={image.id}>
                  <img src={image.src} alt="image" />
                </li>
              ))}
          </ul>
        </div>
        {children}
      </div>
    </>
  );
}
