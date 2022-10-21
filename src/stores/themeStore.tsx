import create from 'zustand'
import { ThemeStoreInterface } from '~/types/theme'

const useThemeStore = create<ThemeStoreInterface>((set) => ({
  theme: 'light',
  setTheme: (t:string) => set({theme: t}),
}))

export default useThemeStore
