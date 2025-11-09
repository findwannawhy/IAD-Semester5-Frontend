import { useDispatch } from "react-redux"
import { setSearchInputAction, applySearchAction} from "../slices/searchSlice"

export function useSearchData() {
  const dispatch = useDispatch()

  const setSearchInput = (value: string) => {
    dispatch(setSearchInputAction(value)) // только обновляем поле ввода
  }

  const applySearch = () => {
    dispatch(applySearchAction()) // применяем фильтр при нажатии кнопки
  }

  return {
    setSearchInput,
    applySearch
  }
}