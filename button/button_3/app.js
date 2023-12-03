import { images } from "./data.js";

console.log(images);
let index = 0;
document.querySelector(".btn-next").addEventListener("click", function (e) {
  if (index === images.length - 1) return;
  index = index + 1;
  const currentSrc = document
    .querySelector(".image-content .image")
    .setAttribute("src", images[index]);
  document.querySelector(".image-numbers").textContent =
    index + 1 + " of " + images.length;
});

document.querySelector(".btn-back").addEventListener("click", function (e) {
  if (index === 0) return;
  index = index - 1;
  const currentSrc = document
    .querySelector(".image-content .image")
    .setAttribute("src", images[index]);
  document.querySelector(".image-numbers").textContent =
    index + 1 + " of " + images.length;
});
document.querySelector(".btn-add").addEventListener("click", function (e) {
  const imageURL = prompt("Enter the URL of the image:");
  if (imageURL) {
    images.push(imageURL);
    document.querySelector(".image-numbers").textContent =
      index + 1 + " of " + images.length;
  }
});
