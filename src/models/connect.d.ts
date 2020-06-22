import { SettingoModelType } from './setting';
import { LoginState } from './login';
import { GlobalModelState } from './global';
import { UserModelState } from './user';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
}

export interface ConnectState {
  setting: SettingoModelType;
  loading: Loading;
  login: LoginState;
  global: GlobalModelState;
  user: UserModelState;
}
