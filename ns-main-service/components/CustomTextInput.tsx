import React from 'react';
import { TextInput, Text } from '@mantine/core';

interface CustomTextInputProps {
  label: string;
  value?: string;
  key: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  isEdit: boolean;
  error?: string | null;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChange,
  required,
  isEdit,
  key,
  error,
}) =>
  isEdit ? (
    <TextInput
      label={label}
      value={value}
      key={key}
      onChange={onChange}
      required={required}
      error={error}
    />
  ) : (
    <Text size="lg">
      {label}: {value}
    </Text>
  );
