import { ComponentProps, ReactNode } from "react";
import { styled } from "styled-components";

const AppButton = styled.button<{$primary?: boolean}>`
    border: 1px solid #9ABDDC;
    height: 35px;
    border-radius: 15px;
    padding: 0 8px;
    background: ${props => props.$primary ? "#9ABDDC" : "white"};
    color: ${props => props.$primary ? "#000" : "#9ABDDC"};

    &:hover {
        cursor: pointer;
    }
`;

interface Props extends ComponentProps<"button"> {
    children: ReactNode;
    primary?: boolean;

    onClick?: () => void;
}

function Button({children, primary = true, onClick, ...otherProps}: Props) {
    return <AppButton $primary={primary} {...otherProps} onClick={onClick}>{children}</AppButton>;
}

export default Button;