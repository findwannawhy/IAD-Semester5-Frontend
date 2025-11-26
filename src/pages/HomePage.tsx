// pages/HomePage/HomePage.tsx
import { type FC } from "react";
import Header from "../components/Header/Header";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import labVideo from "../assets/lab.mp4";
import "./HomePage.css";

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <Header />

      <main className="home-main">
        <div className="home-container">
          <BreadCrumbs crumbs={[]} />

          <div className="home-content">
            <div className="home-hero">
              <video className="home-hero-bg" autoPlay loop muted playsInline>
                <source src={labVideo} type="video/mp4" />
              </video>
              <div className="home-hero-overlay"></div>
              <div className="home-hero-content">
                <h1 className="home-title">Helix</h1>
                <p className="home-description">
                  Добро пожаловать на Helix! Здесь вы можете рассчитать массовую
                  долю примесей вашего вещества.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
