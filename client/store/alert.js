/**
 * ACTION TYPES
 */
const SHOW_ALERT = 'SHOW_ALERT';
const DISMISS_ALERT = 'DISMISS_ALERT';

/**
 * INITIAL STATE
 */
const initialAlertState = { visible: false, title: 'No message', message: "There's nothing here." };

/**
 * ACTION CREATORS
 */
export const showAlert = (title, message) => ({ type: SHOW_ALERT, alert: { title, message } });
export const dismissAlert = () => ({ type: DISMISS_ALERT });

/**
 * REDUCER
 */
export default function(state = initialAlertState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return { visible: true, title: action.alert.title, message: action.alert.message };
    case DISMISS_ALERT:
      return ({ ...state }.visible = false);
    default:
      return state;
  }
}
