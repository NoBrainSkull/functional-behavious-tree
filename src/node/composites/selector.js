import nodeStatus from ':src/result'
import makeComposite from '.'

/**
 * A selector is a composite node which will try to process
 * every child it has got until one suceed. Return success if any,
 * failure otherwise.
 */
export default makeComposite({
  handleInnerNode: ({ success, next, innerCtx }) => {
    switch(true) {
      case innerCtx.result.status === nodeStatus.SUCCESS:
        return success()
      default:
        next()
    }
  }
})
