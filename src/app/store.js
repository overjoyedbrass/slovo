import create from 'zustand'

export const useGameStore = create((set) => ({
    length: 5,
    switchLength: () => 
        set((state) => {
            localStorage.lastLength = state.length
            return { length: state.length === 5 ? 6 : 5}
        })
}))