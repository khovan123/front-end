const images = document.querySelectorAll(".content img");
images.forEach((item) => {
  item.addEventListener("click", function () {
    const srcImg = item.getAttribute("src");
    const template = `<div class="lightbox">
    <div class="lightbox-content">
    <i class="fa-solid fa-angle-left fa-prev"></i>
      <img
        class="lightbox-img"
        src="${srcImg}"
        alt="image"
      />
      <i class="fa-solid fa-angle-right fa-next"></i>
    </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", template);
  });
});
let index = 0;
document.body.addEventListener("click", function (e) {
  const currentSrc = "";
  if (e.target.matches(".lightbox")) {
    e.target.parentNode.removeChild(e.target);
  } else if (e.target.matches(" .fa-prev ")) {
    const currentSrc = document
      .querySelector(".lightbox-img")
      .getAttribute("src");
    index = [...images].findIndex(
      (item) => item.getAttribute("src") === currentSrc
    );
    console.log(index);
    index = index - 1;
    if (index < 0) {
      index = [...images].length - 1;
    }
    console.log(index);
    const newSrc = [...images][index].getAttribute("src");
    document.querySelector(".lightbox-img").setAttribute("src", newSrc);
  }
  // NEXT
  else if (e.target.matches(" .fa-next")) {
    const currentSrc = document
      .querySelector(".lightbox-img")
      .getAttribute("src");
    index = [...images].findIndex(
      (item) => item.getAttribute("src") === currentSrc
    );
    console.log(index);
    index = index + 1;
    if (index >= [...images].length) {
      index = 0;
    }
    console.log(index);
    const newSrc = [...images][index].getAttribute("src");
    document.querySelector(".lightbox-img").setAttribute("src", newSrc);
  }
});
