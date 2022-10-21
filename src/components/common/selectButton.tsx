import tw from 'tailwind-styled-components'

interface SelectButtonProps {
  $isSelected: boolean
  $position: 'left' | 'right'
}

export const SelectButton = tw.button<SelectButtonProps>`
  py-2 
  px-4 
  text-sm 
  font-medium 
  text-gray-900 
  border
  border-gray-900 
  dark:border-white 
  dark:text-white

  ${(p) =>
    p.$position === 'left' &&
    `
    rounded-l-lg
  `}
  ${(p) =>
    p.$position === 'right' &&
    `
    rounded-r-lg
  `}

  ${(p) =>
    p.$isSelected
      ? `
    z-10 
    ring-2 
    ring-gray-500 
    bg-gray-800 
    dark:bg-gray-800
    text-white    
    dark:border-white 
    dark:text-white
  `
      : `
    hover:border-2 
  `}
`