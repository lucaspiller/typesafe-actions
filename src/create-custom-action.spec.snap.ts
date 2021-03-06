import * as T from './type-helpers';
import { createCustomAction } from './create-custom-action';

// @dts-jest:group toString() method return a type
{
  const actionCreator = createCustomAction('CREATE_CUSTOM_ACTION');
  // @dts-jest:pass:snap -> string
  actionCreator.toString(); // => 'CREATE_CUSTOM_ACTION'
}

// @dts-jest:group with symbol
{
  const CREATE_CUSTOM_ACTION = Symbol(1);
  const withSymbol = createCustomAction(CREATE_CUSTOM_ACTION as any);
  // @dts-jest:pass:snap -> { type: any; }
  withSymbol(); // => { type: CREATE_CUSTOM_ACTION }
}

// @dts-jest:group with type only
{
  const withTypeOnly = createCustomAction('CREATE_CUSTOM_ACTION');
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; }
  withTypeOnly(); // => { type: 'CREATE_CUSTOM_ACTION' }
}

// @dts-jest:group with payload
{
  const withPayload = createCustomAction(
    'CREATE_CUSTOM_ACTION',
    (id: number) => ({ payload: id })
  );
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; payload: number; }
  withPayload(1); // => { type: 'CREATE_CUSTOM_ACTION', payload: 1 }
}

// @dts-jest:group with optional payload
{
  const withOptionalPayload = createCustomAction(
    'CREATE_CUSTOM_ACTION',
    (id?: number) => ({ payload: id })
  );
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; payload: number | undefined; }
  withOptionalPayload(); // => { type: 'CREATE_CUSTOM_ACTION' }
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; payload: number | undefined; }
  withOptionalPayload(1); // => { type: 'CREATE_CUSTOM_ACTION', payload: 1 }
}

// @dts-jest:group with meta
{
  const withMeta = createCustomAction(
    'CREATE_CUSTOM_ACTION',
    (token: string) => ({ meta: token })
  );
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; meta: string; }
  withMeta('token'); // => { type: 'CREATE_CUSTOM_ACTION', meta: 'token' }
}

// @dts-jest:group with payload and meta
{
  const withPayloadAndMeta = createCustomAction(
    'CREATE_CUSTOM_ACTION',
    (message: string, scope: string) => ({
      payload: message,
      meta: scope,
    })
  );
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; payload: string; meta: string; }
  withPayloadAndMeta('Hello!', 'info'); // => { type: 'CREATE_CUSTOM_ACTION', payload: 'Hello!', meta: 'info' }
}
