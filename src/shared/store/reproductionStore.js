import { create } from 'zustand'

export const useReproductionStore = create((set) => ({
  cycles: [],
  pregnancies: [],
  births: [],
  loading: false,
  
  setCycles: (cycles) => set({ cycles }),
  setPregnancies: (pregnancies) => set({ pregnancies }),
  setBirths: (births) => set({ births }),
  setLoading: (loading) => set({ loading })
}))