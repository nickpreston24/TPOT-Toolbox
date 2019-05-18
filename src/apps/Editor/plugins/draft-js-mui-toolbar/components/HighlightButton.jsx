import React from 'react';
import { observer } from 'mobx-react';
import Icon from 'mdi-material-ui/GreasePencil'
import CustomStyleButton from '../utils/CustomStyleButton';
import HighlightPalette from './HighlightPalette';

const HighlightButton = observer((props) => (
    <CustomStyleButton
        {...props}
        palette={HighlightPalette}
        name={'Highlight Button'}
        customType={'background'}
        paletteItems={[
            '#FFFFFF', '#FFF4A3', '#FFA3D5', '#A3D4FF', '#BDFFA3',
        ]}
    >
        <Icon />
    </CustomStyleButton>
))

export default HighlightButton


