import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import SiteScan from '../apps/SiteScan/SiteScan';
// import { SiteScan } from '../apps/SiteScan/SiteScan';

storiesOf('SiteScan', module)
    .add('default', () => (
        <div>
            <Button>Hello Button</Button>
            <SiteScan />
            {/* <SiteScan /> */}
        </div>
    ))