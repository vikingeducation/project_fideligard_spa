import React from "react";
import { shallow, mount, render } from "enzyme";

import TransactionContainer from "./TransactionContainer";

describe("A suite", function() {
  it("should render without throwing an error", function() {
    expect(
      shallow(<TransactionContainer />).contains(<h4>Transactions</h4>)
    ).toBe(true);
  });
});
