import useSWR from 'swr'

const useTags = () => {
  const d = useSWR("/tags")
  return d.data?.data || []
}

export default useTags
