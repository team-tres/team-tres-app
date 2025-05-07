'use client';

import { Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <InputGroup>
    <InputGroup.Text>
      <Search />
    </InputGroup.Text>
    <Form.Control
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </InputGroup>
);

export default SearchBar;
