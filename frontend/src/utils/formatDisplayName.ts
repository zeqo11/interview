import type { Dependent } from '@/types/Dependent'

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const formatDisplayName = ({ firstName, lastName, relationship }: Dependent) =>
  `${firstName} ${lastName}${relationship ? ' - ' + capitalize(relationship) : ''}`
