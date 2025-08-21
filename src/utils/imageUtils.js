// Image utilities for production deployment
const API_BASE_URL = 'https://senjitsu-backend.onrender.com';

// Fix image paths to use backend server
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // If starts with /uploads or /images, prepend backend URL
  if (imagePath.startsWith('/uploads') || imagePath.startsWith('/images')) {
    return `${API_BASE_URL}${imagePath}`;
  }
  
  // If relative path, prepend backend URL with /
  return `${API_BASE_URL}/${imagePath}`;
};

// Auto-fix image elements on page load
export const fixImagePaths = () => {
  // Fix all img elements
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src && (src.startsWith('/uploads') || src.startsWith('/images'))) {
      img.src = getImageUrl(src);
    }
  });
  
  // Fix all background images in style attributes
  const elementsWithBg = document.querySelectorAll('[style*="background-image"]');
  elementsWithBg.forEach(el => {
    const style = el.getAttribute('style');
    if (style && (style.includes('/uploads') || style.includes('/images'))) {
      const newStyle = style.replace(
        /url\(['"]?(\/(?:uploads|images)[^'"]*?)['"]?\)/g,
        `url('${API_BASE_URL}$1')`
      );
      el.setAttribute('style', newStyle);
    }
  });
};

// Run on DOM changes
if (typeof window !== 'undefined') {
  // Initial fix on load
  document.addEventListener('DOMContentLoaded', fixImagePaths);
  
  // Fix images when content changes
  const observer = new MutationObserver(() => {
    fixImagePaths();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'style']
  });
}
