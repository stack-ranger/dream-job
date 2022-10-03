import create from 'zustand'
//import IStore from '~/types/store'

interface IStore {
    counter: number,
    increaseCounter: () => void;
}

const useStore = create<IStore>((set) => ({
    counter: 0,
    increaseCounter: () => set((state) => ({ counter: state.counter +1}))
}))

export default useStore