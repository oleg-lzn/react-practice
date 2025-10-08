import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import TestMemo from "../src/TestMemo";

test("snapshot with nothing in TestMemo", () => {
  const { asFragment } = render(<TestMemo />);
  expect(asFragment()).toMatchSnapshot();
});
