import useSWR from 'swr'

const baseURI = '/dishes'

const useDishes = ({ start, limit, tagIds }) => {
  let query = tagIds.reduce((q, tagId) => q + `&[tags.id_in]=${tagId}`, '')
  query += `&_start=${start}`
  query += `&_limit=${limit}`

  const countResult = useSWR(`${baseURI}/count?${query}`)
  const result = useSWR(`${baseURI}?${query}`)
  return { items: result.data?.data || [], count: countResult.data?.data || 0, ...result }
}

export default useDishes
