import React from 'react';
import { observer } from 'mobx-react';
import CustomStyleButton from '../utils/CustomStyleButton';
import ColorPalette from './ColorPalette';

const ColorButton = observer((props) => (
    <CustomStyleButton
        {...props}
        palette={ColorPalette}
        name={'Color Button'}
        customType={'color'}
        paletteItems={[
            '#000000', '#660000', '#990066', '#FFC000', '#00DBA8',
            '#660066', '#336600', '#FFFFFF', '#6033F1', '#0000FF',
            '#E00000', '#000099', '#ED7D31', '#0080FF', '#717171',
        ]}
    >
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path id="drop" fill={'#C2C6D7'} d="M19,17c1.1,0,2-0.9,2-2c0-1.3-2-3.5-2-3.5s-2,2.2-2,3.5C17,16.1,17.9,17,19,17z" />
            <path id="fill" fill={'#3c3c3c'} d="M13.4,11.4c-1.9-1.7-4.8-0.3-7.1-1L5.2,10l4.8,4.7L13.4,11.4z" />
            <path id="main" fill={'#C2C6D7'} d="M16.3,8.6L14.8,10l0,0L10,14.7L5.2,10l6.2-6.2L10,2.4H6.2v2H8L3.4,9c-0.6,0.5-0.6,1.4,0,2l5.7,5.7c0.6,0.6,1.4,0.6,2,0l6.7-6.7L16.3,8.6z" />
            <rect id="splash" fill={'url(#gradient)'} x="3" y="20" width="16" height="2" />
            <defs>
                <linearGradient id="gradient">
                    <stop offset="33%" stopColor={"#FF2B64"} />
                    <stop offset="34%" stopColor={"#FFCE0F"} />
                    <stop offset="66%" stopColor={"#FFCE0F"} />
                    <stop offset="67%" stopColor={"#07A8FF"} />
                </linearGradient>
            </defs>
        </svg>
    </CustomStyleButton>
))

export default ColorButton
