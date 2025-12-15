// LOGIN FORM
export enum LOGIN_FORM_LABELS {
  TITLE = 'Hello! Welcome to your MyPets account',
  SUBTITLE = "Let's sign you in.",
  EMAIL = 'E-mail:',
  PASSWORD = 'Password:',
  SUBMIT_BTN = 'Sign in now',
  SIGN_UP_BTN = "Don't have an account? Register here",
  ERROR_TITLE = 'Login error!'
}

export enum LOGIN_FORM_TEST_IDS {
  EMAIL = 'test-email-login-form',
  PASSWORD = 'test-password-login-form',
  SUBMIT_BTN = 'test-submit-login-form',
  SIGN_UP_BTN = 'test-signup-login-form'
}

// USER FORM
export enum USER_FORM_LABELS {
  TITLE = 'Sign up',
  NAME = 'First name:',
  LAST_NAME = 'Last name:',
  USER_NAME = 'Username:',
  EMAIL = 'E-mail:',
  PASSWORD = 'Password:',
  REPEAT_PASS = 'Repeat/Confirm password:',
  SUBMIT_BTN = 'Sign up now',
  LOG_IN_BTN = 'You can log in with your account',
  ERROR_TITLE = 'User creation error!'
}

export enum USER_FORM_TEST_IDS {
  NAME = 'test-name-user-form',
  LAST_NAME = 'test-last-name-user-form',
  USER_NAME = 'test-username-user-form',
  EMAIL = 'test-email-user-form',
  PASSWORD = 'test-password-user-form',
  REPEAT_PASS = 'test-repeat-password-user-form',
  SUBMIT_BTN = 'test-submit-login-form',
  LOG_IN_BTN = 'test-login-login-form'
}

export enum HOME_PAGE_LABELS {
  USER_GREETING_START = 'Hey, ',
  USER_GREETING_END = '. Nice to see you here!',
  WELCOME_MESSAGE = 'Welcome to our beautiful place',
  MY_PETS_CARD_TITLE = 'My Pets'
}

// PET FORM
export enum PET_FORM_LABELS {
  TITLE = 'Add a new pet',
  NAME = 'Name:',
  BIRTHDAY = 'Born date:',
  IS_ADOPTED = 'Is it adopted?:',
  ADOPTION_DATE = 'Adoption date:',
  WEIGHT = 'Weight (in grams):',
  GENDER = 'Gender:',
  HAIR_COLORS = 'Fur color/s:',
  EYE_COLORS = 'Eye color/s:',
  TRAITS = 'Special traits:',
  HAS_HETEROCHROMIA = 'Has heterochromia',
  PASSED_AWAY = 'Passed away?:',
  ERROR_TITLE = 'Pet creation error!'
}

export enum PET_FORM_TEST_IDS {
  NAME = 'test-name-pet-form',
  PET_TYPE = 'test-petType-pet-form',
  BIRTHDAY = 'test-birthday-pet-form',
  IS_ADOPTED = 'test-isAdopted-pet-form',
  ADOPTION_DATE = 'test-adoptionDate-pet-form',
  WEIGHT = 'test-weight-pet-form',
  HAIR_COLORS = 'test-hairColors-pet-form',
  EYE_COLORS = 'test-eyeColors-pet-form',
  HAS_HETEROCHROMIA = 'test-hasHeterochromia-pet-form',
  PASSED_AWAY = 'test-passedAway-pet-form',
  SUBMIT_BTN = 'test-submit-pet-form',
  CANCEL_BTN = 'test-cancel-pet-form'
}

export enum USER_UPDATE_FORM_LABELS {
  TITLE = 'Update user information',
  NAME = 'First name:',
  LAST_NAME = 'Last name:',
  ERROR_TITLE = 'User update error!'
}

export enum PASS_UPDATE_FORM_LABELS {
  TITLE = 'Update password',
  OLD_PASS = 'Old Password:',
  NEW_PASS = 'New Password:',
  REPEAT_PASS = 'Repeat Password:',
  ERROR_TITLE = 'Password error!'
}

export enum EVENT_FORM_LABELS {
  TITLE = 'Add a new event',
  PET = 'Select pet:',
  DESCRIPTION = 'Description:',
  DATE = 'Date:',
  ERROR_TITLE = 'Event creation error!'
}

export enum EVENT_FORM_TEST_IDS {
  PET = 'test-pet-event-form',
  DESCRIPTION = 'test-description-event-form',
  DATE = 'test-date-event-form',
  SUBMIT_BTN = 'test-confirm-pet-form',
  CANCEL_BTN = 'test-cancel-pet-form'
}
