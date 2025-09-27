import { useState } from 'react';
import ShoppingCart from '../ShoppingCart';
import diyaImage from '@assets/generated_images/Brass_diya_product_shot_ee1b5e3f.png';
import coconutImage from '@assets/generated_images/Sacred_coconut_product_shot_d4950347.png';

export default function ShoppingCartExample() {
  // todo: remove mock functionality
  const [cartItems, setCartItems] = useState([
    {
      id: "diya-001",
      name: "Traditional Brass Diya Set",
      price: 299,
      quantity: 2,
      image: diyaImage,
      maxQuantity: 10
    },
    {
      id: "coconut-001", 
      name: "Sacred Coconut",
      price: 45,
      quantity: 1,
      image: coconutImage,
      maxQuantity: 5
    }
  ]);

  const [isOpen, setIsOpen] = useState(true);

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  return (
    <ShoppingCart 
      items={cartItems}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onCheckout={() => console.log('Proceeding to checkout')}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}