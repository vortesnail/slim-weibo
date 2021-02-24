/**
 * @description jest test demo
 * @author vortesnail
 */

function sum(a, b) {
  return a + b
}

it('10 add 20 should be equal to 30', () => {
  const res = sum(10, 20)
  expect(res).toBe(30)
})
