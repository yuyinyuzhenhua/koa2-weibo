

function sum(x, y){
    return x + y;
}

test('test demo 1', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
})