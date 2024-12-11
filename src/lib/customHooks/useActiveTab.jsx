import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const useActiveTab = (initialTab) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const fnActiveTab = (tab) => {
    setActiveTab(tab);
    console.log(`Active Tab: ${tab}`);
  };

  useFocusEffect(
    useCallback(() => {
      setActiveTab(initialTab); 
    }, [initialTab])
  );

  return { activeTab, fnActiveTab };
};

export default useActiveTab;
