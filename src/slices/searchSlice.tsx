import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    searchInput: '', // то, что пользователь вводит в поле
    appliedSearch: '' // то, что применено как фильтр (после нажатия кнопки)
  },
  reducers: {
    setSearchInput(state, { payload }) {
      state.searchInput = payload // обновляем только поле ввода
    },
    applySearch(state) {
      state.appliedSearch = state.searchInput // применяем фильтр при нажатии кнопки
    }
  }
})

// Селектор для поля ввода
export const useSearchInput = () =>
  useSelector((state: any) => state.ourData.filters.searchInput)

// Селектор для примененного фильтра
export const useAppliedSearch = () =>
  useSelector((state: any) => state.ourData.filters.appliedSearch)

export const {
  setSearchInput: setSearchInputAction,
  applySearch: applySearchAction,
} = filtersSlice.actions

export default filtersSlice.reducer