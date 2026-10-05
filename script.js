// Hamburger menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Gallery modal
let galleryImages = [];
let currentIndex = 0;

function openGallery(title, images) {
  galleryImages = images;
  currentIndex = 0;

  document.getElementById("gallery-title").textContent = title;
  document.getElementById("gallery-total").textContent = images.length;

  updateGalleryImage();
  buildThumbnails();

  document.getElementById("gallery-modal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  document.getElementById("gallery-modal").style.display = "none";
  document.body.style.overflow = "auto";
}

function updateGalleryImage() {
  document.getElementById("gallery-main-img").src = galleryImages[currentIndex];
  document.getElementById("gallery-current").textContent = currentIndex + 1;

  // Update active thumbnail
  const thumbs = document.querySelectorAll(".gallery-thumb");
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateGalleryImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGalleryImage();
}

function goToImage(index) {
  currentIndex = index;
  updateGalleryImage();
}

function buildThumbnails() {
  const container = document.getElementById("gallery-thumbnails");
  container.innerHTML = "";

  galleryImages.forEach((src, i) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = "Thumbnail " + (i + 1);
    thumb.className = "gallery-thumb" + (i === 0 ? " active" : "");
    thumb.onclick = () => goToImage(i);
    container.appendChild(thumb);
  });
}

// Close gallery on ESC key
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("gallery-modal");
  if (modal.style.display === "flex") {
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }
});

// Close gallery when clicking outside content
document.addEventListener("click", (e) => {
  if (e.target.id === "gallery-modal") {
    closeGallery();
  }
});
