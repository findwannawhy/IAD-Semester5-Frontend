// pages/HomePage/HomePage.tsx
import { type FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes";
import Header from '../components/Header/Header';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import backgroundImage from '../assets/background.jpeg';
import './HomePage.css'; 

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main className="home-main">
        <div className="home-container">
          <BreadCrumbs
            crumbs={[]}
          />
          
          <div className="home-content">
            <div className="home-hero">
              <div 
                className="home-hero-bg"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              ></div>
              <div className="home-hero-overlay"></div>
              <div className="home-hero-content">
                <h1 className="home-title">Helix</h1>
                <p className="home-description">
                  Добро пожаловать на Helix! Здесь вы можете рассчитать массовую долю примесей вашего вещества.
                </p>
                <Link to={ROUTES.SAMPLES} className="home-button">
                  <span className="button-text">Просмотреть вещества</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};