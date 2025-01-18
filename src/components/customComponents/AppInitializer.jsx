import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setInitialTheme } from '../../redux/themeReducer';

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('userTheme');
      const defaultTheme = savedTheme || 'dark';
      dispatch(setInitialTheme(defaultTheme));
    };

    loadTheme();
  }, [dispatch]);

  return children;
};

export default AppInitializer;
