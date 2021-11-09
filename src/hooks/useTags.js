import useSWR from 'swr'

const useTags = () => {
  const d = useSWR("/tags")
  return { items: d.data?.data || [] }
}

export default useTags
