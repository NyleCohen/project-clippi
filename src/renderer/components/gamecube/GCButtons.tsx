import React from "react";

import styled from "styled-components";

import { AButton } from "./AButton";
import { BButton } from "./BButton";
import { DpadDown } from "./DpadDown";
import { DpadLeft } from "./DpadLeft";
import { DpadRight } from "./DpadRight";
import { DpadUp } from "./DpadUp";
import { LTrigger } from "./LTrigger";
import { RTrigger } from "./RTrigger";
import { XButton } from "./XButton";
import { YButton } from "./YButton";
import { ZButton } from "./ZButton";
import { Input } from "@vinceau/slp-realtime";
import { StartButton } from "./StartButton";

export const GCButtons: React.FC<{
    value?: Input[],
    onChange?: (values: Input[]) => void;
}> = props => {
    const value = props.value ? props.value : [];
    const isPressed = (input: Input) => {
        return value.includes(input);
    };
    const onClick = (input: Input) => {
        console.log(`${input} was clicked`);
        const filtered = value.filter(i => i !== input);
        if (!isPressed(input)) {
            // Add button to the list
            filtered.push(input);
        }
        if (props.onChange) {
            props.onChange(filtered);
        }
    };
    const Outer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
    `;
    return (
        <Outer>
            <LTrigger pressed={isPressed(Input.L)} onClick={() => onClick(Input.L)} />
            <ZButton pressed={isPressed(Input.Z)} onClick={() => onClick(Input.Z)} />
            <RTrigger pressed={isPressed(Input.R)} onClick={() => onClick(Input.R)} />
            <DPad isPressed={isPressed} onButtonClick={onClick} />
            <StartButton pressed={isPressed(Input.START)} onClick={() => onClick(Input.START)} />
            <MainButtons isPressed={isPressed} onButtonClick={onClick} />
        </Outer>
    );
};


const MainButtons: React.FC<{
    isPressed: (input: Input) => boolean;
    onButtonClick: (input: Input) => void;
}> = props => {
    const { isPressed, onButtonClick } = props;
    const Outer = styled.div`
        display: grid;
        grid-gap: 1.2em;
        grid-template-columns: repeat(3, 1fr);
    `;
    return (
        <Outer>
            <span style={{ gridColumn: "1 / 3", gridRow: "1 / 2", justifySelf: "end" }}>
                <YButton pressed={isPressed(Input.Y)} onClick={() => onButtonClick(Input.Y)} />
            </span>
            <span style={{ gridColumn: "2 / 3", gridRow: "2 / 4" }}>
                <AButton pressed={isPressed(Input.A)} onClick={() => onButtonClick(Input.A)} />
            </span>
            <span style={{ gridColumn: "3 / 4", gridRow: "1 / 4", alignSelf: "end" }}>
                <XButton pressed={isPressed(Input.X)} onClick={() => onButtonClick(Input.X)} />
            </span>
            <span style={{ gridColumn: "1 / 2", gridRow: "1 / 4", alignSelf: "end", justifySelf: "end" }}>
                <BButton pressed={isPressed(Input.B)} onClick={() => onButtonClick(Input.B)} />
            </span>
        </Outer>
    );
};

const DPad: React.FC<{
    isPressed: (input: Input) => boolean;
    onButtonClick: (input: Input) => void;
}> = props => {
    const { isPressed, onButtonClick } = props;
    const Outer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `;
    return (
        <Outer>
            <DpadUp pressed={isPressed(Input.D_UP)} onClick={() => onButtonClick(Input.D_UP)} />
            <div style={{ display: "flex" }}>
                <DpadLeft pressed={isPressed(Input.D_LEFT)} onClick={() => onButtonClick(Input.D_LEFT)} />
                <DpadRight pressed={isPressed(Input.D_RIGHT)} onClick={() => onButtonClick(Input.D_RIGHT)} />
            </div>
            <DpadDown pressed={isPressed(Input.D_DOWN)} onClick={() => onButtonClick(Input.D_DOWN)} />
        </Outer>
    );
};
