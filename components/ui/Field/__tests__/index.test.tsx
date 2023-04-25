import * as React from "react"
import renderer from "react-test-renderer"

import Field from "../index"

it(`Field renders correctly`, () => {
  const tree = renderer
    .create(
      <Field
        placeholder="Hello World"
        handleBlur={() => null}
        handleChange={() => null}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
