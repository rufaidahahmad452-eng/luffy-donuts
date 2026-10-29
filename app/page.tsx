"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { donuts } from "./data/donuts";
import ScrollReveal from "./ScrollReveal";

export default function Home() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDonut, setSelectedDonut] = useState("");

  const [customDonut, setCustomDonut] = useState({
    size: "XS (10CM)",
    filling: "VANILLA",
    glaze: "CHOCOLATE",
    dressing: "SPRINKLES",
  });

  function addToOrder(id: number) {
    const savedOrder = localStorage.getItem("luffy-order");

    const currentOrder: { id: number; quantity: number }[] =
      savedOrder ? JSON.parse(savedOrder) : [];

    const existingItem = currentOrder.find((item) => item.id === id);

    const updatedOrder = existingItem
      ? currentOrder.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...currentOrder, { id, quantity: 1 }];

    localStorage.setItem("luffy-order", JSON.stringify(updatedOrder));

    const donut = donuts.find((item) => item.id === id);

    if (donut) {
      setSelectedDonut(donut.name);
    }

    setShowConfirmation(true);
  }

  function addCustomDonut() {
    const savedOrder = localStorage.getItem("luffy-order");

    const currentOrder: {
      id: number;
      quantity: number;
      custom?: boolean;
      details?: {
        size: string;
        filling: string;
        glaze: string;
        dressing: string;
      };
    }[] = savedOrder ? JSON.parse(savedOrder) : [];

    const updatedOrder = [
      ...currentOrder,
      {
        id: Date.now(),
        quantity: 1,
        custom: true,
        details: customDonut,
      },
    ];

    localStorage.setItem("luffy-order", JSON.stringify(updatedOrder));

    setSelectedDonut("YOUR CUSTOM DONUT");
    setShowConfirmation(true);
  }

  return (
    <main className={styles.page}>
      <header className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          LUFFY <span>DOUNTS</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/menu">MENU</Link>
        </nav>

        <div>
          <span></span>
          <span></span>
        </div>
      </header>

      <ScrollReveal>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>
              LUFFY <br /> DONUTS
            </h1>

            <p>
              TRY THE BEST DONUTS IN LUGANO WITH FREE
              <br />
              DELIVERY! YOU CAN COMBINE YOUR OWN UNIQUE
              <br />
              TASTE WITH DONUTS.
            </p>

            <Link href="/menu" className={styles.menuButton}>
              MENU
            </Link>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/images/herro-donuts.jpeg"
              alt="Luffy Donuts"
              fill
              priority
              quality={100}
              sizes="50vw"
              style={{
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          </div>
        </section>
      </ScrollReveal>

      <section className={styles.donutsSection}>
        <ScrollReveal>
          <div className={styles.donutsHeader}>
            <div className={styles.donutsTitle}>
              <h2>
                TRY THEM
                <br />
                TODAY!
              </h2>

              <div className={styles.deliveryBadge}>
                FREE DELIVERY <br /> FROM 25 £
              </div>
            </div>

            <Link href="/menu" className={styles.seeAll}>
              SEE ALL
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.donutsGrid}>
          {donuts.slice(0, 4).map((donut) => (
            <ScrollReveal key={donut.id}>
              <article className={styles.donutCard}>
                <div className={styles.donutImage}>
                  <Image src={donut.image} alt={donut.name} fill
                    quality={100}
                    sizes="25vw"
                  />
                </div>

                <div className={styles.donutInfo}>
                  <div className={styles.donutTop}>
                    <h3>{donut.name}</h3>
                    <span>{donut.price} £</span>
                  </div>

                  <p>{donut.filling}</p>

                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => addToOrder(donut.id)}
                  >
                    +
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className={styles.customSection}>
        <ScrollReveal>
          <div className={styles.customHeader}>
            <h2>
              CREATE YOUR <br /> SPECIAL TASTE!
            </h2>

            <p>
              MAKE YOUR OWN <br /> PERFECT DONUT
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.customContent}>
          <ScrollReveal>
            <div className={styles.customOptions}>
              <div className={styles.customOption}>
                <label>SIZE</label>

                <select
                  value={customDonut.size}
                  onChange={(e) =>
                    setCustomDonut({
                      ...customDonut,
                      size: e.target.value,
                    })
                  }
                >
                  <option>XS (10CM)</option>
                  <option>S (12CM)</option>
                  <option>M (14CM)</option>
                  <option>L (16CM)</option>
                </select>
              </div>

              <div className={styles.customOption}>
                <label>FILLING</label>

                <select
                  value={customDonut.filling}
                  onChange={(e) =>
                    setCustomDonut({
                      ...customDonut,
                      filling: e.target.value,
                    })
                  }
                >
                  <option>VANILLA</option>
                  <option>CHOCOLATE</option>
                  <option>PISTACHIO</option>
                  <option>STRAWBERRY</option>
                  <option>LOTUS</option>
                </select>
              </div>

              <div className={styles.customOption}>
                <label>GLAZE</label>

                <select
                  value={customDonut.glaze}
                  onChange={(e) =>
                    setCustomDonut({
                      ...customDonut,
                      glaze: e.target.value,
                    })
                  }
                >
                  <option>CHOCOLATE</option>
                  <option>WHITE CHOCOLATE</option>
                  <option>STRAWBERRY</option>
                  <option>CARAMEL</option>
                </select>
              </div>

              <div className={styles.customOption}>
                <label>DRESSING</label>

                <select
                  value={customDonut.dressing}
                  onChange={(e) =>
                    setCustomDonut({
                      ...customDonut,
                      dressing: e.target.value,
                    })
                  }
                >
                  <option>SPRINKLES</option>
                  <option>OREO</option>
                  <option>ALMONDS</option>
                  <option>COCONUT</option>
                  <option>NO DRESSING</option>
                </select>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.customPreview}>
              <button
                type="button"
                className={styles.customAddButton}
                onClick={addCustomDonut}
              >
                +
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {showConfirmation && (
        <div className={styles.confirmation}>
          <div className={styles.confirmationBox}>
            <h2>ORDER ADDED</h2>

            <p className={styles.confirmationMessage}>
              {selectedDonut}
              <br />
              HAS BEEN ADDED TO YOUR ORDER.
            </p>

            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}