# project_fideligard_spa
Buy low, sell high.

Trade:
  Trade button passes in stock information as props
  Opening trade component, when you type in information, onBlur you go get stock and update selectedStock price
  onSubmit, save to transactions state
  if successful, history.push to success page
  things to watch out for ->
    updating selectedStock will be tricky, might need a button instead
    how to connect date with state? maybe just have the slider be the only source of truth, or
    try making an input component there and see if it plays nicely with everything else, onBlur also updates
    could make it so that if isFetching = true, "submit" button hides GOOD IDEA YES
    how-to prepopulate date field?!? shouldn't be too bad I hope :)
    validations (optional) can happen onSubmit
    price of $0? what do

Transactions:
https://stackoverflow.com/questions/35305661/where-to-write-to-localstorage-in-a-redux-app
^ for storing state