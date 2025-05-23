/**
 * Utility functions for image handling
 */

// Default fallback image to use when images fail to load
export const DEFAULT_IMAGE = "/placeholder.svg";

/**
 * Handle image loading with fallback
 * @param e - Image error event
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  console.log(`Image failed to load: ${e.currentTarget.src}`);
  e.currentTarget.src = DEFAULT_IMAGE;
};

/**
 * List of available uploaded images to use for prizes and experiences
 */
export const AVAILABLE_IMAGES = {
  massage: "/lovable-uploads/f9a968b1-d1a4-4ebd-a3b5-af11022d1c3b.png",      // Massage spa experience
  pool: "/lovable-uploads/4e1a2d53-bfe3-4802-8ab8-efbc1385619a.png",         // Pool resort experience
  dinner: "/lovable-uploads/4f4b790f-74ab-4d46-8ce6-77ff945ba198.png",       // Romantic dinner experience
  beauty: "/lovable-uploads/dfb3b80c-7f29-40d6-b7b1-1d827cd87ff0.png",       // Beauty treatment
  echo: "/lovable-uploads/f7afd67d-49ee-43f6-a067-16c030bc25e4.png",         // Amazon Echo
  cinema: "/lovable-uploads/e9857fc5-e7e2-4208-99ae-452d8645297a.png",       // Cinema tickets
  beer: "/lovable-uploads/9bf2ec72-b9cf-4615-913f-b8261e488e60.png",         // Beer/Outback voucher
  toothbrush: "/lovable-uploads/46667bd5-e88a-4654-896b-575930b009f1.png",   // Electric toothbrush
  tumbler: "/lovable-uploads/082827ab-8847-46da-928b-1aa7ccf628d2.png",      // Tumbler cup
  mug: "/lovable-uploads/8951efa5-0923-4b31-9ce6-a538e97ffa6a.png"           // Mug
};

/**
 * Map prize/experience names to their correct image
 * @param name - Prize or experience name
 * @returns The appropriate image path for that item
 */
export const getImageByName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('echo') || lowerName.includes('alexa')) return AVAILABLE_IMAGES.echo;
  if (lowerName.includes('escova') || lowerName.includes('toothbrush')) return AVAILABLE_IMAGES.toothbrush;
  if (lowerName.includes('cinema') || lowerName.includes('ingresso')) return AVAILABLE_IMAGES.cinema;
  if (lowerName.includes('outback') || lowerName.includes('gift card')) return AVAILABLE_IMAGES.beer;
  if (lowerName.includes('copo') || lowerName.includes('tumbler')) return AVAILABLE_IMAGES.tumbler;
  if (lowerName.includes('caneca') || lowerName.includes('mug')) return AVAILABLE_IMAGES.mug;
  if (lowerName.includes('spa') || lowerName.includes('massage')) return AVAILABLE_IMAGES.massage;
  if (lowerName.includes('piscina') || lowerName.includes('pool')) return AVAILABLE_IMAGES.pool;
  if (lowerName.includes('jantar') || lowerName.includes('dinner')) return AVAILABLE_IMAGES.dinner;
  if (lowerName.includes('beleza') || lowerName.includes('beauty')) return AVAILABLE_IMAGES.beauty;
  
  // Default fallback for unknown items
  return DEFAULT_IMAGE;
};

/**
 * Get a safe image URL with proper path handling
 * @param imagePath - Original image path or URL
 * @returns A properly formatted image URL
 */
export const getSafeImageUrl = (imagePath: string, itemName: string = ""): string => {
  // First try to match by name if we have the item name
  if (itemName) {
    const matchedImage = getImageByName(itemName);
    if (matchedImage !== DEFAULT_IMAGE) {
      console.log(`Matched image for "${itemName}": ${matchedImage}`);
      return matchedImage;
    }
  }
  
  // If no match by name or no name provided, try the original path
  if (!imagePath) return DEFAULT_IMAGE;
  
  // If the path is already a URL or an absolute path starting with /, return it
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Handle lovable-uploads paths specifically
  if (imagePath.includes('lovable-uploads')) {
    return `/${imagePath.split('lovable-uploads')[1]}`;
  }
  
  // Otherwise, ensure it has a leading /
  return `/lovable-uploads/${imagePath}`;
};
