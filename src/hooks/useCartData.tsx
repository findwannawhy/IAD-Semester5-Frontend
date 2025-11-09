import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getExperimentDraft } from "../modules/ExperimentsApi"
import { setCartDataAction, setLoadingAction } from "../slices/cartSlice"

export function useCartData() {
  const dispatch = useDispatch()

  const loadCartData = async () => {
    dispatch(setLoadingAction(true))
    try {
      const data = await getExperimentDraft()
      dispatch(setCartDataAction(data))
    } catch (err) {
      // значения по умолчанию
      dispatch(setCartDataAction({ experiment_id: 0, sample_count: -1 }))
    } finally {
      dispatch(setLoadingAction(false))
    }
  }

  useEffect(() => {
    loadCartData()
  }, [])

  return { loadCartData }
}