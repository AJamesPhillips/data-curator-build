import {test} from "../shared/utils/test.js";
export function cloneable_generator_factory(args, generator_factory, next_calls = []) {
  let generator = generator_factory(args);
  const cloneable_generator = {
    next: (...args2) => {
      next_calls.push(args2);
      return generator.next(...args2);
    },
    throw: (e) => generator.throw(e),
    return: (e) => generator.return(e),
    [Symbol.iterator]: () => cloneable_generator,
    clone: () => {
      const partial_deep_cloned_next_args = [...next_calls].map((args2) => [...args2]);
      return cloneable_generator_factory(args, generator_factory, partial_deep_cloned_next_args);
    }
  };
  next_calls.forEach((args2) => generator.next(...args2));
  return cloneable_generator;
}
function run_tests() {
  function* jumpable_sequence(args) {
    let i = args.start;
    while (true) {
      let jump = yield ++i;
      if (jump !== void 0)
        i += jump;
    }
  }
  let iter = cloneable_generator_factory({start: 10}, jumpable_sequence);
  test(iter.next().value, 11, "should increment");
  test(iter.next(3).value, 11 + 1 + 3, "should use jump");
  let saved = iter.clone();
  test(iter.next().value, 16, "should increment again");
  test(iter.next(10).value, 16 + 1 + 10, "should jump again");
  test(saved.next().value, 16, "should have been reset");
  test(saved.next().value, 17, "should not use previous jump");
  test(saved.next(-10).value, 17 + 1 - 10, "should jump on second branch");
  test(iter.next().value, 28, "should jump a third time on first branch");
}
