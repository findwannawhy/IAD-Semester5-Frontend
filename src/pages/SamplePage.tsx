// pages/SamplePage/SamplePage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { getSample, getSamples } from "../modules/SamplesApi";
import type { AcidSolubleSample } from "../modules/SamplesTypes";
import { Spinner } from "react-bootstrap";
import Header from "../components/Header/Header";
import { SAMPLES_MOCK } from "../modules/mock";
import SampleCard from "../components/SampleCard/SampleCard";
import defaultSampleImage from "../assets/noimg.png";
import "./SamplePage.css";

export default function SamplePage() {
  const [sample, setSample] = useState<AcidSolubleSample | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [recentlyViewed, setRecentlyViewed] = useState<AcidSolubleSample[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchSample = async () => {
      try {
        setLoading(true);
        const sampleData = await getSample(Number(id));

        // Если API вернуло null (ошибка), используем моки
        if (!sampleData) {
          const mockSample =
            SAMPLES_MOCK.find((s) => s.id === Number(id)) || null;
          setSample(mockSample);
        } else {
          setSample(sampleData);
        }
      } catch (error) {
        console.error("Error fetching sample, using mocks:", error);
        // При ошибке используем моки
        const mockSample =
          SAMPLES_MOCK.find((s) => s.id === Number(id)) || null;
        setSample(mockSample);
      } finally {
        setLoading(false);
      }
    };

    fetchSample();
  }, [id]);

  // Загружаем недавно просмотренные образцы после загрузки основного образца
  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const viewed = await getSamples({ recentlyViewed: true });
        // Исключаем текущий образец из списка недавно просмотренных
        const filtered = viewed.filter(
          (s: AcidSolubleSample) => s.id !== Number(id)
        );

        // Удаляем дубликаты по ID на всякий случай
        const unique = filtered.filter(
          (
            sample: AcidSolubleSample,
            index: number,
            self: AcidSolubleSample[]
          ) =>
            index ===
            self.findIndex((s: AcidSolubleSample) => s.id === sample.id)
        );

        // Берем только 3 последних
        setRecentlyViewed(unique.slice(0, 3));
      } catch (error) {
        console.error("Error fetching recently viewed samples:", error);
      }
    };

    if (!loading && sample) {
      fetchRecentlyViewed();
    }
  }, [loading, sample, id]);

  // Обновляем URL изображения при изменении образца
  useEffect(() => {
    if (sample?.image_url) {
      setImageUrl(`/img/${sample.image_url}`);
    } else {
      setImageUrl(defaultSampleImage);
    }
  }, [sample]);

  const handleImageError = () => {
    console.log("Ошибка загрузки изображения, используем мок-изображение");
    setImageUrl(defaultSampleImage);
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
                  <span className="sample-title">
                    {sample.title} ({sample.formula})
                  </span>
                </div>
              </div>

              <div className="substance-image substance-image-mobile">
                <img
                  src={imageUrl}
                  alt={sample.title}
                  onError={handleImageError}
                />
              </div>

              <div className="sample-description-block">
                <div className="description-container">
                  <div className="description-title-container">
                    <span className="description-title">Описание</span>
                  </div>
                  <div className="description-text-container">
                    <span className="description-text-content">
                      {sample.description}
                    </span>
                  </div>
                  <div className="horizontal-divider"></div>
                  <div className="relative-molecular-mass-item">
                    <span className="label-bold">
                      Относительная молекулярная масса:
                    </span>
                    <span className="molar-mass-value">
                      {" "}
                      {sample.relative_molecular_mass?.toFixed(2) ?? "N/A"}{" "}
                      г/моль
                    </span>
                  </div>
                  <div className="stoichiometric-coefficient-item">
                    <span className="label-bold">
                      Стехиометрический коэффициент:
                    </span>
                    <span className="coeff-space"> </span>
                    <span className="coeff-value">
                      {sample.stoichiometric_coefficient ?? "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="substance-image substance-image-desktop">
              <img
                src={imageUrl}
                alt={sample.title}
                onError={handleImageError}
              />
            </div>
          </div>

          {recentlyViewed.length > 0 && (
            <div className="recently-viewed-section">
              <h2 className="recently-viewed-title">Недавно просмотренные</h2>
              <div className="recently-viewed-grid">
                {recentlyViewed.map((viewedSample) => (
                  <SampleCard key={viewedSample.id} sample={viewedSample} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
