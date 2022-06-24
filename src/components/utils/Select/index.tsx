import { InputHTMLAttributes, useState } from "react";
import { IconBaseProps } from "react-icons";
import { Control, Controller } from "react-hook-form";

import * as S from "./styles";

interface OptionsProps {
  name: string;
  icon: string;
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  backgroundColor: string;
  textColor: string;
  label?: string;
  defaultValue: string | number;
  control: Control<any>;
  options: OptionsProps[];
  icon?: React.ComponentType<IconBaseProps>;
}

export default function Select({
  name,
  control,
  label,
  textColor,
  backgroundColor,
  options,
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
              <S.Label color={!!fieldState.error ? "#CC3728" : textColor}>
                {label}
              </S.Label>
              {!!fieldState.error && (
                <S.Alert color="red">{fieldState.error?.message}</S.Alert>
              )}
            </S.LabelContainer>
          )}

          <S.Container
            backgroundColor={backgroundColor}
            isFocused={isFocused}
            isErrored={!!fieldState.error}
          >
            <S.InputSelect
              color={textColor}
              onChange={field.onChange}
              value={field.value}
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...rest}
            >
              {options.map(({ icon, name }) => (
                <option value={name} key={Math.random()}>
                  {icon} {name}
                </option>
              ))}
            </S.InputSelect>
          </S.Container>
        </>
      )}
    ></Controller>
  );
}
