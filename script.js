const fileInput = document.getElementById("fileInput");
const generateLinkBtn = document.getElementById("generateLinkBtn");
const linkText = document.getElementById("linkText");
const filePreviewContainer = document.getElementById("filePreviewContainer");
const fileProgress = document.getElementById("fileProgress");
const progressText = document.getElementById("progressText");
const copyLinkBtn = document.getElementById("copyLinkBtn");
let interval; 
fileInput.addEventListener("change", function () {
  linkText.innerHTML = "";
  filePreviewContainer.innerHTML = "";
  resetProgress();
  copyLinkBtn.disabled = true; 
});
generateLinkBtn.addEventListener("click", function () {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first.");
    return;
  }
 const maxSize = 10 * 1024 * 1024; 
  if (file.size > maxSize) {
    alert("File size exceeds the maximum limit (10MB). Please select a smaller file.");
    return;
  }
  resetProgress(); 
  let progress = 0;
  interval = setInterval(() => {
    progress += 5; 
    fileProgress.value = progress;
    progressText.textContent = progress + "%";
    if (progress >= 100) {
      clearInterval(interval);
      const link = URL.createObjectURL(file);
      linkText.innerHTML = `<a href="${link}" download>${file.name}</a>`;
      copyLinkBtn.disabled = false;
      copyLinkBtn.addEventListener("click", function () {
        copyToClipboard(link);
        alert("Link copied to clipboard!");
      });
      const filePreview = document.createElement("img");
      filePreview.setAttribute("id", "filePreview");
      filePreview.src = link;
      filePreviewContainer.innerHTML = ""; 
      filePreviewContainer.appendChild(filePreview);
    }
  }, 200); 
});
function resetProgress() {
  clearInterval(interval);
  fileProgress.value = 0;
  progressText.textContent = "0%";
}
function copyToClipboard(text) {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
