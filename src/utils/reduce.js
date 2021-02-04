export function reduceSearchSuggestions(list) {
  const set = new Set()
  if (list) {
  }
  return list.reduce((cur, next) => {
    set.has(next.name) ? '' : set.add(next.name) && cur.push(next)
    return cur
  }, [])
}
