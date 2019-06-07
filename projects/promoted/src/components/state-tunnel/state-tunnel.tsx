import { createProviderConsumer } from '@stencil/state-tunnel';
import { h } from '@stencil/core';
import { IState } from '../../state/state';

export const StateTunnel = createProviderConsumer<IState>({}, (subscribe, child) => (
  <context-consumer subscribe={subscribe} renderer={child} />
));