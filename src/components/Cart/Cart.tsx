import type { FC } from 'react';
import './Cart.css';
import cartImg from '../../assets/cart.png';
import { useCartData } from '../../hooks/useCartData';
import { useCartData as useCartDataSelector } from '../../slices/cartSlice';

const Cart: FC = () => {
  useCartData(); // загружаем данные корзины
  const cartData = useCartDataSelector();
  
  const isCartActive = cartData.experiment_id > 0 && cartData.sample_count > 0;
  const count = cartData.sample_count;

  if (isCartActive) {
    return (
      <button
        type="button"
        className="cart-button"
        title="Черновик эксперимента"
      >
        <div className="cart-icon">
          <img src={cartImg} alt="Cart" aria-hidden="true" />
        </div>
        <span className="cart-badge" aria-label="Количество в корзине">
          {count > 99 ? '99+' : count}
        </span>
      </button>
    );
  }

  // Неактивная корзина
  return (
    <button
      type="button"
      className="cart-button cart-disabled"
      aria-disabled={true}
      disabled={true}
      title="Черновик эксперимента"
    >
      <div className="cart-icon">
        <img src={cartImg} alt="Cart" aria-hidden="true" />
      </div>
      <span className="cart-badge" aria-label="Количество в корзине">0</span>
    </button>
  );
}

export default Cart;


