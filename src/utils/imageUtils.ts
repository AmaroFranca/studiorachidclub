/**
 * Utility functions for image handling
 */

// Default fallback image to use when images fail to load
export const DEFAULT_IMAGE = "/placeholder.svg";

/**
 * Handle image loading with fallback
 * @param imagePath - Original image path
 * @returns A function to handle image errors
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  console.log(`Image failed to load: ${e.currentTarget.src}`);
  e.currentTarget.src = DEFAULT_IMAGE;
};

/**
 * Get a safe image URL with proper path handling
 * @param imagePath - Original image path or URL
 * @returns A properly formatted image URL
 */
export const getSafeImageUrl = (imagePath: string): string => {
  if (!imagePath) return DEFAULT_IMAGE;
  
  // If the path is already a URL or an absolute path starting with /, return it
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Otherwise, ensure it has a leading /
  return `/${imagePath}`;
};
