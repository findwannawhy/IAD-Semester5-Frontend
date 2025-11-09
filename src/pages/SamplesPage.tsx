// pages/SamplesPage/SamplesPage.tsx
import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Cart from '../components/Cart/Cart';
import Search from '../components/Search/Search';
import SamplesList from '../components/SamplesList/SamplesList';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS } from '../Routes';
import { getSamples } from '../modules/SamplesApi';
import { SAMPLES_MOCK } from '../modules/mock'; 
import type { AcidSolubleSample } from '../modules/SamplesTypes';
import './SamplesPage.css';
import { useSearchInput, useAppliedSearch } from '../slices/searchSlice'
import { useSearchData } from '../hooks/useSearchData'

export default function SamplesPage() {
  const [samples, setSamples] = useState<AcidSolubleSample[]>([]);
  
  // Используем разделенные состояния
  const { setSearchInput, applySearch } = useSearchData()
  const searchInput = useSearchInput() // то, что вводит пользователь
  const appliedSearch = useAppliedSearch() // то, что применено как фильтр
  
  const [loading, setLoading] = useState(false);

  // Загружаем образцы только при изменении примененного фильтра
  useEffect(() => {
    loadSamples();
  }, [appliedSearch]); // Только appliedSearch триггерит загрузку

  const loadSamples = async () => {
    setLoading(true);
    try {
      // Создаем фильтры на основе appliedSearch (а не searchInput)
      const filters = appliedSearch ? { name: appliedSearch } : {};
      const data = await getSamples(filters);
      
      if (data.length > 0) {
        setSamples(data);
      } else {
        // Если с сервера ничего не пришло, пробуем mock
        if (appliedSearch) {
          // Если есть поисковый запрос, фильтруем mock
          const filteredMock = SAMPLES_MOCK.filter(sample =>
            sample.title.toLowerCase().includes(appliedSearch.toLowerCase())
          );
          setSamples(filteredMock);
        } else {
          // Если нет поискового запроса, показываем все mock
          setSamples(SAMPLES_MOCK);
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке образцов:', error);
      // При ошибке используем mock с фильтрацией если нужно
      if (appliedSearch) {
        const filteredMock = SAMPLES_MOCK.filter(sample =>
          sample.title.toLowerCase().includes(appliedSearch.toLowerCase())
        );
        setSamples(filteredMock);
      } else {
        setSamples(SAMPLES_MOCK);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    applySearch(); // применяем фильтр только при нажатии кнопки
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
              query={searchInput} // показываем то, что вводит пользователь
              onQueryChange={setSearchInput} // обновляем только поле ввода
              onSearch={handleSearch} // применяем фильтр только при отправке
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
                  {appliedSearch
                    ? `По запросу "${appliedSearch}" вещества не найдены` 
                    : 'Вещества не найдены'
                  }
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Cart />
    </div>
  );
}