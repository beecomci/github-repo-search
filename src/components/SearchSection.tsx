import React, { memo, useState } from 'react';

type Props = {
  onSubmit: (keyword: string) => void;
};

const SearchSection = ({ onSubmit } : Props): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('');
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(keyword);
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.target as HTMLInputElement;
    setKeyword(value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="repo">검색하려는 저장소 이름을 입력하세요.</label>
        <br />
        <input type="text" id="repo" value={keyword} onChange={handleChange} />
        <button type="submit">검색</button>
      </form>
    </>
  );
};

export default memo(SearchSection);
