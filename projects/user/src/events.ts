import { IUser, EVENT_TYPES } from 'core';

export class UserLoginEvent extends CustomEvent<IUser> {
  constructor(user: IUser) {
    super(EVENT_TYPES.USER_LOGIN, {
      detail: user
    });
  }
}

export class UserUpdateEvent extends CustomEvent<IUser> {
  constructor(user: IUser) {
    super(EVENT_TYPES.USER_UPDATE, {
      detail: user
    });
  }
}