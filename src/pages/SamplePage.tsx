// pages/SamplePage/SamplePage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import { getSample } from '../modules/SamplesApi';
import type { AcidSolubleSample } from '../modules/SamplesTypes';
import { Spinner } from 'react-bootstrap';
import Header from '../components/Header/Header';
import { SAMPLES_MOCK } from '../modules/mock';
import './SamplePage.css';

export default function SamplePage() {
  const [sample, setSample] = useState<AcidSolubleSample | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    
    const fetchSample = async () => {
      try {
        setLoading(true);
        const sampleData = await getSample(Number(id));
        
        // Если API вернуло null (ошибка), используем моки
        if (!sampleData) {
          const mockSample = SAMPLES_MOCK.find(s => s.id === Number(id)) || null;
          setSample(mockSample);
        } else {
          setSample(sampleData);
        }
      } catch (error) {
        console.error('Error fetching sample, using mocks:', error);
        // При ошибке используем моки
        const mockSample = SAMPLES_MOCK.find(s => s.id === Number(id)) || null;
        setSample(mockSample);
      } finally {
        setLoading(false);
      }
    };

    fetchSample();
  }, [id]);


  const getImageUrl = (filename: string) => {
    if (!filename || imageError) return '/src/assets/noimg.png';
    return `/img/${filename}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="sample-page">
        <Header />
        <div className="sample-page-loader">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  if (!sample) {
    return (
      <div className="sample-page">
        <Header />
        <div className="sample-not-found">
          <h1>Вещество не найдено</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="sample-page">
      <Header />
      
      <main className="sample-main">
        <div className="sample-container">
          <BreadCrumbs
            crumbs={[
              { label: ROUTE_LABELS.SAMPLES, path: ROUTES.SAMPLES },
              { label: sample.title },
            ]}
          />

          <div className="container-content">
            <div className="left-part">
              <div className="sample-header">
                <div className="sample-header-wrapper">
                  <span className="sample-title">{sample.title} ({sample.formula})</span>
                </div>
              </div>
              
              <div className="sample-description-block">
                <div className="description-container">
                  <div className="description-title-container">
                    <span className="description-title">Описание</span>
                  </div>
                  <div className="description-text-container">
                    <span className="description-text-content">{sample.description}</span>
                  </div>
                  <div className="horizontal-divider"></div>
                  <div className="relative-molecular-mass-item">
                    <span className="label-bold">Относительная молекулярная масса:</span>
                    <span className="molar-mass-value"> {sample.relative_molecular_mass?.toFixed(2) ?? 'N/A'} г/моль</span>
                  </div>
                  <div className="stoichiometric-coefficient-item">
                    <span className="label-bold">Стехиометрический коэффициент:</span>
                    <span className="coeff-space"> </span>
                    <span className="coeff-value">{sample.stoichiometric_coefficient ?? 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="substance-image">
              <img 
                src={getImageUrl(sample.image_url)} 
                alt={sample.title}
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}