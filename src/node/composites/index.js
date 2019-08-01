import nodeStatus from ':src/result'
import { default as makeNode, execNode } from '..'

/**
 * A composite node is responsible for handling inner nodes.
 * Handling details and returned status have to be handled 
 * by a lower level function injecting a handlerInnerNode fn
 * into this builder. HandleInnerNode will let its caller make
 * convienient use of usefull fns like `next`, `success`, `failure\`
 */
export default ({ handleInnerNode }) => makeNode({
  run: (ctx, nodes) =>
    nodes.reduce((nodeResult, n, index) => {
      const initializedCtx = n.init(ctx)
      const result = execNode(n, initializedCtx)
      handleInnerNode({
        innerCtx: { 
          result,
          index,
          lastNode: index + 1 === nodes.length,
          nodeCount: nodes.length 
        },
        next: () => { continue },
        failure: result => {
          nodeResult = { ...result, status: nodeStatus.FAILURE }
          break
        },
        success: result => {
          nodeResult = { ...result, status: nodeStatus.SUCCESS }
          break
        }
      })
      return nodeResult
    }, { status: nodeStatus.FAILURE, data: null })
})