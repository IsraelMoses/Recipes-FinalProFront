import { useState, useEffect } from "react";

const Sidebar = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=AIzaSyBjvM6LCNSplNkCx_Jq_0isawRB934y6qQ&cx=e20778f0bb5fa45e9&q=cooking+products+stores`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.status}`);
        }
        const data = await response.json();
        setResults(data.items);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  //Dynamically load the Google CSE script
  const loadGoogleCSEScript = () => {
    const scriptId = "google-cse-script";
    if (document.getElementById(scriptId)) {
      // Script already loaded
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://cse.google.com/cse.js?cx=e20778f0bb5fa45e9";
    script.async = true;
    document.body.appendChild(script);
  };

  loadGoogleCSEScript();

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
