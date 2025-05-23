import { useState, useEffect } from 'react';
import { useRewards } from './useRewards';
import { useProfile } from './useProfile';
import { useAuth } from './useAuth';
import { getSafeImageUrl } from '@/utils/imageUtils';

interface RotatingItem {
  id: string;
  name: string;
  points: number;
  imageUrl: string;
  canRedeem: boolean;
  pointsRemaining: number;
}

export const useRotatingRewards = () => {
  const { user } = useAuth();
  const { profile } = useProfile(user);
  const { rewards, loading } = useRewards();
  const [currentItem, setCurrentItem] = useState<RotatingItem | null>(null);
  const [allItems, setAllItems] = useState<RotatingItem[]>([]);

  // Prepare all items when rewards and profile data are loaded
  useEffect(() => {
    if (!loading && rewards.length > 0 && profile) {
      const userPoints = profile.points || 0;
      
      // Combine prizes and experiences into one array
      const items: RotatingItem[] = rewards.map(reward => {
        const canRedeem = userPoints >= reward.points;
        return {
          id: reward.id,
          name: reward.name,
          points: reward.points,
          imageUrl: getSafeImageUrl(reward.image_url, reward.name),
          canRedeem: canRedeem,
          pointsRemaining: canRedeem ? 0 : reward.points - userPoints
        };
      });
      
      // Shuffle the array to randomize initial order
      const shuffledItems = [...items].sort(() => Math.random() - 0.5);
      
      setAllItems(shuffledItems);
      
      // Set the first item as current
      if (shuffledItems.length > 0) {
        setCurrentItem(shuffledItems[0]);
      }
    }
  }, [rewards, profile, loading]);

  // Rotate items every 5 seconds
  useEffect(() => {
    if (allItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentItem(current => {
        if (!current) return allItems[0];
        
        const currentIndex = allItems.findIndex(item => item.id === current.id);
        const nextIndex = (currentIndex + 1) % allItems.length;
        return allItems[nextIndex];
      });
    }, 5000); // Changed from 3000 to 5000 ms

    return () => clearInterval(interval);
  }, [allItems]);

  return {
    currentItem,
    loading: loading || !currentItem,
  };
};
