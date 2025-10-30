// pages/SamplesPage/SamplesPage.tsx
import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import SamplesList from '../components/SamplesList/SamplesList';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS } from '../Routes';
import { getSamples } from '../modules/SamplesApi';
import { SAMPLES_MOCK } from '../modules/mock'; 
import type { AcidSolubleSample } from '../modules/SamplesTypes';
import './SamplesPage.css';

export default function SamplesPage() {
  const [samples, setSamples] = useState<AcidSolubleSample[]>([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    if (useMock) {
      setSamples(SAMPLES_MOCK);
    } else {
      getSamples()
        .then((data) => {
          if (data.length > 0) {
            setSamples(data);
          } else {
            setSamples(SAMPLES_MOCK);
            setUseMock(true);
          }
        })
        .catch(() => {
          setSamples(SAMPLES_MOCK);
          setUseMock(true);
        });
    }
  }, [useMock]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const filtered = await getSamples({ name: searchName });
      
      if (filtered.length > 0) {
        setSamples(filtered);
        setUseMock(false);
      } else {
        if (useMock) {
          const filteredMock = SAMPLES_MOCK.filter(sample =>
            sample.title.toLowerCase().includes(searchName.toLowerCase())
          );
          setSamples(filteredMock);
        } else {
          setSamples([]);
        }
      }
    } catch (error) {
      const filteredMock = SAMPLES_MOCK.filter(sample =>
        sample.title.toLowerCase().includes(searchName.toLowerCase())
      );
      setSamples(filteredMock);
      setUseMock(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="samples-page">
      <Header />
      
      <main className="samples-main">
        <div className="catalog-container">
          <BreadCrumbs
            crumbs={[
              { label: ROUTE_LABELS.SAMPLES },
            ]}
          />
          
          <div className="title-wrapper">
            <span className="catalog-title">Вещества</span>
          </div>
          
          <div className="search-wrapper-page">
            <Search 
              query={searchName}
              onQueryChange={setSearchName}
              onSearch={handleSearch}
            />
          </div>

          {loading ? (
            <div className="loading">Загрузка...</div>
          ) : (
            <div className="samples-grid">
              {samples.length > 0 ? (
                <SamplesList samples={samples} />
              ) : (
                <div className="no-samples">
                  {searchName 
                    ? `По запросу "${searchName}" вещества не найдены` 
                    : 'Вещества не найдены'
                  }
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}