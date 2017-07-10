# project_fideligard_spa
Buy low, sell high.

Date Picker:
->
HTML input range with UTC
  1. Figure out min/max (static) utc dates
  2. create actions/reducers for setting date
  3. on input range change, set new date
  4. do some match to calculate new utc to date
  5. figure out formatting for the api
  6. pass new date as prop to the widget for display purposes
  7. make this display editable, creating an html input
  8. reverse it back to UTC, then set state
  9. the display toggle will be simple native react state