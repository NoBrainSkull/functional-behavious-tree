import nodeStatus from ':src/result'
import makeComposite from '.'

/**
 * A sequence is a composite node which will try to process
 * every child it has got. Return success if ALL succeed,
 * failure otherwise.
 */
export default makeComposite({
  handleInnerNode: ({ success, next, innerCtx }) => {
    switch(true) {
      case innerCtx.lastNode && innerCtx.result.status === nodeStatus.SUCCESS:
        return success()
      case innerCtx.result.status === nodeStatus.SUCCESS:
        return next()
      default:
        failure()
    }
  }
})
