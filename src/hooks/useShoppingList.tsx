
import { useState, useEffect } from 'react';

export interface ShoppingItem {
  id: string;
  text: string;
  completed: boolean;
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load items from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingItems');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Failed to parse shopping items from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('shoppingItems', JSON.stringify(items));
    }
  }, [items, isLoading]);

  // Add a new item to the list
  const addItem = (text: string) => {
    if (text.trim() === '') return;
    
    const newItem: ShoppingItem = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
    };
    
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  // Toggle the completed status of an item
  const toggleItem = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Edit an item's text
  const editItem = (id: string, text: string) => {
    if (text.trim() === '') return;
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: text.trim() } : item
      )
    );
  };

  // Delete an item from the list
  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear all items from the list
  const clearItems = () => {
    setItems([]);
  };

  return {
    items,
    isLoading,
    addItem,
    toggleItem,
    editItem,
    deleteItem,
    clearItems,
  };
}
