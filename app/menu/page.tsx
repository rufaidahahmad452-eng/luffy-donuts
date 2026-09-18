"use client";

import Image from "next/image";
import Link from "next/link";
import { useState ,useEffect } from "react";
import styles from "./page.module.css";
import { donuts } from "../data/donuts";

type OrderItem = { id: number; quantity: number; };

export default function Menu() {
  const [order, setOrder] = useState<OrderItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    const savedOrder = localStorage.getItem("luffy-order");
    return savedOrder? JSON.parse(savedOrder) : []
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDonut, setSelectedDonut] = useState("");
  const [phone , setPhone] = useState("");
  const [address , setAddress] = useState("");
  const [paymentMethod ,setPaymentMethod] = useState("");

  useEffect (() => {
    localStorage.setItem("luffy-order" , JSON.stringify(order));
  } , [order]);

  function addToOrder(id: number) {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((item) => item.id === id);

      if (existingItem) {
        return currentOrder.map((item) => item.id === id ? {...item, quantity: item.quantity + 1 } : item );
      }
      return [...currentOrder, { id, quantity: 1 }];
    });

    const donut = donuts.find((donut) => donut.id === id);

    if (donut) {
      setSelectedDonut(donut.name);
    }
    setShowConfirmation(true);
  }

  function decreaseQuantity(id: number) {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((item) => item.id === id);

      if (!existingItem) {
        return currentOrder;
      }

      if (existingItem.quantity === 1) {
        return currentOrder.filter((item) => item.id !== id);
      }

      return currentOrder.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 }: item 
    );
    });
  }
  function placehOrder() {
    setOrder([]);
    setPhone("");
    setAddress("");
    setPaymentMethod("");
  }

  const total = order.reduce((sum, item) => {
    const donut = donuts.find((donut) => donut.id === item.id);

    if (!donut) {
      return sum;
    }

    return sum + donut.price * item.quantity;
  }, 0);

  return (
    <main className={styles.page}>
      <header className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          LUFFY <span>DOUNTS</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/">HOME</Link>
          <Link href="/menu">MENU</Link>
        </nav>
      </header>

      <section className={styles.menuHeader}>
        <h1>OUR DONUTS</h1>
        <p>CHOOSE YOUR FAVORITE <br /> DONUT AND ENJOY!</p>
      </section>

      <section className={styles.donutsGrid}>
        {donuts.map((donut) => (
          <article key={donut.id} className={styles.donutCard}>
            <div className={styles.donutImage}>
              <Image src={donut.image} alt={donut.name} fill quality={100}
                sizes="(max-width: 600px) 50vw, (max-width: 1000px) 50vw, 25vw" />
            </div>

            <div className={styles.donutInfo}>
              <div className={styles.donutTop}>
                <h2>{donut.name}</h2>
                <span>{donut.price}£</span>
              </div>

              <p>{donut.filling}</p>
              <button type="button" className={styles.addButton} onClick={() => addToOrder(donut.id)} >+</button>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.orderSection}>
        <h2>YOUR ORDER</h2>
        {order.length === 0 ? (
          <p className={styles.emptyOrder}> YOUR ORDER IS EMPTY</p>
        ) : (
          <>
            <div className={styles.orderList}>
              {order.map((item) => {
                const donut = donuts.find(
                  (donut) => donut.id === item.id
                );

                if (!donut) {
                  return null;
                }

                return (
                  <div key={item.id} className={styles.orderItem}>
                    <div>
                      <h3>{donut.name}</h3>
                      <p>{donut.price}£ each</p>
                    </div>

                    <div className={styles.quantity}>
                      <button type="button" onClick={() => decreaseQuantity(item.id)} > − </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => addToOrder(item.id)} > + </button>
                    </div>

                    <span className={styles.itemTotal}>
                      {(donut.price * item.quantity).toFixed(2)}£
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.orderBottom}>
              <span>TOTAL</span>
              <strong>{total.toFixed(2)}£</strong>
            </div>
            <div className={styles.customerInfo}>
                <input type="tel" placeholder="PHONE NUMBER" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" placeholder="DELIVERY ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} > 
                    <option value="">PAYMENT METHOD</option>
                    <option value="cash">CASH ON DELIVERY</option>
                    <option value="card">CARD</option>
                </select>
            </div>
            <button type="button" className={styles.placeOrderButton} onClick={placehOrder}>PLACE ORDER</button>
          </>
        )}
      </section>

      {showConfirmation && (
        <div className={styles.confirmation}>
          <div className={styles.confirmationBox}>
            <h2>ORDER ADDED</h2>
            <p>{selectedDonut} <br />HAS BEEN ADDED TO YOUR ORDER.</p>
            <button type="button" onClick={() => setShowConfirmation(false)}>OK</button>
          </div>
        </div>
      )}
    </main>
  );
}