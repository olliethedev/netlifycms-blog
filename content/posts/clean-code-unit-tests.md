---
title: "Clean Code: Unit Tests"
date: 2021-05-08T20:33:13.275Z
---
![test driven development](/img/tdd.png "test driven development")

Let's talk Test Driven Development(TDD), and why it is the most important part of software developer's job. This will an introductory post, as I am planning to get into TDD in more detail later, and dedicate entire blog series to the topic.

## The Three Laws of TDD

1. You may not write production code until you have written a failing unit test.
2. You may not write more of a unit test than is sufficient to fail, and not compiling is failing.
3. You may not write more production code than is sufficient to pass the currently failing test.

These laws ensure that the tests and production code are written together, with the tests just a fews seconds ahead of the production code.

## Keep Tests Clean

Hold your test code to the same standards are your production code. Dirty tests will become a nightmare to maintain as the codebase grows and evolves. Test code is just as important as production code. It is the unit test that keep the code flexible, maintainable, and reusable. Without tests every change is a possible bug. The higher the test coverage the higher the confidence that changes to the production code will not break the rest of the code.

## One Assert per Test and Single Concept per Test**Bad:**

```javascript
import assert from "assert";

describe("MomentJS", () => {
  it("handles date boundaries", () => {
    let date;

    date = new MomentJS("1/1/2015");
    date.addDays(30);
    assert.equal("1/31/2015", date);

    date = new MomentJS("2/1/2016");
    date.addDays(28);
    assert.equal("02/29/2016", date);

    date = new MomentJS("2/1/2015");
    date.addDays(28);
    assert.equal("03/01/2015", date);
  });
});
```

**Good:**

```javascript
import assert from "assert";

describe("MomentJS", () => {
  it("handles 30-day months", () => {
    const date = new MomentJS("1/1/2015");
    date.addDays(30);
    assert.equal("1/31/2015", date);
  });

  it("handles leap year", () => {
    const date = new MomentJS("2/1/2016");
    date.addDays(28);
    assert.equal("02/29/2016", date);
  });

  it("handles non-leap year", () => {
    const date = new MomentJS("2/1/2015");
    date.addDays(28);
    assert.equal("03/01/2015", date);
  });
});
```

## F.I.R.S.T

- **Fast:** Tests should be fast. When tests are slow, you will not want to run them often.
- **Independent:** Test should not be dependent on each other. One test should not setup the conditions for the next test.
- **Repeatable:** Test should be repeatable in any environment. Production, development, no internet access, etc.
- **Self-Validating:** Tests should not require manual evaluation. They should always return true for success or false for failure.
- **Timely:** Tests should be written just before the production code that makes them pass. If you write the production code before the tests you might find it much more difficult to write tests and make them pass.