import create from 'zustand'

interface ScrollStoreInterface {
  scrollPos: number
  maxScrollPos: number
  setScrollPos: (pos: number) => void
  setMaxScrollPos: (pos: number) => void
}

const useScrollStore = create<ScrollStoreInterface>((set) => ({
  scrollPos: 0,
  maxScrollPos: 0,
  setScrollPos: (pos: number) => {
    set({ scrollPos: pos })
  },
  setMaxScrollPos: (pos: number) => {
    set({ maxScrollPos: pos })
  },
}))
export default useScrollStore
