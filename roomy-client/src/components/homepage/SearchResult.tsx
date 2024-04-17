import "./css/SearchResult.css";

export const SearchResult = ({ result }: { result: any }) => {
  return (
    <div className="search-result" onClick={(e) => alert(`You selected ${result}!`)}>
      {result}
    </div>
  );
};
