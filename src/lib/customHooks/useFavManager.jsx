// import packages
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Share } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useFavManager = () => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      await getFavorites();
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = async (item) => {
    const isAddedFav = favorites.find((addItem) => addItem.page_id === item.page_id);
    const updatedFavorites = isAddedFav
      ? favorites.filter((fav) => fav.page_id !== item.page_id)
      : [...favorites, item];
    await saveFavorites(updatedFavorites);
  };

  const fnShare = () => {
    Share.share({
      message: 'Your share message here'
    });
  };

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, [])
  );

  return {
    favorites,
    toggleFavorite,
    fnShare,
    saveFavorites,
  };
};
