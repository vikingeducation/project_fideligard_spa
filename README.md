# project_fideligard_spa
Buy low, sell high.

Date Picker:
->
HTML input range with UTC
  1. Figure out min/max (static) utc dates
    -play around with api and see what format it accepts
    -then spend some time on jsbin getting js Date, UTC, and html datetime
     to play nicely with each other

     FOR API:
      can do these formats:
        2000-01-01 for jan-01-yyyy
        best to use former
      date fns:
        getTime()
        toISOString().slice(0,10)
  2. create actions/reducers for setting date
  3. on input range change, set new date
  4. do some match to calculate new utc to date
  5. figure out formatting for the api
  6. pass new date as prop to the widget for display purposes
    OR HAVE TWO THINGS
      onChange = local state change showing full date string (Thur, Jan 01, 19xx)
      onInput = api call + redux state change
      This way user gets instant feedback of moving slider, plus api calls are throttled and not sent off every single movement of the mouse 
  7. make this display editable, creating an html input
  8. reverse it back to UTC, then set state
  9. the display toggle will be simple native react state