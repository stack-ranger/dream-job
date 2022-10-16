import tw from "tailwind-styled-components"

interface SaveButtonProps {
  $isSaved: boolean
  $isLoading: boolean
}

export const SaveButton = tw.button<SaveButtonProps>`
  group
  py-2 
  px-3 
  text-xs 
  font-medium 
  text-center
  absolute
  top-0
  right-0
  m-2

  ${(p) =>
    p.$isSaved && !p.$isLoading
      ? `
    text-white 
    bg-green-700 
    rounded-lg 
    hover:bg-red-700
    dark:bg-red-600
    dark:hover:bg-red-700
    hover:after:content-['Remove']
  `
      : `
    text-white 
    bg-blue-700 
    rounded-lg 
    hover:bg-blue-800 
    dark:bg-blue-600 
    dark:hover:bg-blue-700  
  `}
`