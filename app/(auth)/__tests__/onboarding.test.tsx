import * as React from "react"
import renderer from "react-test-renderer"

import OnboardingScreen from "../index"

it(`renders correctly`, () => {
  const tree = renderer.create(<OnboardingScreen />).toJSON()

  expect(tree).toMatchSnapshot()
})
