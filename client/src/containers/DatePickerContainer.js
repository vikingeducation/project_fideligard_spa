import { connect } from 'react-redux'
import DatePicker from '../components/DatePicker'
import { setCurrentDate } from '../actions/dates'

const mapStateToProps = (state) => {
  return {
    current: state.dates.current,
    min: state.dates.min,
    max: state.dates.max
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (e) => {
      dispatch(setCurrentDate(e.target.value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DatePicker)
