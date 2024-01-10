import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "./store/images-slice";
import { deleteImage, fetchImages, sendImage } from "./store/images-action";
import "./App.css";
import SideBar from "./components/SideBar";

function App() {
  const [index, setIndex] = useState(0);
  const [lengthImages, setLengthImages] = useState();
  const [isType, setIsType] = useState(false);
  // const [hasScrollbar, setHasScrollbar] = useState(false);
  const dispatch = useDispatch();
  const pickFile = useRef();
  const scrollbar = useRef();
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [classes, setClasses] = useState("galary-images");
  const images = useSelector((state) => state.images.images);
  let isDisable = images.length === 0 && index <= 0;

  function handleCheckScrollbar() {
    if (
      scrollbar.current &&
      scrollbar.current.scrollHeight > scrollbar.current.clientHeight
    ) {
      setHasScrollbar(true);
      setClasses("scrollbar");
    } else if (hasScrollbar) {
      setHasScrollbar(false);
      setClasses("galary-images");
    }
  }
  useEffect(() => {
    dispatch(fetchImages());
    setLengthImages(images.length);
    if (
      scrollbar.current &&
      scrollbar.current.scrollHeight > scrollbar.current.clientHeight
    ) {
      setHasScrollbar(true);
      setClasses("scrollbar");
    } else if (
      scrollbar.current &&
      scrollbar.current.scrollHeight <= scrollbar.current.clientHeight
    ) {
      setHasScrollbar(false);
      setHasScrollbar("galary-images");
    }
  }, [dispatch, images.length]);
  // console.log(images);

  function handleClickBack() {
    setIndex((pre) => {
      pre = pre - 1;
      if (pre < 0) {
        pre = lengthImages - 1;
      }
      return pre;
    });
  }
  function handleClickNext() {
    setIndex((pre) => {
      pre = pre + 1;
      if (pre >= lengthImages) {
        pre = 0;
      }
      return pre;
    });
  }
  function handlePickFile() {
    // console.log(pickFile.current.value);
    dispatch(
      sendImage({
        id: Math.random() * 10000,
        src: pickFile.current.value,
      })
    );
    setLengthImages((pre) => {
      pre = pre + 1;
      return pre;
    });
    if (isDisable && index < 0) {
      setIndex((pre) => {
        pre = pre + 1;
        return pre;
      });
    }
    handleCheckScrollbar();
    setIsType(false);
    pickFile.current.value = "";
  }
  function handleDeleteImage() {
    // console.log(images[index]);
    dispatch(deleteImage(images[index]));
    setLengthImages((pre) => {
      pre = pre - 1;
      return pre;
    });
    setIndex((pre) => {
      pre = pre - 1;
      if (pre < 0) {
        pre = lengthImages - 2;
      }
      return pre;
    });
    handleCheckScrollbar();
  }

  function handleChange(e) {
    if (e.target.value && !isType) {
      setIsType(true);
    }
  }

  // console.log(index);
  return (
    <>
      <h1 className="galary-title">Photo Gallery</h1>
      <nav>
        <div className="button">
          <button onClick={handleClickNext} disabled={isDisable ? true : false}>
            Next
          </button>
          <button onClick={handleClickBack} disabled={isDisable ? true : false}>
            Back
          </button>

          <input
            type="text"
            name="text"
            id="text"
            defaultValue={pickFile.current ? pickFile.current.value : ""}
            ref={pickFile}
            placeholder="https://url.img.com.vn"
            onChange={handleChange}
          />
          <button onClick={handlePickFile} type="button" disabled={!isType}>
            Add
          </button>
          <button
            onClick={handleDeleteImage}
            type="button"
            disabled={isDisable ? true : false}
          >
            Remove
          </button>
          <button onClick={() => dispatch(fetchImages())}>Refresh</button>
        </div>
      </nav>
      <div className="container">
        <div className="box-images">
          {images.length > 0 && (
            <p className="image-numbers">
              {index + 1} of {lengthImages}
            </p>
          )}

          <div className="image-content">
            {images.length > 0 && index >= 0 && (
              <img
                className="image"
                key={images[index].id}
                src={images[index].src}
              />
            )}
          </div>
          {images.length <= 0 && (
            <p>Fill your URL which you want to be stored.</p>
          )}
        </div>
        {images.length > 0 && (
          <div className="galary-sidebar">
            <h1>LIST PHOTOS</h1>
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
          </div>
        )}
      </div>
    </>
  );
}

export default App;
