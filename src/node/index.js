import { nodeStatus } from ':src/result'
import { makeResult } from ':src/status'
import { pipe } from 'ramda'

export const noInit = ctx => ctx

export const execNode = (n, ctx) => pipe(n.run, makeResult)(ctx)

export default ({ init = noInit, run }) => ({
  init: ctx => init(ctx),
  run : (ctx, innerNodes) => run({
    ctx, 
    innerNodes,
    success: () => ({ status: nodeStatus.SUCCESS }),
    failure: () => ({ status: nodeStatus.FAILURE })
  })
})
