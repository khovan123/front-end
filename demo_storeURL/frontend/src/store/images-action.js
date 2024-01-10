import { imagesActions } from "./images-slice";
export const deleteImage = (image) => {
  return async (dispatch) => {
    const sendRequest = async (image) => {
      try {
        // console.log(image);
        const response = await fetch("http://localhost:3000/api/delete", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(image),
        });

        if (!response.ok) {
          throw new Error("Failed to point to database.");
        }
      } catch (error) {
        throw new Error("Failed to access database.");
      }
    };
    try {
      await sendRequest(image);
      dispatch(imagesActions.removeImages(image));
    } catch (error) {
      throw new Error("Some thing went wrong.");
    }
  };
};

export const sendImage = (image) => {
  return async (dispatch) => {
    const sendRequest = async (image) => {
      try {
        const response = await fetch("http://localhost:3000/api/add", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(image),
        });
        if (!response.ok) {
          throw new Error("Failed to send data.");
        }
        const resData = await response.json();
        return resData;
      } catch (error) {
        throw new Error("Failed to send data.");
      }
    };
    try {
      const resData = await sendRequest(image);
      dispatch(imagesActions.addImage(image));
      console.log(resData.message);
    } catch (error) {
      throw new Error("Some thing went wrong.");
    }
  };
};

export const fetchImages = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/images");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        return data;
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    };

    try {
      const images = await sendRequest();
      dispatch(imagesActions.replaceImages(images));
    } catch (error) {
      throw new Error("Some thing went wrong.");
    }
  };
};
