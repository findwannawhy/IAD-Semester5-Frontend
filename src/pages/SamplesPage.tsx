// pages/SamplesPage/SamplesPage.tsx
import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Cart from '../components/Cart/Cart';
import Search from '../components/Search/Search';
import SamplesList from '../components/SamplesList/SamplesList';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS } from '../Routes';
import { getSamplesPaginated } from '../modules/SamplesApi';
import type { AcidSolubleSample } from '../modules/SamplesTypes';
import './SamplesPage.css';
import { useSearchInput, useAppliedSearch } from '../slices/searchSlice'
import { useSearchData } from '../hooks/useSearchData'

const ITEMS_PER_PAGE = 20;

export default function SamplesPage() {
  const [samples, setSamples] = useState<AcidSolubleSample[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  
  // Используем разделенные состояния
  const { setSearchInput, applySearch } = useSearchData()
  const searchInput = useSearchInput()
  const appliedSearch = useAppliedSearch()

  // Загружаем образцы при изменении страницы или примененного фильтра
  useEffect(() => {
    loadSamples();
  }, [appliedSearch, currentPage]);

  // Сбрасываем на первую страницу при новом поиске
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedSearch]);

  const loadSamples = async () => {
    setLoading(true);
    try {
      const data = await getSamplesPaginated({
        name: appliedSearch || undefined,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });
      
      setSamples(data.samples || []);
      setTotalPages(data.total_pages);
      setTotalItems(data.total);
    } catch (error) {
      console.error('Ошибка при загрузке образцов:', error);
      setSamples([]);
      setTotalPages(0);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    applySearch();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Генерация номеров страниц для отображения
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
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
              query={searchInput}
              onQueryChange={setSearchInput}
              onSearch={handleSearch}
            />
          </div>

          {/* Информация о результатах */}
          {!loading && totalItems > 0 && (
            <div className="results-info">
              Найдено: {totalItems} | Страница {currentPage} из {totalPages}
            </div>
          )}

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

          {/* Пагинация */}
          {!loading && totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Назад
              </button>
              
              <div className="pagination-pages">
                {getPageNumbers().map((page, index) => (
                  typeof page === 'number' ? (
                    <button
                      key={index}
                      className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={index} className="pagination-ellipsis">{page}</span>
                  )
                ))}
              </div>
              
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Вперёд →
              </button>
            </div>
          )}
        </div>
      </main>
      <Cart />
    </div>
  );
}