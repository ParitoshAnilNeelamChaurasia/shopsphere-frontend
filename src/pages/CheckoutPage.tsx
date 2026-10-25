
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../hooks/useCart';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { addOrder } from '../features/orders/ordersSlice';
import { useCreateOrderMutation } from '../features/orders/ordersApi';

import { clearCart } from '../features/cart/cartSlice';
import {
  resetCheckout,
  setAddress,
  setPaymentMethod,
} from '../features/checkout/checkoutSlice';

import { formatCurrency } from '../utils/format';
import type { Address } from '../types/models';
import { useToast } from '../contexts/ToastContext';

interface CheckoutForm extends Address {
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { items, subtotal, shipping, discount, total } = useCart();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const previous = useAppSelector((state) => state.checkout);

  // Prevent the empty-cart redirect after a successful order.
  const orderSubmitted = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    defaultValues: {
      ...(previous.address ?? {}),
      paymentMethod: previous.paymentMethod,
    },
  });

  useEffect(() => {
    if (!items.length && !orderSubmitted.current) {
      navigate('/cart', { replace: true });
    }
  }, [items.length, navigate]);

  const onSubmit = async (data: CheckoutForm) => {
    if (!items.length || isLoading) {
      return;
    }

    const address = {
      fullName: data.fullName,
      phone: data.phone,
      line1: data.line1,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
    };

    try {
      // Send the order to Spring Boot.
      // Spring Boot saves it and returns the saved order.
      const savedOrder = await createOrder({
        address,
        paymentMethod: data.paymentMethod,
        items: items.map((item) => ({
          productId: Number(item.product.id),
          quantity: item.quantity,
        })),
      }).unwrap();

      // Mark success before clearing the cart.
      orderSubmitted.current = true;

      // Update the frontend checkout state.
      dispatch(setAddress(address));
      dispatch(setPaymentMethod(data.paymentMethod));

      // Store the actual order returned by the backend.
      dispatch(addOrder(savedOrder));

      // Clear checkout data after backend success.
      dispatch(clearCart());
      dispatch(resetCheckout());

      showToast('Order placed successfully.');

      // Use the real order ID returned by Spring Boot.
      navigate(`/orders/${savedOrder.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error('Failed to place order:', error);

      showToast(
        'Order could not be placed. Please check the error and try again.'
      );
    }
  };

  const field = (
    name: keyof CheckoutForm,
    label: string,
    placeholder: string
  ) => (
    <label key={name}>
      {label}

      <input
        {...register(name, {
          required: `${label} is required`,
        })}
        placeholder={placeholder}
      />

      {errors[name] && (
        <small className="field-error">
          {errors[name]?.message}
        </small>
      )}
    </label>
  );

  return (
    <div className="page-shell container">
      <div className="breadcrumb">
        Home / Cart / Checkout
      </div>

      <div className="page-title-row">
        <div>
          <span className="eyebrow">Secure checkout</span>
          <h1>Checkout</h1>
          <p>
            Your order will be submitted to the ShopSphere backend.
            No real payment is processed.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="checkout-layout"
      >
        <section className="checkout-main">
          <div className="checkout-card">
            <div className="checkout-card-heading">
              <span>01</span>

              <div>
                <h2>Delivery address</h2>
                <p>Where should we send your order?</p>
              </div>
            </div>

            <div className="form-two">
              {field(
                'fullName',
                'Full name',
                'Your full name'
              )}

              {field(
                'phone',
                'Phone',
                '9876543210'
              )}
            </div>

            {field(
              'line1',
              'Address line',
              'Street, building, apartment'
            )}

            <div className="form-three">
              {field('city', 'City', 'Bengaluru')}

              {field('state', 'State', 'Karnataka')}

              {field(
                'postalCode',
                'PIN code',
                '560001'
              )}
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-heading">
              <span>02</span>

              <div>
                <h2>Payment</h2>
                <p>Select a demo payment method.</p>
              </div>
            </div>

            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  value="CARD"
                  {...register('paymentMethod', {
                    required: 'Please select a payment method',
                  })}
                />

                <div>
                  <strong>Card</strong>
                  <span>Visa, Mastercard, RuPay</span>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  value="UPI"
                  {...register('paymentMethod', {
                    required: 'Please select a payment method',
                  })}
                />

                <div>
                  <strong>UPI</strong>
                  <span>Pay with your preferred UPI app</span>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  value="COD"
                  {...register('paymentMethod', {
                    required: 'Please select a payment method',
                  })}
                />

                <div>
                  <strong>Cash on delivery</strong>
                  <span>Pay when your package arrives</span>
                </div>
              </label>
            </div>

            {errors.paymentMethod && (
              <small className="field-error">
                {errors.paymentMethod.message}
              </small>
            )}
          </div>
        </section>

        <aside className="summary-card checkout-summary">
          <h2>Review order</h2>

          {items.map((item) => (
            <div
              className="review-item"
              key={item.product.id}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
              />

              <div>
                <strong>{item.product.name}</strong>

                <span>
                  {item.quantity} ×{' '}
                  {formatCurrency(item.product.price)}
                </span>
              </div>

              <b>
                {formatCurrency(
                  item.product.price * item.quantity
                )}
              </b>
            </div>
          ))}

          <div className="summary-divider" />

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <strong>
              {shipping ? formatCurrency(shipping) : 'FREE'}
            </strong>
          </div>

          {discount > 0 && (
            <div className="summary-row discount-row">
              <span>Discount</span>
              <strong>
                -{formatCurrency(discount)}
              </strong>
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>

          <button
            className="button button-dark full-width"
            type="submit"
            disabled={isLoading || items.length === 0}
          >
            {isLoading
              ? 'Placing order...'
              : `Place order · ${formatCurrency(total)}`}
          </button>

          <small className="secure-note">
            🔒 Demo checkout — no real payment is processed.
          </small>
        </aside>
      </form>
    </div>
  );
}