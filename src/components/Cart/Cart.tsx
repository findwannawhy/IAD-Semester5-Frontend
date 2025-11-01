import type { FC } from 'react';
import './Cart.css';
import cartImg from '../../assets/cart.png';

type Props = { count?: number };

const Cart: FC<Props> = ({ count = -1 }) => {
  const hasItems = (count ?? 0) > 0;

  return (
    <button
      type="button"
      className={`cart-button${hasItems ? '' : ' cart-disabled'}`}
      aria-disabled={!hasItems}
      disabled={!hasItems}
      title="Черновик эксперимента"
    >
      <div className="cart-icon">
        <img src={cartImg} alt="Cart" aria-hidden="true" />
      </div>
      {hasItems && (
        <span className="cart-badge" aria-label="Количество в корзине">{count}</span>
      )}
    </button>
  );
}

export default Cart;


