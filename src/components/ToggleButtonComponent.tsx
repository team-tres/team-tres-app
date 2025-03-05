/* eslint-disable react/prop-types */
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
// This component is under work by Ethan -needs adjusting
interface ToggleButtonComponentProps {
  value: string[];
  handleChange: (val: string[]) => void;
}

function ToggleButtonComponent({ value, handleChange }: ToggleButtonComponentProps) {
  const uniqueId = value.join('-').toLowerCase();
  return (
    <ToggleButtonGroup
      type="checkbox"
      value={value}
      onChange={handleChange}
    >
      <ToggleButton
        id={`toggle-button-m-${uniqueId}`}
        variant="success"
        size="sm"
        value="M"
      >
        M
      </ToggleButton>
      <ToggleButton
        id={`toggle-button-a-${uniqueId}`}
        variant="success"
        size="sm"
        value="A"
      >
        A
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ToggleButtonComponent;
