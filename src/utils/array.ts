export const chunkArray = <T>(arr: T[], chunkSize: number): T[][] => arr.reduce<T[][]>((all, one, i) => {
  const ch = Math.floor(i / chunkSize)
  all[ch] = ([] as T[]).concat((all[ch]), one)
  return all
}, [])
