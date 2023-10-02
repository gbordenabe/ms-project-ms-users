export enum RabbitMQ {
  UserQueue = 'users',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  FIND_ALL = 'FIND_ALL_USERS',
  FIND_ONE = 'FIND_ONE_USER',
  FIND_ONE_BY_USERNAME = 'FIND_ONE_BY_USERNAME',
  VALID_USER = 'VALID_USER',
  CHECK_USERNAME_EMAIL_DISPONIBILITY = 'CHECK_USERNAME_EMAIL_DISPONIBILITY',
}
