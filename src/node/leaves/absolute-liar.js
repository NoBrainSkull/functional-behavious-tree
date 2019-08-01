import makeLeaf from '.'

export default makeLeaf({
  run: ({ failure }) => failure()
})