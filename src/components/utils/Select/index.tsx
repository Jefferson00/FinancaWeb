import { InputHTMLAttributes, useState } from "react";
import { IconBaseProps } from "react-icons";
import { Control, Controller } from "react-hook-form";
import theme from "styled-theming";
import * as S from "./styles";

interface OptionsProps {
  id?: string;
  name: string;
  icon?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  backgroundColor: string | theme.ThemeSet;
  textColor: string | theme.ThemeSet;
  label?: string;
  defaultValue: string | number;
  control: Control<any>;
  options: OptionsProps[];
  optionValueType?: "name" | "id";
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
  optionValueType = "name",
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
              <S.Label textColor={!!fieldState.error ? "#CC3728" : textColor}>
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
          >
            <S.InputSelect
              textColor={textColor}
              onChange={field.onChange}
              value={field.value}
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...rest}
            >
              {options.map(({ icon, name, id }) => (
                <option
                  value={optionValueType === "name" ? name : id}
                  key={Math.random()}
                >
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
