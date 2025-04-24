'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const params = new URLSearchParams();

    if (newQuery) {
      params.set('query', newQuery);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <InputGroup>
      <InputGroup.Text>
        <Search />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Search users..."
        defaultValue={query}
        onChange={handleSearch}
      />
    </InputGroup>
  );
};

export default SearchBar;
