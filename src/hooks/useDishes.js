import useSWR from 'swr'

const useDishes = ({ tagIds }) => {
  const query = tagIds.reduce((q, tagId) => q + `&[tags.id_in]=${tagId}`, '')
  const d = useSWR(`/dishes?${query}`)
  return d.data?.data || []
}

export default useDishes
