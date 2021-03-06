import * as TH from './type-helpers';
import { createAction } from './create-action';

// @dts-jest:group toString() method return a type
{
  const actionCreator = createAction('CREATE_ACTION')();
  // @dts-jest:pass:snap
  actionCreator.toString(); // => 'CREATE_ACTION'
}

// @dts-jest:group with symbol
{
  const CREATE_ACTION = Symbol(1);
  const withSymbol = createAction(CREATE_ACTION as any)();
  // @dts-jest:pass:snap
  withSymbol(); // => { type: CREATE_ACTION }
}

// @dts-jest:group with type only
{
  const withTypeOnly = createAction('CREATE_ACTION')();
  // @dts-jest:pass:snap
  withTypeOnly(); // => { type: 'CREATE_ACTION' }
}

// @dts-jest:group with type only - undefined
{
  const withTypeOnly = createAction('CREATE_ACTION')<undefined>();
  // @dts-jest:pass:snap
  withTypeOnly(); // => { type: 'CREATE_ACTION' }
}

// @dts-jest:group with payload - number
{
  const withPayload = createAction('CREATE_ACTION')<number>();
  // @dts-jest:pass:snap
  withPayload(10); // => { type: 'CREATE_ACTION', payload: 10 }
}

// @dts-jest:group with payload - boolean
{
  const withPayload = createAction('CREATE_ACTION')<boolean>();
  // @dts-jest:pass:snap
  withPayload(true); // => { type: 'CREATE_ACTION', payload: true }
}

// @dts-jest:group with payload - literal string union
{
  type NetStatus = 'up' | 'down' | 'unknown';
  const withPayload = createAction('CREATE_ACTION')<NetStatus>();
  // @dts-jest:pass:snap
  withPayload('up'); // => { type: 'CREATE_ACTION', payload: 'up' }
}

// @dts-jest:group with payload - primitives union
{
  const withPayload = createAction('CREATE_ACTION')<string | null | number>();
  // @dts-jest:pass:snap
  withPayload('foo'); // => { type: 'CREATE_ACTION', payload: 'foo' }
  // @dts-jest:pass:snap
  withPayload(null); // => { type: 'CREATE_ACTION', payload: null }
  // @dts-jest:pass:snap
  withPayload(3); // => { type: 'CREATE_ACTION', payload: 3 }
}

// @dts-jest:group with payload - any
{
  const withPayload = createAction('CREATE_ACTION')<any>();
  // @dts-jest:pass:snap
  withPayload(10); // => { type: 'CREATE_ACTION', payload: 10 }
}

// @dts-jest:group with meta
{
  const withMeta = createAction('CREATE_ACTION')<undefined, string>();
  // @dts-jest:pass:snap
  withMeta(undefined, 'token'); // => { type: 'CREATE_ACTION', meta: 'token' }
}

// @dts-jest:group with meta - any
{
  const withMeta = createAction('CREATE_ACTION')<undefined, any>();
  // @dts-jest:pass:snap
  withMeta(undefined, 'token'); // => { type: 'CREATE_ACTION', meta: 'token' }
}

// @dts-jest:group with payload and meta
{
  const withPayloadAndMeta = createAction('CREATE_ACTION')<number, string>();
  // @dts-jest:pass:snap
  withPayloadAndMeta(1, 'token'); // => { type: 'CREATE_ACTION', payload: 1, meta: 'token' }
}

// @dts-jest:group type-safe usage with higher-order function
{
  interface UserSettingsState {
    settingA: string;
    settingB: number;
  }

  const setUserSetting = <K extends keyof UserSettingsState>(
    setting: K,
    newValue: UserSettingsState[K]
  ) =>
    createAction('SET_USER_SETTING')<{
      setting: typeof setting;
      newValue: typeof newValue;
    }>()({ setting, newValue });

  // @dts-jest:pass:snap
  setUserSetting('settingA', 'foo');
  // @dts-jest:fail:snap
  setUserSetting('settingA', 0); // Error as expected

  // @dts-jest:pass:snap
  setUserSetting('settingB', 0);
  // @dts-jest:fail:snap
  setUserSetting('settingB', 'foo'); // Error as expected
}

// @dts-jest:group Redux Actions - with payload - obj param
{
  const withPayload = createAction(
    'CREATE_ACTION',
    (arg: { payload: string }) => arg.payload
  )<string>();
  // @dts-jest:pass:snap
  withPayload({ payload: 'info message' }); // => { type: 'CREATE_ACTION', payload: 'info message' }
}

// @dts-jest:group Redux Actions - with payload - obj union param
{
  const withPayload = createAction(
    'CREATE_ACTION',
    (arg: { payload: string | null | number }) => arg.payload
  )<string | null | number>();
  // @dts-jest:pass:snap
  withPayload({ payload: 'info message' }); // => { type: 'CREATE_ACTION', payload: 'info message' }
  // @dts-jest:pass:snap
  withPayload({ payload: null }); // => { type: 'CREATE_ACTION', payload: null }
  // @dts-jest:pass:snap
  withPayload({ payload: 3 }); // => { type: 'CREATE_ACTION', payload: 3 }
}

// @dts-jest:group Redux Actions - with meta - obj param
{
  const withMeta = createAction(
    'CREATE_ACTION',
    undefined,
    (arg: { meta: string }) => arg.meta
  )<undefined, string>();
  // @dts-jest:pass:snap
  withMeta({ meta: 'info message' }); // => { type: 'CREATE_ACTION', meta: 'info message' }
}

// @dts-jest:group Redux Actions - with meta - obj union param
{
  const withMeta = createAction(
    'CREATE_ACTION',
    undefined,
    (arg: { meta: string | null | number }) => arg.meta
  )<undefined, string | null | number>();
  // @dts-jest:pass:snap
  withMeta({ meta: 'info message' }); // => { type: 'CREATE_ACTION', meta: 'info message' }
  // @dts-jest:pass:snap
  withMeta({ meta: null }); // => { type: 'CREATE_ACTION', meta: null }
  // @dts-jest:pass:snap
  withMeta({ meta: 3 }); // => { type: 'CREATE_ACTION', meta: 3 }
}

// @dts-jest:group Redux Actions - with payload and meta - obj param
{
  const withPayloadAndMeta = createAction(
    'CREATE_ACTION',
    (arg: { username: string; message: string }) =>
      `${arg.username}: ${arg.message}`,

    (arg: { username: string; message: string }) => ({
      username: arg.username,
      message: arg.message,
    })
  )<string, { username: string; message: string }>();
  // tslint:disable:max-line-length
  // @dts-jest:pass:snap
  withPayloadAndMeta({ username: 'Piotr', message: 'Hello!' }); // => { type: 'CREATE_ACTION', payload: 'Piotr: Hello!', meta: { username: 'Piotr', message: 'Hello!' } }
}

// @dts-jest:group Redux Actions - with payload and meta - multiple primitive params
{
  const withPayloadAndMeta = createAction(
    'CREATE_ACTION',
    (username: string, message: string) => `${username}: ${message}`,

    (username: string, message: string) => ({
      username: username,
      message: message,
    })
  )<string, { username: string; message: string }>();
  // tslint:disable:max-line-length
  // @dts-jest:pass:snap
  withPayloadAndMeta('Piotr', 'Hello!'); // => { type: 'CREATE_ACTION', payload: 'Piotr: Hello!', meta: { username: 'Piotr', message: 'Hello!' } }
}
