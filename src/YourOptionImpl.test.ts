import { some, none } from "fp-ts/es6/Option";

import { YourOptionImpl } from "./YourOptionImpl";

const impl = new YourOptionImpl();

describe("optPlus", (): void => {
  test("両方Someなら足す", (): void => {
    const ret = impl.optPlus(some(1), some(2));
    expect(ret).toBe(some(3));
  });

  test("NoneがあったらNone(1)", (): void => {
    const ret = impl.optPlus(none, some(2));
    expect(ret).toBe(none);
  });

  test("NoneがあったらNone(2)", (): void => {
    const ret = impl.optPlus(some(1), none);
    expect(ret).toBe(none);
  });
});

describe("optPlusGtTen", (): void => {
  test("両方Someなら足す, 10以上ならSome", (): void => {
    const ret = impl.optPlusGtTen(some(1), some(9));
    expect(ret).toBe(some(10));
  });

  test("両方Someなら足す, 10未満ならNone", (): void => {
    const ret = impl.optPlusGtTen(some(1), some(8));
    expect(ret).toBe(none);
  });

  test("NoneがあったらNone(1)", (): void => {
    const ret = impl.optPlusGtTen(none, some(8));
    expect(ret).toBe(none);
  });

  test("NoneがあったらNone(2)", (): void => {
    const ret = impl.optPlusGtTen(some(1), none);
    expect(ret).toBe(none);
  });
});

describe("optPlusGeTenAsTwiceString", (): void => {
  test("両方Someなら足す, 10以上なら2倍String", (): void => {
    const ret = impl.optPlusGeTenAsTwiceString(some(1), some(9));
    expect(ret).toBe("20");
  });

  test("両方Someなら足す, 10未満ならそのままString", (): void => {
    const ret = impl.optPlusGeTenAsTwiceString(some(1), some(8));
    expect(ret).toBe("9");
  });

  test("NoneがあったらNone(1)", (): void => {
    const ret = impl.optPlusGeTenAsTwiceString(none, some(8));
    expect(ret).toBe(none);
  });

  test("NoneがあったらNone(2)", (): void => {
    const ret = impl.optPlusGeTenAsTwiceString(some(1), none);
    expect(ret).toBe(none);
  });
});

describe("optDiv", (): void => {
  test("両方Someなら割る", (): void => {
    const ret = impl.optDiv(some(10), some(2));
    expect(ret).toBe(some(5));
  });

  test("両方Someなら割る", (): void => {
    const ret = impl.optDiv(some(0), some(10));
    expect(ret).toBe(some(0));
  });

  test("両方Someなら割る, 0 div はNone", (): void => {
    const ret = impl.optDiv(some(10), some(0));
    expect(ret).toBe(none);
  });

  test("NoneがあったらNone(1)", (): void => {
    const ret = impl.optDiv(none, some(2));
    expect(ret).toBe(none);
  });

  test("NoneがあったらNone(2)", (): void => {
    const ret = impl.optDiv(some(1), none);
    expect(ret).toBe(none);
  });
});


describe("optFunc", (): void => {
  test("両方Someなら関数を当てる（1）", (): void => {
    const f = (i: number, j: number) => i + j;
    const ret = impl.optFunc(some(10), some(2), f);
    expect(ret).toBe(some(5));
  });

  test("両方Someなら関数を当てる（2）", (): void => {
    const f = (i: number, j: number) => i * j;
    const ret = impl.optFunc(some(0), some(10), f);
    expect(ret).toBe(some(0));
  });

  test("NoneがあったらNone(1)", (): void => {
    const f = (i: number, j: number) => i + j;
    const ret = impl.optFunc(none, some(2), f);
    expect(ret).toBe(none);
  });

  test("NoneがあったらNone(2)", (): void => {
    const f = (i: number, j: number) => i + j;
    const ret = impl.optFunc(some(1), none, f);
    expect(ret).toBe(none);
  });
});
