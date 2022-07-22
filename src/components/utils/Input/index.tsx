import { InputHTMLAttributes, useState } from "react";
import { IconBaseProps } from "react-icons";
import { Control, Controller } from "react-hook-form";
import theme from "styled-theming";

import * as S from "./styles";
import { RED_PRIMARY } from "../../../styles/global";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  backgroundColor: string | theme.ThemeSet;
  textColor: string | theme.ThemeSet;
  label?: string;
  mask?: any;
  isMasked?: boolean;
  defaultValue?: string | number;
  control: Control<any>;
  icon?: React.ComponentType<IconBaseProps>;
}

export default function Input({
  name,
  mask,
  isMasked,
  control,
  label,
  textColor,
  backgroundColor,
  defaultValue,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <>
          {label && (
            <S.LabelContainer>
              <S.Label textColor={!!fieldState.error ? RED_PRIMARY : textColor}>
                {label}
              </S.Label>
              {!!fieldState.error && (
                <S.Alert textColor="red">{fieldState.error?.message}</S.Alert>
              )}
            </S.LabelContainer>
          )}

          <S.Container
            backgroundColor={backgroundColor}
            isFocused={isFocused}
            isErrored={!!fieldState.error}
            disabled={rest.disabled}
          >
            <S.InputText
              textColor={textColor}
              onChange={field.onChange}
              value={!!mask ? mask(field.value) : field.value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...rest}
            />
          </S.Container>
        </>
      )}
    ></Controller>
  );
}
